export const SubscriptionBadge = ({
  color = '#0BC4DD',
}: {
  color?: string;
}) => (
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
      fillOpacity="0.92"
      r="11"
    />
    <path
      clipRule="evenodd"
      d="M11.8955 6.61415C11.5277 5.87427 10.4723 5.87427 10.1045 6.61415L9.3213 8.18991C9.17523 8.4838 8.89425 8.68731 8.56947 8.73445L6.82784 8.98726C6.00577 9.10659 5.67917 10.1181 6.27624 10.6957L7.52608 11.9046C7.76391 12.1347 7.87255 12.4675 7.81624 12.7936L7.52027 14.5073C7.37934 15.3233 8.23459 15.9472 8.96862 15.5638L10.5371 14.7447C10.8271 14.5932 11.1729 14.5932 11.4629 14.7447L13.0314 15.5638C13.7654 15.9472 14.6207 15.3233 14.4797 14.5073L14.1838 12.7936C14.1275 12.4675 14.2361 12.1347 14.4739 11.9046L15.7238 10.6957C16.3208 10.1181 15.9942 9.10659 15.1722 8.98726L13.4305 8.73445C13.1057 8.68731 12.8248 8.4838 12.6787 8.18991L11.8955 6.61415Z"
      fill="white"
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
        <stop stopColor="#7EFFA2" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);
