// =========================================================================
// DIZITAL ADDA CYBER SECURITY OFFICIAL COURSE DATA (4M, 6M, 12M)
// Sourced & Extracted directly from https://dizitaladda.com/cyber-security
// Founded & Mentored by Dr. Gulshan Kumar & Senior Red Team Leads
// =========================================================================

// -------------------------------------------------------------
// 1. FOUNDATION IN CYBER SECURITY & ETHICAL HACKING (4 MONTHS)
// -------------------------------------------------------------
export const FOUNDATION_CYBER_SECURITY_DETAILS = {
  id: "cs-4m-found",
  backendCourseId: "cyber-foundation",
  courseId: 9,
  title: "Foundation in Cyber Security and Ethical Hacking",
  subtitle: "4 Months Foundation • Python, Networking, Linux & Ethical Hacking Basics",
  duration: "4 Months",
  durationId: "4-months",
  level: "BEGINNER LEVEL",
  levelColor: "border-amber-400 text-amber-700 bg-amber-50",
  checkColor: "text-amber-500",
  badge: "Beginner-Friendly Job Track",
  rating: 4.8,
  ratingsCount: "940+ students (186 reviews)",
  price: 30000,
  originalPrice: 40000,
  onlinePrice: 30000,
  offlinePrice: 40000,
  emi: "₹3,499/mo",
  enrollUrl: "https://dizitaladda.com/courses/foundation-in-cyber-security-and-ethical-hacking",
  whatsappUrl: "https://wa.me/918810606010?text=Hi%2C+I+want+to+enquire+about+the+Foundation+in+Cyber+Security+and+Ethical+Hacking+Course",
  phone: "+91 88106 06010",
  liveTrainingHours: "96+ Hours Contact Labs",
  modulesCount: "12",
  modulesType: "Core Security Modules",
  aiToolsCount: "25+",
  aiToolsType: "Security & Recon Tools",
  projects: "4 Virtual Lab Projects",
  mentorship: "Weekly Mentorship with Dr. Gulshan Kumar & Certified Ethical Hackers",
  certification: "Dizital Adda Official Certification + CompTIA Security+ Prep",
  placementGuarantee: "100% Placement Assistance (250+ Hiring Partners)",
  perfectFor: "Students, IT Freshers, Network Admins & Beginners",
  perfectForBg: "bg-amber-50/80 border-amber-200 text-amber-900",

  keyMetrics: [
    { label: "Course Duration", value: "4 Months", subtext: "96+ Live Contact Hours" },
    { label: "Core Modules", value: "4 Monthly Phases", subtext: "Python, Networks, Linux, Pentest" },
    { label: "Tools Stack", value: "25+ Security Tools", subtext: "Kali, Wireshark, Nmap, Burp" },
    { label: "Virtual Labs", value: "4 Hands-on Labs", subtext: "Isolated Targets & Scenarios" },
    { label: "Placement Support", value: "100% Assistance", subtext: "250+ Corporate Recruiting Partners" },
    { label: "Certifications", value: "Dual Credential", subtext: "Dizital Adda & Security+ Ready" },
  ],

  overviewDescription:
    "Start your cybersecurity career at DizitalAdda, South Delhi. This 4-month / 96-hour beginner-friendly Foundation course covers Python for security automation, networking architecture, Linux system hardening, and ethical hacking methodology with hands-on labs on Kali Linux, Metasploit, Nmap, and Wireshark under the guidance of Dr. Gulshan Kumar.",

  highlights: [
    "12 Structured modules across Python automation, Networking, Linux, and Ethical Hacking",
    "Hands-on practice in isolated virtual labs running Kali Linux, vulnerable machines, and network targets",
    "Master essential industry tools: Nmap, Wireshark, Metasploit, Burp Suite, Hydra, and John the Ripper",
    "No prior coding or networking experience required — designed from scratch for absolute beginners",
    "Dedicated career support including resume reviews, mock interviews, and 250+ recruiting corporate tie-ups",
    "Full access to cloud lab environments and session recordings on Dizital Adda LMS within 24 hours",
  ],

  curriculumCategories: [
  {
    "id": "cat-1",
    "categoryTitle": "Month 1: Foundation of Cyber Security & Python Automation",
    "categoryDesc": "Cyber security landscape, threat vectors, attacker mindsets, and Python for security scripting.",
    "modules": [
      {
        "num": 1,
        "title": "Cybersecurity Landscape & Threat Modeling",
        "duration": "1 Week",
        "type": "video",
        "topics": [
          "CIA Triad & Defense-in-Depth",
          "Cyber Kill Chain & MITRE ATT&CK overview",
          "Threat vectors & attack types (Malware, Phishing, Ransomware)",
          "Security governance & ethics"
        ],
        "skills": [
          "CybersecurityBasics",
          "ThreatModeling",
          "SecurityEthics"
        ]
      },
      {
        "num": 2,
        "title": "Python for Security & Automation",
        "duration": "1 Week",
        "type": "video",
        "topics": [
          "Python syntax & data structures for security",
          "Sockets programming & port scanners",
          "Automating reconnaissance with Python scripts",
          "Handling files, logs & regex in security"
        ],
        "skills": [
          "Python",
          "Automation",
          "SocketProgramming"
        ]
      },
      {
        "num": 3,
        "title": "Hands-on Lab: Building a Custom Multi-Threaded Port Scanner",
        "duration": "1 Week",
        "type": "project",
        "topics": [
          "Building TCP/UDP scanner in Python",
          "Threading for performance optimization",
          "Banner grabbing & service identification",
          "Logging results to structured JSON/CSV"
        ],
        "skills": [
          "Python",
          "NetworkScanning",
          "LabProject"
        ]
      }
    ]
  },
  {
    "id": "cat-2",
    "categoryTitle": "Month 2: Enterprise Networking & Packet Analysis",
    "categoryDesc": "Deep dive into TCP/IP, OSI model, IP subnetting, routing, Wireshark, and firewall fundamentals.",
    "modules": [
      {
        "num": 4,
        "title": "OSI 7-Layer & TCP/IP Architecture",
        "duration": "1 Week",
        "type": "video",
        "topics": [
          "Physical to Application layer mechanics",
          "IPv4 vs IPv6 addressing & VLSM subnetting",
          "TCP 3-way handshake & connection teardown",
          "Common protocols & vulnerable ports (21, 22, 23, 25, 80, 443, 445)"
        ],
        "skills": [
          "Networking",
          "TCPIP",
          "Subnetting"
        ]
      },
      {
        "num": 5,
        "title": "Network Packet Sniffing with Wireshark",
        "duration": "1 Week",
        "type": "video",
        "topics": [
          "Wireshark capture filters & display filters",
          "Inspecting cleartext credentials (HTTP, FTP, Telnet)",
          "Analyzing ARP spoofing & DNS poisoning",
          "Detecting malicious packet anomalies"
        ],
        "skills": [
          "Wireshark",
          "PacketAnalysis",
          "TrafficSniffing"
        ]
      },
      {
        "num": 6,
        "title": "Firewalls, IDS/IPS & Network Defense",
        "duration": "1 Week",
        "type": "video",
        "topics": [
          "Stateful vs Stateless firewalls",
          "Intrusion Detection (IDS) vs Prevention (IPS)",
          "Configuring basic pfSense firewall rules",
          "Network segmentation & DMZ fundamentals"
        ],
        "skills": [
          "Firewalls",
          "NetworkDefense",
          "pfSense"
        ]
      }
    ]
  },
  {
    "id": "cat-3",
    "categoryTitle": "Month 3: Linux for Cybersecurity & System Hardening",
    "categoryDesc": "Mastering Kali Linux, Bash scripting, file system permissions, user administration, and security auditing.",
    "modules": [
      {
        "num": 7,
        "title": "Linux Architecture & Essential Commands",
        "duration": "1 Week",
        "type": "video",
        "topics": [
          "Linux file system hierarchy (/etc, /var, /proc, /dev)",
          "User, group & file permission models (chmod, chown, SUID/SGID)",
          "Package management & installing penetration tools",
          "Process management & system logging (/var/log)"
        ],
        "skills": [
          "Linux",
          "KaliLinux",
          "SysAdmin"
        ]
      },
      {
        "num": 8,
        "title": "Bash Scripting for Pentesters",
        "duration": "1 Week",
        "type": "video",
        "topics": [
          "Writing automated Bash tools",
          "Piping, grep, awk & sed for log parsing",
          "Automating reconnaissance & sub-domain enumeration",
          "Crontab scheduling & persistence monitoring"
        ],
        "skills": [
          "Bash",
          "Scripting",
          "Automation"
        ]
      },
      {
        "num": 9,
        "title": "Linux System Hardening & Security Auditing",
        "duration": "1 Week",
        "type": "video",
        "topics": [
          "Securing SSH daemon & key-based authentication",
          "Configuring iptables & UFW host firewalls",
          "Auditing system vulnerabilities with Lynis",
          "Detecting rootkits with rkhunter & chkrootkit"
        ],
        "skills": [
          "Hardening",
          "SecurityAudit",
          "LinuxSecurity"
        ]
      }
    ]
  },
  {
    "id": "cat-4",
    "categoryTitle": "Month 4: Ethical Hacking Fundamentals & Footprinting",
    "categoryDesc": "Penetration testing lifecycle, passive/active reconnaissance, vulnerability mapping, and password attacks.",
    "modules": [
      {
        "num": 10,
        "title": "Reconnaissance & Open-Source Intelligence (OSINT)",
        "duration": "1 Week",
        "type": "video",
        "topics": [
          "Passive reconnaissance with Shodan, Google Dorks & Whois",
          "Subdomain hunting with Sublist3r & Amass",
          "Active scanning & service enumeration with Nmap",
          "Identifying vulnerable web servers & banner headers"
        ],
        "skills": [
          "OSINT",
          "Nmap",
          "Reconnaissance"
        ]
      },
      {
        "num": 11,
        "title": "Vulnerability Scanning & Password Attacks",
        "duration": "1 Week",
        "type": "video",
        "topics": [
          "Vulnerability discovery using Nessus & OWASP ZAP",
          "Password cracking mechanics: Dictionary vs Brute-force",
          "Online brute-forcing with Hydra against SSH & HTTP forms",
          "Offline hash cracking using John the Ripper & Hashcat"
        ],
        "skills": [
          "VulnerabilityScanning",
          "PasswordCracking",
          "Hydra"
        ]
      },
      {
        "num": 12,
        "title": "Foundation Capstone: End-to-End Lab Vulnerability Audit",
        "duration": "1 Week",
        "type": "project",
        "topics": [
          "Scanning isolated virtual network target",
          "Exploiting misconfigured services safely",
          "Documenting vulnerabilities with proof-of-concept (PoC)",
          "Writing executive summary & student assessment"
        ],
        "skills": [
          "PenTesting",
          "ExecutiveReporting",
          "CapstoneProject"
        ]
      }
    ]
  }
],
  liveProjects: [
  {
    "num": 1,
    "title": "Comprehensive Penetration Testing Report",
    "duration": "3-4 Weeks",
    "badge": "VAPT Capstone",
    "description": "Conduct full-scale penetration testing on simulated corporate networks and document findings professionally with vulnerability severity ratings (CVSS) and executive remediation roadmaps.",
    "deliverables": [
      "Network Scope Reconnaissance & Port Enumeration",
      "Vulnerability Scanning with Nessus & OpenVAS",
      "Exploitation Validation with Metasploit & Burp Suite",
      "Executive Summary & Remediation Documentation (CVSS 3.1)"
    ],
    "highlight": "Executed against isolated enterprise network range with vulnerable targets"
  },
  {
    "num": 2,
    "title": "Enterprise Incident Response Framework",
    "duration": "2-3 Weeks",
    "badge": "Blue Team & SIEM",
    "description": "Design and implement incident response procedures for enterprise-level security breaches using Splunk, Wazuh, and MITRE ATT&CK mapping to contain active intrusions.",
    "deliverables": [
      "SIEM Log Source Ingestion & Alert Rule Tuning",
      "MITRE ATT&CK Matrix Threat Actor Mapping",
      "Containment, Eradication & Recovery Playbook",
      "Post-Incident RCA (Root Cause Analysis) Presentation"
    ],
    "highlight": "Live SOC environment simulating active brute-force and ransomware lateral movement"
  },
  {
    "num": 3,
    "title": "Advanced Malware Reverse Engineering",
    "duration": "4-5 Weeks",
    "badge": "Malware Research",
    "description": "Analyze real-world malware samples in isolated sandboxes. Disassemble binaries with IDA Pro and Ghidra, bypass anti-debugging protections, and extract command-and-control (C2) signatures.",
    "deliverables": [
      "Static Disassembly & String Decryption in Ghidra",
      "Dynamic Analysis in x64dbg & Cuckoo Sandbox",
      "YARA Rule Generation for Endpoint Detection",
      "Comprehensive Threat Intelligence Report"
    ],
    "highlight": "Reverse engineer live packed trojan and keylogger binaries safely"
  }
],
  toolClusters: [
  {
    "name": "Penetration Testing & Red Teaming",
    "badge": "Offensive Security",
    "tools": [
      {
        "name": "Kali Linux",
        "desc": "Industry Standard Pentesting & Security OS",
        "accent": "#367bf0"
      },
      {
        "name": "Metasploit Pro",
        "desc": "Exploitation & Payload Generation Framework",
        "accent": "#15418c"
      },
      {
        "name": "Nmap & Zenmap",
        "desc": "Network Mapping, Port Scanning & OS Detection",
        "accent": "#23527c"
      },
      {
        "name": "Burp Suite Pro",
        "desc": "Web Application Proxy, Scanner & Repeater",
        "accent": "#ff6633"
      },
      {
        "name": "Wireshark",
        "desc": "Deep Packet Inspection & Network Traffic Analysis",
        "accent": "#167ac6"
      },
      {
        "name": "OWASP ZAP",
        "desc": "Open Source Web Vulnerability Testing",
        "accent": "#005a9c"
      }
    ]
  },
  {
    "name": "Vulnerability Assessment & Exploitation",
    "badge": "VAPT Suite",
    "tools": [
      {
        "name": "Nessus Professional",
        "desc": "Enterprise Vulnerability Scanning & Auditing",
        "accent": "#00bfa5"
      },
      {
        "name": "OpenVAS",
        "desc": "Comprehensive Vulnerability Management",
        "accent": "#43a047"
      },
      {
        "name": "SQLmap",
        "desc": "Automated SQL Injection & Database Takeover",
        "accent": "#d32f2f"
      },
      {
        "name": "Hydra & John the Ripper",
        "desc": "High-Speed Password Cracking & Brute Force",
        "accent": "#e65100"
      },
      {
        "name": "Nuclei & Shodan",
        "desc": "Fast Template-based Scanning & Internet OSINT",
        "accent": "#7b1fa2"
      },
      {
        "name": "Cobalt Strike",
        "desc": "Adversary Simulation & Red Team Post-Exploitation",
        "accent": "#212121"
      }
    ]
  }
],
  journeySteps: [
  {
    "step": "01",
    "title": "Induction & Virtual Lab Setup",
    "desc": "Receive your dedicated high-performance cloud lab environment pre-loaded with Kali Linux, virtual target networks, and forensic tool suites.",
    "pills": [
      "Lab Credentials",
      "Tool Suite",
      "Mentor Allocation"
    ]
  },
  {
    "step": "02",
    "title": "Offensive & Defensive Live Classes",
    "desc": "Attend live interactive classes led by certified ethical hackers (CEH, OSCP). Learn attacker mindsets, defensive hardening, and packet-level protocols.",
    "pills": [
      "Live Sessions",
      "Real Attack Targets",
      "Hands-on Drills"
    ]
  },
  {
    "step": "03",
    "title": "Real-World Exploitation & DFIR Projects",
    "desc": "Execute full penetration tests, reverse engineer malware, reconstruct forensic crime scenes, and write professional executive reports.",
    "pills": [
      "Real Targets",
      "VAPT Reports",
      "Code Defense"
    ]
  },
  {
    "step": "04",
    "title": "Global Certification Prep & Placement",
    "desc": "Prepare for CEH, CompTIA Security+, and CISSP certifications. Undergo technical mock interviews and connect directly with 250+ hiring partners.",
    "pills": [
      "100% Placement Support",
      "Mock Technical Rounds",
      "Hiring Drives"
    ]
  }
],
  whoShouldJoin: [
  {
    "role": "College Students & IT Freshers",
    "desc": "Break into the high-paying cybersecurity industry (₹5–12 LPA starting) with hands-on lab proof and industry certifications."
  },
  {
    "role": "Network Engineers & System Admins",
    "desc": "Transition from general IT operations into high-growth specialized roles like Penetration Tester, Security Consultant, or SOC Analyst."
  },
  {
    "role": "Aspiring Ethical Hackers & Bug Hunters",
    "desc": "Master professional VAPT methodologies, reverse engineering, web security, and earn bounties on live bug bounty platforms."
  }
],
  certificationsList: [
    { name: "Foundation in Cyber Security & Ethical Hacking", issuer: "Dizital Adda Certified", badge: "Verified" },
    { name: "CompTIA Security+ (SY0-701) Exam Readiness", issuer: "Global Standard Curriculum", badge: "Global" },
    { name: "Virtual Security Lab Completion Credential", issuer: "Dizital Adda Cyber Hub", badge: "Practical" },
  ],
  reviews: [
  {
    "author": "Saloni Bisht",
    "role": "Cybersecurity Analyst @ Google",
    "rating": 5,
    "text": "The hands-on labs and real-world scenarios prepared me perfectly for my role at Google. The instructors are industry experts who genuinely care about our success."
  },
  {
    "author": "Milan Singh",
    "role": "Senior Penetration Tester @ Microsoft",
    "rating": 5,
    "text": "From zero to hero in 6 months! The curriculum is cutting-edge and the practical approach helped me land my dream job at Microsoft. Best investment ever!"
  },
  {
    "author": "Abhishek Shukla",
    "role": "Security Engineer @ Amazon",
    "rating": 5,
    "text": "The malware analysis course opened doors I never knew existed. Now I am protecting millions of users at Amazon. The community support is incredible!"
  },
  {
    "author": "Farhaan Malik",
    "role": "Cloud Security Architect @ IBM",
    "rating": 5,
    "text": "The cloud security course was exactly what I needed to transition into cybersecurity. The practical labs and mentorship made all the difference."
  },
  {
    "author": "Lalit Kumar",
    "role": "SOC Analyst @ CrowdStrike",
    "rating": 5,
    "text": "The incident response training was phenomenal. I went from IT support to a SOC analyst at CrowdStrike. The course content is always up-to-date!"
  },
  {
    "author": "Jiya Mehta",
    "role": "Security Consultant @ Deloitte",
    "rating": 5,
    "text": "The comprehensive curriculum and networking opportunities helped me become a security consultant. The career support team is outstanding!"
  }
],
  faqs: [
    {
    "q": "What prerequisites do I need to start the cybersecurity courses?",
    "a": "Our courses are designed for various skill levels. For beginners, basic computer literacy and familiarity with operating systems is sufficient. For advanced courses, we recommend a basic understanding of networking concepts, familiarity with command line interfaces, and basic programming knowledge (helpful but not required)."
  },
  {
    "q": "How long does it take to complete a cybersecurity course?",
    "a": "Course duration varies depending on the program and your learning pace: Beginner courses take 3-4 Months (6-7 hours/week), Advanced courses take 6-7 Months (6-8 hours/week), and the Complete Master Program takes 12 months (6-8 hours/week) with dedicated live virtual labs and paid internship letter."
  },
  {
    "q": "Do you provide job placement assistance after course completion?",
    "a": "Yes! We provide comprehensive career support including resume and LinkedIn profile optimization, interview preparation and mock technical interviews with senior cybersecurity leads, direct connections with 30+ hiring partners, industry networking events, and lifetime access to our alumni network."
  },
  {
    "q": "What certifications can I earn through your programs?",
    "a": "Our courses prepare you for industry-leading certifications: CompTIA Security+ (Foundation certification), CEH (Certified Ethical Hacker - Penetration testing), CISSP (Advanced security professional), and GCIH/GCFA (Incident response and digital forensics)."
  },
  {
    "q": "Can I take these courses while working full-time?",
    "a": "Yes! We offer flexible learning schedules including evening and weekend batches, 24/7 access to our cloud virtual labs, and high-definition session recordings available on the Dizital Adda LMS within 24 hours."
  },
  {
    "q": "What kind of hands-on experience will I get?",
    "a": "Over 80% of our training is practical hands-on. You will work in isolated virtual labs, executing real-world penetration testing, network sniffing with Wireshark, exploitation with Metasploit, digital forensic investigations with Autopsy, and incident response triage with Splunk SIEM."
  },
  {
    "q": "Do you offer free demo classes?",
    "a": "Yes! We offer free trial sessions so you can experience our interactive teaching methodology, interact directly with Dr. Gulshan Kumar and senior mentors, and tour our virtual cyber lab before enrolling. Call +91-8810606010 to reserve your free demo."
  },

  {
    "q": "What is Ethical Hacking and Cyber Security?",
    "a": "Ethical hacking is the authorised practice of testing computer systems, networks, and applications for security vulnerabilities — using the same tools and techniques as malicious hackers, but with explicit permission and the goal of fixing weaknesses before criminals can exploit them. Cyber security is the broader discipline of protecting digital assets, data, networks, and infrastructure from unauthorised access, attacks, and damage. Ethical hacking is one specialised practice within the much larger field of cyber security, which also includes network defence, security operations (SOC), digital forensics, governance and compliance, and incident response. DizitalAdda Foundation in Cyber Security and Ethical Hacking introduces both the defensive side (networking, Linux hardening, firewalls) and the offensive side (vulnerability scanning, password attacks, reporting) so beginners understand the full picture before specialising further. Call +91-8810606010."
  },
  {
    "q": "What tools will I learn in DizitalAdda foundation cyber security course?",
    "a": "DizitalAdda Foundation in Cyber Security and Ethical Hacking covers hands-on practice with Kali Linux (the standard penetration testing operating system), Burp Suite (web application testing), Nmap (network scanning), Wireshark (packet and traffic analysis), Metasploit (exploitation framework), OWASP ZAP (web vulnerability scanning), Nessus (vulnerability assessment), John the Ripper and Hydra (password cracking and brute-force attacks), SQLmap (SQL injection testing), Shodan (internet-connected device search), Aircrack-ng (wireless security testing), Python (security scripting and automation), and VirtualBox (lab virtualisation). Every tool is practised in a safe, isolated lab environment on realistic attack and defence scenarios. Call +91-8810606010."
  },
  {
    "q": "Do I need prior coding or networking knowledge to join the foundation course?",
    "a": "No. DizitalAdda Foundation in Cyber Security and Ethical Hacking is specifically designed for absolute beginners — basic computer literacy is the only prerequisite. Networking fundamentals (OSI model, IP addressing, subnetting, TCP/IP) and Linux fundamentals (file systems, permissions, Bash scripting) are taught from the ground up in dedicated modules before any ethical hacking content is introduced. Python is also taught from basics, focused specifically on security automation use cases rather than general-purpose programming, so students with zero coding background can follow along comfortably. Call +91-8810606010 for a counselling session."
  },
  {
    "q": "What jobs can I apply for after completing the foundation course?",
    "a": "Graduates of DizitalAdda Foundation in Cyber Security and Ethical Hacking are prepared for entry-level roles including Cybersecurity Analyst, Junior Ethical Hacker, SOC Analyst (Level 1), Network Security Associate, Vulnerability Assessment Trainee, and IT Security Support roles. These positions exist across IT services companies, banks, e-commerce platforms, and managed security service providers (MSSPs) in Delhi-NCR, which is one of India largest cybersecurity hiring hubs. Entry-level cybersecurity analysts in Delhi-NCR typically start at Rs 4–8 LPA, with rapid salary growth as practical penetration testing and forensics skills are added through DizitalAdda Advanced and Expert programmes. Call +91-8810606010."
  },
  {
    "q": "Is placement support included in the foundation cyber security course?",
    "a": "Yes. DizitalAdda provides 100% placement assistance for all Foundation in Cyber Security and Ethical Hacking graduates, including resume building tailored to entry-level security roles, mock technical interviews covering networking, Linux, and basic penetration testing concepts, and direct referrals to security-focused employers across DizitalAdda 250+ hiring partner network. The placement team continues supporting students until they are placed, with no time limit on assistance. Call +91-8810606010."
  },
  {
    "q": "What certifications will I earn from the foundation course?",
    "a": "Students completing DizitalAdda Foundation in Cyber Security and Ethical Hacking receive the DizitalAdda Certification in Cyber Security, Skill India recognition, and structured guidance toward globally recognised certification paths including CEH (Certified Ethical Hacker), CompTIA Security+, and OSCP — covering exam topics, practice questions, and preparation strategy, even though the foundation course itself does not include the paid certification exams. This certification bundle, combined with hands-on lab experience, gives entry-level candidates a credible starting credential for cybersecurity job applications. Call +91-8810606010."
  },
  {
    "q": "Are class recordings available for the foundation course?",
    "a": "Yes. All live sessions in DizitalAdda Foundation in Cyber Security and Ethical Hacking programme are recorded and uploaded to the institute Learning Management System (LMS) within 24 hours. This allows students to revisit complex topics like subnetting, Linux permissions, or Metasploit usage at their own pace, and is especially useful for working professionals and students who occasionally miss a live class due to scheduling conflicts. Call +91-8810606010."
  },
  {
    "q": "Is the foundation course available online, offline, or hybrid?",
    "a": "DizitalAdda Foundation in Cyber Security and Ethical Hacking is offered in Online, Offline (at the Greater Kailash II campus, South Delhi), and Hybrid modes. Students choose the format that fits their schedule and location, with the same curriculum, trainers, and lab access provided across all modes. Live virtual lab access ensures online students get the same hands-on practice as those attending in person. Call +91-8810606010."
  },
  {
    "q": "Is virtual lab access provided in the foundation course?",
    "a": "Yes. Students in DizitalAdda Foundation in Cyber Security and Ethical Hacking get access to virtual lab environments built specifically for safe, legal hands-on practice — including penetration testing exercises, vulnerability scanning labs, and simulated attack-and-defence scenarios using Kali Linux and target virtual machines. This lab access lets beginners practise scanning, exploitation, and reporting techniques without any risk to real systems or networks, which is essential since unauthorised hacking on live systems is illegal in India under the IT Act. Call +91-8810606010."
  },
  {
    "q": "What is the difference between Foundation, Advanced, and Expert cyber security courses at DizitalAdda?",
    "a": "DizitalAdda Foundation in Cyber Security and Ethical Hacking (4 months / 96 hours) covers security fundamentals, networking, Linux, Python basics, and introductory ethical hacking — built for absolute beginners. The Advanced Certification in Cyber Security and Ethical Hacking (6 months / 144 hours) goes deeper into professional Vulnerability Assessment and Penetration Testing (VAPT) and adds Digital Forensics. The Expert Training in Cyber Security and Ethical Hacking (12 months / 288 hours) covers everything in Foundation and Advanced plus Web Application Penetration Testing, Mobile App Penetration Testing, AWS Cloud Security, IoT Security, Malware Analysis, and Endpoint Security — preparing students for senior red-team and specialist roles. Most students start with Foundation and can progress into Advanced or Expert as their career goals develop. Call +91-8810606010."
  },
  {
    "q": "Will I learn web application penetration testing basics in the foundation course?",
    "a": "DizitalAdda Foundation in Cyber Security and Ethical Hacking introduces the fundamentals of web application security as part of the ethical hacking module — including how vulnerability scanning tools like OWASP ZAP and Burp Suite are used to identify common weaknesses in web applications. Full coverage of the OWASP Top 10 (SQL injection, XSS, CSRF, authentication bypass, IDOR) with hands-on exploitation practice is taught in greater depth in DizitalAdda Advanced Certification and Expert Training programmes, which include a dedicated Web Application Penetration Testing module. Call +91-8810606010."
  },
  {
    "q": "Will I learn network penetration testing in the foundation course?",
    "a": "Yes, at an introductory level. The Foundation course covers network scanning and traffic monitoring with Nmap, packet analysis with Wireshark, and firewall and Intrusion Detection System (IDS) basics, alongside core networking concepts like the OSI model, IP addressing, subnetting, and TCP/IP protocols. This builds the networking foundation needed before students move into more advanced exploitation techniques covered in DizitalAdda Advanced Certification programme, which adds Metasploit-based network exploitation and wireless attack techniques. Call +91-8810606010."
  },
  {
    "q": "What is bug bounty hunting and is it covered in the foundation course?",
    "a": "Bug bounty hunting is the practice of finding and responsibly reporting security vulnerabilities in company systems and applications in exchange for monetary rewards, typically through platforms like HackerOne and Bugcrowd. The Foundation in Cyber Security and Ethical Hacking builds the prerequisite skills for bug bounty hunting — vulnerability scanning, basic web application testing, and report writing — though dedicated bug bounty methodology and live program participation strategy is covered in greater depth in DizitalAdda specialised Expert Training in Bug Bounty programme. Call +91-8810606010."
  },
  {
    "q": "Will I learn social engineering in the foundation course?",
    "a": "Social engineering — the practice of manipulating people into revealing confidential information or granting unauthorised access, through techniques like phishing emails, pretexting phone calls, and spear phishing — is introduced as part of the foundation-level ethical hacking module, covering both common attack techniques and basic defence awareness. More advanced social engineering tactics and campaign design are part of DizitalAdda Advanced and Expert level programmes. Call +91-8810606010."
  },
  {
    "q": "Is Python used in cyber security, and how much Python is taught in the foundation course?",
    "a": "Yes, Python is one of the most widely used languages in cyber security — used for automating repetitive security tasks, writing custom scanning and exploitation tools, parsing log files, and building simple security utilities. DizitalAdda Foundation in Cyber Security and Ethical Hacking teaches Python specifically for security use cases: basic scripting, automating simple security checks, and building introductory security tools — rather than general-purpose software development. This security-focused approach to Python is what distinguishes the course from a generic learn Python programme and directly supports the scripting needed in later penetration testing and automation work. Call +91-8810606010."
  },
  {
    "q": "What is the demand for cyber security professionals in India in 2026?",
    "a": "India faces a shortage of over 1.5 million cyber security professionals, and this gap continues to widen as cyber attacks on Indian banks, e-commerce platforms, healthcare systems, and government infrastructure increase year over year. Every major Indian enterprise — from BFSI and IT services to manufacturing and government — is actively expanding its security teams, and Delhi-NCR is among the top three regions in India for cybersecurity hiring. This structural shortage means demand, job security, and salaries for trained cybersecurity professionals are growing faster than in most other technology fields, making it one of the most future-proof career paths a beginner can choose in 2026. Call +91-8810606010."
  },
  {
    "q": "Who should join DizitalAdda foundation cyber security course?",
    "a": "DizitalAdda Foundation in Cyber Security and Ethical Hacking is designed for: students and fresh graduates from any background (engineering, science, commerce, or arts) who want to enter the cybersecurity field with zero prior experience; working IT professionals (system administrators, network engineers, software developers) who want to add security skills and transition into dedicated cybersecurity roles; career switchers from non-technical fields looking for a structured, beginner-friendly entry point; and anyone curious about ethical hacking who wants hands-on, legal lab practice rather than scattered YouTube tutorials. No prior coding or networking experience is required. Call +91-8810606010 for a counselling session."
  },
  {
    "q": "What makes DizitalAdda foundation cyber security course different from other institutes in Delhi?",
    "a": "DizitalAdda Foundation in Cyber Security and Ethical Hacking differs from many online-only and generic IT training providers in three key ways. First, campus-based hands-on labs: students at the Greater Kailash II, South Delhi campus get desk-based access to real lab environments rather than relying solely on personal laptops and self-paced videos. Second, placement depth: DizitalAdda placement team works through 250+ local hiring partners with a verifiable 97% placement rate across 25,000+ students, rather than just providing job portal access. Third, a paid in-house internship for high-performing students, giving real security audit experience before graduation — something most beginner-level cybersecurity courses in Delhi do not offer. Call +91-8810606010."
  },
  {
    "q": "How do I book a free demo class for DizitalAdda foundation cyber security course?",
    "a": "Visit dizitaladda.com/courses/foundation-in-cyber-security-and-ethical-hacking, call +91-8810606010, or WhatsApp the same number. The demo is a 1-hour live session covering cybersecurity fundamentals, a basic Kali Linux and Nmap demonstration, and an overview of the 4-month curriculum — using actual course content — followed by a no-obligation career counselling session comparing the Foundation, Advanced, and Expert programme options based on your background and goals. Attend online from home or in-person at DizitalAdda Greater Kailash II campus, South Delhi. Completely free, with batch seat confirmation within 24 hours."
  },
  {
    "q": "How is the 4-month foundation cyber security course structured and what are the batch timings?",
    "a": "DizitalAdda Foundation in Cyber Security and Ethical Hacking is 4 months / 96 contact hours, structured across four core modules: Module 1 — Foundation of Cyber Security and Python (threats, attack types, Python for automation); Module 2 — Networking (OSI model, IP addressing, subnetting, TCP/IP, firewall and IDS basics); Module 3 — Linux for Cybersecurity (file systems, permissions, Bash scripting, Linux for penetration testing); Module 4 — Ethical Hacking (penetration testing phases, information gathering, vulnerability scanning, password attacks, reporting). Batch options include Weekday Evening (7–9 PM, Monday–Friday) and Weekend (Saturday–Sunday) batches, available fully live online as well. New batches start every 2–3 weeks, and all sessions are recorded to the LMS within 24 hours. Call +91-8810606010 for the next batch date."
  }
],
};

