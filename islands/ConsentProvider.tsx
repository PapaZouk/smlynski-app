import { createContext, Context } from 'preact';
import { useEffect, useContext } from 'preact/hooks';
import { useSignal, Signal } from '@preact/signals';

const ConsentContext: Context<Signal<boolean> | undefined> = createContext<Signal<boolean> | undefined>(undefined);

export function ConsentContextProvider({ children }: { children: preact.ComponentChildren }) {
    const consent: Signal<boolean> = useSignal(false);

    useEffect(() => {
        const cookie = globalThis.document.cookie.split(';').find(cookie => cookie.trim().startsWith('cookie-consent'));
        if (cookie && cookie.split('=')[1] === 'true') {
            consent.value = true;
        }
    }, []);

    return (
        <ConsentContext.Provider value={consent}>
            {children}
        </ConsentContext.Provider>
    );
}

export function useConsent() {
    const context = useContext(ConsentContext);
    if (context === undefined) {
        throw new Error('useConsent must be used within a ConsentProvider');
    }
    return context;
}