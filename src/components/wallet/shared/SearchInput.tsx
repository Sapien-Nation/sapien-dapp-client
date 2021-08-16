import { useState } from 'react';

// mui
import { InputAdornment, TextField } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';

// types
import type { Badge as BadgeType } from 'tools/types/wallet/badge';
import type { ContentAuthor } from 'tools/types/content';

// emums
import { MyBadgesSteps, StoreSteps } from '../WalletEnums';

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
  setCurrentBadge?: (Badge: BadgeType) => void;
  setCurrentReceiver?: (Receiver: any) => void;
  setShowTabsMenu?: (showTab: boolean) => void;
  setStep?: (step: StoreSteps | MyBadgesSteps) => void;
  setTransition?: (transition: string) => void;
  setShowAuthorToBadge?: (status: boolean) => void;
  walletOpen?: ContentAuthor | boolean;
}

const SearchInput = ({
  ItemComponent,
  list = mockList,
  setCurrentBadge,
  setCurrentReceiver,
  setShowTabsMenu,
  setStep,
  setTransition,
  setShowAuthorToBadge,
  walletOpen,
}: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const results = searchTerm
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
            description={item.description}
            name={item.name}
            setCurrentBadge={setCurrentBadge}
            setCurrentReceiver={setCurrentReceiver}
            setShowAuthorToBadge={setShowAuthorToBadge}
            setShowTabsMenu={setShowTabsMenu}
            setStep={setStep}
            setTransition={setTransition}
            spn={item.spn}
            walletOpen={walletOpen}
          />
        ))}
      </div>
    </>
  );
};

export default SearchInput;
