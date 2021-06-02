interface Props {
  label: string;
  symbol: string;
}

const Emoji = ({ label, symbol }: Props) => (
  <span
    aria-hidden={label ? 'false' : 'true'}
    aria-label={label ? label : ''}
    className="emoji"
    role="img"
  >
    {symbol}
  </span>
);

export default Emoji;
