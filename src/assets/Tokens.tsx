const Tokens = ({ style }: { style?: React.CSSProperties }) => {
  return (
    <svg
      fill="none"
      height="18"
      style={style}
      viewBox="0 0 18 18"
      width="18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        r="8"
        stroke="#6200EA"
        strokeWidth="2"
        transform="matrix(-1 0 0 1 9 9)"
      />
      <path
        clipRule="evenodd"
        d="M9.00007 4.19995L7.70227 6.96462L4.80007 7.41068L6.90007 9.56147L6.40447 12.6L9.00007 11.1646L11.5957 12.6L11.1001 9.56147L13.2001 7.41068L10.2979 6.96462L9.00007 4.19995Z"
        fill="#6200EA"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default Tokens;
