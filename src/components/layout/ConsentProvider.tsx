"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

/**
 * Cookie consent state, shared between the banner and the analytics loader.
 *
 * The cookie is read via useSyncExternalStore — the recommended pattern for
 * external mutable state. It keeps the server snapshot ("unknown") separate
 * from the client snapshot, so the banner never flashes for returning
 * visitors and there is no hydration mismatch under `output: "export"`.
 * GA only loads once consent is granted — GDPR behavior preserved.
 * See docs/adr/0009-consent-analytics.md.
 */

const CONSENT_COOKIE = "cookie-consent";
const ACCEPT_MAX_AGE = 60 * 60 * 24 * 365; // 1 year
const REJECT_MAX_AGE = 60 * 60 * 24 * 180; // 180 days

/** "unknown" = pre-hydration (server) state, when the cookie cannot be read. */
type Snapshot = "accepted" | "rejected" | "unknown" | null;
type ConsentValue = "accepted" | "rejected" | null;

function readConsentCookie(): Snapshot {
  const match = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${CONSENT_COOKIE}=`));

  if (!match) {
    return null;
  }
  const value = match.slice(CONSENT_COOKIE.length + 1);
  if (value === "true") {
    return "accepted";
  }
  if (value === "false") {
    return "rejected";
  }
  return null;
}

// Cookies do not emit change events; accept/reject update React state through
// the provider actions, so there is nothing to subscribe to.
function subscribeToConsentChanges() {
  return () => {};
}

const serverSnapshot = (): Snapshot => "unknown";

function writeConsentCookie(value: "true" | "false", maxAge: number) {
  document.cookie = `${CONSENT_COOKIE}=${value}; max-age=${maxAge}; path=/; Secure; SameSite=Lax`;
}

interface ConsentContextValue {
  consent: ConsentValue;
  /** True only on the client, before a choice has been made. */
  isPending: boolean;
  accept: () => void;
  reject: () => void;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function ConsentProvider({ children }: { children: ReactNode }) {
  const cookieSnapshot = useSyncExternalStore(
    subscribeToConsentChanges,
    readConsentCookie,
    serverSnapshot,
  );
  // Local actions win over the cookie snapshot until React re-reads it.
  const [override, setOverride] = useState<ConsentValue>(null);

  const accept = useCallback(() => {
    writeConsentCookie("true", ACCEPT_MAX_AGE);
    setOverride("accepted");
  }, []);

  const reject = useCallback(() => {
    writeConsentCookie("false", REJECT_MAX_AGE);
    setOverride("rejected");
  }, []);

  const resolved: ConsentValue = cookieSnapshot === "unknown" ? null : cookieSnapshot;
  const consent: ConsentValue = override ?? resolved;

  return (
    <ConsentContext.Provider
      value={{
        consent,
        isPending: cookieSnapshot !== "unknown" && consent === null,
        accept,
        reject,
      }}
    >
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent(): ConsentContextValue {
  const context = useContext(ConsentContext);
  if (!context) {
    throw new Error("useConsent must be used within a ConsentProvider");
  }
  return context;
}
