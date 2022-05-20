import * as React from 'react';

const ContributorBadge = (props) => (
  <svg
    width={32}
    height={32}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle r={16} transform="matrix(-1 0 0 1 16 16)" fill="#6200EA" />
    <circle
      r={16}
      transform="matrix(-1 0 0 1 16 16)"
      fill="url(#a)"
      fillOpacity={0.7}
    />
    <path
      opacity={0.6}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.4 10.456c0 1.963 1.612 3.555 3.6 3.555s3.6-1.591 3.6-3.555C19.6 8.492 17.988 6.9 16 6.9s-3.6 1.592-3.6 3.556Zm5.4 8.889c0 1.963 1.612 3.555 3.6 3.555s3.6-1.592 3.6-3.555c0-1.964-1.612-3.556-3.6-3.556s-3.6 1.592-3.6 3.556ZM10.6 22.9c-1.988 0-3.6-1.592-3.6-3.555 0-1.964 1.612-3.556 3.6-3.556s3.6 1.592 3.6 3.556c0 1.963-1.612 3.555-3.6 3.555Z"
      fill="#2C252F"
    />
    <defs>
      <linearGradient
        id="a"
        x1={34.5}
        y1={-5.5}
        x2={4.965}
        y2={43.493}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FF8845" />
        <stop offset={1} stopColor="#fff" stopOpacity={0} />
      </linearGradient>
    </defs>
  </svg>
);

export default ContributorBadge;
