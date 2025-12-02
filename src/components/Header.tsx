import {useTheme} from "../contexts/ThemeProvider";
import {Moon, Sun} from "lucide-react";

export default function Header() {
    const {theme, setTheme} = useTheme();
    return (
        <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div
                            className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                            <img src="./logo.png" alt="logo"/>
                        </div>
                        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                            Rick & Morty
                        </h1>
                    </div>
                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        aria-label="Toggle theme"
                    >
                        {theme === "dark" ? (
                            <Sun className="w-5 h-5 text-yellow-500"/>
                        ) : (
                            <Moon className="w-5 h-5 text-gray-700"/>
                        )}
                    </button>
                </div>
            </div>
        </header>
    )
}
