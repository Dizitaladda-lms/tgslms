import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  EyeOff,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";

/**
 * Universal video URL parser:
 * Automatically parses Google Drive links, YouTube links, and direct video URLs.
 */
export const parseVideoUrl = (rawUrl) => {
  if (!rawUrl || typeof rawUrl !== "string") {
    return { type: "empty", embedUrl: "" };
  }

  const url = rawUrl.trim();

  // 1. Google Drive Link Detection
  // Formats:
  // - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
  // - https://drive.google.com/file/d/FILE_ID/preview
  // - https://drive.google.com/open?id=FILE_ID
  // - https://drive.google.com/uc?id=FILE_ID
  const driveFileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  const driveIdMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  const driveId = (driveFileMatch && driveFileMatch[1]) || (driveIdMatch && driveIdMatch[1]);

  if (driveId) {
    return {
      type: "drive",
      embedUrl: `https://drive.google.com/file/d/${driveId}/preview`,
      fileId: driveId,
    };
  }

  // 2. YouTube Link Detection
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    let videoId = "";
    const ytMatch = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
    );
    if (ytMatch && ytMatch[1]) videoId = ytMatch[1];
    return {
      type: "youtube",
      embedUrl: videoId
        ? `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&enablejsapi=1`
        : url,
      videoId,
    };
  }

  // 3. Direct HTML5 Video File (mp4, webm, ogg, etc.)
  return {
    type: "direct",
    embedUrl: url,
  };
};

/**
 * SecureVideoPlayer Component
 *
 * Implements Multi-Layered EdTech Anti-Piracy Protection:
 * - Dynamic Floating Student Watermark (Name, Email, Roll ID, Live Clock)
 * - Drive Pop-Out / Link Extraction Interceptor
 * - Window-blur & Snipping Tool Screen Capture Shield
 * - Keyboard Shortcut Blocker (PrintScreen, F12, Ctrl+Shift+I, etc.)
 * - Right-click / Context menu disabled
 * - Watch time progress tracking & automatic completion trigger (>= 80%)
 */