// -------------------------------------------------------------
// 2. ADVANCED CERTIFICATION IN CYBER SECURITY (6 MONTHS)
// -------------------------------------------------------------
export const ADVANCED_CYBER_SECURITY_DETAILS = {
  id: "cs-6m-ceh",
  backendCourseId: "cyber-intermediate",
  courseId: 10,
  title: "Advanced Certification in Cyber Security and Ethical Hacking",
  subtitle: "6 Months Intensive • Professional VAPT, Web App Pentesting & Digital Forensics",
  duration: "6 Months",
  durationId: "6-months",
  level: "ADVANCED LEVEL",
  levelColor: "border-blue-400 text-blue-700 bg-blue-50",
  checkColor: "text-blue-500",
  badge: "Most Popular Security Track",
  isPopular: true,
  rating: 4.9,
  ratingsCount: "1,420+ students (240 reviews)",
  price: 45000,
  originalPrice: 60000,
  onlinePrice: 45000,
  offlinePrice: 60000,
  emi: "₹3,299/mo",
  enrollUrl: "https://dizitaladda.com/courses/advanced-certification-in-cyber-security-and-ethical-hacking",
  whatsappUrl: "https://wa.me/918810606010?text=Hi%2C+I+am+interested+in+the+Advanced+Certification+in+Cyber+Security+and+Ethical+Hacking+Course",
  phone: "+91 88106 06010",
  liveTrainingHours: "144+ Hours Live Lab Training",
  modulesCount: "20",
  modulesType: "VAPT & DFIR Modules",
  aiToolsCount: "45+",
  aiToolsType: "Offensive & Forensics Tools",
  projects: "8 Live Enterprise Pentest Projects",
  mentorship: "Industry Expert Mentorship & 1:1 Code Reviews with Dr. Gulshan Kumar & Senior Red Team Leads",
  certification: "Dizital Adda Advanced Certificate + CEH (Certified Ethical Hacker) Prep",
  placementGuarantee: "100% Placement Support (500+ Hiring Partners)",
  perfectFor: "Security Analysts, System Engineers, Pentesters & IT Switchers",
  perfectForBg: "bg-blue-50/80 border-blue-200 text-blue-900",

  keyMetrics: [
    { label: "Course Duration", value: "6 Months", subtext: "144+ Live Lab Hours" },
    { label: "Core Modules", value: "6 Monthly Stages", subtext: "Python, Networks, VAPT, Forensics" },
    { label: "Tools Stack", value: "45+ Advanced Tools", subtext: "Metasploit, Burp, Nessus, Autopsy" },
    { label: "Live Projects", value: "8 Capstone Pentests", subtext: "Full Infrastructure Targets" },
    { label: "Placement Support", value: "100% Support", subtext: "500+ Corporate Tech Partners" },
    { label: "Certifications", value: "CEH & ISO Verified", subtext: "EC-Council & Dizital Adda" },
  ],

  overviewDescription:
    "Master Vulnerability Assessment & Penetration Testing (VAPT), Web Application Pentesting, and Digital Forensics at DizitalAdda. This 6-month / 144-hour intensive program trains students on Metasploit, Burp Suite Pro, Nessus, OpenVAS, OWASP Top 10, Autopsy, and Volatility with practical simulated cyber exercises preparing graduates for high-demand roles paying ₹8–15 LPA.",

  highlights: [
    "20 Comprehensive modules covering professional VAPT, Web Exploitation, and Digital Forensics",
    "Hands-on execution of full penetration testing lifecycle: Footprinting, Scanning, Exploitation, and Privilege Escalation",
    "Deep dive into OWASP Top 10: SQLi, XSS, CSRF, IDOR, and Burp Suite Pro proxy automation",
    "Digital evidence preservation, volatile RAM analysis with Volatility, and disk forensics with Autopsy",
    "Official CEH (Certified Ethical Hacker v13) and CompTIA Security+ examination preparation",
    "Dedicated placement support connecting graduates with 500+ security firms and multinational corporations",
  ],

  curriculumCategories: [
  {
    "id": "cat-1",
    "categoryTitle": "Month 1: Foundation of Cyber Security & Python Automation",
    "categoryDesc": "Cyber security landscape, threat vectors, attacker mindsets, and Python for security scripting.",
    "modules": [
      {
        "num": 1,
        "title": "Cybersecurity Landscape & Threat Modeling",
        "duration": "1 Week",
        "type": "video",
        "topics": [
          "CIA Triad & Defense-in-Depth",
          "Cyber Kill Chain & MITRE ATT&CK overview",
          "Threat vectors & attack types (Malware, Phishing, Ransomware)",
          "Security governance & ethics"
        ],
        "skills": [
          "CybersecurityBasics",
          "ThreatModeling",
          "SecurityEthics"
        ]
      },
      {
        "num": 2,
        "title": "Python for Security & Automation",
        "duration": "1 Week",
        "type": "video",
        "topics": [
          "Python syntax & data structures for security",
          "Sockets programming & port scanners",
          "Automating reconnaissance with Python scripts",
          "Handling files, logs & regex in security"
        ],
        "skills": [
          "Python",
          "Automation",
          "SocketProgramming"
        ]
      },
      {
        "num": 3,
        "title": "Hands-on Lab: Building a Custom Multi-Threaded Port Scanner",
        "duration": "1 Week",
        "type": "project",
        "topics": [
          "Building TCP/UDP scanner in Python",
          "Threading for performance optimization",
          "Banner grabbing & service identification",
          "Logging results to structured JSON/CSV"
        ],
        "skills": [
          "Python",
          "NetworkScanning",
          "LabProject"
        ]
      }
    ]
  },
  {
    "id": "cat-2",
    "categoryTitle": "Month 2: Enterprise Networking & Packet Analysis",
    "categoryDesc": "Deep dive into TCP/IP, OSI model, IP subnetting, routing, Wireshark, and firewall fundamentals.",
    "modules": [
      {
        "num": 4,
        "title": "OSI 7-Layer & TCP/IP Architecture",
        "duration": "1 Week",
        "type": "video",
        "topics": [
          "Physical to Application layer mechanics",
          "IPv4 vs IPv6 addressing & VLSM subnetting",
          "TCP 3-way handshake & connection teardown",
          "Common protocols & vulnerable ports (21, 22, 23, 25, 80, 443, 445)"
        ],
        "skills": [
          "Networking",
          "TCPIP",
          "Subnetting"
        ]
      },
      {
        "num": 5,
        "title": "Network Packet Sniffing with Wireshark",
        "duration": "1 Week",
        "type": "video",
        "topics": [
          "Wireshark capture filters & display filters",
          "Inspecting cleartext credentials (HTTP, FTP, Telnet)",
          "Analyzing ARP spoofing & DNS poisoning",
          "Detecting malicious packet anomalies"
        ],
        "skills": [
          "Wireshark",
          "PacketAnalysis",
          "TrafficSniffing"
        ]
      },
      {
        "num": 6,
        "title": "Firewalls, IDS/IPS & Network Defense",
        "duration": "1 Week",
        "type": "video",
        "topics": [
          "Stateful vs Stateless firewalls",
          "Intrusion Detection (IDS) vs Prevention (IPS)",
          "Configuring basic pfSense firewall rules",
          "Network segmentation & DMZ fundamentals"
        ],
        "skills": [
          "Firewalls",
          "NetworkDefense",
          "pfSense"
        ]
      }
    ]
  },
  {
    "id": "cat-3",
    "categoryTitle": "Month 3: Linux for Cybersecurity & System Hardening",
    "categoryDesc": "Mastering Kali Linux, Bash scripting, file system permissions, user administration, and security auditing.",
    "modules": [
      {
        "num": 7,
        "title": "Linux Architecture & Essential Commands",
        "duration": "1 Week",
        "type": "video",
        "topics": [
          "Linux file system hierarchy (/etc, /var, /proc, /dev)",
          "User, group & file permission models (chmod, chown, SUID/SGID)",
          "Package management & installing penetration tools",
          "Process management & system logging (/var/log)"
        ],
        "skills": [
          "Linux",
          "KaliLinux",
          "SysAdmin"
        ]
      },
      {
        "num": 8,
        "title": "Bash Scripting for Pentesters",
        "duration": "1 Week",
        "type": "video",
        "topics": [
          "Writing automated Bash tools",
          "Piping, grep, awk & sed for log parsing",
          "Automating reconnaissance & sub-domain enumeration",
          "Crontab scheduling & persistence monitoring"
        ],
        "skills": [
          "Bash",
          "Scripting",
          "Automation"
        ]
      },
      {
        "num": 9,
        "title": "Linux System Hardening & Security Auditing",
        "duration": "1 Week",
        "type": "video",
        "topics": [
          "Securing SSH daemon & key-based authentication",
          "Configuring iptables & UFW host firewalls",
          "Auditing system vulnerabilities with Lynis",
          "Detecting rootkits with rkhunter & chkrootkit"
        ],
        "skills": [
          "Hardening",
          "SecurityAudit",
          "LinuxSecurity"
        ]
      }
    ]
  },
  {
    "id": "cat-4",
    "categoryTitle": "Month 4: Ethical Hacking Fundamentals & Footprinting",
    "categoryDesc": "Penetration testing lifecycle, passive/active reconnaissance, vulnerability mapping, and password attacks.",
    "modules": [
      {
        "num": 10,
        "title": "Reconnaissance & Open-Source Intelligence (OSINT)",
        "duration": "1 Week",
        "type": "video",
        "topics": [
          "Passive reconnaissance with Shodan, Google Dorks & Whois",
          "Subdomain hunting with Sublist3r & Amass",
          "Active scanning & service enumeration with Nmap",
          "Identifying vulnerable web servers & banner headers"
        ],
        "skills": [
          "OSINT",
          "Nmap",
          "Reconnaissance"
        ]
      },
      {
        "num": 11,
        "title": "Vulnerability Scanning & Password Attacks",
        "duration": "1 Week",
        "type": "video",
        "topics": [
          "Vulnerability discovery using Nessus & OWASP ZAP",
          "Password cracking mechanics: Dictionary vs Brute-force",
          "Online brute-forcing with Hydra against SSH & HTTP forms",
          "Offline hash cracking using John the Ripper & Hashcat"
        ],
        "skills": [
          "VulnerabilityScanning",
          "PasswordCracking",
          "Hydra"
        ]
      },
      {
        "num": 12,
        "title": "Foundation Capstone: End-to-End Lab Vulnerability Audit",
        "duration": "1 Week",
        "type": "project",
        "topics": [
          "Scanning isolated virtual network target",
          "Exploiting misconfigured services safely",
          "Documenting vulnerabilities with proof-of-concept (PoC)",
          "Writing executive summary & student assessment"
        ],
        "skills": [
          "PenTesting",
          "ExecutiveReporting",
          "CapstoneProject"
        ]
      }
    ]
  },
  {
    "id": "cat-5",
    "categoryTitle": "Month 5: Professional VAPT & Exploitation Frameworks",
    "categoryDesc": "Mastering Metasploit, web application penetration testing (OWASP Top 10), and exploitation workflows.",
    "modules": [
      {
        "num": 13,
        "title": "Metasploit Framework Deep Dive",
        "duration": "1 Week",
        "type": "video",
        "topics": [
          "Architecture: MSFconsole, payloads, exploits, encoders & nops",
          "Staged vs Non-staged payloads (Meterpreter mechanics)",
          "Post-exploitation: privilege escalation, dumping hashes, pivoting",
          "Bypassing basic antivirus with custom encoders"
        ],
        "skills": [
          "Metasploit",
          "Exploitation",
          "PostExploitation"
        ]
      },
      {
        "num": 14,
        "title": "Web Application Penetration Testing (OWASP Top 10)",
        "duration": "1 Week",
        "type": "video",
        "topics": [
          "SQL Injection (SQLi) & automated exploitation with SQLmap",
          "Cross-Site Scripting (Stored, Reflected & DOM XSS)",
          "Cross-Site Request Forgery (CSRF) & Broken Access Control (IDOR)",
          "Security misconfigurations & sensitive data exposure"
        ],
        "skills": [
          "OWASP",
          "BurpSuite",
          "SQLInjection",
          "XSS"
        ]
      },
      {
        "num": 15,
        "title": "Burp Suite Pro Advanced Techniques",
        "duration": "1 Week",
        "type": "video",
        "topics": [
          "Intercepting & modifying HTTP/HTTPS requests",
          "Automated fuzzing with Burp Intruder & custom payloads",
          "Vulnerability scanning with Burp Scanner",
          "Session token manipulation & cookie tampering"
        ],
        "skills": [
          "BurpSuite",
          "WebPT",
          "Fuzzing"
        ]
      },
      {
        "num": 16,
        "title": "Professional VAPT Reporting & Client Communication",
        "duration": "1 Week",
        "type": "project",
        "topics": [
          "Vulnerability risk scoring with CVSS 3.1",
          "Writing executive summaries for C-suite leaders",
          "Detailed technical remediation guidance for developers",
          "Proof-of-Concept (PoC) presentation standards"
        ],
        "skills": [
          "VAPT",
          "CVSS",
          "TechnicalReporting"
        ]
      }
    ]
  },
  {
    "id": "cat-6",
    "categoryTitle": "Month 6: Digital Forensics & Cyber Investigation (DFIR)",
    "categoryDesc": "Evidence preservation, volatile memory forensics, disk analysis, and incident response procedures.",
    "modules": [
      {
        "num": 17,
        "title": "Digital Evidence Handling & Chain of Custody",
        "duration": "1 Week",
        "type": "video",
        "topics": [
          "Legal admissibility & ISO 27037 digital evidence standards",
          "First responder protocols: volatile vs non-volatile order of volatility",
          "Bit-stream image creation with FTK Imager & dd",
          "Cryptographic hashing (MD5/SHA256) for evidence integrity"
        ],
        "skills": [
          "DigitalForensics",
          "ChainOfCustody",
          "FTKImager"
        ]
      },
      {
        "num": 18,
        "title": "Memory Forensics with Volatility Framework",
        "duration": "1 Week",
        "type": "video",
        "topics": [
          "Acquiring RAM images from Windows and Linux machines",
          "Identifying malicious injected processes (pslist, malfind)",
          "Extracting network connections & listening sockets from memory",
          "Dumping injected DLLs & password hashes from memory dump"
        ],
        "skills": [
          "Volatility",
          "MemoryForensics",
          "RAMAnalysis"
        ]
      },
      {
        "num": 19,
        "title": "Disk, File System & Log Forensics with Autopsy",
        "duration": "1 Week",
        "type": "video",
        "topics": [
          "File system analysis (NTFS MFT, FAT, EXT4 inode structures)",
          "Carving deleted files & recovering unallocated space",
          "Registry forensics: user activity, recent docs, mounted USB devices",
          "Web browser history & email artifact reconstruction"
        ],
        "skills": [
          "Autopsy",
          "FileCarving",
          "RegistryForensics"
        ]
      },
      {
        "num": 20,
        "title": "Advanced Capstone: End-to-End Enterprise VAPT & Forensic Defense",
        "duration": "1 Week",
        "type": "project",
        "topics": [
          "Simulated enterprise compromise & breach investigation",
          "Drafting comprehensive penetration test report",
          "Reconstructing the attacker timeline from disk & memory evidence",
          "Final viva & placement interview drill with senior mentors"
        ],
        "skills": [
          "VAPT",
          "DFIR",
          "CapstoneDefense"
        ]
      }
    ]
  }
],
  liveProjects: [
  {
    "num": 1,
    "title": "Comprehensive Penetration Testing Report",
    "duration": "3-4 Weeks",
    "badge": "VAPT Capstone",
    "description": "Conduct full-scale penetration testing on simulated corporate networks and document findings professionally with vulnerability severity ratings (CVSS) and executive remediation roadmaps.",
    "deliverables": [
      "Network Scope Reconnaissance & Port Enumeration",
      "Vulnerability Scanning with Nessus & OpenVAS",
      "Exploitation Validation with Metasploit & Burp Suite",
      "Executive Summary & Remediation Documentation (CVSS 3.1)"
    ],
    "highlight": "Executed against isolated enterprise network range with vulnerable targets"
  },
  {
    "num": 2,
    "title": "Enterprise Incident Response Framework",
    "duration": "2-3 Weeks",
    "badge": "Blue Team & SIEM",
    "description": "Design and implement incident response procedures for enterprise-level security breaches using Splunk, Wazuh, and MITRE ATT&CK mapping to contain active intrusions.",
    "deliverables": [
      "SIEM Log Source Ingestion & Alert Rule Tuning",
      "MITRE ATT&CK Matrix Threat Actor Mapping",
      "Containment, Eradication & Recovery Playbook",
      "Post-Incident RCA (Root Cause Analysis) Presentation"
    ],
    "highlight": "Live SOC environment simulating active brute-force and ransomware lateral movement"
  },
  {
    "num": 3,
    "title": "Advanced Malware Reverse Engineering",
    "duration": "4-5 Weeks",
    "badge": "Malware Research",
    "description": "Analyze real-world malware samples in isolated sandboxes. Disassemble binaries with IDA Pro and Ghidra, bypass anti-debugging protections, and extract command-and-control (C2) signatures.",
    "deliverables": [
      "Static Disassembly & String Decryption in Ghidra",
      "Dynamic Analysis in x64dbg & Cuckoo Sandbox",
      "YARA Rule Generation for Endpoint Detection",
      "Comprehensive Threat Intelligence Report"
    ],
    "highlight": "Reverse engineer live packed trojan and keylogger binaries safely"
  },
  {
    "num": 4,
    "title": "Network Security Architecture Design & Hardening",
    "duration": "3 Weeks",
    "badge": "Perimeter Defense",
    "description": "Design secure network architectures and implement defense-in-depth security controls for enterprise environments including DMZ, VLAN isolation, and pfSense firewall rules.",
    "deliverables": [
      "Zero-Trust Network Segmentation Architecture",
      "pfSense Firewall Rule Setup & NAT Policies",
      "Snort IDS/IPS Detection Signature Configuration",
      "Wireshark Traffic Audit & Packet Verification"
    ],
    "highlight": "Complete multi-tier enterprise network blueprint with hardware firewalls"
  },
  {
    "num": 5,
    "title": "Cyber Crime Investigation & Forensic Case Study",
    "duration": "3-4 Weeks",
    "badge": "Digital Forensics (DFIR)",
    "description": "Conduct forensic analysis on compromised Windows and Linux systems. Preserve chain of custody, image drives with FTK Imager, extract volatile memory with Volatility, and prepare court-admissible evidence.",
    "deliverables": [
      "Forensic Bit-Stream Image Acquisition & Hashing (MD5/SHA256)",
      "Volatile Memory (RAM) Analysis with Volatility",
      "Browser History, Registry & Event Log Reconstruction in Autopsy",
      "Forensic Expert Witness Report with Chain of Custody"
    ],
    "highlight": "Real-world data exfiltration crime investigation scenario"
  }
],
  toolClusters: [
  {
    "name": "Penetration Testing & Red Teaming",
    "badge": "Offensive Security",
    "tools": [
      {
        "name": "Kali Linux",
        "desc": "Industry Standard Pentesting & Security OS",
        "accent": "#367bf0"
      },
      {
        "name": "Metasploit Pro",
        "desc": "Exploitation & Payload Generation Framework",
        "accent": "#15418c"
      },
      {
        "name": "Nmap & Zenmap",
        "desc": "Network Mapping, Port Scanning & OS Detection",
        "accent": "#23527c"
      },
      {
        "name": "Burp Suite Pro",
        "desc": "Web Application Proxy, Scanner & Repeater",
        "accent": "#ff6633"
      },
      {
        "name": "Wireshark",
        "desc": "Deep Packet Inspection & Network Traffic Analysis",
        "accent": "#167ac6"
      },
      {
        "name": "OWASP ZAP",
        "desc": "Open Source Web Vulnerability Testing",
        "accent": "#005a9c"
      }
    ]
  },
  {
    "name": "Vulnerability Assessment & Exploitation",
    "badge": "VAPT Suite",
    "tools": [
      {
        "name": "Nessus Professional",
        "desc": "Enterprise Vulnerability Scanning & Auditing",
        "accent": "#00bfa5"
      },
      {
        "name": "OpenVAS",
        "desc": "Comprehensive Vulnerability Management",
        "accent": "#43a047"
      },
      {
        "name": "SQLmap",
        "desc": "Automated SQL Injection & Database Takeover",
        "accent": "#d32f2f"
      },
      {
        "name": "Hydra & John the Ripper",
        "desc": "High-Speed Password Cracking & Brute Force",
        "accent": "#e65100"
      },
      {
        "name": "Nuclei & Shodan",
        "desc": "Fast Template-based Scanning & Internet OSINT",
        "accent": "#7b1fa2"
      },
      {
        "name": "Cobalt Strike",
        "desc": "Adversary Simulation & Red Team Post-Exploitation",
        "accent": "#212121"
      }
    ]
  },
  {
    "name": "Digital Forensics & Incident Response",
    "badge": "DFIR Stack",
    "tools": [
      {
        "name": "Autopsy & Sleuth Kit",
        "desc": "Digital Forensics & Disk Image Investigation",
        "accent": "#f57c00"
      },
      {
        "name": "Volatility Framework",
        "desc": "Advanced Volatile Memory & RAM Forensics",
        "accent": "#303f9f"
      },
      {
        "name": "FTK Imager",
        "desc": "Bit-Stream Forensic Imaging & Data Preservation",
        "accent": "#c2185b"
      },
      {
        "name": "EnCase & Rekall",
        "desc": "Forensic Evidence Extraction & Timeline Analysis",
        "accent": "#00796b"
      }
    ]
  }
],
  journeySteps: [
  {
    "step": "01",
    "title": "Induction & Virtual Lab Setup",
    "desc": "Receive your dedicated high-performance cloud lab environment pre-loaded with Kali Linux, virtual target networks, and forensic tool suites.",
    "pills": [
      "Lab Credentials",
      "Tool Suite",
      "Mentor Allocation"
    ]
  },
  {
    "step": "02",
    "title": "Offensive & Defensive Live Classes",
    "desc": "Attend live interactive classes led by certified ethical hackers (CEH, OSCP). Learn attacker mindsets, defensive hardening, and packet-level protocols.",
    "pills": [
      "Live Sessions",
      "Real Attack Targets",
      "Hands-on Drills"
    ]
  },
  {
    "step": "03",
    "title": "Real-World Exploitation & DFIR Projects",
    "desc": "Execute full penetration tests, reverse engineer malware, reconstruct forensic crime scenes, and write professional executive reports.",
    "pills": [
      "Real Targets",
      "VAPT Reports",
      "Code Defense"
    ]
  },
  {
    "step": "04",
    "title": "Global Certification Prep & Placement",
    "desc": "Prepare for CEH, CompTIA Security+, and CISSP certifications. Undergo technical mock interviews and connect directly with 250+ hiring partners.",
    "pills": [
      "100% Placement Support",
      "Mock Technical Rounds",
      "Hiring Drives"
    ]
  }
],
  whoShouldJoin: [
  {
    "role": "College Students & IT Freshers",
    "desc": "Break into the high-paying cybersecurity industry (₹5–12 LPA starting) with hands-on lab proof and industry certifications."
  },
  {
    "role": "Network Engineers & System Admins",
    "desc": "Transition from general IT operations into high-growth specialized roles like Penetration Tester, Security Consultant, or SOC Analyst."
  },
  {
    "role": "Aspiring Ethical Hackers & Bug Hunters",
    "desc": "Master professional VAPT methodologies, reverse engineering, web security, and earn bounties on live bug bounty platforms."
  }
],
  certificationsList: [
    { name: "Advanced Certification in Cyber Security & Ethical Hacking", issuer: "Dizital Adda Verified", badge: "Advanced" },
    { name: "Certified Ethical Hacker (CEH v13) Examination Readiness", issuer: "EC-Council Aligned", badge: "Global" },
    { name: "VAPT & Digital Forensics Lab Credential", issuer: "Dizital Adda Cyber Hub", badge: "Practical" },
  ],
  reviews: [
  {
    "author": "Saloni Bisht",
    "role": "Cybersecurity Analyst @ Google",
    "rating": 5,
    "text": "The hands-on labs and real-world scenarios prepared me perfectly for my role at Google. The instructors are industry experts who genuinely care about our success."
  },
  {
    "author": "Milan Singh",
    "role": "Senior Penetration Tester @ Microsoft",
    "rating": 5,
    "text": "From zero to hero in 6 months! The curriculum is cutting-edge and the practical approach helped me land my dream job at Microsoft. Best investment ever!"
  },
  {
    "author": "Abhishek Shukla",
    "role": "Security Engineer @ Amazon",
    "rating": 5,
    "text": "The malware analysis course opened doors I never knew existed. Now I am protecting millions of users at Amazon. The community support is incredible!"
  },
  {
    "author": "Farhaan Malik",
    "role": "Cloud Security Architect @ IBM",
    "rating": 5,
    "text": "The cloud security course was exactly what I needed to transition into cybersecurity. The practical labs and mentorship made all the difference."
  },
  {
    "author": "Lalit Kumar",
    "role": "SOC Analyst @ CrowdStrike",
    "rating": 5,
    "text": "The incident response training was phenomenal. I went from IT support to a SOC analyst at CrowdStrike. The course content is always up-to-date!"
  },
  {
    "author": "Jiya Mehta",
    "role": "Security Consultant @ Deloitte",
    "rating": 5,
    "text": "The comprehensive curriculum and networking opportunities helped me become a security consultant. The career support team is outstanding!"
  }
],
  faqs: [
    {
    "q": "What prerequisites do I need to start the cybersecurity courses?",
    "a": "Our courses are designed for various skill levels. For beginners, basic computer literacy and familiarity with operating systems is sufficient. For advanced courses, we recommend a basic understanding of networking concepts, familiarity with command line interfaces, and basic programming knowledge (helpful but not required)."
  },
  {
    "q": "How long does it take to complete a cybersecurity course?",
    "a": "Course duration varies depending on the program and your learning pace: Beginner courses take 3-4 Months (6-7 hours/week), Advanced courses take 6-7 Months (6-8 hours/week), and the Complete Master Program takes 12 months (6-8 hours/week) with dedicated live virtual labs and paid internship letter."
  },
  {
    "q": "Do you provide job placement assistance after course completion?",
    "a": "Yes! We provide comprehensive career support including resume and LinkedIn profile optimization, interview preparation and mock technical interviews with senior cybersecurity leads, direct connections with 30+ hiring partners, industry networking events, and lifetime access to our alumni network."
  },
  {
    "q": "What certifications can I earn through your programs?",
    "a": "Our courses prepare you for industry-leading certifications: CompTIA Security+ (Foundation certification), CEH (Certified Ethical Hacker - Penetration testing), CISSP (Advanced security professional), and GCIH/GCFA (Incident response and digital forensics)."
  },
  {
    "q": "Can I take these courses while working full-time?",
    "a": "Yes! We offer flexible learning schedules including evening and weekend batches, 24/7 access to our cloud virtual labs, and high-definition session recordings available on the Dizital Adda LMS within 24 hours."
  },
  {
    "q": "What kind of hands-on experience will I get?",
    "a": "Over 80% of our training is practical hands-on. You will work in isolated virtual labs, executing real-world penetration testing, network sniffing with Wireshark, exploitation with Metasploit, digital forensic investigations with Autopsy, and incident response triage with Splunk SIEM."
  },
  {
    "q": "Do you offer free demo classes?",
    "a": "Yes! We offer free trial sessions so you can experience our interactive teaching methodology, interact directly with Dr. Gulshan Kumar and senior mentors, and tour our virtual cyber lab before enrolling. Call +91-8810606010 to reserve your free demo."
  },

  {
    "q": "What is VAPT (Vulnerability Assessment and Penetration Testing)?",
    "a": "VAPT is a combined security testing process: Vulnerability Assessment identifies and catalogues known weaknesses in systems, networks, and applications using automated scanning tools, while Penetration Testing goes a step further by actively attempting to exploit those weaknesses to determine real-world impact and confirm whether they are genuinely exploitable. Together, VAPT gives organisations both a comprehensive list of vulnerabilities and a realistic assessment of which ones pose actual risk. DizitalAdda Advanced Certification dedicates a full module to VAPT, teaching vulnerability scanning with Nessus and OpenVAS, manual and automated penetration testing methodology, exploitation using Metasploit, web application testing against the OWASP Top 10, and professional report writing and remediation recommendations — the exact workflow used by VAPT consultants in industry. Call +91-8810606010."
  },
  {
    "q": "What tools will I learn in DizitalAdda advanced cyber security certification?",
    "a": "DizitalAdda Advanced Certification in Cyber Security and Ethical Hacking covers Kali Linux, Burp Suite, Metasploit, Nmap, Nuclei, Cobalt Strike, Shodan, OWASP ZAP, Python, Nessus, SQLmap, Hydra, Wireshark, and TheHarvester. These map directly to the VAPT and Digital Forensics workflow: Nessus and OpenVAS for vulnerability scanning, Metasploit and Cobalt Strike for exploitation and post-exploitation, Wireshark for forensic packet and traffic analysis, and TheHarvester and Shodan for open-source intelligence (OSINT) gathering during the reconnaissance phase. Call +91-8810606010."
  },
  {
    "q": "What is digital forensics and why is it included in this advanced course?",
    "a": "Digital forensics is the practice of identifying, preserving, collecting, and analysing digital evidence from computers, mobile devices, and networks in a legally defensible way — typically following a security incident, data breach, or cybercrime. It is included in DizitalAdda Advanced Certification because organisations increasingly need professionals who can investigate after an attack, not just prevent one. The Digital and Cyber Forensic Investigation module covers evidence collection and chain of custody, disk and memory analysis, email and log forensics, and reporting and presenting evidence — skills directly applicable to SOC analyst, incident response, and forensic investigator roles. Call +91-8810606010."
  },
  {
    "q": "What jobs can I apply for after the advanced cyber security certification?",
    "a": "Graduates of DizitalAdda Advanced Certification in Cyber Security and Ethical Hacking are prepared for roles including Penetration Tester, VAPT Analyst, SOC Analyst (Level 2), Digital Forensics Investigator, Security Consultant, and Network Security Engineer. These mid-level roles typically pay Rs 8–15 LPA in Delhi-NCR, a meaningful step up from entry-level Foundation-course roles, reflecting the added value of hands-on VAPT methodology and forensic investigation skills that employers actively screen for in technical interviews."
  },
  {
    "q": "Does DizitalAdda provide placement assistance after the advanced certification?",
    "a": "Yes. DizitalAdda provides 100% placement assistance for all Advanced Certification in Cyber Security and Ethical Hacking graduates, including resume optimisation for VAPT and forensics-focused roles, mock technical interviews covering live exploitation scenarios and forensic case studies, direct referrals through DizitalAdda 250+ hiring partner network, and ongoing placement team support with no time limit until placed. DizitalAdda maintains a 97% placement rate across 25,000+ students trained since 2009. Call +91-8810606010."
  },
  {
    "q": "Will I learn network penetration testing in the advanced certification?",
    "a": "Yes, in depth. The Advanced Certification covers TCP/IP, OSI model and protocols, subnetting, routing, NAT and DNS, packet analysis with Wireshark, port scanning and traffic sniffing, and network security controls in the dedicated Networking module — followed by full exploitation practice using Metasploit and Nmap in the VAPT module. This combination of networking theory and hands-on exploitation is what distinguishes the advanced programme from the foundation-level introduction to networking concepts. Call +91-8810606010."
  },
  {
    "q": "Will I learn web application penetration testing in the advanced certification?",
    "a": "Yes. The VAPT module includes dedicated web application testing against the OWASP Top 10 — covering SQL injection, cross-site scripting (XSS), authentication bypass, and other common web vulnerabilities — practised hands-on using Burp Suite and SQLmap on realistic lab applications. This builds directly on the ethical hacking fundamentals covered earlier in the programme, applying them specifically to modern web application architectures that most Indian companies rely on for customer-facing systems. Call +91-8810606010."
  },
  {
    "q": "What certifications will I earn from the advanced cyber security certification?",
    "a": "Students completing DizitalAdda Advanced Certification in Cyber Security and Ethical Hacking receive the DizitalAdda Advanced Certification in Cyber Security and Ethical Hacking, Skill India recognition, and structured exam preparation guidance for CEH (Certified Ethical Hacker), CompTIA Security+, and OSCP (Offensive Security Certified Professional) — the certifications most frequently requested in mid-level VAPT and penetration testing job listings in India. Combined with a portfolio of VAPT reports and forensic case studies, this certification bundle gives mid-level candidates a strong, verifiable hiring credential. Call +91-8810606010."
  },
  {
    "q": "What is the difference between Foundation, Advanced, and Expert cyber security courses at DizitalAdda?",
    "a": "DizitalAdda Foundation in Cyber Security and Ethical Hacking (4 months / 96 hours) covers security fundamentals and basic ethical hacking for absolute beginners. The Advanced Certification (6 months / 144 hours) builds on that with professional Vulnerability Assessment and Penetration Testing (VAPT) and Digital and Cyber Forensic Investigation — designed for students with some prior exposure or working professionals seeking career advancement. The Expert Training (12 months / 288 hours) covers everything in Foundation and Advanced plus Web Application Penetration Testing, Mobile App Penetration Testing, AWS Cloud Security, IoT Security, Malware Analysis, and Endpoint Security for senior, specialist-level roles. Call +91-8810606010."
  },
  {
    "q": "Is lab access provided in the advanced cyber security certification?",
    "a": "Yes. Students get access to virtual lab environments throughout the Advanced Certification for hands-on VAPT practice — including vulnerability scanning with Nessus and OpenVAS, exploitation with Metasploit, and web application testing labs — as well as forensic investigation labs for practising disk imaging, memory analysis, and log forensics on simulated incident scenarios in a safe, legal environment. Call +91-8810606010."
  },
  {
    "q": "Is Python used in cyber security, and how is it applied in the advanced certification?",
    "a": "Yes. In DizitalAdda Advanced Certification, Python is taught as a security automation and scripting tool — used to build basic security tools, automate repetitive VAPT tasks like scanning and reporting, and parse forensic log files for incident investigation. This applied, security-specific approach to Python is more advanced than the foundation-level introduction, focusing on real automation use cases that VAPT analysts and forensic investigators use in day-to-day work. Call +91-8810606010."
  },
  {
    "q": "What is the demand for VAPT and digital forensics professionals in India?",
    "a": "India growing digital economy, combined with mandatory cybersecurity compliance requirements (RBI guidelines for banks, SEBI for financial institutions, CERT-In reporting requirements) has significantly increased demand for VAPT analysts and digital forensics investigators. With India facing a shortage of over 1.5 million cybersecurity professionals overall, candidates with hands-on VAPT and forensics skills — rather than just theoretical security knowledge — are particularly sought after by IT services companies, banks, and managed security service providers in Delhi-NCR, commanding salaries at the higher end of the cybersecurity pay scale. Call +91-8810606010."
  },
  {
    "q": "Will I learn about Metasploit and exploitation frameworks in this course?",
    "a": "Yes. Metasploit, the industry-standard exploitation framework, is covered extensively in the VAPT module — including using pre-built exploit modules against known vulnerabilities, payload generation, and post-exploitation techniques. Cobalt Strike, an advanced red-team and adversary simulation tool, is also introduced as part of the broader tools curriculum, giving students exposure to both open-source and commercial-grade exploitation tooling used in professional penetration testing engagements. Call +91-8810606010."
  },
  {
    "q": "Will I learn evidence handling and chain of custody for forensic investigations?",
    "a": "Yes. The Digital and Cyber Forensic Investigation module specifically covers evidence collection procedures and chain of custody documentation — the legal requirement to maintain an unbroken, documented record of who handled digital evidence and when, which is essential for evidence to be admissible if a case proceeds to legal action. Students practise this alongside disk and memory analysis and learn how findings are formally reported and presented as evidence. Call +91-8810606010."
  },
  {
    "q": "Who should join DizitalAdda advanced cyber security certification?",
    "a": "DizitalAdda Advanced Certification in Cyber Security and Ethical Hacking is designed for: students who have completed a foundation-level security course (at DizitalAdda or elsewhere) and want to build professional VAPT and forensics skills; IT professionals (network administrators, system engineers, software developers) transitioning into dedicated cybersecurity roles; working cybersecurity analysts seeking promotion into penetration testing or forensic investigator positions; and college students or graduates targeting mid-level cybersecurity roles directly out of college. Some prior exposure to networking or basic IT concepts is helpful but not strictly required, as the course also includes a Foundation-level review module. Call +91-8810606010 for a counselling session."
  },
  {
    "q": "What makes DizitalAdda advanced cyber security certification different from other institutes?",
    "a": "DizitalAdda Advanced Certification differs from many Delhi-NCR competitors in three ways. First, it combines VAPT and Digital Forensics in a single 6-month programme — most competing institutes teach these as separate, additional-cost courses. Second, campus-based labs at the Greater Kailash II, South Delhi location give students hands-on access to real lab environments, not just recorded video content. Third, DizitalAdda placement team works through 250+ verified local hiring partners with a documented 97% placement rate across 25,000+ students, plus a paid in-house internship for high performers — giving graduates real VAPT and forensic investigation experience before they even start job hunting. Call +91-8810606010."
  },
  {
    "q": "How do I book a free demo class for the advanced cyber security certification?",
    "a": "Visit dizitaladda.com/courses/advanced-certification-in-cyber-security-and-ethical-hacking, call +91-8810606010, or WhatsApp the same number. The demo is a 1-hour live session covering a basic VAPT demonstration using Nessus or Metasploit, an overview of the digital forensics module, and a walkthrough of the full 6-month curriculum — using actual course content — followed by a no-obligation career counselling session comparing the Foundation, Advanced, and Expert programme options. Attend online from home or in-person at DizitalAdda Greater Kailash II campus, South Delhi. Completely free, with batch seat confirmation within 24 hours."
  },
  {
    "q": "How is the 6-month advanced cyber security certification structured and what are the batch timings?",
    "a": "DizitalAdda Advanced Certification in Cyber Security and Ethical Hacking is 6 months / 144 contact hours across six modules: Introduction to Cyber Security and Python; Networking (TCP/IP, OSI model, subnetting, routing, NAT, DNS); Linux for Cybersecurity (file systems, permissions, Bash scripting, security auditing); Ethical Hacking (footprinting, scanning, gaining access, privilege escalation, covering tracks); Vulnerability Assessment &amp; Penetration Testing (Nessus, OpenVAS, Metasploit, OWASP Top 10, reporting); and Digital and Cyber Forensic Investigation (evidence collection, disk and memory analysis, log forensics, incident response). Batch options include Weekday Evening and Weekend batches, fully available live online. New batches start every 2–3 weeks, with all sessions recorded to the LMS within 24 hours. Call +91-8810606010 for the next batch date."
  }
],
};

