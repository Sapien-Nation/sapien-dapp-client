// next
import { useRouter } from 'next/router';

// types
import { Square } from 'tools/types/square/view';

// components
import { Query } from 'components/common';

interface Props {
  avatar: string;
  cover: string;
}

const Header = ({ avatar, cover }: Props) => {
  const { query } = useRouter();

  return (
    <Query apiUrl={query.squareid ? `/api/square/${query.squareid}` : ''}>
      {(square: Square) => {
        return (
          <div>
            <img alt="Some Alt" src={avatar} />
            <img alt="Some Alt" src={cover} />
            <span>Square Header: {square.id}</span>
          </div>
        );
      }}
    </Query>
  );
};

export default Header;
