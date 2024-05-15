"use client";

import * as React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

interface ThemedImageProps {
  width: number;
  height: number;
  src: {
    light: string;
    dark: string;
  };
}

const ThemedImage = ({ width, height, src }: ThemedImageProps) => {
  const { resolvedTheme, theme } = useTheme();
  const [source, setSrc] = React.useState<string>(""); // Initial state for the image source
  const [isLoading, setIsLoading] = React.useState<boolean>(true); // Initial loading state

  React.useEffect(() => {
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      setSrc(systemTheme === "dark" ? `${src.light}` : `${src.dark}`);
    } else {
      setSrc(theme === "dark" ? `${src.light}` : `${src.dark}`);
    }

    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedTheme]);

  return (
    <>
      {isLoading ? ( // Display a loading state while the theme is being resolved
        <div></div>
      ) : (
        <Image alt="vercel-logo" src={source} width={width} height={height} />
      )}
    </>
  );
};

export default ThemedImage;
