import { h } from 'preact';
import MainNavigation from "./MainNavigation.tsx";

export default function RootLayout({ children}: { children: h.JSX.Element }) {
    return (
        <div>
            <header>
                <MainNavigation />
            </header>
            <main>
                {children}
            </main>
        </div>
    )
}