export const getServerSideProps = async ({ res }) => {
  if (res) {
    res.writeHead(301, {
      Location: 'client/sapien',
    });
    res.end();
  }

  return {};
};

const Index = () => <div />;
export default Index;
