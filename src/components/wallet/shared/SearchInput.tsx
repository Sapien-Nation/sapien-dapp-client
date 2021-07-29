import { useState } from 'react';

// mui
import { InputAdornment, TextField } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';

// types
import type { Badge as BadgeType } from 'tools/types/wallet/badge';

// emums
import { MyBadgesSteps, StoreSteps } from '../WalletEnums';

const list = [
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
  setShowTabsMenu?: (showTab: boolean) => void;
  setStep?: (step: StoreSteps | MyBadgesSteps) => void;
  setCurrentBadge?: (Badge: BadgeType) => void;
}

const SearchInput = ({
  ItemComponent,
  setCurrentBadge,
  setShowTabsMenu,
  setStep,
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
      <>
        {results.map((item, index) => (
          <ItemComponent
            key={index}
            description={item.description}
            name={item.name}
            setCurrentBadge={setCurrentBadge}
            setShowTabsMenu={setShowTabsMenu}
            setStep={setStep}
            spn={item.spn}
          />
        ))}
      </>
    </>
  );
};

export default SearchInput;
