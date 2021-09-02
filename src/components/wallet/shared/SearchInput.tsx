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
  customHeight?: string;
  placeholder?: string;
  list?: any;
  dispatchWalletState?: (state: any) => void;
  walletOpen?: ContentAuthor | boolean;
}

const SearchInput = ({
  ItemComponent,
  customHeight = 'auto',
  placeholder = 'Search for a badges',
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
    : list.filter(({ name, displayName, userName }) =>
        (name || displayName || userName)
          .toLowerCase()
          .includes(searchTerm.toLocaleLowerCase())
      );

  return (
    <div style={{ height: customHeight, overflow: 'hidden' }}>
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
        placeholder={placeholder}
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
            avatar={item.avatar}
            blockchainId={item.blockchainId}
            description={item.description}
            dispatchWalletState={dispatchWalletState}
            displayName={item.displayName}
            id={item.id}
            name={item.name}
            publicAddress={item.publicAddress}
            quantity={item.quantity}
            spn={item.spn}
            userIsAdmin={item.userIsAdmin}
            userName={item.userName}
            walletOpen={walletOpen}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchInput;
