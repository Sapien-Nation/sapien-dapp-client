export const SingleBadge = ({ color = '#6200EA' }: { color?: string }) => (
  <svg
    fill="none"
    height="22"
    viewBox="0 0 22 22"
    width="22"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="11" cy="11" fill={color} r="11" />
    <circle
      cx="11"
      cy="11"
      fill="url(#paint0_linear)"
      fillOpacity="0.7"
      r="11"
    />
    <path
      clipRule="evenodd"
      d="M13.4749 7.18835C13.4749 8.53839 12.3668 9.63281 11 9.63281C9.6331 9.63281 8.52504 8.53839 8.52504 7.18835C8.52504 5.83832 9.6331 4.7439 11 4.7439C12.3668 4.7439 13.4749 5.83832 13.4749 7.18835ZM9.76235 13.2995C9.76235 14.6495 8.65429 15.7439 7.28743 15.7439C5.92056 15.7439 4.8125 14.6495 4.8125 13.2995C4.8125 11.9494 5.92056 10.855 7.28743 10.855C8.65429 10.855 9.76235 11.9494 9.76235 13.2995ZM14.7125 15.7439C16.0793 15.7439 17.1874 14.6495 17.1874 13.2995C17.1874 11.9494 16.0793 10.855 14.7125 10.855C13.3456 10.855 12.2375 11.9494 12.2375 13.2995C12.2375 14.6495 13.3456 15.7439 14.7125 15.7439Z"
      fill="#F9F9FA"
      fillRule="evenodd"
      opacity="0.6"
    />
    <defs>
      <linearGradient
        gradientUnits="userSpaceOnUse"
        id="paint0_linear"
        x1="23.7188"
        x2="3.41317"
        y1="-3.78125"
        y2="29.9014"
      >
        <stop stopColor="#FF8845" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);
