const MetamaskLogo = () => {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 25 24"
      width="25"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect fill="url(#pattern0)" height="24" width="24" x="0.5" />
      <defs>
        <pattern
          height="1"
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
        >
          <use transform="scale(0.00454545)" xlinkHref="#image0" />
        </pattern>
        <image
          height="220"
          id="image0"
          width="220"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};

export default MetamaskLogo;