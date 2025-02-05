import { createContext } from "preact";
import { useContext, useEffect } from "preact/hooks";
import { Signal, useSignal } from "@preact/signals";

type ConsentContextProps = {
  setConsent: (consent: boolean) => void;
  hasConsent: () => boolean;
  hasRejected: boolean;
};

const ConsentContext = createContext<ConsentContextProps | undefined>(
  undefined,
);

type ConsentProviderProps = {
  children: preact.ComponentChildren;
};

export function ConsentProvider({ children }: ConsentProviderProps) {
  const consent: Signal<boolean> = useSignal(false);
  const rejected: Signal<boolean> = useSignal(false);

  useEffect(() => {
    if (!consent.value) {
      const cookie = globalThis.document.cookie.split(";").find((cookie) =>
        cookie.trim().startsWith("cookie-consent")
      );
      if (cookie && cookie.split("=")[1] === "true") {
        consent.value = true;
      } else if (cookie && cookie.split("=")[1] === "false") {
        consent.value = false;
        rejected.value = true;
      }
    }
  }, []);

  const setConsent = (value: boolean) => {
    consent.value = value;
  };

  const hasConsent = () => {
    return consent.value;
  };

  return (
    <ConsentContext.Provider value={{ hasConsent, setConsent, hasRejected: rejected.value }}>
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  const context = useContext(ConsentContext);
  if (context === undefined) {
    throw new Error("useConsent must be used within a ConsentProvider");
  }
  return context;
}
