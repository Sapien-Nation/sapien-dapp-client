/* eslint-disable @typescript-eslint/no-unused-vars */
import numeral from 'numeral';

//mui
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
} from '@material-ui/core';

// components
import ContentItem from './contents';

// types
import type { Badge } from 'tools/types/wallet/badge';

const badges = [
  {
    id: '42d7ee82-c4e4-4d5c-85c4-9428a951386a',
    blocchainId: 123,
    name: 'Badge 1',
    description: 'Badge 1 detail',
    avatar: '/fixtures/normal/badge1.png',
    spn: 10,
    quantity: 5,
  },
  {
    id: '02d7ee82-c4e4-4d5c-85c4-9428a951386a',
    blocchainId: 1234,
    name: 'Badge 2',
    description: 'Badge 2 detail',
    avatar: '/fixtures/normal/badge2.png',
    spn: 15,
    quantity: 10,
  },
  {
    id: '12d7ee82-c4e4-4d5c-85c4-9428a951386a',
    blocchainId: 12345,
    name: 'Badge 3',
    description: 'Badge 3 detail',
    avatar: '/fixtures/normal/badge3.png',
    spn: 20,
    quantity: 15,
  },
  {
    id: '92d7ee82-c4e4-4d5c-85c4-9428a951386a',
    blocchainId: 12345,
    name: 'Badge 4',
    description: 'Badge 4 detail',
    avatar: '/fixtures/normal/badge4.png',
    spn: 20,
    quantity: 15,
  },
  {
    id: '82d7ee82-c4e4-4d5c-85c4-9428a951386a',
    blocchainId: 12345,
    name: 'Badge 5',
    description: 'Badge 5 detail',
    avatar: '/fixtures/normal/badge5.png',
    spn: 20,
    quantity: 15,
  },
];

const Badges = () => {
  return (
    <List style={{ padding: '1rem 0', display: 'flex', gridGap: '1rem' }}>
      {badges.map((badge: Badge) => {
        return (
          <li key={badge.id}>
            {/* 
              // @ts-ignore */}
            <img alt={badge.name} height="20" src={badge.avatar} width="20" />
          </li>
        );
      })}
    </List>
  );
};

export default Badges;