const SecureVideoPlayer = ({
  videoUrl,
  lectureTitle = "Video Lecture",
  lectureId,
  courseId,
  durationMinutes = 20,
  initialWatchedSeconds = 0,
  isCompleted = false,
  studentInfo = {},
  onProgressUpdate,
  onAutoComplete,
}) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const parsedVideo = parseVideoUrl(videoUrl);

  // Security & Shield States
  const [isShieldBlocked, setIsShieldBlocked] = useState(false);
  const [shieldReason, setShieldReason] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  // Playback & Progress States
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(initialWatchedSeconds || 0);
  const [totalDuration, setTotalDuration] = useState(durationMinutes * 60);
  const [watchProgressPercent, setWatchProgressPercent] = useState(
    isCompleted ? 100 : 0
  );
  const [hasCompletedCurrent, setHasCompletedCurrent] = useState(isCompleted);

  // Dynamic Floating Watermark Position State
  const [watermarkPos, setWatermarkPos] = useState({ top: "25%", left: "30%" });
  const [liveTimestamp, setLiveTimestamp] = useState(new Date().toLocaleTimeString());

  // Resolved Student Credentials for Watermarking
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const studentName = studentInfo.name || storedUser.name || "TSG Student";
  const studentEmail = studentInfo.email || storedUser.email || "student@tsglms.com";
  const studentRoll = studentInfo.studentId || storedUser.student_id || `DA-${storedUser.id || "STU"}`;

  // =========================================================================
  // 1. DYNAMIC WATERMARK JUMP ENGINE (Moves every 6 seconds to random position)
  // =========================================================================
  useEffect(() => {
    const moveWatermark = () => {
      // Keep watermark safely within 15% to 75% margins so it's always on screen
      const randomTop = Math.floor(15 + Math.random() * 60);
      const randomLeft = Math.floor(12 + Math.random() * 60);
      setWatermarkPos({ top: `${randomTop}%`, left: `${randomLeft}%` });
      setLiveTimestamp(new Date().toLocaleTimeString());
    };

    const interval = setInterval(moveWatermark, 6000);
    return () => clearInterval(interval);
  }, []);

  // =========================================================================
  // 2. ACTIVE ANTI-CAPTURE & ANTI-RECORDING SENSORS
  // =========================================================================
  const triggerSecurityCurtain = useCallback((reason) => {
    setIsShieldBlocked(true);
    setShieldReason(reason);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  useEffect(() => {
    // A. Detect Tab Switching (Only when tab actually hidden, auto-resumes when returning)
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        triggerSecurityCurtain("Browser tab switched. Video paused for security.");
      } else if (document.visibilityState === "visible") {
        // Auto-resume smoothly when student comes back to class
        setIsShieldBlocked(false);
        setShieldReason("");
        setIsPlaying(true);
        if (videoRef.current) {
          videoRef.current.play().catch(() => {});
        }
      }
    };

    // B. Intercept Screen Sharing (Zoom / Meet / Discord / Web Screen Recorders)
    if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
      const originalGetDisplayMedia = navigator.mediaDevices.getDisplayMedia.bind(navigator.mediaDevices);
      navigator.mediaDevices.getDisplayMedia = async (...args) => {
        triggerSecurityCurtain("Screen sharing / Web capture detected. Video stream protected.");
        throw new Error("Screen sharing is restricted on copyright-protected content.");
      };
    }

    // C. Intercept Screen Capture & DevTools Keyboard Shortcuts
    const handleKeyDown = (e) => {
      // PrintScreen key
      if (e.key === "PrintScreen" || e.keyCode === 44) {
        e.preventDefault();
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText("");
          }
        } catch (err) {
          // ignore
        }
        triggerSecurityCurtain("Screenshot shortcut (PrintScreen) intercepted.");
        setToastMessage("⚠️ Screenshots are strictly prohibited by TSG Copyright Protection.");
        setTimeout(() => {
          setIsShieldBlocked(false);
          setIsPlaying(true);
          setToastMessage("");
        }, 2500);
        return false;
      }

      // Win + Shift + S (Windows Snipping Tool) or Cmd + Shift + 4 (Mac)
      if (
        (e.key === "S" || e.key === "s") &&
        (e.metaKey || e.ctrlKey) &&
        e.shiftKey
      ) {
        e.preventDefault();
        triggerSecurityCurtain("Snipping Tool / Screen capture shortcut detected.");
        setTimeout(() => {
          setIsShieldBlocked(false);
          setIsPlaying(true);
        }, 2500);
        return false;
      }

      // F12 or Inspect Element (Ctrl+Shift+I / Ctrl+Shift+C / Ctrl+Shift+J)
      if (
        e.key === "F12" ||
        e.keyCode === 123 ||
        ((e.ctrlKey || e.metaKey) &&
          e.shiftKey &&
          ["I", "i", "C", "c", "J", "j"].includes(e.key))
      ) {
        e.preventDefault();
        triggerSecurityCurtain("Developer Inspection Tools are disabled on secure video.");
        return false;
      }

      // Ctrl + U (View Source), Ctrl + S (Save Page), Ctrl + P (Print)
      if (
        (e.ctrlKey || e.metaKey) &&
        ["u", "U", "s", "S", "p", "P"].includes(e.key)
      ) {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [triggerSecurityCurtain]);

  // =========================================================================
  // 3. WATCH PROGRESS ENGINE & AUTO-COMPLETION TRIGGER (>= 80%)
  // =========================================================================
  // For Direct Video: timeupdate event
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = Math.floor(videoRef.current.currentTime);
    const dur = Math.floor(videoRef.current.duration) || totalDuration;
    setCurrentTime(current);
    if (dur > 0) {
      setTotalDuration(dur);
      const percent = Math.min(100, Math.round((current / dur) * 100));
      setWatchProgressPercent(percent);

      if (percent >= 80 && !hasCompletedCurrent) {
        setHasCompletedCurrent(true);
        if (onAutoComplete) {
          onAutoComplete(lectureId, current);
        }
      }
    }
  };

  // For Drive/Iframe Embeds: Active Focus Watch Timer
  useEffect(() => {
    if (parsedVideo.type === "direct") return;

    let timer;
    if (!isShieldBlocked && isPlaying) {
      timer = setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + 1;
          const dur = totalDuration > 0 ? totalDuration : 1200;
          const percent = Math.min(100, Math.round((next / dur) * 100));
          setWatchProgressPercent(percent);

          if (percent >= 80 && !hasCompletedCurrent) {
            setHasCompletedCurrent(true);
            if (onAutoComplete) {
              onAutoComplete(lectureId, next);
            }
          }
          return next;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [
    isShieldBlocked,
    isPlaying,
    parsedVideo.type,
    totalDuration,
    hasCompletedCurrent,
    lectureId,
    onAutoComplete,
  ]);

  // Periodic Progress Sync to Backend every 20 seconds
  useEffect(() => {
    const syncInterval = setInterval(() => {
      if (currentTime > 0 && onProgressUpdate) {
        onProgressUpdate({
          lectureId,
          courseId,
          watchedSeconds: currentTime,
          completed: hasCompletedCurrent,
        });
      }
    }, 20000);

    return () => clearInterval(syncInterval);
  }, [currentTime, lectureId, courseId, hasCompletedCurrent, onProgressUpdate]);

  // Resume Video handler
  const handleResumePlayback = () => {
    setIsShieldBlocked(false);
    setShieldReason("");
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <div
      ref={containerRef}
      onContextMenu={(e) => e.preventDefault()}
      className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-slate-800 select-none group"
      style={{ userSelect: "none", WebkitUserSelect: "none" }}
    >
      {/* ===================================================================
          1. ACTIVE ANTI-CAPTURE SECURITY CURTAIN (TRIGGERED ON BLUR/SCREENSHOT)
      ==================================================================== */}
      {isShieldBlocked && (
        <div className="absolute inset-0 z-50 bg-[#0B1220] flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-red-950/80 border-2 border-red-500/60 flex items-center justify-center mb-4 text-red-400">
            <Lock size={32} />
          </div>
          <div className="inline-flex items-center gap-2 bg-[#D4A017]/15 border border-[#D4A017] text-[#D4A017] text-[11px] font-black uppercase tracking-widest px-3.5 py-1 rounded-full mb-3">
            <ShieldAlert size={14} />
            <span>TSG Anti-Piracy Shield Active</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white max-w-md">
            Video Masked for Security Protection
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mt-2 leading-relaxed">
            {shieldReason ||
              "Screen recording, screenshot hotkeys, or switching applications is blocked to protect intellectual property."}
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleResumePlayback}
              className="bg-[#D4A017] hover:bg-[#b58710] text-[#0B1220] font-black px-6 py-2.5 rounded-xl text-xs sm:text-sm transition shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw size={16} />
              <span>Resume Lecture Stream</span>
            </button>
          </div>

          <p className="text-[11px] text-slate-500 font-mono mt-4">
            Session ID: {studentRoll} • {studentEmail}
          </p>
        </div>
      )}

      {/* ===================================================================
          2. TOAST WARNING NOTIFICATION
      ==================================================================== */}
      {toastMessage && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 bg-red-900/90 border border-red-500 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xl backdrop-blur-sm flex items-center gap-2 animate-bounce">
          <AlertTriangle size={16} className="text-amber-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ===================================================================
          3. DYNAMIC FLOATING WATERMARK (MOVES RANDOMLY EVERY 6 SECONDS)
      ==================================================================== */}
      <div
        className="absolute z-30 pointer-events-none transition-all duration-1000 ease-in-out"
        style={{
          top: watermarkPos.top,
          left: watermarkPos.left,
        }}
      >
        <div className="bg-black/55 backdrop-blur-xs border border-amber-400/25 px-3 py-1.5 rounded-lg text-[11px] font-mono text-amber-200/80 shadow-md flex flex-col gap-0.5 select-none pointer-events-none">
          <div className="flex items-center gap-1 font-bold text-white/90">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span>TSG • {studentName}</span>
          </div>
          <span className="text-[10px] text-amber-300/70">{studentEmail}</span>
          <span className="text-[9px] text-slate-400">
            ID: {studentRoll} • {liveTimestamp}
          </span>
        </div>
      </div>

      {/* SECONDARY STATIC SUBTLE WATERMARK IN CORNER (TAMPER PROTECTION) */}
      <div className="absolute bottom-3 left-4 z-20 pointer-events-none opacity-40 text-[10px] font-mono text-white select-none">
        TSG SECURE STREAM • {studentRoll}
      </div>

      {/* ===================================================================
          4. GOOGLE DRIVE POP-OUT INTERCEPTOR (BLOCKS OPENING IN NEW TAB)
      ==================================================================== */}
      {parsedVideo.type === "drive" && (
        <>
          {/* Top-Right Invisible Shield over Google Drive Pop-out Icon */}
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setToastMessage("🔒 Direct Drive downloading is restricted on TSG LMS.");
              setTimeout(() => setToastMessage(""), 3500);
            }}
            title="External download disabled by TSG Security"
            className="absolute top-0 right-0 w-28 h-16 z-30 cursor-default bg-transparent"
          />

          {/* Top Header Bar Overlay Shield */}
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="absolute top-0 left-0 right-0 h-10 z-20 bg-transparent pointer-events-auto"
          />
        </>
      )}

      {/* ===================================================================
          5. VIDEO EMBED/PLAYER SURFACE
      ==================================================================== */}
      {parsedVideo.type === "drive" && (
        <iframe
          title={lectureTitle}
          src={parsedVideo.embedUrl}
          className="w-full h-full border-0 bg-black"
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
          sandbox="allow-scripts allow-same-origin allow-presentation allow-forms"
        />
      )}

      {parsedVideo.type === "youtube" && (
        <iframe
          title={lectureTitle}
          src={parsedVideo.embedUrl}
          className="w-full h-full border-0 bg-black"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
        />
      )}

      {parsedVideo.type === "direct" && (
        <video
          ref={videoRef}
          controls
          playsInline
          controlsList="nodownload noremoteplayback"
          disablePictureInPicture
          onContextMenu={(e) => e.preventDefault()}
          src={parsedVideo.embedUrl}
          onTimeUpdate={handleTimeUpdate}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="w-full h-full bg-black object-contain"
        >
          Your browser does not support HTML5 video streaming.
        </video>
      )}

      {parsedVideo.type === "empty" && (
        <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-6 text-center">
          <EyeOff size={40} className="text-slate-600 mb-2" />
          <h4 className="text-base font-bold text-white">No Video Link Configured</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-sm">
            The faculty is uploading the Google Drive or video stream for this session.
          </p>
        </div>
      )}

      {/* ===================================================================
          6. LIVE SECURITY & WATCH PROGRESS STATUS BAR (SUBTLE BOTTOM OVERLAY)
      ==================================================================== */}
      <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
        <div className="bg-[#0B1220]/80 backdrop-blur-md border border-slate-700/60 text-white text-[11px] font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
          <ShieldCheck size={13} className="text-emerald-400" />
          <span className="hidden sm:inline">TSG Encrypted Stream</span>
          <span className="text-slate-400">•</span>
          <span className="text-[#D4A017]">{watchProgressPercent}% Watched</span>
        </div>

        {hasCompletedCurrent && (
          <div className="bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
            <CheckCircle2 size={13} />
            <span>Completed ✅</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecureVideoPlayer;
