'use client'

import * as React from "react";
import Image from 'next/image';
import { useTheme } from 'next-themes';

interface ThemedImageProps {
    width: number;
    height: number;
}

const ThemedImage = ({ width, height }: ThemedImageProps) => {
    const { resolvedTheme, theme } = useTheme();
    const [src, setSrc] = React.useState<string>(''); // Initial state for the image source
    const [isLoading, setIsLoading] = React.useState<boolean>(true); // Initial loading state

    React.useEffect(() => {
        if (theme === 'system') {
            // Check if the system theme is dark or light
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            setSrc(systemTheme === 'dark' ? '/icon/light/light.png' : '/icon/dark/dark.png');
        } else {
            // For explicitly set themes (light or dark)
            setSrc(theme === 'dark' ? '/icon/light/light.png' : '/icon/dark/dark.png');
        }

        // Set loading to false after a short delay (1 second)
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timeout); // Cleanup function
    }, [resolvedTheme]);

    return (
        <>
            {isLoading ? ( // Display a loading state while the theme is being resolved
                <div></div>
            ) : (
                <Image alt='vercel-logo' src={src} width={width} height={height} />
            )}
        </>
    );
}

export default ThemedImage;