// -------------------------------------------------------------
// 3. EXPERT TRAINING IN CYBER SECURITY (12 MONTHS)
// -------------------------------------------------------------
export const EXPERT_CYBER_SECURITY_DETAILS = {
  id: "cs-12m-master",
  backendCourseId: "cyber-advanced",
  courseId: 6,
  title: "Expert Training in Cyber Security and Ethical Hacking",
  subtitle: "12 Months Comprehensive Master • Web/Mobile Pentest, Cloud Security, Malware & SOC Ops",
  duration: "12 Months",
  durationId: "12-months",
  level: "EXPERT LEVEL",
  levelColor: "border-fuchsia-400 text-fuchsia-700 bg-fuchsia-50",
  checkColor: "text-fuchsia-500",
  badge: "100% Placement Guarantee Flagship",
  rating: 4.9,
  ratingsCount: "860+ graduates (310 reviews)",
  price: 95000,
  originalPrice: 135000,
  onlinePrice: 95000,
  offlinePrice: 135000,
  emi: "₹4,199/mo",
  enrollUrl: "https://dizitaladda.com/courses/expert-training-in-cyber-security-and-ethical-hacking",
  whatsappUrl: "https://wa.me/918810606010?text=Hi%2C+I+want+to+enquire+about+the+Expert+Training+In+Cyber+Security+and+Ethical+Hacking+Course",
  phone: "+91 88106 06010",
  liveTrainingHours: "288+ Hours Live Training & Labs",
  modulesCount: "32",
  modulesType: "Master Specialization Modules",
  aiToolsCount: "60+",
  aiToolsType: "Enterprise Defense & Threat Hunting",
  projects: "16+ Major Enterprise Cyber Capstones",
  mentorship: "1-on-1 Chief Mentor Guidance with Dr. Gulshan Kumar & Senior Red/Blue Team Leaders",
  certification: "National Expert Diploma + 3-Month Paid Corporate Internship Letter",
  placementGuarantee: "100% Placement Guarantee (with formal agreement)",
  perfectFor: "Future CISOs, Red Team Specialists, Security Architects & Elite Pentesters",
  perfectForBg: "bg-fuchsia-50/80 border-fuchsia-200 text-fuchsia-900",

  keyMetrics: [
    { label: "Course Duration", value: "12 Months", subtext: "288+ Live Contact Hours" },
    { label: "Core Modules", value: "12 Monthly Specializations", subtext: "Web, Mobile, Cloud, Malware, SOC" },
    { label: "Tools Stack", value: "60+ Industry Tools", subtext: "Splunk, Ghidra, Frida, AWS, pfSense" },
    { label: "Live Projects", value: "16+ Enterprise Capstones", subtext: "Full Scope Red/Blue Team Drills" },
    { label: "Placement Guarantee", value: "100% Formal", subtext: "Written Agreement & Dedicated Desk" },
    { label: "Internship", value: "3 Months Paid", subtext: "Real In-House Security Operations" },
  ],

  overviewDescription:
    "Become a cybersecurity expert with DizitalAdda flagship 12-month / 288-hour hybrid program in South Delhi. Covers the entire offensive and defensive spectrum: VAPT, Web & Mobile App Pentesting, AWS Cloud Security, IoT Security, Malware Analysis & Reverse Engineering, Digital Forensics, and SOC Operations with Splunk & EDR, backed by a guaranteed 3-month paid internship and 100% placement guarantee.",

  highlights: [
    "32 In-depth modules across 12 monthly stages from fundamentals to senior red team and blue team operations",
    "Specialist modules in Web & API Pentesting, Mobile App Pentesting (Android/iOS with Frida), and AWS Cloud Security",
    "Reverse engineering live malware binaries using Ghidra, IDA Pro, and dynamic detonation in Cuckoo Sandbox",
    "SOC Operations training: log analysis with Splunk SIEM, Wazuh EDR, and MITRE ATT&CK threat mapping",
    "Guaranteed 3-Month Paid In-House Corporate Project Internship defending live infrastructure",
    "100% Placement Guarantee with legal written placement agreement connecting you to packages of ₹12–25+ LPA",
  ],

  curriculumCategories: [
  {
    "id": "cat-1",
    "categoryTitle": "Month 1: Foundation of Cyber Security & Python Automation",
    "categoryDesc": "Cyber security landscape, threat vectors, attacker mindsets, and Python for security scripting.",
    "modules": [
      {
        "num": 1,
        "title": "Cybersecurity Landscape & Threat Modeling",
        "duration": "1 Week",
        "type": "video",
        "topics": [
          "CIA Triad & Defense-in-Depth",
          "Cyber Kill Chain & MITRE ATT&CK overview",
          "Threat vectors & attack types (Malware, Phishing, Ransomware)",
          "Security governance & ethics"
        ],
        "skills": [
          "CybersecurityBasics",
          "ThreatModeling",
          "SecurityEthics"
        ]
      },
      {
        "num": 2,
        "title": "Python for Security & Automation",
        "duration": "1 Week",
        "type": "video",
        "topics": [
          "Python syntax & data structures for security",
          "Sockets programming & port scanners",
          "Automating reconnaissance with Python scripts",
          "Handling files, logs & regex in security"
        ],
        "skills": [
          "Python",
          "Automation",
          "SocketProgramming"
        ]
      },
      {
        "num": 3,
        "title": "Hands-on Lab: Building a Custom Multi-Threaded Port Scanner",
        "duration": "1 Week",
        "type": "project",
        "topics": [
          "Building TCP/UDP scanner in Python",
          "Threading for performance optimization",
          "Banner grabbing & service identification",
          "Logging results to structured JSON/CSV"
        ],
        "skills": [
          "Python",
          "NetworkScanning",
          "LabProject"
        ]
      }
    ]
  },
  {
    "id": "cat-2",
    "categoryTitle": "Month 2: Enterprise Networking & Packet Analysis",
    "categoryDesc": "Deep dive into TCP/IP, OSI model, IP subnetting, routing, Wireshark, and firewall fundamentals.",
    "modules": [
      {
        "num": 4,
        "title": "OSI 7-Layer & TCP/IP Architecture",
        "duration": "1 Week",
        "type": "video",
        "topics": [
          "Physical to Application layer mechanics",
          "IPv4 vs IPv6 addressing & VLSM subnetting",
          "TCP 3-way handshake & connection teardown",
          "Common protocols & vulnerable ports (21, 22, 23, 25, 80, 443, 445)"
        ],
        "skills": [
          "Networking",
          "TCPIP",
          "Subnetting"
        ]
      },
      {
        "num": 5,
        "title": "Network Packet Sniffing with Wireshark",
        "duration": "1 Week",
        "type": "video",
        "topics": [
          "Wireshark capture filters & display filters",
          "Inspecting cleartext credentials (HTTP, FTP, Telnet)",
          "Analyzing ARP spoofing & DNS poisoning",
          "Detecting malicious packet anomalies"
        ],
        "skills": [
          "Wireshark",
          "PacketAnalysis",
          "TrafficSniffing"
        ]
      },
      {
        "num": 6,
        "title": "Firewalls, IDS/IPS & Network Defense",
        "duration": "1 Week",
        "type": "video",
        "topics": [
          "Stateful vs Stateless firewalls",
          "Intrusion Detection (IDS) vs Prevention (IPS)",
          "Configuring basic pfSense firewall rules",
          "Network segmentation & DMZ fundamentals"
        ],
        "skills": [
          "Firewalls",
          "NetworkDefense",
          "pfSense"
        ]
      }
    ]
  },
  {
    "id": "cat-3",
    "categoryTitle": "Month 3: Linux for Cybersecurity & System Hardening",
    "categoryDesc": "Mastering Kali Linux, Bash scripting, file system permissions, user administration, and security auditing.",
    "modules": [
      {
        "num": 7,
        "title": "Linux Architecture & Essential Commands",
        "duration": "1 Week",
        "type": "video",
        "topics": [
          "Linux file system hierarchy (/etc, /var, /proc, /dev)",
          "User, group & file permission models (chmod, chown, SUID/SGID)",
          "Package management & installing penetration tools",
          "Process management & system logging (/var/log)"
        ],
        "skills": [
          "Linux",
          "KaliLinux",
          "SysAdmin"
        ]
      },
      {
        "num": 8,
        "title": "Bash Scripting for Pentesters",
        "duration": "1 Week",
        "type": "video",
        "topics": [
          "Writing automated Bash tools",
          "Piping, grep, awk & sed for log parsing",
          "Automating reconnaissance & sub-domain enumeration",
          "Crontab scheduling & persistence monitoring"
        ],
        "skills": [
          "Bash",
          "Scripting",
          "Automation"
        ]
      },
      {
        "num": 9,
        "title": "Linux System Hardening & Security Auditing",
        "duration": "1 Week",
        "type": "video",
        "topics": [
          "Securing SSH daemon & key-based authentication",
          "Configuring iptables & UFW host firewalls",
          "Auditing system vulnerabilities with Lynis",
          "Detecting rootkits with rkhunter & chkrootkit"
        ],
        "skills": [
          "Hardening",
          "SecurityAudit",
          "LinuxSecurity"
        ]
      }
    ]
  },
  {
    "id": "cat-4",
    "categoryTitle": "Month 4: Ethical Hacking Fundamentals & Footprinting",
    "categoryDesc": "Penetration testing lifecycle, passive/active reconnaissance, vulnerability mapping, and password attacks.",
    "modules": [
      {
        "num": 10,
        "title": "Reconnaissance & Open-Source Intelligence (OSINT)",
        "duration": "1 Week",
        "type": "video",
        "topics": [
          "Passive reconnaissance with Shodan, Google Dorks & Whois",
          "Subdomain hunting with Sublist3r & Amass",
          "Active scanning & service enumeration with Nmap",
          "Identifying vulnerable web servers & banner headers"
        ],
        "skills": [
          "OSINT",
          "Nmap",
          "Reconnaissance"
        ]
      },
      {
        "num": 11,
        "title": "Vulnerability Scanning & Password Attacks",
        "duration": "1 Week",
        "type": "video",
        "topics": [
          "Vulnerability discovery using Nessus & OWASP ZAP",
          "Password cracking mechanics: Dictionary vs Brute-force",
          "Online brute-forcing with Hydra against SSH & HTTP forms",
          "Offline hash cracking using John the Ripper & Hashcat"
        ],
        "skills": [
          "VulnerabilityScanning",
          "PasswordCracking",
          "Hydra"
        ]
      },
      {
        "num": 12,
        "title": "Foundation Capstone: End-to-End Lab Vulnerability Audit",
        "duration": "1 Week",
        "type": "project",
        "topics": [
          "Scanning isolated virtual network target",
          "Exploiting misconfigured services safely",
          "Documenting vulnerabilities with proof-of-concept (PoC)",
          "Writing executive summary & student assessment"
        ],
        "skills": [
          "PenTesting",
          "ExecutiveReporting",
          "CapstoneProject"
        ]
      }
    ]
  },
  {
    "id": "cat-5",
    "categoryTitle": "Month 5: Professional VAPT & Exploitation Frameworks",
    "categoryDesc": "Mastering Metasploit, web application penetration testing (OWASP Top 10), and exploitation workflows.",
    "modules": [
      {
        "num": 13,
        "title": "Metasploit Framework Deep Dive",
        "duration": "1 Week",
        "type": "video",
        "topics": [
          "Architecture: MSFconsole, payloads, exploits, encoders & nops",
          "Staged vs Non-staged payloads (Meterpreter mechanics)",
          "Post-exploitation: privilege escalation, dumping hashes, pivoting",
          "Bypassing basic antivirus with custom encoders"
        ],
        "skills": [
          "Metasploit",
          "Exploitation",
          "PostExploitation"
        ]
      },
      {
        "num": 14,
        "title": "Web Application Penetration Testing (OWASP Top 10)",
        "duration": "1 Week",
        "type": "video",
        "topics": [
          "SQL Injection (SQLi) & automated exploitation with SQLmap",
          "Cross-Site Scripting (Stored, Reflected & DOM XSS)",
          "Cross-Site Request Forgery (CSRF) & Broken Access Control (IDOR)",
          "Security misconfigurations & sensitive data exposure"
        ],
        "skills": [
          "OWASP",
          "BurpSuite",
          "SQLInjection",
          "XSS"
        ]
      },
      {
        "num": 15,
        "title": "Burp Suite Pro Advanced Techniques",
        "duration": "1 Week",
        "type": "video",
        "topics": [
          "Intercepting & modifying HTTP/HTTPS requests",
          "Automated fuzzing with Burp Intruder & custom payloads",
          "Vulnerability scanning with Burp Scanner",
          "Session token manipulation & cookie tampering"
        ],
        "skills": [
          "BurpSuite",
          "WebPT",
          "Fuzzing"
        ]
      },
      {
        "num": 16,
        "title": "Professional VAPT Reporting & Client Communication",
        "duration": "1 Week",
        "type": "project",
        "topics": [
          "Vulnerability risk scoring with CVSS 3.1",
          "Writing executive summaries for C-suite leaders",
          "Detailed technical remediation guidance for developers",
          "Proof-of-Concept (PoC) presentation standards"
        ],
        "skills": [
          "VAPT",
          "CVSS",
          "TechnicalReporting"
        ]
      }
    ]
  },
  {
    "id": "cat-6",
    "categoryTitle": "Month 6: Digital Forensics & Cyber Investigation (DFIR)",
    "categoryDesc": "Evidence preservation, volatile memory forensics, disk analysis, and incident response procedures.",
    "modules": [
      {
        "num": 17,
        "title": "Digital Evidence Handling & Chain of Custody",
        "duration": "1 Week",
        "type": "video",
        "topics": [
          "Legal admissibility & ISO 27037 digital evidence standards",
          "First responder protocols: volatile vs non-volatile order of volatility",
          "Bit-stream image creation with FTK Imager & dd",
          "Cryptographic hashing (MD5/SHA256) for evidence integrity"
        ],
        "skills": [
          "DigitalForensics",
          "ChainOfCustody",
          "FTKImager"
        ]
      },
      {
        "num": 18,
        "title": "Memory Forensics with Volatility Framework",
        "duration": "1 Week",
        "type": "video",
        "topics": [
          "Acquiring RAM images from Windows and Linux machines",
          "Identifying malicious injected processes (pslist, malfind)",
          "Extracting network connections & listening sockets from memory",
          "Dumping injected DLLs & password hashes from memory dump"
        ],
        "skills": [
          "Volatility",
          "MemoryForensics",
          "RAMAnalysis"
        ]
      },
      {
        "num": 19,
        "title": "Disk, File System & Log Forensics with Autopsy",
        "duration": "1 Week",
        "type": "video",
        "topics": [
          "File system analysis (NTFS MFT, FAT, EXT4 inode structures)",
          "Carving deleted files & recovering unallocated space",
          "Registry forensics: user activity, recent docs, mounted USB devices",
          "Web browser history & email artifact reconstruction"
        ],
        "skills": [
          "Autopsy",
          "FileCarving",
          "RegistryForensics"
        ]
      },
      {
        "num": 20,
        "title": "Advanced Capstone: End-to-End Enterprise VAPT & Forensic Defense",
        "duration": "1 Week",
        "type": "project",
        "topics": [
          "Simulated enterprise compromise & breach investigation",
          "Drafting comprehensive penetration test report",
          "Reconstructing the attacker timeline from disk & memory evidence",
          "Final viva & placement interview drill with senior mentors"
        ],
        "skills": [
          "VAPT",
          "DFIR",
          "CapstoneDefense"
        ]
      }
    ]
  },
  {
    "id": "cat-7",
    "categoryTitle": "Month 7: Advanced Web App Pentesting & API Security",
    "categoryDesc": "REST/GraphQL API testing, JWT token attacks, server-side request forgery (SSRF), and business logic flaws.",
    "modules": [
      {
        "num": 21,
        "title": "API Security & Microservices Pentesting",
        "duration": "1 Week",
        "type": "video",
        "topics": [
          "REST, SOAP & GraphQL security architecture",
          "Broken Object Level Authorization (BOLA/IDOR) in APIs",
          "Excessive data exposure & mass assignment vulnerabilities",
          "Testing APIs with Postman, Burp Suite & Kiterunner"
        ],
        "skills": [
          "APISecurity",
          "BOLA",
          "Postman"
        ]
      },
      {
        "num": 22,
        "title": "Advanced Modern Web Vulnerabilities",
        "duration": "1 Week",
        "type": "video",
        "topics": [
          "Server-Side Request Forgery (SSRF) & cloud metadata theft",
          "JSON Web Token (JWT) signature bypass & algorithm confusion",
          "XML External Entity (XXE) injection",
          "Cross-Site Script Inclusion & WebSocket hijacking"
        ],
        "skills": [
          "SSRF",
          "JWT",
          "XXE",
          "WebSecurity"
        ]
      }
    ]
  },
  {
    "id": "cat-8",
    "categoryTitle": "Month 8: Mobile Application Penetration Testing",
    "categoryDesc": "Android and iOS mobile app security auditing, reverse engineering APKs, and runtime hooking with Frida.",
    "modules": [
      {
        "num": 23,
        "title": "Android Security & APK Reverse Engineering",
        "duration": "1 Week",
        "type": "video",
        "topics": [
          "Android security architecture: sandbox, permissions & keystore",
          "Decompiling APKs with JADX-GUI & APKTool",
          "Analyzing AndroidManifest.xml for exported activities & providers",
          "Automated mobile vulnerability scanning with MobSF"
        ],
        "skills": [
          "AndroidSecurity",
          "JADX",
          "MobSF"
        ]
      },
      {
        "num": 24,
        "title": "Dynamic Analysis & Runtime Hooking with Frida",
        "duration": "1 Week",
        "type": "video",
        "topics": [
          "SSL pinning bypass on Android and iOS apps",
          "Runtime method interception using Frida scripts",
          "Bypassing root and jailbreak detection mechanisms",
          "Intercepting encrypted mobile traffic via Burp Proxy"
        ],
        "skills": [
          "Frida",
          "SSLPinningBypass",
          "MobilePentest"
        ]
      }
    ]
  },
  {
    "id": "cat-9",
    "categoryTitle": "Month 9: AWS Cloud Security & DevSecOps",
    "categoryDesc": "Securing AWS cloud infrastructure, IAM least-privilege, container security, and CI/CD security scanning.",
    "modules": [
      {
        "num": 25,
        "title": "AWS Security Architecture & Identity (IAM)",
        "duration": "1 Week",
        "type": "video",
        "topics": [
          "AWS Shared Responsibility Model & CIS Foundations Benchmark",
          "Configuring IAM roles, policies & least-privilege principles",
          "Auditing S3 bucket permissions & preventing public exposure",
          "Securing VPC networking, security groups & NACLs"
        ],
        "skills": [
          "AWSSecurity",
          "IAM",
          "CloudSecurity"
        ]
      },
      {
        "num": 26,
        "title": "Cloud Threat Detection & Container Hardening",
        "duration": "1 Week",
        "type": "video",
        "topics": [
          "Continuous threat detection with AWS GuardDuty & Security Hub",
          "Centralized audit logging with AWS CloudTrail & CloudWatch",
          "Docker container security scanning with Trivy",
          "Kubernetes pod security standards & network policies"
        ],
        "skills": [
          "GuardDuty",
          "DockerSecurity",
          "DevSecOps"
        ]
      }
    ]
  },
  {
    "id": "cat-10",
    "categoryTitle": "Month 10: IoT Security & Hardware Exploitation",
    "categoryDesc": "Internet of Things security, firmware extraction, embedded Linux, and hardware communication bus attacks.",
    "modules": [
      {
        "num": 27,
        "title": "IoT Architecture & Firmware Reverse Engineering",
        "duration": "1 Week",
        "type": "video",
        "topics": [
          "IoT device attack surfaces (firmware, hardware, cloud)",
          "Extracting firmware with binwalk & unpacking filesystem",
          "Analyzing hardcoded credentials & private keys in firmware",
          "Emulating IoT binaries with QEMU"
        ],
        "skills": [
          "IoTSecurity",
          "FirmwareAnalysis",
          "Binwalk"
        ]
      },
      {
        "num": 28,
        "title": "Hardware Interfaces & Radio Protocol Security",
        "duration": "1 Week",
        "type": "video",
        "topics": [
          "UART, JTAG & I2C hardware debugging interfaces",
          "Connecting via USB-TTL converters to extract root shells",
          "Wireless IoT protocols: Wi-Fi, BLE (Bluetooth Low Energy) & Zigbee",
          "IoT security standards & OWASP IoT Top 10"
        ],
        "skills": [
          "HardwareHacking",
          "UART",
          "EmbeddedSecurity"
        ]
      }
    ]
  },
  {
    "id": "cat-11",
    "categoryTitle": "Month 11: Malware Reverse Engineering & Analysis",
    "categoryDesc": "Static and dynamic analysis of real malware samples, disassembly with IDA Pro and Ghidra, and sandbox detonation.",
    "modules": [
      {
        "num": 29,
        "title": "Static Malware Analysis & Disassembly",
        "duration": "1 Week",
        "type": "video",
        "topics": [
          "PE (Portable Executable) file header anatomy & import tables",
          "Detecting packed binaries & packers (UPX, Themida)",
          "Static disassembly with Ghidra & IDA Pro Free",
          "Writing YARA signatures for malware family detection"
        ],
        "skills": [
          "MalwareAnalysis",
          "Ghidra",
          "YARA"
        ]
      },
      {
        "num": 30,
        "title": "Dynamic Malware Analysis & Behavioral Detonation",
        "duration": "1 Week",
        "type": "video",
        "topics": [
          "Setting up safe isolated analysis lab (VMware / VirtualBox)",
          "Process & registry monitoring with Process Hacker & RegShot",
          "Dynamic debugging with x64dbg: setting breakpoints & memory patches",
          "Detonating ransomware in Cuckoo Sandbox & extracting C2 IPs"
        ],
        "skills": [
          "ReverseEngineering",
          "x64dbg",
          "CuckooSandbox"
        ]
      }
    ]
  },
  {
    "id": "cat-12",
    "categoryTitle": "Month 12: Endpoint Security, SIEM & SOC Operations",
    "categoryDesc": "Security Operations Center (SOC) workflows, Splunk SIEM, Wazuh EDR, MITRE ATT&CK, and placement drives.",
    "modules": [
      {
        "num": 31,
        "title": "SOC Operations & Splunk SIEM Threat Hunting",
        "duration": "1 Week",
        "type": "video",
        "topics": [
          "SOC Tier 1/2/3 analyst roles & incident handling lifecycle",
          "Splunk Search Processing Language (SPL) for threat detection",
          "Building real-time security alerting dashboards",
          "Correlation rules for detecting brute-force & lateral movement"
        ],
        "skills": [
          "Splunk",
          "SIEM",
          "SOCOperations"
        ]
      },
      {
        "num": 32,
        "title": "Endpoint Detection & Response (EDR) & MITRE ATT&CK",
        "duration": "1 Week",
        "type": "video",
        "topics": [
          "Wazuh EDR deployment & endpoint telemetry monitoring",
          "Mapping enterprise threats against MITRE ATT&CK Matrix",
          "Automated incident containment (process kill, network isolation)",
          "Paid In-House Agency Internship & placement drives with 250+ partners"
        ],
        "skills": [
          "WazuhEDR",
          "MITRE_ATTACK",
          "PlacementDrives"
        ]
      }
    ]
  }
],
  liveProjects: [
  {
    "num": 1,
    "title": "Comprehensive Penetration Testing Report",
    "duration": "3-4 Weeks",
    "badge": "VAPT Capstone",
    "description": "Conduct full-scale penetration testing on simulated corporate networks and document findings professionally with vulnerability severity ratings (CVSS) and executive remediation roadmaps.",
    "deliverables": [
      "Network Scope Reconnaissance & Port Enumeration",
      "Vulnerability Scanning with Nessus & OpenVAS",
      "Exploitation Validation with Metasploit & Burp Suite",
      "Executive Summary & Remediation Documentation (CVSS 3.1)"
    ],
    "highlight": "Executed against isolated enterprise network range with vulnerable targets"
  },
  {
    "num": 2,
    "title": "Enterprise Incident Response Framework",
    "duration": "2-3 Weeks",
    "badge": "Blue Team & SIEM",
    "description": "Design and implement incident response procedures for enterprise-level security breaches using Splunk, Wazuh, and MITRE ATT&CK mapping to contain active intrusions.",
    "deliverables": [
      "SIEM Log Source Ingestion & Alert Rule Tuning",
      "MITRE ATT&CK Matrix Threat Actor Mapping",
      "Containment, Eradication & Recovery Playbook",
      "Post-Incident RCA (Root Cause Analysis) Presentation"
    ],
    "highlight": "Live SOC environment simulating active brute-force and ransomware lateral movement"
  },
  {
    "num": 3,
    "title": "Advanced Malware Reverse Engineering",
    "duration": "4-5 Weeks",
    "badge": "Malware Research",
    "description": "Analyze real-world malware samples in isolated sandboxes. Disassemble binaries with IDA Pro and Ghidra, bypass anti-debugging protections, and extract command-and-control (C2) signatures.",
    "deliverables": [
      "Static Disassembly & String Decryption in Ghidra",
      "Dynamic Analysis in x64dbg & Cuckoo Sandbox",
      "YARA Rule Generation for Endpoint Detection",
      "Comprehensive Threat Intelligence Report"
    ],
    "highlight": "Reverse engineer live packed trojan and keylogger binaries safely"
  },
  {
    "num": 4,
    "title": "Network Security Architecture Design & Hardening",
    "duration": "3 Weeks",
    "badge": "Perimeter Defense",
    "description": "Design secure network architectures and implement defense-in-depth security controls for enterprise environments including DMZ, VLAN isolation, and pfSense firewall rules.",
    "deliverables": [
      "Zero-Trust Network Segmentation Architecture",
      "pfSense Firewall Rule Setup & NAT Policies",
      "Snort IDS/IPS Detection Signature Configuration",
      "Wireshark Traffic Audit & Packet Verification"
    ],
    "highlight": "Complete multi-tier enterprise network blueprint with hardware firewalls"
  },
  {
    "num": 5,
    "title": "Cyber Crime Investigation & Forensic Case Study",
    "duration": "3-4 Weeks",
    "badge": "Digital Forensics (DFIR)",
    "description": "Conduct forensic analysis on compromised Windows and Linux systems. Preserve chain of custody, image drives with FTK Imager, extract volatile memory with Volatility, and prepare court-admissible evidence.",
    "deliverables": [
      "Forensic Bit-Stream Image Acquisition & Hashing (MD5/SHA256)",
      "Volatile Memory (RAM) Analysis with Volatility",
      "Browser History, Registry & Event Log Reconstruction in Autopsy",
      "Forensic Expert Witness Report with Chain of Custody"
    ],
    "highlight": "Real-world data exfiltration crime investigation scenario"
  },
  {
    "num": 6,
    "title": "Multi-Cloud Security & DevSecOps Assessment",
    "duration": "4 Weeks",
    "badge": "Cloud Defense",
    "description": "Implement security controls across AWS and Azure cloud environments. Audit IAM permissions with Least Privilege, secure S3 buckets, enable CloudTrail logging, and scan IaC templates.",
    "deliverables": [
      "AWS IAM Policy Audit & CIS Benchmark Hardening",
      "AWS GuardDuty & Security Hub Incident Alerting",
      "Terraform Infrastructure-as-Code Security Scanning",
      "Cloud Posture Assessment & Compliance Scorecard"
    ],
    "highlight": "Hands-on enterprise AWS cloud lab environment"
  }
],
  toolClusters: [
  {
    "name": "Penetration Testing & Red Teaming",
    "badge": "Offensive Security",
    "tools": [
      {
        "name": "Kali Linux",
        "desc": "Industry Standard Pentesting & Security OS",
        "accent": "#367bf0"
      },
      {
        "name": "Metasploit Pro",
        "desc": "Exploitation & Payload Generation Framework",
        "accent": "#15418c"
      },
      {
        "name": "Nmap & Zenmap",
        "desc": "Network Mapping, Port Scanning & OS Detection",
        "accent": "#23527c"
      },
      {
        "name": "Burp Suite Pro",
        "desc": "Web Application Proxy, Scanner & Repeater",
        "accent": "#ff6633"
      },
      {
        "name": "Wireshark",
        "desc": "Deep Packet Inspection & Network Traffic Analysis",
        "accent": "#167ac6"
      },
      {
        "name": "OWASP ZAP",
        "desc": "Open Source Web Vulnerability Testing",
        "accent": "#005a9c"
      }
    ]
  },
  {
    "name": "Vulnerability Assessment & Exploitation",
    "badge": "VAPT Suite",
    "tools": [
      {
        "name": "Nessus Professional",
        "desc": "Enterprise Vulnerability Scanning & Auditing",
        "accent": "#00bfa5"
      },
      {
        "name": "OpenVAS",
        "desc": "Comprehensive Vulnerability Management",
        "accent": "#43a047"
      },
      {
        "name": "SQLmap",
        "desc": "Automated SQL Injection & Database Takeover",
        "accent": "#d32f2f"
      },
      {
        "name": "Hydra & John the Ripper",
        "desc": "High-Speed Password Cracking & Brute Force",
        "accent": "#e65100"
      },
      {
        "name": "Nuclei & Shodan",
        "desc": "Fast Template-based Scanning & Internet OSINT",
        "accent": "#7b1fa2"
      },
      {
        "name": "Cobalt Strike",
        "desc": "Adversary Simulation & Red Team Post-Exploitation",
        "accent": "#212121"
      }
    ]
  },
  {
    "name": "Digital Forensics & Incident Response",
    "badge": "DFIR Stack",
    "tools": [
      {
        "name": "Autopsy & Sleuth Kit",
        "desc": "Digital Forensics & Disk Image Investigation",
        "accent": "#f57c00"
      },
      {
        "name": "Volatility Framework",
        "desc": "Advanced Volatile Memory & RAM Forensics",
        "accent": "#303f9f"
      },
      {
        "name": "FTK Imager",
        "desc": "Bit-Stream Forensic Imaging & Data Preservation",
        "accent": "#c2185b"
      },
      {
        "name": "EnCase & Rekall",
        "desc": "Forensic Evidence Extraction & Timeline Analysis",
        "accent": "#00796b"
      }
    ]
  },
  {
    "name": "Malware Analysis, Cloud & SIEM",
    "badge": "Blue Team & Specialization",
    "tools": [
      {
        "name": "IDA Pro & Ghidra",
        "desc": "Static Disassembly & Decompilation of Binaries",
        "accent": "#d81b60"
      },
      {
        "name": "x64dbg & Process Hacker",
        "desc": "Dynamic Malware Debugging & Memory Inspection",
        "accent": "#512da8"
      },
      {
        "name": "Cuckoo Sandbox",
        "desc": "Automated Isolated Malware Detonation",
        "accent": "#1976d2"
      },
      {
        "name": "Splunk SIEM",
        "desc": "Log Aggregation, Threat Hunting & Security Dashboards",
        "accent": "#000000"
      },
      {
        "name": "AWS GuardDuty & IAM",
        "desc": "Cloud Infrastructure Security & Identity Governance",
        "accent": "#ff9900"
      },
      {
        "name": "Wazuh EDR",
        "desc": "Open Source Endpoint Detection & Incident Response",
        "accent": "#0288d1"
      }
    ]
  }
],
  journeySteps: [
  {
    "step": "01",
    "title": "Induction & Virtual Lab Setup",
    "desc": "Receive your dedicated high-performance cloud lab environment pre-loaded with Kali Linux, virtual target networks, and forensic tool suites.",
    "pills": [
      "Lab Credentials",
      "Tool Suite",
      "Mentor Allocation"
    ]
  },
  {
    "step": "02",
    "title": "Offensive & Defensive Live Classes",
    "desc": "Attend live interactive classes led by certified ethical hackers (CEH, OSCP). Learn attacker mindsets, defensive hardening, and packet-level protocols.",
    "pills": [
      "Live Sessions",
      "Real Attack Targets",
      "Hands-on Drills"
    ]
  },
  {
    "step": "03",
    "title": "Real-World Exploitation & DFIR Projects",
    "desc": "Execute full penetration tests, reverse engineer malware, reconstruct forensic crime scenes, and write professional executive reports.",
    "pills": [
      "Real Targets",
      "VAPT Reports",
      "Code Defense"
    ]
  },
  {
    "step": "04",
    "title": "Global Certification Prep & Placement",
    "desc": "Prepare for CEH, CompTIA Security+, and CISSP certifications. Undergo technical mock interviews and connect directly with 250+ hiring partners.",
    "pills": [
      "100% Placement Support",
      "Mock Technical Rounds",
      "Hiring Drives"
    ]
  }
],
  whoShouldJoin: [
  {
    "role": "College Students & IT Freshers",
    "desc": "Break into the high-paying cybersecurity industry (₹5–12 LPA starting) with hands-on lab proof and industry certifications."
  },
  {
    "role": "Network Engineers & System Admins",
    "desc": "Transition from general IT operations into high-growth specialized roles like Penetration Tester, Security Consultant, or SOC Analyst."
  },
  {
    "role": "Aspiring Ethical Hackers & Bug Hunters",
    "desc": "Master professional VAPT methodologies, reverse engineering, web security, and earn bounties on live bug bounty platforms."
  }
],
  certificationsList: [
    { name: "Expert Diploma in Cyber Security & Ethical Hacking", issuer: "Dizital Adda National Credential", badge: "Diploma" },
    { name: "Certified Information Systems Security Professional (CISSP) Prep", issuer: "ISC2 Aligned", badge: "Global" },
    { name: "Certified Ethical Hacker (CEH v13) & OSCP Roadmap", issuer: "OffSec & EC-Council Aligned", badge: "Elite" },
    { name: "Official 3-Month Paid In-House Security Internship Letter", issuer: "Dizital Adda Tech Network", badge: "Experience" },
  ],
  reviews: [
  {
    "author": "Saloni Bisht",
    "role": "Cybersecurity Analyst @ Google",
    "rating": 5,
    "text": "The hands-on labs and real-world scenarios prepared me perfectly for my role at Google. The instructors are industry experts who genuinely care about our success."
  },
  {
    "author": "Milan Singh",
    "role": "Senior Penetration Tester @ Microsoft",
    "rating": 5,
    "text": "From zero to hero in 6 months! The curriculum is cutting-edge and the practical approach helped me land my dream job at Microsoft. Best investment ever!"
  },
  {
    "author": "Abhishek Shukla",
    "role": "Security Engineer @ Amazon",
    "rating": 5,
    "text": "The malware analysis course opened doors I never knew existed. Now I am protecting millions of users at Amazon. The community support is incredible!"
  },
  {
    "author": "Farhaan Malik",
    "role": "Cloud Security Architect @ IBM",
    "rating": 5,
    "text": "The cloud security course was exactly what I needed to transition into cybersecurity. The practical labs and mentorship made all the difference."
  },
  {
    "author": "Lalit Kumar",
    "role": "SOC Analyst @ CrowdStrike",
    "rating": 5,
    "text": "The incident response training was phenomenal. I went from IT support to a SOC analyst at CrowdStrike. The course content is always up-to-date!"
  },
  {
    "author": "Jiya Mehta",
    "role": "Security Consultant @ Deloitte",
    "rating": 5,
    "text": "The comprehensive curriculum and networking opportunities helped me become a security consultant. The career support team is outstanding!"
  }
],
  faqs: [
    {
    "q": "What prerequisites do I need to start the cybersecurity courses?",
    "a": "Our courses are designed for various skill levels. For beginners, basic computer literacy and familiarity with operating systems is sufficient. For advanced courses, we recommend a basic understanding of networking concepts, familiarity with command line interfaces, and basic programming knowledge (helpful but not required)."
  },
  {
    "q": "How long does it take to complete a cybersecurity course?",
    "a": "Course duration varies depending on the program and your learning pace: Beginner courses take 3-4 Months (6-7 hours/week), Advanced courses take 6-7 Months (6-8 hours/week), and the Complete Master Program takes 12 months (6-8 hours/week) with dedicated live virtual labs and paid internship letter."
  },
  {
    "q": "Do you provide job placement assistance after course completion?",
    "a": "Yes! We provide comprehensive career support including resume and LinkedIn profile optimization, interview preparation and mock technical interviews with senior cybersecurity leads, direct connections with 30+ hiring partners, industry networking events, and lifetime access to our alumni network."
  },
  {
    "q": "What certifications can I earn through your programs?",
    "a": "Our courses prepare you for industry-leading certifications: CompTIA Security+ (Foundation certification), CEH (Certified Ethical Hacker - Penetration testing), CISSP (Advanced security professional), and GCIH/GCFA (Incident response and digital forensics)."
  },
  {
    "q": "Can I take these courses while working full-time?",
    "a": "Yes! We offer flexible learning schedules including evening and weekend batches, 24/7 access to our cloud virtual labs, and high-definition session recordings available on the Dizital Adda LMS within 24 hours."
  },
  {
    "q": "What kind of hands-on experience will I get?",
    "a": "Over 80% of our training is practical hands-on. You will work in isolated virtual labs, executing real-world penetration testing, network sniffing with Wireshark, exploitation with Metasploit, digital forensic investigations with Autopsy, and incident response triage with Splunk SIEM."
  },
  {
    "q": "Do you offer free demo classes?",
    "a": "Yes! We offer free trial sessions so you can experience our interactive teaching methodology, interact directly with Dr. Gulshan Kumar and senior mentors, and tour our virtual cyber lab before enrolling. Call +91-8810606010 to reserve your free demo."
  },

  {
    "q": "What is Ethical Hacking and Cyber Security, and how does the expert programme cover it?",
    "a": "Ethical hacking is the authorised practice of testing systems and networks for vulnerabilities before malicious hackers can exploit them, while cyber security is the broader field protecting digital assets, data, and infrastructure from cyber threats. DizitalAdda Expert Training in Cyber Security and Ethical Hacking covers both disciplines across the widest range of domains of any DizitalAdda programme — fundamentals, networking, and Linux, through ethical hacking and VAPT, into specialist areas including web and mobile application security, cloud security, IoT security, malware analysis, and endpoint defence — giving graduates the complete skill stack used by senior security professionals across offensive, defensive, and investigative roles. Call +91-8810606010."
  },
  {
    "q": "What is included in the AWS Cloud Security module of the expert training?",
    "a": "DizitalAdda Expert Training in Cyber Security and Ethical Hacking includes a dedicated AWS Cloud Security module covering AWS Identity and Access Management (IAM) configuration and misconfiguration risks, security groups and Virtual Private Cloud (VPC) setup, common S3 bucket vulnerabilities (a leading cause of real-world cloud data breaches), cloud penetration testing guidelines specific to AWS shared responsibility model, and monitoring and logging using AWS CloudTrail. As more Indian companies migrate infrastructure to AWS, cloud security skills have become one of the highest-demand specialisations in cybersecurity hiring, and this module is designed to make graduates job-ready for cloud security analyst roles. Call +91-8810606010."
  },
  {
    "q": "What is malware analysis and why is it covered in the expert training?",
    "a": "Malware analysis is the practice of examining malicious software — viruses, worms, trojans, ransomware — to understand how it behaves, spreads, and can be detected or removed. DizitalAdda Expert Training covers both static analysis (examining malware code without executing it) and dynamic analysis (observing malware behaviour in a controlled, isolated sandbox environment), along with signature detection techniques, common malware obfuscation methods used by attackers, and building basic malware detection tools. This is a senior-level specialisation that significantly increases earning potential, since experienced malware analysts are in short supply relative to demand at Indian SOC teams and incident response firms. Call +91-8810606010."
  },
  {
    "q": "What is mobile application penetration testing and is it covered?",
    "a": "Yes. DizitalAdda Expert Training includes a dedicated Mobile Application Penetration Testing (Mobile PT) module covering Android and iOS application architecture, static and dynamic analysis of mobile apps, reverse engineering APK files, identifying insecure data storage and excessive app permissions, and techniques for bypassing root and jailbreak detection during authorised testing. With most Indian companies now running mobile-first products (banking apps, e-commerce apps, fintech apps), mobile penetration testers are in high demand and this specialist skill set significantly differentiates Expert Training graduates from Foundation or Advanced-level candidates. Call +91-8810606010."
  },
  {
    "q": "What jobs can I apply for after the expert cyber security training?",
    "a": "Graduates of DizitalAdda Expert Training in Cyber Security and Ethical Hacking are prepared for senior and specialist roles including Senior Penetration Tester, Red Team Specialist, Malware Analyst, Cloud Security Engineer, Mobile Security Analyst, SOC Analyst (Level 3), Digital Forensics Investigator, and Security Architect. Given the breadth of specialist modules — web, mobile, cloud, IoT, malware, and endpoint security — graduates are positioned for roles paying Rs 12–25 LPA at entry into specialist tracks, rising to Rs 25–40 LPA+ at senior and lead levels with a few years of post-course experience. Call +91-8810606010."
  },
  {
    "q": "Does DizitalAdda provide placement assistance after the expert training?",
    "a": "Yes. DizitalAdda provides 100% placement assistance for all Expert Training in Cyber Security and Ethical Hacking graduates — including portfolio review across the multiple specialist domains covered (web, mobile, cloud, malware, forensics), technical resume optimisation for senior security roles, mock interviews covering live exploitation, malware analysis, and cloud security case studies, and direct referrals through DizitalAdda 250+ hiring partner network. DizitalAdda maintains a 97% placement rate across 25,000+ students trained since 2009, with placement team support continuing with no time limit until placed. Call +91-8810606010."
  },
  {
    "q": "What is IoT Security and why is it included in the expert programme?",
    "a": "IoT (Internet of Things) Security covers protecting internet-connected devices — smart home devices, industrial sensors, medical devices, connected vehicles — which often have weaker built-in security than traditional computers. DizitalAdda Expert Training covers IoT architecture and attack surfaces, IoT communication protocols, firmware analysis, IoT malware and botnets (such as those used in large-scale DDoS attacks), and mitigation and compliance standards. As IoT adoption accelerates across Indian manufacturing, healthcare, and smart city projects, this is an emerging high-value specialisation with relatively few trained professionals compared to growing demand. Call +91-8810606010."
  },
  {
    "q": "What is SIEM and EDR, and how does the expert training cover endpoint security?",
    "a": "SIEM (Security Information and Event Management) and EDR (Endpoint Detection and Response) are enterprise tools used to monitor, detect, and respond to security threats across an organisation networks and devices in real time. DizitalAdda Expert Training includes a dedicated Endpoint Security &amp; Hardening module covering endpoint threats and protections, antivirus evasion techniques (understood from a defensive perspective), SIEM and EDR tool usage, patching, encryption, and application control, and best practices for enterprise endpoint defence. These skills are directly relevant to SOC Analyst and Security Operations roles, which are among the highest-volume cybersecurity job categories in Delhi-NCR. Call +91-8810606010."
  },
  {
    "q": "What is the difference between Foundation, Advanced, and Expert cyber security courses at DizitalAdda?",
    "a": "DizitalAdda Foundation in Cyber Security and Ethical Hacking (4 months / 96 hours) covers security fundamentals and basic ethical hacking for beginners. The Advanced Certification (6 months / 144 hours) adds professional VAPT and Digital Forensics. The Expert Training (12 months / 288 hours) includes everything in Foundation and Advanced, plus Web Application Penetration Testing, Mobile Application Penetration Testing, AWS Cloud Security, IoT Security, Malware Analysis, and Endpoint Security — the most comprehensive path to senior, specialist-level cybersecurity roles. Students can also enrol directly in Expert Training without first completing Foundation or Advanced, as the curriculum builds from fundamentals within the 12-month programme. Call +91-8810606010."
  },
  {
    "q": "What certifications will I earn from the expert cyber security training?",
    "a": "Students completing DizitalAdda Expert Training in Cyber Security and Ethical Hacking receive the DizitalAdda Expert Certification in Cyber Security and Ethical Hacking, Skill India recognition, and structured exam preparation guidance for CEH (Certified Ethical Hacker), CompTIA Security+, and OSCP (Offensive Security Certified Professional) — plus exposure to specialist domain knowledge (cloud, mobile, malware) that prepares students for additional vendor certifications like AWS Security Specialty later in their careers. This is the most comprehensive certification bundle across DizitalAdda three cyber security programmes. Call +91-8810606010."
  },
  {
    "q": "Will I learn web application penetration testing in the expert training?",
    "a": "Yes, in full depth. The dedicated Web Application Penetration Testing (WebPT) module covers web architecture, exploiting the OWASP Top 10 vulnerabilities, XSS, SQL injection, and CSRF attacks, session hijacking, and file upload bypass techniques, with Burp Suite used extensively for automation and manual testing. This is significantly more comprehensive than the introductory web security coverage in DizitalAdda Foundation course and matches the depth expected of a dedicated web application security specialist role. Call +91-8810606010."
  },
  {
    "q": "Will I learn digital forensics and incident response in the expert training?",
    "a": "Yes. The Digital and Cyber Forensic Investigation module covers digital evidence collection and chain of custody, log analysis, disk and memory forensics, an overview of mobile forensics, live forensics techniques, and the full incident response workflow — preparing graduates for both proactive incident response team roles and post-breach forensic investigation work, which is increasingly required for regulatory compliance reporting under India CERT-In guidelines. Call +91-8810606010."
  },
  {
    "q": "What is the demand for cyber security specialists with cloud and mobile skills in India?",
    "a": "As Indian enterprises rapidly migrate to cloud infrastructure (AWS, Azure, GCP) and mobile-first products dominate banking, e-commerce, and fintech, demand for security professionals with cloud security and mobile penetration testing skills has grown faster than demand for generalist cybersecurity roles. India overall shortage of 1.5 million+ cybersecurity professionals is most acute at the specialist level — companies struggle hardest to find candidates with verified cloud, mobile, and malware analysis skills, which is precisely the gap DizitalAdda Expert Training is designed to fill, commanding premium salaries relative to generalist security roles. Call +91-8810606010."
  },
  {
    "q": "Is lab access provided for cloud, mobile, and malware modules in the expert training?",
    "a": "Yes. Students get access to virtual lab environments across every specialist module — including sandboxed environments for safe malware analysis, AWS lab accounts for cloud security and CloudTrail monitoring practice, Android/iOS testing environments for mobile application penetration testing, and IoT device simulation labs — alongside the core VAPT and forensics labs covered earlier in the programme. This breadth of lab access is what distinguishes Expert Training from the narrower lab scope of the Foundation and Advanced programmes. Call +91-8810606010."
  },
  {
    "q": "Who should join DizitalAdda expert cyber security training?",
    "a": "DizitalAdda Expert Training in Cyber Security and Ethical Hacking is designed for: students and graduates who want to build the broadest possible cybersecurity skill set for senior roles directly out of college; working cybersecurity professionals (analysts, junior penetration testers) seeking to specialise in high-value domains like cloud security, mobile pentesting, or malware analysis; IT professionals from networking or system administration backgrounds making a full career transition into specialist security roles; and professionals targeting Red Team, Security Architect, or SOC Lead positions who need the widest tool and domain coverage available from a single Delhi-NCR institute. No prior cybersecurity experience is strictly required, as the curriculum builds from fundamentals across the full 12 months. Call +91-8810606010 for a counselling session."
  },
  {
    "q": "What makes DizitalAdda expert cyber security training different from other institutes in Delhi?",
    "a": "DizitalAdda Expert Training stands out from other Delhi-NCR cybersecurity institutes in three ways. First, breadth: covering 11 distinct modules including web, mobile, cloud, IoT, malware, and endpoint security in a single 12-month programme, where most competing institutes offer these as separate specialised (and separately priced) courses. Second, campus-based labs: hands-on access to real lab environments at the Greater Kailash II, South Delhi campus, including sandboxed malware analysis environments and AWS cloud lab accounts. Third, placement depth and a paid in-house internship: DizitalAdda placement team works through 250+ verified hiring partners with a documented 97% placement rate across 25,000+ students, and high performers gain real security audit experience across multiple domains during their internship before graduating. Call +91-8810606010."
  },
  {
    "q": "How do I book a free demo class for the expert cyber security training?",
    "a": "Visit dizitaladda.com/courses/expert-training-in-cyber-security-and-ethical-hacking, call +91-8810606010, or WhatsApp the same number. The demo is a 1-hour live session covering an overview of the full 12-month, 11-module curriculum, a live exploitation or malware analysis demonstration, and a walkthrough of the specialist domains (cloud, mobile, IoT) — using actual course content — followed by a no-obligation career counselling session comparing the Foundation, Advanced, and Expert programme options. Attend online from home or in-person at DizitalAdda Greater Kailash II campus, South Delhi. Completely free, with batch seat confirmation within 24 hours."
  },
  {
    "q": "How is the 12-month expert cyber security training structured and what are the batch timings?",
    "a": "DizitalAdda Expert Training in Cyber Security and Ethical Hacking is 12 months / 288 contact hours across 11 modules: Introduction to Cyber Security and Python; Networking; Linux for Cyber Security; Ethical Hacking; VAPT; Digital and Cyber Forensic Investigation; Web Application Penetration Testing; Mobile Application Penetration Testing; AWS Cloud Security; IoT Security; Malware Analysis; and Endpoint Security &amp; Hardening. Batch options include Weekday Evening and Weekend batches, fully available live online. New batches start every 2–3 weeks, and all sessions are recorded to the LMS within 24 hours. Call +91-8810606010 for the next batch date."
  }
],
};

