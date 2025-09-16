import { ThemeProvider } from "next-themes";

export default function AppProvider({ children }) {
    return (
        <ThemeProvider attribute="class">
            {children}
        </ThemeProvider>
    );
}
