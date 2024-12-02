import { Provider } from "react-redux";
import "./globals.css";
import type { AppProps } from "next/app";
import { store } from "@/store/store";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

const pageVariants = {
  initial: { opacity: 0, y: -100 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 100 },
};

const pageTransition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

export default function App({ Component, pageProps, router }: AppProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);

    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    <AnimatePresence mode="wait">
      <Provider store={store}>
        {isLoading ? (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <motion.div
            key={router.route}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Component {...pageProps} />
          </motion.div>
        )}
      </Provider>
    </AnimatePresence>
  );
}
