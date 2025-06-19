import * as React from "react";

const LexiqLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8"
    {...props}
  >
    <path
      d="M7.5 18.75 3.75 21 21 3.75 18.75 7.5zm9-13.5L20.25 3 3 20.25l2.25-3.75z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.383 6.867a6.75 6.75 0 0 0-9.517 9.517zM12 18.75A6.75 6.75 0 0 0 18.75 12zm6.613-8.112a6.7 6.7 0 0 0-.347-1.154l-8.782 8.782q.555.223 1.154.347z"
      fill="currentColor"
    />
  </svg>
);

export default LexiqLogo;