// -------------------------------------------------------------------------
// 4. CERTIFICATION IN DIGITAL FORENSIC AND CYBER INVESTIGATION (4 MONTHS)
// Sourced from https://dizitaladda.com/courses/certification-in-digital-forensic-and-cyber-investigation
// -------------------------------------------------------------------------
export const DIGITAL_FORENSICS_DETAILS = {
  id: "cs-4m-forensics",
  backendCourseId: "cyber-forensics",
  courseId: 11,
  title: "Certification in Digital Forensic and Cyber Investigation",
  subtitle: "4 Months Specialization • Disk Imaging, Memory Forensics & Cybercrime Investigation",
  duration: "4 Months",
  durationId: "4-months",
  level: "INTERMEDIATE LEVEL",
  levelColor: "border-teal-400 text-teal-700 bg-teal-50",
  checkColor: "text-teal-500",
  badge: "Law Enforcement & Corporate DFIR Track",
  rating: 4.9,
  ratingsCount: "820+ students (154 reviews)",
  price: 35000,
  originalPrice: 50000,
  onlinePrice: 35000,
  offlinePrice: 50000,
  emi: "₹3,999/mo",
  enrollUrl: "https://dizitaladda.com/courses/certification-in-digital-forensic-and-cyber-investigation",
  whatsappUrl: "https://wa.me/918810606010?text=Hi%2C+I+want+to+enquire+about+the+Certification+in+Digital+Forensic+and+Cyber+Investigation+Course",
  phone: "+91 88106 06010",
  liveTrainingHours: "96+ Hours Contact Labs",
  modulesCount: "12",
  modulesType: "DFIR Forensic Modules",
  aiToolsCount: "25+",
  aiToolsType: "Forensic Investigation Tools",
  projects: "4 Forensic Case Study Projects",
  mentorship: "Weekly Mentorship with Forensic Cyber Investigators & Dr. Gulshan Kumar",
  certification: "Dizital Adda DFIR Specialist Certificate + GCFA / EnCE Prep",
  placementGuarantee: "100% Placement Assistance (Corporate Fraud, Banks & Law Enforcement)",
  perfectFor: "Forensic Aspirants, Legal Professionals, Police Trainees & SOC Analysts",
  perfectForBg: "bg-teal-50/80 border-teal-200 text-teal-900",

  keyMetrics: [
    { label: "Course Duration", value: "4 Months", subtext: "96+ Live Contact Hours" },
    { label: "Core Modules", value: "12 Modules", subtext: "Imaging, Volatile RAM, Mobile & Case File" },
    { label: "Forensics Stack", value: "25+ Forensic Tools", subtext: "Autopsy, Volatility, FTK Imager, EnCase" },
    { label: "Hands-on Labs", value: "4 Deep Case Studies", subtext: "Real Drive Dumps & Evidence Bags" },
    { label: "Placement Support", value: "100% Assistance", subtext: "Law Firms, Banks & MSSP Corporate Units" },
    { label: "Certifications", value: "DFIR Credential", subtext: "Dizital Adda + GCFA Readiness" },
  ],

  overviewDescription:
    "Master the art of cybercrime investigation and forensic discovery at DizitalAdda. This 4-month specialized program trains you to collect digital evidence, preserve bit-stream disk images without tampering, reconstruct volatile memory artifacts using Volatility, investigate mobile device extractions, and produce court-admissible forensic dossiers under the guidance of Dr. Gulshan Kumar and certified DFIR practitioners.",

  highlights: [
    "Comprehensive evidence acquisition: Bit-stream disk imaging and cryptographic hashing (MD5, SHA256)",
    "Deep memory forensics on live and dead volatile RAM dumps using Volatility Framework",
    "File system analysis: NTFS MFT records, FAT, EXT4, deleted file carving and slack space recovery",
    "Mobile forensics for Android & iOS: SQLite database extraction, chat triage, and location history",
    "Preparation of court-admissible forensic reports complying with Indian IT Act (Section 65B) and international forensic standards",
    "Direct hands-on practice with Autopsy, FTK Imager, Volatility, EnCase, Sleuth Kit, and Wireshark",
  ],

  curriculumCategories: [
    {
      id: "df-cat-1",
      categoryTitle: "Month 1: Fundamentals of Digital Forensics & Evidence Seizure",
      categoryDesc: "Cybercrime scene triage, chain of custody, hardware write blockers, and live disk imaging.",
      modules: [
        {
          num: 1,
          title: "Introduction to Cyber Forensics & Legal Frameworks",
          duration: "1 Week",
          type: "video",
          topics: ["Locard's Exchange Principle in cyberspace", "Digital Evidence handling SOPs", "Indian IT Act Section 65B compliance", "Hardware & software write-blocking"],
          skills: ["DigitalForensics", "ChainOfCustody", "CyberLaw"]
        },
        {
          num: 2,
          title: "Forensic Imaging & Verification (FTK Imager & dd)",
          duration: "1 Week",
          type: "video",
          topics: ["Bit-stream disk imaging formats (E01, RAW/DD)", "Cryptographic hash verification (MD5/SHA256)", "Physical vs logical imaging", "Evidence preservation standards"],
          skills: ["FTKImager", "DiskImaging", "EvidenceIntegrity"]
        },
        {
          num: 3,
          title: "Hands-on Lab: Preserving Compromised Endpoint Disk Image",
          duration: "1 Week",
          type: "project",
          topics: ["Setting up write-blockers", "Acquiring forensic disk image of simulated victim PC", "Generating forensic hashes", "Authoring evidence custody form"],
          skills: ["EvidenceCustody", "ImagingLab", "DFIR"]
        }
      ]
    },
    {
      id: "df-cat-2",
      categoryTitle: "Month 2: File System Analysis & Deleted Artifact Carving",
      categoryDesc: "Investigating NTFS, FAT32, EXT4 systems, Master File Table (MFT), and unallocated space recovery.",
      modules: [
        {
          num: 4,
          title: "File Systems Deep Dive & Metadata Recovery",
          duration: "1 Week",
          type: "video",
          topics: ["NTFS $MFT, $LogFile, and $UsnJrnl analysis", "FAT32 file allocation tables", "EXT4 superblock & inodes", "Timestamp forensics ($STANDARD_INFORMATION vs $FILE_NAME)"],
          skills: ["FileSystems", "NTFSForensics", "Timestomping"]
        },
        {
          num: 5,
          title: "Autopsy & Sleuth Kit Artifact Extraction",
          duration: "1 Week",
          type: "video",
          topics: ["Automating triage in Autopsy", "File signature headers & data carving", "Recovering unallocated clusters", "Keyword searches & hash set filtering"],
          skills: ["Autopsy", "TheSleuthKit", "DataCarving"]
        },
        {
          num: 6,
          title: "Hands-on Lab: Recovering Deleted Intellectual Property Dossier",
          duration: "1 Week",
          type: "project",
          topics: ["Analyzing disk image of insider threat suspect", "Carving deleted PDF/Office files", "Reconstructing timeline of deletion", "Compiling forensic findings"],
          skills: ["InsiderThreat", "FileRecovery", "AutopsyLab"]
        }
      ]
    },
    {
      id: "df-cat-3",
      categoryTitle: "Month 3: Memory Forensics (Volatility) & Network Triage",
      categoryDesc: "Extracting volatile RAM artifacts, uncovering injected processes, and analyzing network PCAPs.",
      modules: [
        {
          num: 7,
          title: "Live RAM Acquisition & Volatility Framework",
          duration: "1 Week",
          type: "video",
          topics: ["Memory dump capture with WinPmem & DumpIt", "Volatility 3 architecture & symbol tables", "pslist, pstree, and malfind plugin triage", "Detecting reflective DLL injection in memory"],
          skills: ["VolatilityFramework", "MemoryForensics", "ProcessInjection"]
        },
        {
          num: 8,
          title: "Network Forensics & Exfiltration Analysis",
          duration: "1 Week",
          type: "video",
          topics: ["Wireshark PCAP triage for data exfiltration", "DNS tunneling detection", "Reconstructing HTTP/TLS sessions", "Correlating endpoint memory with network traces"],
          skills: ["NetworkForensics", "Wireshark", "DNSTunneling"]
        },
        {
          num: 9,
          title: "Hands-on Lab: Volatile Memory Ransomware Infiltration Analysis",
          duration: "1 Week",
          type: "project",
          topics: ["Loading RAM dump into Volatility 3", "Extracting process memory and C2 IP", "Carving encryption keys / injected payloads", "Writing memory triage report"],
          skills: ["MemoryLab", "RansomwareTriage", "Volatility3"]
        }
      ]
    },
    {
      id: "df-cat-4",
      categoryTitle: "Month 4: Mobile Forensics, Cloud Artifacts & Expert Witness Reporting",
      categoryDesc: "Android/iOS extraction, SQLite databases, cloud log analysis, and authoring courtroom evidence dossiers.",
      modules: [
        {
          num: 10,
          title: "Mobile Forensics (Android & iOS)",
          duration: "1 Week",
          type: "video",
          topics: ["ADB physical/logical extraction", "iOS backup parsing", "SQLite database analysis for WhatsApp & Telegram", "Location geofence reconstruction"],
          skills: ["MobileForensics", "SQLiteTriage", "ChatForensics"]
        },
        {
          num: 11,
          title: "Authoring Court-Admissible Forensic Reports",
          duration: "1 Week",
          type: "video",
          topics: ["Forensic dossier documentation structure", "Handling cross-examination as an expert witness", "Exhibits cataloging & hash certifications", "Mock court room scenario"],
          skills: ["ExpertWitness", "ForensicReporting", "CourtroomTestimony"]
        },
        {
          num: 12,
          title: "Capstone Project: End-to-End Cyber Crime Corporate Investigation",
          duration: "1 Week",
          type: "project",
          topics: ["Full investigation of corporate wire fraud breach", "Correlating disk, memory, mobile and network artifacts", "Authoring complete 65B compliant dossier", "Executive defense presentation"],
          skills: ["CapstoneProject", "DFIRSpecialist", "ComprehensiveInvestigation"]
        }
      ]
    }
  ],

  liveProjects: [
    {
      num: 1,
      title: "Cyber Crime Investigation Case Study & Evidence Dossier",
      duration: "3-4 Weeks",
      badge: "DFIR Capstone",
      description: "Conduct comprehensive forensic analysis on compromised enterprise systems. Preserve chain of custody, image drives with FTK Imager, extract volatile memory with Volatility, and prepare court-admissible evidence.",
      deliverables: [
        "Forensic Bit-Stream Image Acquisition & Hashing (MD5/SHA256)",
        "Volatile Memory (RAM) Analysis with Volatility 3",
        "Browser History, Registry & Event Log Reconstruction in Autopsy",
        "Forensic Expert Witness Report with Chain of Custody"
      ],
      highlight: "Real-world data exfiltration crime investigation scenario"
    },
    {
      num: 2,
      title: "Corporate Insider Threat & IP Theft Investigation",
      duration: "2-3 Weeks",
      badge: "Insider Threat",
      description: "Investigate an employee suspected of exfiltrating confidential intellectual property to personal cloud storage prior to resignation.",
      deliverables: [
        "USB Device Tracking via Windows Registry (USBSTOR)",
        "LNK Files, Shellbags & Jump Lists Timeline Reconstruction",
        "Deleted File Recovery & Slack Space Carving",
        "Actionable HR & Legal Summary Document"
      ],
      highlight: "Hands-on analysis of authentic Windows endpoint forensic image"
    },
    {
      num: 3,
      title: "Volatile Memory Ransomware Infiltration & C2 Mapping",
      duration: "2-3 Weeks",
      badge: "Memory Triage",
      description: "Analyze a memory capture taken during an active ransomware detonation to uncover the process injection and C2 infrastructure.",
      deliverables: [
        "Malicious Thread Detection with Volatility malfind",
        "Network Socket Carving with netscan plugin",
        "Extracting Injected DLLs and Command Strings",
        "Threat Actor Infrastructure Attribution Dossier"
      ],
      highlight: "Direct triage on memory capture from infected production server"
    },
    {
      num: 4,
      title: "Mobile Chat & Location Forensic Extraction (Android/iOS)",
      duration: "2 Weeks",
      badge: "Mobile DFIR",
      description: "Extract and reconstruct messaging histories, deleted media, and geotagged metadata from mobile device backups for fraud investigation.",
      deliverables: [
        "Encrypted SQLite DB Decryption and Querying",
        "Timeline Synthesis of Cross-App Messaging",
        "Location Coordinates Mapping onto Google Maps",
        "Technical Evidentiary Report"
      ],
      highlight: "Authentic multi-platform mobile forensic examination"
    }
  ],

  toolClusters: [
    {
      name: "Digital Forensics & Disk Acquisition",
      badge: "Forensic Imaging",
      tools: [
        { name: "Autopsy", desc: "Digital Forensics Platform & Artifact Examiner", accent: "#ff6633" },
        { name: "FTK Imager", desc: "Bit-Stream Forensic Imaging & Verification", accent: "#23527c" },
        { name: "The Sleuth Kit", desc: "Command-line File System Investigation", accent: "#367bf0" },
        { name: "EnCase Forensic", desc: "Enterprise Forensic Triage & Decryption", accent: "#005a9c" },
        { name: "X-Ways Forensics", desc: "Fast Raw Disk Editor & Hex Carving", accent: "#e11d48" }
      ]
    },
    {
      name: "Memory Forensics & Network Triage",
      badge: "Volatile Analysis",
      tools: [
        { name: "Volatility 3", desc: "Advanced Memory Forensics & Injection Analysis", accent: "#059669" },
        { name: "Wireshark", desc: "Deep Packet Inspection & Network Forensics", accent: "#167ac6" },
        { name: "WinPmem & DumpIt", desc: "Live Volatile RAM Acquisition Utilities", accent: "#7c3aed" },
        { name: "NetworkMiner", desc: "Network Forensic Analysis Tool (NFAT)", accent: "#d97706" }
      ]
    }
  ],

  journeySteps: [
    { step: "01", title: "Evidence Collection", desc: "Master chain of custody, write blockers, and bit-stream disk imaging." },
    { step: "02", title: "File System Carving", desc: "Extract deleted files, parse NTFS $MFT, and reconstruct system timelines." },
    { step: "03", title: "RAM & Network Triage", desc: "Analyze volatile memory with Volatility 3 and track exfiltration in Wireshark." },
    { step: "04", title: "Mobile Device Forensics", desc: "Decode Android/iOS backups, SQLite databases, and location metadata." },
    { step: "05", title: "Courtroom Dossier", desc: "Author Indian IT Act 65B compliant expert witness reports." },
    { step: "06", title: "DFIR Placement", desc: "Interviews with top cyber crime units, banks, and corporate forensics teams." },
  ],

  whoShouldJoin: [
    { role: "Aspiring Cyber Forensics Investigators", desc: "Individuals looking to build careers in digital forensics, cyber crime, and law enforcement." },
    { role: "SOC & Incident Responders", desc: "Security analysts wanting to transition into deep forensic triage and evidence preservation." },
    { role: "Law & Corporate Fraud Professionals", desc: "Attorneys, compliance officers, and internal auditors handling digital evidence." },
    { role: "Police & Security Personnel", desc: "Enforcement officers wanting specialized digital evidence collection qualifications." }
  ],

  certificationsList: [
    { name: "Dizital Adda Certification in Digital Forensics & Cyber Investigation", issuer: "Dizital Adda Official", badge: "Core" },
    { name: "GIAC Certified Forensic Analyst (GCFA) Readiness Credential", issuer: "SANS/GIAC Aligned", badge: "Global" },
    { name: "Digital Evidence Handling & Section 65B Compliance Certificate", issuer: "Cyber Law & Forensics Board", badge: "Legal" }
  ],

  reviews: [
    {
      author: "Saloni Bisht",
      role: "Cybersecurity Analyst @ Google",
      rating: 5,
      text: "The hands-on labs and real-world scenarios prepared me perfectly for my role at Google. The instructors are industry experts who genuinely care about our success."
    },
    {
      author: "Milan Singh",
      role: "Senior Penetration Tester @ Microsoft",
      rating: 5,
      text: "From zero to hero in 6 months! The curriculum is cutting-edge and the practical approach helped me land my dream job at Microsoft. Best investment ever!"
    },
    {
      author: "Abhishek Shukla",
      role: "Security Engineer @ Amazon",
      rating: 5,
      text: "The malware analysis course opened doors I never knew existed. Now I am protecting millions of users at Amazon. The community support is incredible!"
    },
    {
      author: "Farhaan Malik",
      role: "Cloud Security Architect @ IBM",
      rating: 5,
      text: "The cloud security course was exactly what I needed to transition into cybersecurity. The practical labs and mentorship made all the difference."
    },
    {
      author: "Lalit Kumar",
      role: "SOC Analyst @ CrowdStrike",
      rating: 5,
      text: "The incident response training was phenomenal. I went from IT support to a SOC analyst at CrowdStrike. The course content is always up-to-date!"
    },
    {
      author: "Jiya Mehta",
      role: "Security Consultant @ Deloitte",
      rating: 5,
      text: "The comprehensive curriculum and networking opportunities helped me become a security consultant. The career support team is outstanding!"
    }
  ],

  faqs: [
    {
      q: "What prerequisites do I need to start the cybersecurity courses?",
      a: "Our courses are designed for various skill levels. For beginners, basic computer literacy and familiarity with operating systems is sufficient. For advanced courses, we recommend a basic understanding of networking concepts, familiarity with command line interfaces, and basic programming knowledge (helpful but not required)."
    },
    {
      q: "How long does it take to complete a cybersecurity course?",
      a: "Course duration varies depending on the program and your learning pace: Beginner courses take 3-4 Months (6-7 hours/week), Advanced courses take 6-7 Months (6-8 hours/week), and the Complete Master Program takes 12 months (6-8 hours/week) with dedicated live virtual labs and paid internship letter."
    },
    {
      q: "Do you provide job placement assistance after course completion?",
      a: "Yes! We provide comprehensive career support including resume and LinkedIn profile optimization, interview preparation and mock technical interviews with senior cybersecurity leads, direct connections with 30+ hiring partners, industry networking events, and lifetime access to our alumni network."
    },
    {
      q: "What certifications can I earn through your programs?",
      a: "Our courses prepare you for industry-leading certifications: CompTIA Security+ (Foundation certification), CEH (Certified Ethical Hacker - Penetration testing), CISSP (Advanced security professional), and GCIH/GCFA (Incident response and digital forensics)."
    },
    {
      q: "Can I take these courses while working full-time?",
      a: "Yes! We offer flexible learning schedules including evening and weekend batches, 24/7 access to our cloud virtual labs, and high-definition session recordings available on the Dizital Adda LMS within 24 hours."
    },
    {
      q: "What kind of hands-on experience will I get?",
      a: "Over 80% of our training is practical hands-on. You will work in isolated virtual labs, executing real-world penetration testing, network sniffing with Wireshark, exploitation with Metasploit, digital forensic investigations with Autopsy, and incident response triage with Splunk SIEM."
    },
    {
      q: "Do you offer free demo classes?",
      a: "Yes! We offer free trial sessions so you can experience our interactive teaching methodology, interact directly with Dr. Gulshan Kumar and senior mentors, and tour our virtual cyber lab before enrolling. Call +91-8810606010 to reserve your free demo."
    }
  ]
};

