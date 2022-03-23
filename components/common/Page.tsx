interface Props {
  children: React.ReactNode;
  header?: React.ReactElement;
  footer?: React.ReactElement;
}

const Page = ({ children, header, footer }: Props) => (
  <>
    {header}
    <div className="flex-1">{children}</div>
    {footer && <div className="sticky bottom-0">{footer}</div>}
  </>
);

export default Page;
