// types
import type { NextPage } from 'next';

// components
import { Head } from 'components/common';

const FavoritesPageRender = () => {
  const renderView = () => <h1>TODO Favorites Page</h1>;

  return <>{renderView()}</>;
};

const FavoritesPage: NextPage = () => {
  return (
    <>
      <Head title="Favorites" />
      <FavoritesPageRender />
    </>
  );
};

export default FavoritesPage;
