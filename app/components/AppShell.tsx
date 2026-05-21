"use client";

// AppShell — client-side wrapper mounted once in layout.tsx.
// Owns: loading screen (first-visit only), grain overlay, cursor tracker,
// custom cursor, and the persistent AnimatePresence + LayoutGroup for page transitions.

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { LoadingScreen } from "./LoadingScreen";
import { GrainOverlay } from "./GrainOverlay";
import { CustomCursor } from "./CustomCursor";

const SESSION_KEY = "latency_loaded";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // showLoader: true only on first visit (sessionStorage check in useEffect)
  const [showLoader, setShowLoader] = useState(false);
  // contentVisible: false during first-visit load, true otherwise
  const [contentVisible, setContentVisible] = useState(true);

  useEffect(() => {
    if (!sessionStorage.getItem(SESSION_KEY)) {
      setShowLoader(true);
      setContentVisible(false);
    }
  }, []);

  const handleLoaderDone = useCallback(() => {
    sessionStorage.setItem(SESSION_KEY, "1");
    setShowLoader(false);
    setContentVisible(true);
  }, []);

  return (
    <>
      {/* First-visit loading screen */}
      {showLoader && <LoadingScreen onDone={handleLoaderDone} />}

      {/* Page-global overlays */}
      <GrainOverlay />
      <CustomCursor />

      {/* Main content — fades in after loader exits */}
      {/* LayoutGroup + AnimatePresence live here (persistent) so exit animations fire */}
      <div
        style={{
          opacity: contentVisible ? 1 : 0,
          transition: contentVisible ? "opacity 600ms 200ms ease" : "none",
        }}
      >
        <LayoutGroup>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </>
  );
}