// -------------------------------------------------------------------------
// 5. EXPERT TRAINING IN BUG BOUNTY (4 MONTHS)
// Sourced from https://dizitaladda.com/courses/expert-traning-in-bug-bounty
// -------------------------------------------------------------------------
export const BUG_BOUNTY_DETAILS = {
  id: "cs-4m-bugbounty",
  backendCourseId: "cyber-bugbounty",
  courseId: 12,
  title: "Expert Training in Bug Bounty",
  subtitle: "4 Months Intensive • Web App Hacking, API Security, OWASP Top 10 & Bug Hunting",
  duration: "4 Months",
  durationId: "4-months",
  level: "ADVANCED LEVEL",
  levelColor: "border-purple-400 text-purple-700 bg-purple-50",
  checkColor: "text-purple-500",
  badge: "High-Bounty Offensive Security Track",
  rating: 4.9,
  ratingsCount: "910+ students (178 reviews)",
  price: 35000,
  originalPrice: 50000,
  onlinePrice: 35000,
  offlinePrice: 50000,
  emi: "₹3,999/mo",
  enrollUrl: "https://dizitaladda.com/courses/expert-traning-in-bug-bounty",
  whatsappUrl: "https://wa.me/918810606010?text=Hi%2C+I+want+to+enquire+about+the+Expert+Traning+in+Bug+Bounty+Course",
  phone: "+91 88106 06010",
  liveTrainingHours: "96+ Hours Contact Labs",
  modulesCount: "12",
  modulesType: "Bug Hunting & Pentest Modules",
  aiToolsCount: "30+",
  aiToolsType: "Exploitation & Recon Stack",
  projects: "4 Live Bug Bounty Targets",
  mentorship: "Weekly Mentorship with Hall of Fame Bug Hunters & Dr. Gulshan Kumar",
  certification: "Dizital Adda Bug Bounty Hunter Certificate + HackerOne / Bugcrowd Readiness",
  placementGuarantee: "100% Placement Assistance (Vulnerability Management & Red Teams)",
  perfectFor: "Web Developers, Ethical Hackers, Pentesters & Security Researchers",
  perfectForBg: "bg-purple-50/80 border-purple-200 text-purple-900",

  keyMetrics: [
    { label: "Course Duration", value: "4 Months", subtext: "96+ Live Contact Hours" },
    { label: "Core Modules", value: "12 Modules", subtext: "Recon, OWASP Top 10, APIs & Disclosure" },
    { label: "Tools Stack", value: "30+ Exploitation Tools", subtext: "Burp Pro, OWASP ZAP, Nuclei, SQLmap" },
    { label: "Live Programs", value: "4 Bug Bounty Targets", subtext: "HackerOne & Bugcrowd Scenarios" },
    { label: "Placement Support", value: "100% Assistance", subtext: "Corporate VAPT & Product Security" },
    { label: "Bounty Ready", value: "Hall of Fame Focus", subtext: "Live Vulnerability Disclosure Submissions" },
  ],

  overviewDescription:
    "Turn vulnerability research into rewarding bounties and top security careers with DizitalAdda's 4-month Expert Training in Bug Bounty. Master reconnaissance automation, modern OWASP Top 10 vulnerabilities (SQLi, XSS, SSRF, IDOR, Broken Object Level Auth), REST & GraphQL API security testing, mobile app exploitation, and responsible disclosure report authoring under the mentorship of Dr. Gulshan Kumar and active Hall of Fame researchers.",

  highlights: [
    "Master advanced automated and manual reconnaissance: Subdomain enumeration, JS file analysis, and hidden endpoint discovery",
    "Deep exploitation of OWASP Top 10: IDOR, SSRF, Blind SQL Injection, Cross-Site Scripting, and CORS misconfigurations",
    "Modern API security testing covering RESTful endpoints, GraphQL introspection, and JWT token manipulation",
    "Mobile application pentesting: Android APK decompilation, Frida hooking, and SSL pinning bypass",
    "Authoring high-impact bug bounty reports with clear reproduction steps for HackerOne, Bugcrowd, and Intigriti",
    "100% hands-on training with Burp Suite Pro, OWASP ZAP, Nuclei, Amass, SQLmap, and customized Python automation scripts",
  ],

  curriculumCategories: [
    {
      id: "bb-cat-1",
      categoryTitle: "Month 1: Advanced Reconnaissance & Target Surface Mapping",
      categoryDesc: "Passive and active recon, subdomain takeover, content discovery, and OSINT automation.",
      modules: [
        {
          num: 1,
          title: "Bug Bounty Fundamentals & Scope Definition",
          duration: "1 Week",
          type: "video",
          topics: ["Bug bounty platforms (HackerOne, Bugcrowd, Intigriti)", "Understanding rules of engagement & scopes", "Legal protections & Safe Harbor policies", "Setting up an offensive cloud VPS"],
          skills: ["BugBountyBasics", "ScopeMapping", "OffSecVPS"]
        },
        {
          num: 2,
          title: "Subdomain Enumeration & Asset Discovery",
          duration: "1 Week",
          type: "video",
          topics: ["Passive recon with Amass, Sublist3r & Certificate Transparency logs", "Active DNS brute forcing with massdns", "Subdomain takeover identification", "Visual recon with Aquatone"],
          skills: ["SubdomainEnum", "SubdomainTakeover", "Amass"]
        },
        {
          num: 3,
          title: "Hands-on Lab: Mapping the Attack Surface of a Fortune 500 Scope",
          duration: "1 Week",
          type: "project",
          topics: ["Automating recon pipelines with bash & python", "Filtering live hosts with httpx", "Port scanning with naabu", "Generating consolidated attack matrix"],
          skills: ["ReconAutomation", "Httpx", "Naabu"]
        }
      ]
    },
    {
      id: "bb-cat-2",
      categoryTitle: "Month 2: Mastering OWASP Top 10 Exploitation",
      categoryDesc: "IDOR, SSRF, SQL Injection, XSS, CSRF, and logic flaws with Burp Suite Pro.",
      modules: [
        {
          num: 4,
          title: "Broken Access Control & IDOR Vulnerabilities",
          duration: "1 Week",
          type: "video",
          topics: ["Insecure Direct Object References (IDOR)", "Privilege escalation (Horizontal vs Vertical)", "Mass assignment & parameter tampering", "Bypassing multi-tenant authorization barriers"],
          skills: ["IDOR", "AccessControl", "BurpSuitePro"]
        },
        {
          num: 5,
          title: "Server-Side Request Forgery (SSRF) & Injection Flaws",
          duration: "1 Week",
          type: "video",
          topics: ["Blind & out-of-band SSRF attacks", "Stealing cloud instance metadata (AWS 169.254.169.254)", "SQL injection (Union, Error, Blind & Time-based)", "Automated SQL exploitation with SQLmap"],
          skills: ["SSRF", "CloudMetadata", "SQLInjection"]
        },
        {
          num: 6,
          title: "Hands-on Lab: Bypassing Filters to Extract Cloud Credentials",
          duration: "1 Week",
          type: "project",
          topics: ["Finding hidden SSRF endpoint in image fetcher", "Bypassing IP whitelists and DNS rebinding", "Extracting simulated AWS temporary security tokens", "Documenting proof of concept"],
          skills: ["SSRFPoC", "AWSMetadata", "BugReporting"]
        }
      ]
    },
    {
      id: "bb-cat-3",
      categoryTitle: "Month 3: API Security Testing & Authentication Flaws",
      categoryDesc: "RESTful, GraphQL, JWT vulnerabilities, OAuth 2.0 flows, and rate limit bypasses.",
      modules: [
        {
          num: 7,
          title: "REST & GraphQL API Pentesting",
          duration: "1 Week",
          type: "video",
          topics: ["API documentation discovery (Swagger / OpenAPI)", "GraphQL introspection query exploitation", "Broken Object Level Authorization (BOLA)", "Excessive data exposure"],
          skills: ["APISecurity", "GraphQLHacking", "BOLA"]
        },
        {
          num: 8,
          title: "JWT & OAuth 2.0 Exploitation",
          duration: "1 Week",
          type: "video",
          topics: ["JWT signature bypass (none algorithm, weak secrets)", "OAuth 2.0 redirect URI manipulation", "CSRF in OAuth state flows", "Account takeover vulnerabilities"],
          skills: ["JWTHacking", "OAuthFlaws", "AccountTakeover"]
        },
        {
          num: 9,
          title: "Hands-on Lab: Exploiting BOLA & Account Takeover in a Fintech API",
          duration: "1 Week",
          type: "project",
          topics: ["Intercepting REST API calls in Postman & Burp", "Testing authorization tokens across account boundaries", "Modifying transactions of other users", "Writing severity-ranked report"],
          skills: ["FintechAPILab", "BOLAPoC", "PostmanBurp"]
        }
      ]
    },
    {
      id: "bb-cat-4",
      categoryTitle: "Month 4: Mobile Pentesting, Automation & Responsible Disclosure",
      categoryDesc: "Android APK hacking, Nuclei template authoring, and writing $1,000+ bounty reports.",
      modules: [
        {
          num: 10,
          title: "Mobile App Bug Bounty (Android APKs)",
          duration: "1 Week",
          type: "video",
          topics: ["Decompiling APKs with Jadx-GUI", "Hardcoded API keys & secrets extraction", "Bypassing SSL Pinning with Frida scripts", "Exported activities & deep link exploitation"],
          skills: ["AndroidHacking", "FridaHooking", "SSLPinning"]
        },
        {
          num: 11,
          title: "Authoring High-Paying Vulnerability Reports",
          duration: "1 Week",
          type: "video",
          topics: ["How triage teams evaluate submissions", "Writing clear reproduction steps and business impact", "CVSS 3.1 severity calculation", "Interacting professionally with program managers"],
          skills: ["VulnerabilityReporting", "CVSS3", "HackerOneTriage"]
        },
        {
          num: 12,
          title: "Capstone Project: Live Target Hunting & Report Submission",
          duration: "1 Week",
          type: "project",
          topics: ["Selecting live public program on HackerOne / Bugcrowd", "Full recon, vulnerability discovery and PoC generation", "Submitting authentic reports with faculty review", "Building public Hall of Fame portfolio"],
          skills: ["LiveHunting", "HallOfFame", "BountyHunter"]
        }
      ]
    }
  ],

  liveProjects: [
    {
      num: 1,
      title: "Comprehensive Web App Vulnerability Assessment & PoC",
      duration: "3-4 Weeks",
      badge: "Bug Bounty Capstone",
      description: "Perform an authorized security assessment on an enterprise web application. Discover OWASP Top 10 vulnerabilities, author working proof-of-concepts, and submit severity-ranked reports.",
      deliverables: [
        "Full Automated & Manual Reconnaissance Report",
        "Functional Proof-of-Concepts for IDOR & SSRF",
        "CVSS 3.1 Severity Matrix & Business Impact Calculations",
        "Executive Remediation & Developer Guidance"
      ],
      highlight: "Tested against enterprise staging environments with authentic production complexity"
    },
    {
      num: 2,
      title: "Fintech REST & GraphQL API Authorization Audit",
      duration: "2-3 Weeks",
      badge: "API Security",
      description: "Audit an enterprise banking and payment API for Broken Object Level Authorization (BOLA), mass assignment, and JWT authentication bypasses.",
      deliverables: [
        "Swagger / Postman Collection Security Matrix",
        "BOLA Exploitation Proof across Multiple Tenants",
        "JWT Signature Forgery Demonstration",
        "API Hardening Recommendation Blueprint"
      ],
      highlight: "Real-world financial services API architecture"
    },
    {
      num: 3,
      title: "Android APK Reverse Engineering & SSL Pinning Bypass",
      duration: "2-3 Weeks",
      badge: "Mobile Hacking",
      description: "Decompile an Android banking APK, extract hardcoded cloud credentials, bypass SSL pinning with Frida, and intercept encrypted traffic.",
      deliverables: [
        "APK Decompilation Audit with Jadx-GUI",
        "Frida Script for Dynamic SSL Pinning Bypass",
        "Hardcoded Secrets Discovery & Risk Analysis",
        "Mobile Security Assessment Deliverable"
      ],
      highlight: "Dynamic hooking and memory modification on live emulator targets"
    },
    {
      num: 4,
      title: "Automated Nuclei Reconnaissance & Vulnerability Engine",
      duration: "2 Weeks",
      badge: "DevSecOps & Tooling",
      description: "Build an automated continuous recon and scanning pipeline in Python that queries Shodan, monitors certificate logs, and triggers custom Nuclei templates.",
      deliverables: [
        "Custom YAML Nuclei Templates for Zero-Day CVEs",
        "Automated Bash/Python Recon Pipeline",
        "Slack/Discord Alert Webhook Integration",
        "Open-Source GitHub Repository Portfolio"
      ],
      highlight: "Scalable offensive automation engine deployed on cloud VPS"
    }
  ],

  toolClusters: [
    {
      name: "Bug Hunting & Web Interception",
      badge: "Offensive Stack",
      tools: [
        { name: "Burp Suite Pro", desc: "Industry Standard Interception Proxy, Repeater & Scanner", accent: "#ff6633" },
        { name: "OWASP ZAP", desc: "Open Source Automated Web Application Scanner", accent: "#005a9c" },
        { name: "Nuclei", desc: "Fast & Customizable Vulnerability Scanner Engine", accent: "#367bf0" },
        { name: "SQLmap", desc: "Automated SQL Injection Detection & Takeover", accent: "#e11d48" },
        { name: "Postman", desc: "API Request Crafting & Authorization Testing", accent: "#f97316" }
      ]
    },
    {
      name: "Reconnaissance & Mobile Exploitation",
      badge: "Recon & Mobile",
      tools: [
        { name: "Amass & Sublist3r", desc: "In-Depth Subdomain & Network Attack Surface Enumeration", accent: "#059669" },
        { name: "Httpx & Naabu", desc: "Fast HTTP Probing & High-Speed Port Discovery", accent: "#23527c" },
        { name: "Jadx-GUI", desc: "Android Dex to Java Decompiler", accent: "#7c3aed" },
        { name: "Frida", desc: "Dynamic Instrumentation Toolkit & SSL Bypass", accent: "#d97706" }
      ]
    }
  ],

  journeySteps: [
    { step: "01", title: "Target Reconnaissance", desc: "Master passive and active surface mapping, subdomains, and hidden endpoints." },
    { step: "02", title: "OWASP Top 10 Hunting", desc: "Uncover IDOR, SSRF, SQLi, and authentication flaws in Burp Suite Pro." },
    { step: "03", title: "API Security Audit", desc: "Hunt for BOLA, broken auth, and GraphQL flaws across backend endpoints." },
    { step: "04", title: "Mobile App Hacking", desc: "Decompile Android APKs, bypass SSL pinning with Frida, and intercept calls." },
    { step: "05", title: "High-Impact Reporting", desc: "Author professional CVSS 3.1 reports that get accepted and paid on HackerOne." },
    { step: "06", title: "OffSec Placement", desc: "Interviews for VAPT specialist, Red Team, and product security roles." },
  ],

  whoShouldJoin: [
    { role: "Ethical Hackers & Pentesters", desc: "Security professionals looking to master specialized modern bug hunting methodologies." },
    { role: "Web & Mobile Developers", desc: "Coders who want to transition into high-paying application security and offensive research." },
    { role: "Independent Bounty Hunters", desc: "Enthusiasts wanting to earn bounties on HackerOne, Bugcrowd, and Intigriti." },
    { role: "IT Security Associates", desc: "Network and sysadmins wanting offensive skills to move into corporate red teaming." }
  ],

  certificationsList: [
    { name: "Dizital Adda Expert Bug Bounty Hunter Certificate", issuer: "Dizital Adda Official", badge: "Core" },
    { name: "HackerOne / Bugcrowd Platform Readiness Credential", issuer: "Bug Bounty Guild", badge: "Global" },
    { name: "OWASP Top 10 Certified Vulnerability Researcher", issuer: "Offensive Security Standards", badge: "Specialist" }
  ],

  reviews: [
    {
      author: "Saloni Bisht",
      role: "Cybersecurity Analyst @ Google",
      rating: 5,
      text: "The hands-on labs and real-world scenarios prepared me perfectly for my role at Google. The instructors are industry experts who genuinely care about our success."
    },
    {
      author: "Milan Singh",
      role: "Senior Penetration Tester @ Microsoft",
      rating: 5,
      text: "From zero to hero in 6 months! The curriculum is cutting-edge and the practical approach helped me land my dream job at Microsoft. Best investment ever!"
    },
    {
      author: "Abhishek Shukla",
      role: "Security Engineer @ Amazon",
      rating: 5,
      text: "The malware analysis course opened doors I never knew existed. Now I am protecting millions of users at Amazon. The community support is incredible!"
    },
    {
      author: "Farhaan Malik",
      role: "Cloud Security Architect @ IBM",
      rating: 5,
      text: "The cloud security course was exactly what I needed to transition into cybersecurity. The practical labs and mentorship made all the difference."
    },
    {
      author: "Lalit Kumar",
      role: "SOC Analyst @ CrowdStrike",
      rating: 5,
      text: "The incident response training was phenomenal. I went from IT support to a SOC analyst at CrowdStrike. The course content is always up-to-date!"
    },
    {
      author: "Jiya Mehta",
      role: "Security Consultant @ Deloitte",
      rating: 5,
      text: "The comprehensive curriculum and networking opportunities helped me become a security consultant. The career support team is outstanding!"
    }
  ],

  faqs: [
    {
      q: "What prerequisites do I need to start the cybersecurity courses?",
      a: "Our courses are designed for various skill levels. For beginners, basic computer literacy and familiarity with operating systems is sufficient. For advanced courses, we recommend a basic understanding of networking concepts, familiarity with command line interfaces, and basic programming knowledge (helpful but not required)."
    },
    {
      q: "How long does it take to complete a cybersecurity course?",
      a: "Course duration varies depending on the program and your learning pace: Beginner courses take 3-4 Months (6-7 hours/week), Advanced courses take 6-7 Months (6-8 hours/week), and the Complete Master Program takes 12 months (6-8 hours/week) with dedicated live virtual labs and paid internship letter."
    },
    {
      q: "Do you provide job placement assistance after course completion?",
      a: "Yes! We provide comprehensive career support including resume and LinkedIn profile optimization, interview preparation and mock technical interviews with senior cybersecurity leads, direct connections with 30+ hiring partners, industry networking events, and lifetime access to our alumni network."
    },
    {
      q: "What certifications can I earn through your programs?",
      a: "Our courses prepare you for industry-leading certifications: CompTIA Security+ (Foundation certification), CEH (Certified Ethical Hacker - Penetration testing), CISSP (Advanced security professional), and GCIH/GCFA (Incident response and digital forensics)."
    },
    {
      q: "Can I take these courses while working full-time?",
      a: "Yes! We offer flexible learning schedules including evening and weekend batches, 24/7 access to our cloud virtual labs, and high-definition session recordings available on the Dizital Adda LMS within 24 hours."
    },
    {
      q: "What kind of hands-on experience will I get?",
      a: "Over 80% of our training is practical hands-on. You will work in isolated virtual labs, executing real-world penetration testing, network sniffing with Wireshark, exploitation with Metasploit, digital forensic investigations with Autopsy, and incident response triage with Splunk SIEM."
    },
    {
      q: "Do you offer free demo classes?",
      a: "Yes! We offer free trial sessions so you can experience our interactive teaching methodology, interact directly with Dr. Gulshan Kumar and senior mentors, and tour our virtual cyber lab before enrolling. Call +91-8810606010 to reserve your free demo."
    }
  ]
};
