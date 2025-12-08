'use client';

/**
 * Skip Link Component
 * Allows keyboard users to skip navigation and jump directly to main content
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-teal-600 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
    >
      Hopp til hovedinnhold
    </a>
  );
}

export default SkipLink;
