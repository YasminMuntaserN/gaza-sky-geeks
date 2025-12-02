import {createContext, type ReactNode, useContext, useEffect, useState} from "react"

type Theme = "dark" | "light" | "system"

interface ThemeProviderState {
    theme: Theme
    setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
    theme: "system",
    setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

interface ThemeProviderProps {
    children: ReactNode
    defaultTheme?: Theme
    storageKey?: string
}

export function ThemeProvider({children, defaultTheme = "system", storageKey = "vite-ui-theme"}: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme | null>(null); // start with null

    useEffect(() => {
        const storedTheme = (localStorage.getItem(storageKey) as Theme) || defaultTheme;
        setTheme(storedTheme);

        const root = window.document.documentElement;
        root.classList.remove("light", "dark");

        let appliedTheme = storedTheme;
        if (storedTheme === "system") {
            appliedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        }

        root.classList.add(appliedTheme);
    }, [defaultTheme, storageKey]);

    if (!theme) return null; // prevent rendering before theme is applied

    const value: ThemeProviderState = {
        theme,
        setTheme: (theme: Theme) => {
            localStorage.setItem(storageKey, theme);
            setTheme(theme);
            const root = window.document.documentElement;
            root.classList.remove("light", "dark");
            root.classList.add(theme === "system"
                ? window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
                : theme
            );
        }
    };

    return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>;
}


export const useTheme = (): ThemeProviderState => {
    const context = useContext(ThemeProviderContext)
    if (context === undefined)
        throw new Error("useTheme must be used within a ThemeProvider")
    return context
}