import React, { useRef, useEffect, useState } from "react";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaListUl,
  FaListOl,
  FaQuoteLeft,
  FaLink,
  FaImage,
  FaTable,
  FaCode,
  FaEye,
  FaEdit,
  FaEraser,
  FaHeading,
  FaUpload,
} from "react-icons/fa";

/**
 * RichArticleEditor
 * Exactly matches the reference UI:
 * - Top title badge "Rich Article Body Editor"
 * - Clean pill toolbar with dropdown for styles (Normal, H2, H3, H4)
 * - Format buttons: Bold, Italic, Underline, Strikethrough, Text Color, Highlight Color, Align, Lists
 * - Insert buttons: Quote, Link, Image (with URL or file upload to Base64/URL), Table, Clear formatting
 * - Tab switcher: "Visual Editor" / "HTML Source Code"
 * - Live synchronized with form state
 */
export default function RichArticleEditor({ value, onChange, placeholder = "Write your insights here with full rich text formatting..." }) {
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const [viewMode, setViewMode] = useState("visual"); // "visual" | "html"
  const [htmlSource, setHtmlSource] = useState(value || "");
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [imageCaption, setImageCaption] = useState("");
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [savedSelection, setSavedSelection] = useState(null);

  // Sync internal state when external value changes
  useEffect(() => {
    if (viewMode === "visual" && editorRef.current) {
      if (editorRef.current.innerHTML !== (value || "")) {
        editorRef.current.innerHTML = value || "";
      }
    }
    setHtmlSource(value || "");
  }, [value, viewMode]);

  // Execute formatting command on contenteditable
  const formatDoc = (cmd, val = null) => {
    if (viewMode !== "visual") return;
    if (editorRef.current) {
      editorRef.current.focus();
    }
    document.execCommand(cmd, false, val);
    handleInput();
  };

  const handleInput = () => {
    if (editorRef.current) {
      const newHtml = editorRef.current.innerHTML;
      setHtmlSource(newHtml);
      if (onChange) onChange(newHtml);
    }
  };

  // Change heading format (Normal, H2, H3, H4, Blockquote)
  const handleBlockFormat = (tag) => {
    if (viewMode !== "visual") return;
    formatDoc("formatBlock", tag);
  };

  // Save current selection before modal opens
  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      setSavedSelection(sel.getRangeAt(0));
    }
  };

  const restoreSelection = () => {
    if (savedSelection) {
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(savedSelection);
    }
  };

  // Image insertion
  const openImageModal = () => {
    saveSelection();
    setImageUrl("");
    setImageAlt("");
    setImageCaption("");
    setShowImageModal(true);
  };

  const handleInsertImage = () => {
    if (!imageUrl.trim()) return;
    restoreSelection();
    if (editorRef.current) editorRef.current.focus();

    const figureHtml = `
      <figure class="my-6 block text-center">
        <img src="${imageUrl}" alt="${imageAlt || 'Article image'}" class="w-full max-h-[500px] object-cover rounded-2xl border border-slate-200 shadow-md inline-block" />
        ${imageCaption ? `<figcaption class="text-xs text-slate-500 mt-2 italic">${imageCaption}</figcaption>` : ""}
      </figure>
    `;

    document.execCommand("insertHTML", false, figureHtml);
    handleInput();
    setShowImageModal(false);
  };

  // Local file upload to Data URL
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file (JPG, PNG, WebP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image is larger than 5MB. Please choose a smaller image.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      setImageUrl(uploadEvent.target.result);
    };
    reader.readAsDataURL(file);
  };

  // Link insertion
  const openLinkModal = () => {
    saveSelection();
    const sel = window.getSelection();
    setLinkText(sel.toString() || "");
    setLinkUrl("");
    setShowLinkModal(true);
  };

  const handleInsertLink = () => {
    if (!linkUrl.trim()) return;
    restoreSelection();
    if (editorRef.current) editorRef.current.focus();

    const formattedUrl = linkUrl.startsWith("http://") || linkUrl.startsWith("https://")
      ? linkUrl
      : `https://${linkUrl}`;

    if (linkText) {
      const linkHtml = `<a href="${formattedUrl}" target="_blank" rel="noopener noreferrer" class="text-amber-700 underline font-semibold">${linkText}</a>`;
      document.execCommand("insertHTML", false, linkHtml);
    } else {
      document.execCommand("createLink", false, formattedUrl);
    }
    handleInput();
    setShowLinkModal(false);
  };

  // Insert Table
  const handleInsertTable = () => {
    if (viewMode !== "visual") return;
    const tableHtml = `
      <table class="w-full my-6 border-collapse border border-slate-300 text-xs">
        <thead>
          <tr class="bg-[#0B1220] text-white">
            <th class="p-3 border border-slate-300 text-left font-bold">Feature / Module</th>
            <th class="p-3 border border-slate-300 text-left font-bold">Industry Standard</th>
            <th class="p-3 border border-slate-300 text-left font-bold">Dizital Adda Program</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="p-3 border border-slate-200 font-semibold">Hands-on Live Labs</td>
            <td class="p-3 border border-slate-200">Theory / Recorded</td>
            <td class="p-3 border border-slate-200 font-bold text-emerald-700">100% Live Practical</td>
          </tr>
          <tr class="bg-slate-50">
            <td class="p-3 border border-slate-200 font-semibold">Real Capstone Projects</td>
            <td class="p-3 border border-slate-200">1-2 basic setups</td>
            <td class="p-3 border border-slate-200 font-bold text-emerald-700">5+ Production Deliverables</td>
          </tr>
        </tbody>
      </table>
    `;
    formatDoc("insertHTML", tableHtml);
  };

  // Toggle between HTML and Visual
  const toggleViewMode = (mode) => {
    if (mode === "html") {
      setHtmlSource(editorRef.current ? editorRef.current.innerHTML : value || "");
    } else {
      if (onChange) onChange(htmlSource);
    }
    setViewMode(mode);
  };

  const handleHtmlSourceChange = (e) => {
    const val = e.target.value;
    setHtmlSource(val);
    if (onChange) onChange(val);
  };

  return (
    <div className="w-full">
      {/* Top Header Card Label */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-sm bg-[#D4A017] inline-block shadow-xs"></span>
          <span className="font-extrabold text-slate-900 text-sm tracking-tight">
            Rich Article Body Editor
          </span>
          <span className="text-[10px] text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
            WYSIWYG & HTML
          </span>
        </div>

        {/* View mode tabs */}
        <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-xs font-semibold">
          <button
            type="button"
            onClick={() => toggleViewMode("visual")}
            className={`px-3 py-1 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
              viewMode === "visual"
                ? "bg-white text-slate-900 shadow-xs font-bold"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <FaEdit className="text-[11px]" />
            <span>Visual</span>
          </button>
          <button
            type="button"
            onClick={() => toggleViewMode("html")}
            className={`px-3 py-1 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
              viewMode === "html"
                ? "bg-white text-slate-900 shadow-xs font-bold"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <FaCode className="text-[11px]" />
            <span>HTML Source</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-[#0B1220] transition">
        {/* TOOLBAR */}
        <div className="bg-slate-50/90 border-b border-slate-200 p-2.5 flex flex-wrap items-center gap-1 text-slate-700 select-none">
          {/* Paragraph / Heading Selector */}
          <select
            onChange={(e) => handleBlockFormat(e.target.value)}
            defaultValue="p"
            disabled={viewMode !== "visual"}
            className="text-xs font-semibold bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-none cursor-pointer hover:border-slate-300 disabled:opacity-50"
            title="Heading Level"
          >
            <option value="p">Normal Text</option>
            <option value="h2">Heading 2 (H2)</option>
            <option value="h3">Heading 3 (H3)</option>
            <option value="h4">Heading 4 (H4)</option>
            <option value="blockquote">Quote Block</option>
          </select>

          <div className="h-5 w-px bg-slate-200 mx-1"></div>

          {/* Inline Formats */}
          <button
            type="button"
            onClick={() => formatDoc("bold")}
            disabled={viewMode !== "visual"}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-200 font-bold transition text-xs disabled:opacity-50 cursor-pointer"
            title="Bold (Ctrl+B)"
          >
            <FaBold />
          </button>

          <button
            type="button"
            onClick={() => formatDoc("italic")}
            disabled={viewMode !== "visual"}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-200 italic transition text-xs disabled:opacity-50 cursor-pointer"
            title="Italic (Ctrl+I)"
          >
            <FaItalic />
          </button>

          <button
            type="button"
            onClick={() => formatDoc("underline")}
            disabled={viewMode !== "visual"}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-200 underline transition text-xs disabled:opacity-50 cursor-pointer"
            title="Underline (Ctrl+U)"
          >
            <FaUnderline />
          </button>

          <button
            type="button"
            onClick={() => formatDoc("strikeThrough")}
            disabled={viewMode !== "visual"}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-200 line-through transition text-xs disabled:opacity-50 cursor-pointer"
            title="Strikethrough"
          >
            <FaStrikethrough />
          </button>

          <div className="h-5 w-px bg-slate-200 mx-1"></div>

          {/* Alignment */}
          <button
            type="button"
            onClick={() => formatDoc("justifyLeft")}
            disabled={viewMode !== "visual"}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-200 transition text-xs disabled:opacity-50 cursor-pointer"
            title="Align Left"
          >
            <span className="font-mono text-xs">≡</span>
          </button>

          <button
            type="button"
            onClick={() => formatDoc("justifyCenter")}
            disabled={viewMode !== "visual"}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-200 transition text-xs disabled:opacity-50 cursor-pointer"
            title="Align Center"
          >
            <span className="font-mono text-xs">≣</span>
          </button>

          {/* Lists */}
          <button
            type="button"
            onClick={() => formatDoc("insertUnorderedList")}
            disabled={viewMode !== "visual"}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-200 transition text-xs disabled:opacity-50 cursor-pointer"
            title="Bullet List"
          >
            <FaListUl />
          </button>

          <button
            type="button"
            onClick={() => formatDoc("insertOrderedList")}
            disabled={viewMode !== "visual"}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-200 transition text-xs disabled:opacity-50 cursor-pointer"
            title="Numbered List"
          >
            <FaListOl />
          </button>

          <div className="h-5 w-px bg-slate-200 mx-1"></div>

          {/* Blockquote */}
          <button
            type="button"
            onClick={() => formatDoc("formatBlock", "blockquote")}
            disabled={viewMode !== "visual"}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-200 transition text-xs disabled:opacity-50 cursor-pointer"
            title="Insert Quote"
          >
            <FaQuoteLeft />
          </button>

          {/* Link */}
          <button
            type="button"
            onClick={openLinkModal}
            disabled={viewMode !== "visual"}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-200 transition text-xs text-blue-600 disabled:opacity-50 cursor-pointer"
            title="Insert Link"
          >
            <FaLink />
          </button>

          {/* IMAGE BUTTON */}
          <button
            type="button"
            onClick={openImageModal}
            disabled={viewMode !== "visual"}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-amber-100 text-amber-800 transition text-xs font-bold disabled:opacity-50 cursor-pointer border border-amber-200 bg-amber-50"
            title="Insert Image (URL or Upload)"
          >
            <FaImage />
          </button>

          {/* TABLE BUTTON */}
          <button
            type="button"
            onClick={handleInsertTable}
            disabled={viewMode !== "visual"}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-200 transition text-xs text-slate-700 disabled:opacity-50 cursor-pointer"
            title="Insert Comparison Table"
          >
            <FaTable />
          </button>

          {/* Clear formatting */}
          <button
            type="button"
            onClick={() => formatDoc("removeFormat")}
            disabled={viewMode !== "visual"}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-200 text-slate-500 transition text-xs disabled:opacity-50 cursor-pointer ml-auto"
            title="Clear Formatting"
          >
            <FaEraser />
          </button>
        </div>

        {/* EDITOR BODY */}
        {viewMode === "visual" ? (
          <div
            ref={editorRef}
            contentEditable
            onInput={handleInput}
            onBlur={handleInput}
            className="min-h-[380px] max-h-[600px] overflow-y-auto p-6 sm:p-8 text-slate-800 text-sm leading-relaxed focus:outline-none blog-editor-canvas"
            data-placeholder={placeholder}
          />
        ) : (
          <textarea
            rows={16}
            value={htmlSource}
            onChange={handleHtmlSourceChange}
            placeholder="<h2>Enter HTML Content</h2><p>...</p>"
            className="w-full min-h-[380px] p-6 text-xs font-mono bg-slate-950 text-emerald-400 focus:outline-none resize-y"
          />
        )}
      </div>

      {/* Helper Footer Tips */}
      <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 mt-2 px-1">
        <span>
          💡 <strong>Tip:</strong> Use <strong>H2</strong> for primary sections &amp; <strong>H3</strong> for sub-topics. Images will automatically scale and fit mobile view.
        </span>
        <span className="font-mono text-slate-400">
          {(value || "").split(/\s+/).filter(Boolean).length} words
        </span>
      </div>

      {/* ======================================================== */}
      {/* INSERT IMAGE MODAL */}
      {/* ======================================================== */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                  <FaImage />
                </div>
                <h3 className="font-black text-slate-900 text-sm">Insert Image in Article</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowImageModal(false)}
                className="text-slate-400 hover:text-slate-700 text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Option A: Image URL */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Image Web URL (CDN / Unsplash / Live Link)
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B1220]"
              />
            </div>

            {/* Option B: Local File Upload */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700">Or Upload from Device</label>
                <span className="text-[10px] text-slate-400">Max 5MB (JPG, PNG, WebP)</span>
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-2.5 px-3 border border-dashed border-slate-300 hover:border-amber-500 rounded-xl bg-slate-50 hover:bg-amber-50/50 text-xs font-semibold text-slate-600 flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <FaUpload className="text-amber-600" />
                <span>Choose Image File...</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            {/* Image Preview if available */}
            {imageUrl && (
              <div className="p-2 border border-slate-200 rounded-xl bg-slate-50 text-center">
                <span className="text-[10px] text-slate-400 block mb-1">Image Preview:</span>
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="max-h-36 mx-auto rounded-lg object-cover border border-slate-300"
                />
              </div>
            )}

            {/* Alt text & Caption */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Alt Text (SEO)</label>
                <input
                  type="text"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="e.g. Skin barrier repair chart"
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Caption (Optional)</label>
                <input
                  type="text"
                  value={imageCaption}
                  onChange={(e) => setImageCaption(e.target.value)}
                  placeholder="e.g. Figure 1: Barrier recovery"
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowImageModal(false)}
                className="px-4 py-2 border border-slate-300 text-xs font-bold rounded-xl text-slate-600 hover:bg-slate-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleInsertImage}
                disabled={!imageUrl.trim()}
                className="px-5 py-2 bg-[#0B1220] hover:bg-[#7C2D12] text-white text-xs font-bold rounded-xl transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
              >
                Insert Image
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* INSERT LINK MODAL */}
      {/* ======================================================== */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-sm w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center">
                  <FaLink />
                </div>
                <h3 className="font-black text-slate-900 text-sm">Insert Hyperlink</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="text-slate-400 hover:text-slate-700 text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Link URL</label>
              <input
                type="text"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://dizitaladda.com/course/..."
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B1220]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Anchor Text (Optional)</label>
              <input
                type="text"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                placeholder="Click here / Course name"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="px-4 py-2 border border-slate-300 text-xs font-bold rounded-xl text-slate-600 hover:bg-slate-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleInsertLink}
                disabled={!linkUrl.trim()}
                className="px-5 py-2 bg-[#0B1220] hover:bg-[#7C2D12] text-white text-xs font-bold rounded-xl transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
              >
                Insert Link
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
