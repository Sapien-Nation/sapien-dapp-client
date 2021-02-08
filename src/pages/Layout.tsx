interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateAreas: "'sidebar main'",
      gridTemplateColumns: '72px 228px auto',
      height: '100vh',
      width: '100vw'
    }}
  >
    {children}
  </div>
);

export default Layout;
