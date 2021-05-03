// mui
import { Grid } from '@material-ui/core';

// components
import { Select } from 'components/common';

const sortOptions = [
  { name: 'All', value: 'all' },
  { name: 'Newest', value: 'newest' },
];

const dateOptions = [
  { name: 'All', value: 'all' },
  { name: 'Latest', value: 'latest' },
];

const creatorOptions = [
  { name: 'All', value: 'all' },
  { name: 'Latest', value: 'latest' },
];

interface Props {
  onSort: () => void;
  onSortDate: () => void;
  onSortCreator: () => void;
}

const Filters = ({ onSort, onSortDate, onSortCreator }: Props) => {
  return (
    <Grid
      container
      alignItems="flex-start"
      direction="row"
      gap={1.6}
      justifyContent="flex-start"
    >
      <Select
        defaultValue={sortOptions[0].value}
        label="Sort by"
        name="sortBy"
        options={sortOptions}
        onChange={onSort}
      />
      <Select
        defaultValue={dateOptions[0].value}
        label="Date"
        name="date"
        options={dateOptions}
        onChange={onSortDate}
      />
      <Select
        defaultValue={creatorOptions[0].value}
        label="Creator"
        name="creator"
        options={creatorOptions}
        onChange={onSortCreator}
      />
    </Grid>
  );
};

export default Filters;
