export interface Props {
  hasNextPage: boolean;
  height: number;
  itemSize: number;
  items: Array<any>;
  loadMore: () => Promise<any>;
  loadingComponent: React.ReactElement;
  renderItem: (data: any) => React.ReactElement;
  useWindowScroll?: boolean;
  width: number | string;
}

const InfiniteScroll = () => {
  return <>TODO</>;
};

export default InfiniteScroll;
