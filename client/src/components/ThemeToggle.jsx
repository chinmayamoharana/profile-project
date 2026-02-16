import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import api from '../services/api';

const ThemeToggle = () => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        // Check local storage or system preference
        const savedTheme = localStorage.getItem('theme');
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        const initialTheme = savedTheme || systemTheme;

        setTheme(initialTheme);
        applyTheme(initialTheme);
    }, []);

    const applyTheme = (mode) => {
        if (mode === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', mode);

        // Sync with backend (optional innovation)
        api.put('/theme', { theme: mode }).catch(err => console.error("Failed to sync theme", err));
    };

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        applyTheme(newTheme);
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label="Toggle Theme"
        >
            {theme === 'dark' ? <Moon size={20} className="text-yellow-400" /> : <Sun size={20} className="text-orange-500" />}
        </button>
    );
};

export default ThemeToggle;
