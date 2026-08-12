export function MiniIcon({ type }: { type: "path" | "tree" | "house" }) {
  if (type === "tree") {
    return (
      <svg className="miniIcon" viewBox="0 0 48 48" aria-hidden="true">
        <path d="M24 5 13 20h7L11 32h11v11h4V32h11l-9-12h7L24 5Z" fill="none" stroke="currentColor" strokeWidth="1.25" />
      </svg>
    );
  }
  if (type === "house") {
    return (
      <svg className="miniIcon" viewBox="0 0 48 48" aria-hidden="true">
        <path d="M7 22 24 8l17 14v18H7V22Z" fill="none" stroke="currentColor" strokeWidth="1.25" />
        <path d="M17 40V27h14v13" fill="none" stroke="currentColor" strokeWidth="1.25" />
      </svg>
    );
  }
  return (
    <svg className="miniIcon" viewBox="0 0 48 48" aria-hidden="true">
      <path d="M8 42c3-12 6-18 12-22s10-6 19-14" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="9" cy="41" r="2" fill="currentColor" />
      <circle cx="39" cy="6" r="2" fill="currentColor" />
    </svg>
  );
}
