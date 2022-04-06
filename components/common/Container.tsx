interface Props {
  children: React.ReactElement;
  className: String;
}

const Container = ({ children, className }: Props) => (
  <div className={`bg-sapien-neutral-800 lg:rounded-t-3xl p-5 ${className}`}>
    {children}
  </div>
)

export default Container;
