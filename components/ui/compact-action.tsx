import Link from "next/link";

export function CompactAction({ href, children, light = false }: { href: string; children: React.ReactNode; light?: boolean }) {
  return (
    <Link className={`compactAction${light ? " compactActionLight" : ""}`} href={href}>
      <span>{children}</span>
      <span className="compactActionIcon" aria-hidden="true">↗</span>
    </Link>
  );
}
