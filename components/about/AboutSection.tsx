import type { ReactNode } from "react";

// Full-viewport section wrapper for the About scroll experience.
// Plain layout (no hooks) — children own their own in-view animations.
export function AboutSection({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`min-h-screen flex items-center justify-center px-6 sm:px-10 md:px-16 py-24 ${className}`}
    >
      <div className="max-w-5xl w-full">{children}</div>
    </section>
  );
}
