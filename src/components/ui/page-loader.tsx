"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export function PageLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [prevPath, setPrevPath] = useState(pathname);

  const finishLoading = useCallback(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (pathname !== prevPath) {
      setPrevPath(pathname);

      // Skip loader on homepage (has its own loading screen)
      if (pathname === "/") return;

      setLoading(true);

      // Quick flash — just enough to show the brand, then dismiss
      const timer = setTimeout(finishLoading, 500);
      return () => clearTimeout(timer);
    }
  }, [pathname, prevPath, finishLoading]);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-white"
        >
          {/* Logo */}
          <motion.img
            src="/images/logos/rhino-logo.svg"
            alt="Rhino"
            className="mb-6 h-10 w-auto md:h-14"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          />

          {/* Loading bar */}
          <div className="w-36 md:w-44">
            <div className="h-[2px] w-full overflow-hidden rounded-full bg-gray-100">
              <motion.div
                className="h-full rounded-full bg-rhino-orange"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
