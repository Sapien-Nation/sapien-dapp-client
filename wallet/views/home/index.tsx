interface Props {
  onDeposit: () => void;
}

const Home = ({ onDeposit }: Props) => {
  const tokens = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="grid gap-2 grid-cols-3">
      <button onClick={onDeposit}>Deposit ((plus icon))</button>
      {[tokens[0], tokens[1]].map((token) => {
        return <div key={token}>Token</div>;
      })}
      {tokens.splice(2).map((token) => {
        return <div key={token}>Token</div>;
      })}
    </div>
  );
};

export default Home;
