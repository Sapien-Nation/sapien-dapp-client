// interface Props {
//   label: string;
//   symbol: string;
// }

const EmojiComponent = (props) => {
  return (
    <span
      aria-hidden={props.decoratedText ? 'false' : 'true'}
      aria-label={props.decoratedText ? props.decoratedText : ''}
      className="emoji"
      role="img"
    >
      {props.decoratedText}
    </span>
  );
};

export default EmojiComponent;
