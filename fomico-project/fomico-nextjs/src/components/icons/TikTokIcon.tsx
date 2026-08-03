import type { SVGProps } from "react";

export default function TikTokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M16.6 5.82c-.93-.9-1.5-2.15-1.5-3.52h-3.02v13.9c0 1.5-1.22 2.72-2.72 2.72a2.72 2.72 0 0 1-2.72-2.72 2.72 2.72 0 0 1 2.72-2.72c.28 0 .55.04.8.12V10.6c-.27-.04-.53-.06-.8-.06A5.74 5.74 0 0 0 3.62 16.28 5.74 5.74 0 0 0 9.36 22a5.74 5.74 0 0 0 5.74-5.72V9.01a8.32 8.32 0 0 0 4.86 1.56V7.55c-1.13 0-2.18-.36-3.36-1.73Z" />
    </svg>
  );
}
