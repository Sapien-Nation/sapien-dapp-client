// types
import type { MainFeedTribe } from 'tools/types/tribe';

interface Props {
  tribe: MainFeedTribe;
}

const MainChannelHeader = ({ tribe }: Props) => {
  return <h1>{tribe.name}</h1>;
};

export default MainChannelHeader;
