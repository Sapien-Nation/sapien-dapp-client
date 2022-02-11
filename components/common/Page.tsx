import { tw } from 'twind';

interface Props {
  children: React.ReactElement;
  header?: React.ReactElement;
  footer?: React.ReactElement;
}

const Page = ({ children, header, footer }: Props) => (
  <>
    {header}
    <div className={tw`flex-1`}>{children}</div>
    <div className={tw`sticky bottom-0`}>{footer}</div>
  </>
);

export default Page;
