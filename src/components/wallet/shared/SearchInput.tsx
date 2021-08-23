import { useState } from 'react';

// mui
import { InputAdornment, TextField } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';

// types
import type { ContentAuthor } from 'tools/types/content';

const mockList = [
  {
    name: 'Badge 1',
    description: 'Description goes here...',
    spn: 250,
  },
  {
    name: 'Badge 2',
    description: 'Description goes here...',
    spn: 150,
  },
  {
    name: 'Badge 3',
    description: 'Description goes here...',
    spn: 300,
  },
  {
    name: 'Badge 5',
    description: 'Description goes here...',
    spn: 200,
  },
  {
    name: 'Badge 5',
    description: 'Description goes here...',
    spn: 250,
  },
];

interface Props {
  ItemComponent: any;
  list?: any;
  dispatchWalletState?: (state: any) => void;
  walletOpen?: ContentAuthor | boolean;
}

const SearchInput = ({
  ItemComponent,
  list = mockList,
  dispatchWalletState,
  walletOpen,
}: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const results = !searchTerm
    ? list
    : list.filter(({ name }) =>
        name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      );

  return (
    <>
      <TextField
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          style: {
            borderRadius: 90,
          },
        }}
        autoComplete="off"
        id="search"
        inputProps={{
          autoComplete: 'none',
        }}
        label=""
        placeholder="Search for badges"
        style={{
          marginBottom: 0,
        }}
        value={searchTerm}
        onChange={handleChange}
      />
      <div style={{ height: '100%', overflow: 'auto' }}>
        {results.map((item, index) => (
          <ItemComponent
            key={index}
            blockchainId={item.blockchainId}
            description={item.description}
            dispatchWalletState={dispatchWalletState}
            id={item.id}
            name={item.name}
            spn={item.spn}
            walletOpen={walletOpen}
          />
        ))}
      </div>
    </>
  );
};

export default SearchInput;
