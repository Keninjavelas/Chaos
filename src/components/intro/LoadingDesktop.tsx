// src/components/intro/LoadingDesktop.tsx
"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { SkipButton } from "@/components/intro/SkipButton";
import { useArchiveStore } from "@/lib/state";
import { ObservationPriority } from "@/archive/types";

const baseLoadingMessages = [
  "Loading Visitor Profile...",
  "Checking Archive Access...",
  "Building Memory Index...",
  "Retrieving Session Data..."
];

interface DialogState {
  id: string;
  title: string;
  content: React.ReactNode;
}

export const LoadingDesktop: React.FC<{ onComplete: () => void, onSkip: () => void }> = ({ onComplete, onSkip }) => {
  const { addObservation } = useArchiveStore();

  const [progress, setProgress] = useState(0);
  const [clockTime, setClockTime] = useState("");
  const [visitorNum, setVisitorNum] = useState(() => Math.floor(Math.random() * 9000) + 1000);
  const [frozen, setFrozen] = useState(false);
  
  // Interaction tracking
  const [clickCount, setClickCount] = useState(0);
  const [skipHoverCount, setSkipHoverCount] = useState(0);
  const [catClickCount, setCatClickCount] = useState(0);
  const [catSecretFound, setCatSecretFound] = useState(false);
  
  const [isHoveringCounter, setIsHoveringCounter] = useState(false);
  const [openDialogs, setOpenDialogs] = useState<DialogState[]>([]);

  const progressRef = useRef(0);

  // Determine behavior
  let behavior = "Passive";
  if (skipHoverCount >= 2) {
    behavior = "Impatient";
  } else if (clickCount >= 3) {
    behavior = "Curious";
  }

  // Determine which unsettling loading message to show
  const currentMessageIndex = Math.min(
    Math.floor((progress / 100) * baseLoadingMessages.length),
    baseLoadingMessages.length - 1
  );
  const currentMessage = baseLoadingMessages[currentMessageIndex];

  // Clock
  useEffect(() => {
    const updateClock = () => {
      if (frozen) return;
      const now = new Date();
      const h = now.getHours() % 12 || 12;
      const m = String(now.getMinutes()).padStart(2, "0");
      const ampm = now.getHours() >= 12 ? "PM" : "AM";
      setClockTime(`${h}:${m} ${ampm}`);
    };
    updateClock();
    const i = setInterval(updateClock, 1000);
    return () => clearInterval(i);
  }, [frozen]);

  const commitObservationAndComplete = useCallback(() => {
    let msg = "Subject exhibits passive tendencies.";
    if (behavior === "Curious") msg = "Subject exhibits exploratory tendencies.";
    if (behavior === "Impatient") msg = "Subject exhibits impatient tendencies.";

    addObservation({
      id: `obs-intro-${Date.now()}`,
      timestamp: Date.now(),
      category: "Visitor Analysis",
      severity: behavior === "Impatient" ? "medium" : "low",
      message: msg,
      priority: ObservationPriority.Medium
    });

    onComplete();
  }, [addObservation, behavior, onComplete]);

  const handleSkip = useCallback(() => {
    commitObservationAndComplete();
    onSkip();
  }, [commitObservationAndComplete, onSkip]);

  // Progress bar fills over ~10s, then triggers freeze & complete
  useEffect(() => {
    const interval = setInterval(() => {
      if (frozen) return;
      
      progressRef.current += Math.random() * 0.5 + 0.1;
      if (progressRef.current >= 100) {
        progressRef.current = 100;
        setProgress(100);
        setFrozen(true);
        clearInterval(interval);
        
        // Hold at 100% frozen for 1.5s before blackout
        setTimeout(commitObservationAndComplete, 1500);
      } else {
        setProgress(Math.floor(progressRef.current));
      }
    }, 100);
    return () => clearInterval(interval);
  }, [commitObservationAndComplete, frozen]);

  const handleCatClick = () => {
    if (frozen) return;
    setCatClickCount(c => {
      const newCount = c + 1;
      if (newCount === 5 && !catSecretFound) {
        setCatSecretFound(true);
        addObservation({
          id: `obs-secret-${Date.now()}`,
          timestamp: Date.now(),
          category: "Discovery",
          severity: "low",
          message: "Subject discovered archived feline asset.",
          priority: ObservationPriority.Low
        });
        openDialog("secret", "System Alert", <p>meow.wav missing or corrupted.</p>);
      }
      return newCount;
    });
  };

  const openDialog = (id: string, title: string, content: React.ReactNode) => {
    if (frozen) return;
    if (!openDialogs.find(d => d.id === id)) {
      setOpenDialogs([...openDialogs, { id, title, content }]);
    }
  };

  const closeDialog = (id: string) => {
    if (frozen) return;
    setOpenDialogs(openDialogs.filter(d => d.id !== id));
  };

  const handleGlobalClick = () => {
    if (frozen) return;
    setClickCount(c => c + 1);
  };

  return (
    <div 
      className="win98-desktop" 
      style={{ pointerEvents: frozen ? "none" : "auto", position: "relative", height: "100vh", width: "100vw", overflow: "hidden" }}
      onClickCapture={handleGlobalClick}
    >
      <div className="win98-desktop-bg" style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", padding: "20px", height: "100%", width: "100%" }}>
        
        {/* Desktop Icons */}
        <div style={{ position: "absolute", top: "20px", left: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>
          <DesktopIcon 
            icon="📁" label="My Projects" 
            onClick={() => openDialog("projects", "My Projects", <p>Loading projects directory... Please wait until system initialization completes.</p>)} 
          />
          <DesktopIcon 
            icon="📄" label="Resume.txt" 
            onClick={() => openDialog("resume", "Resume.txt - Notepad", <p>ARYAN_KAPOOR.RES<br/>Loading...<br/>System unavailable.</p>)} 
          />
          <DesktopIcon 
            icon="📝" label="Research.doc" 
            onClick={() => openDialog("research", "Research.doc", <p>File access denied during boot sequence.</p>)} 
          />
          <DesktopIcon 
            icon="🖼️" label="Photos" 
            onClick={() => openDialog("photos", "Photos", <p>Empty folder.</p>)} 
          />
          <DesktopIcon 
            icon="📖" label="Guestbook" 
            onClick={() => openDialog("guestbook", "Guestbook", <p>Entries: 1<br/>Visitor #1: &quot;Nice site.&quot;</p>)} 
          />
          <DesktopIcon 
            icon="✉️" label="Contact Me" 
            onClick={() => openDialog("contact", "Contact", <p>Mail client not configured.</p>)} 
          />
        </div>

        {/* Floating Memes on the sides */}
        {progress > 12 && (
          <div className="win98-meme" style={{ top: "10%", right: "8%", transform: "rotate(10deg)", cursor: "pointer" }} onClick={handleCatClick}>
            <img src="/memes/nyan-cat.png" alt="Nyan Cat" width={180} height={180} style={{ borderRadius: "4px", boxShadow: "2px 2px 8px rgba(0,0,0,0.4)" }} />
          </div>
        )}
        {progress > 25 && (
          <div className="win98-meme" style={{ bottom: "15%", left: "10%", transform: "rotate(-15deg)", cursor: "pointer" }} onClick={handleCatClick}>
            <img src="/memes/ceiling-cat.png" alt="Ceiling Cat" width={180} height={180} style={{ borderRadius: "4px", boxShadow: "2px 2px 8px rgba(0,0,0,0.4)" }} />
          </div>
        )}
        {progress > 37 && (
          <div className="win98-meme" style={{ top: "8%", left: "20%", transform: "rotate(-5deg)", cursor: "pointer" }} onClick={handleCatClick}>
            <img src="/memes/keyboard-cat.png" alt="Keyboard Cat" width={180} height={180} style={{ borderRadius: "4px", boxShadow: "2px 2px 8px rgba(0,0,0,0.4)" }} />
          </div>
        )}
        {progress > 50 && (
          <div className="win98-meme" style={{ bottom: "8%", right: "20%", transform: "rotate(8deg)", cursor: "pointer" }} onClick={handleCatClick}>
            <img src="/memes/longcat.png" alt="Longcat" width={180} height={180} style={{ borderRadius: "4px", boxShadow: "2px 2px 8px rgba(0,0,0,0.4)" }} />
          </div>
        )}
        {progress > 62 && (
          <div className="win98-meme" style={{ top: "40%", right: "5%", transform: "rotate(-12deg)", cursor: "pointer" }} onClick={handleCatClick}>
            <img src="/memes/nyan-cat.png" alt="Nyan Cat" width={160} height={160} style={{ borderRadius: "4px", boxShadow: "2px 2px 8px rgba(0,0,0,0.4)", filter: "hue-rotate(90deg)" }} />
          </div>
        )}
        {progress > 75 && (
          <div className="win98-meme" style={{ bottom: "40%", left: "5%", transform: "rotate(15deg)", cursor: "pointer" }} onClick={handleCatClick}>
            <img src="/memes/ceiling-cat.png" alt="Ceiling Cat" width={170} height={170} style={{ borderRadius: "4px", boxShadow: "2px 2px 8px rgba(0,0,0,0.4)", filter: "invert(1)" }} />
          </div>
        )}
        {progress > 85 && (
          <div className="win98-meme" style={{ top: "60%", right: "25%", transform: "rotate(-20deg)", cursor: "pointer" }} onClick={handleCatClick}>
            <img src="/memes/keyboard-cat.png" alt="Keyboard Cat" width={190} height={190} style={{ borderRadius: "4px", boxShadow: "2px 2px 8px rgba(0,0,0,0.4)", filter: "sepia(1)" }} />
          </div>
        )}
        {progress > 95 && (
          <div className="win98-meme" style={{ top: "30%", left: "12%", transform: "rotate(25deg)", cursor: "pointer" }} onClick={handleCatClick}>
            <img src="/memes/longcat.png" alt="Longcat" width={200} height={200} style={{ borderRadius: "4px", boxShadow: "2px 2px 8px rgba(0,0,0,0.4)" }} />
          </div>
        )}

        {/* Single Dominant Browser Window */}
        <div className="win98-window" style={{ width: "100%", maxWidth: "800px", height: "85vh", display: "flex", flexDirection: "column", transform: "none", position: "relative", top: "auto", left: "auto", zIndex: 10 }}>
          
          <div className="win98-titlebar" style={{ flexShrink: 0 }}>
            <span className="win98-titlebar-icon">🌐</span>
            <span className="win98-titlebar-text">Aryan&apos;s Homepage - Microsoft Internet Explorer</span>
            <div className="win98-titlebar-buttons">
              <button className="win98-btn-close">X</button>
            </div>
          </div>
          
          <div className="win98-toolbar" style={{ flexShrink: 0 }}>
            <span>File</span>
            <span>Edit</span>
            <span>View</span>
            <span>Favorites</span>
            <span>Help</span>
          </div>
          <div className="win98-addressbar" style={{ flexShrink: 0 }}>
            <span>Address</span>
            <div className="win98-addressbar-input">http://www.aryan-portfolio.net/index.html</div>
          </div>

          <div className="win98-content" style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 20px" }}>
            
            <h1 className="win98-heading" style={{ fontSize: "2.5rem", marginBottom: "20px", textAlign: "center" }}>
              ✨ Welcome to Aryan&apos;s Homepage ✨
            </h1>

            <div style={{ display: "flex", gap: "40px", width: "100%", maxWidth: "600px", marginTop: "20px" }}>
              
              {/* Left Column: Nav & Links */}
              <div style={{ flex: 1, border: "2px inset #dfdfdf", padding: "10px", background: "#f0f0f0" }}>
                <h3 style={{ margin: "0 0 10px 0", color: "#000080" }}>Navigation</h3>
                <ul style={{ listStyleType: "square", paddingLeft: "20px", margin: 0, color: "#0000ee", textDecoration: "underline", cursor: "pointer", lineHeight: "1.8" }}>
                  <li onClick={() => openDialog("about", "About Me", <p>I am a developer.</p>)}>About Me</li>
                  <li onClick={() => openDialog("projects", "My Projects", <p>Loading projects...</p>)}>My Projects</li>
                  <li onClick={() => openDialog("resume", "Resume", <p>Access denied.</p>)}>Resume</li>
                  <li onClick={() => openDialog("guestbook", "Guestbook", <p>Visitor #1: &quot;Nice site.&quot;</p>)}>Guestbook</li>
                  <li onClick={() => openDialog("contact", "Email Me", <p>No mail client found.</p>)}>Email Me</li>
                </ul>
              </div>

              {/* Right Column: Content & Widgets */}
              <div style={{ flex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
                <div style={{ border: "1px dashed #808080", padding: "10px", textAlign: "center", width: "100%" }}>
                  <img src="/memes/under-construction.png" alt="Under Construction" width={200} height={30} style={{ display: "block", margin: "0 auto 10px" }} />
                  <p style={{ fontSize: "11px", margin: 0 }}>Pardon our dust! More content coming soon.</p>
                </div>

                <div 
                  style={{ textAlign: "center", cursor: "help" }}
                  onMouseEnter={() => setIsHoveringCounter(true)}
                  onMouseLeave={() => setIsHoveringCounter(false)}
                >
                  <p style={{ margin: "0 0 5px 0", fontSize: "14px", fontWeight: "bold" }}>You are visitor:</p>
                  <div style={{ background: "#000", color: "#0f0", fontFamily: "monospace", fontSize: "24px", padding: "5px 10px", letterSpacing: "3px", border: "2px inset #808080", display: "inline-block" }}>
                    {String(visitorNum).padStart(6, "0")}
                  </div>
                  {isHoveringCounter && (
                    <div style={{ marginTop: "5px", color: "red", fontWeight: "bold", fontSize: "12px" }}>
                      Last visitor: YOU
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Unsettling Loading Section */}
            <div className="win98-loading-section" style={{ marginTop: "auto", width: "100%", maxWidth: "600px", background: "#c0c0c0", padding: "15px", border: "2px outset #dfdfdf" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span className="win98-loading-text" style={{ margin: 0, fontWeight: "bold" }}>
                  {currentMessage}
                </span>
                <span className="win98-loading-percent" style={{ margin: 0, fontWeight: "bold" }}>
                  {progress}%
                </span>
              </div>
              <div className="win98-progress-outer" style={{ height: "24px" }}>
                <div
                  className="win98-progress-inner"
                  style={{ width: `${progress}%`, transition: "none" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Small Dialogs Overlay */}
        {openDialogs.map((dialog, index) => (
          <div 
            key={dialog.id} 
            className="win98-window" 
            style={{ 
              position: "absolute", 
              top: `${30 + index * 5}%`, 
              left: `${40 + index * 5}%`, 
              zIndex: 50 + index, 
              width: "300px", 
              transform: "none",
              boxShadow: "2px 2px 10px rgba(0,0,0,0.5)"
            }}
          >
            <div className="win98-titlebar">
              <span className="win98-titlebar-icon">💬</span>
              <span className="win98-titlebar-text">{dialog.title}</span>
              <div className="win98-titlebar-buttons">
                <button className="win98-btn-close" onClick={(e) => { e.stopPropagation(); closeDialog(dialog.id); }}>X</button>
              </div>
            </div>
            <div className="win98-content" style={{ padding: "15px", minHeight: "80px", display: "flex", flexDirection: "column" }}>
              <div style={{ flex: 1 }}>{dialog.content}</div>
              <div style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}>
                <button 
                  onClick={(e) => { e.stopPropagation(); closeDialog(dialog.id); }}
                  style={{ padding: "4px 20px", fontFamily: "inherit", cursor: "pointer", background: "#c0c0c0", border: "2px outset #dfdfdf" }}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <SkipButton onSkip={handleSkip} onHover={() => setSkipHoverCount(c => c + 1)} />

    </div>
  );
};

const DesktopIcon: React.FC<{ icon: string, label: string, onClick: () => void }> = ({ icon, label, onClick }) => {
  return (
    <div 
      style={{ 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        gap: "4px", 
        cursor: "pointer",
        width: "80px",
        textAlign: "center"
      }}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className="desktop-icon-wrapper"
    >
      <div style={{ fontSize: "3.5rem" }}>{icon}</div>
      <div style={{ color: "white", fontSize: "14px", fontWeight: "bold", textShadow: "1px 1px 2px black" }}>{label}</div>
    </div>
  );
};
