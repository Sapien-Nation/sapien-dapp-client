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
import type { Content } from 'tools/types/content';

const contents = [
  {
    id: '42d7ee82-c4e4-4d5c-85c4-9428a951386a',
    body: '<p style="margin:2rem 0 0 0;">Crypto wipeout deepens to $640 Billion as Ether leads declines even more Crypto wipeout!</p>',
    createdAt: '2021-08-10T12:43:11.423Z',
    deletedAt: null,
    canEdit: false,
    canDelete: false,
    type: 'POST',
    postId: '',
    topics: [],
    group: {
      id: '1',
      name: 'Main square',
      type: 'SQUARE',
    },
    author: {
      id: 'ffce58dd-3f3a-4614-abfa-41a83da9d3d2',
      displayName: 'betest',
      userName: 'betest',
      avatar: '',
    },
    tribe: {
      id: '71dd18bc-8967-4ae9-85d1-c8f7762cdda0',
      name: 'whathevertribetest',
    },
    imagePreview: null,
  },
  {
    id: 'a7c16607-4100-48f2-84fc-b6468e5c9c40',
    body: '<p style="margin:2rem 0 0 0;">Crypto wipeout deepens to $640 Billion as Ether leads declines even more Crypto wipeout!</p>',
    createdAt: '2021-08-03T04:23:07.168Z',
    deletedAt: null,
    canEdit: false,
    canDelete: false,
    type: 'POST',
    postId: '',
    topics: [],
    group: {
      id: '2',
      name: 'Main square',
      type: 'SQUARE',
    },
    author: {
      id: 'ffce58dd-3f3a-4614-abfa-41a83da9d3d2',
      displayName: 'betest',
      userName: 'betest',
      avatar: '',
    },
    tribe: {
      id: '71dd18bc-8967-4ae9-85d1-c8f7762cdda0',
      name: 'whathevertribetest',
    },
    imagePreview: null,
  },
  {
    id: 'c8732819-532b-4529-8973-ad157b6d5785',
    body: '<p style="margin:2rem 0 0 0;">Crypto wipeout deepens to $640 Billion as Ether leads declines even more Crypto wipeout!</p>',
    createdAt: '2021-08-03T04:11:22.316Z',
    deletedAt: null,
    canEdit: false,
    canDelete: false,
    type: 'POST',
    postId: '',
    topics: [],
    group: {
      id: '3',
      name: 'Main square',
      type: 'SQUARE',
    },
    author: {
      id: 'ffce58dd-3f3a-4614-abfa-41a83da9d3d2',
      displayName: 'betest',
      userName: 'betest',
      avatar: '',
    },
    tribe: {
      id: '71dd18bc-8967-4ae9-85d1-c8f7762cdda0',
      name: 'whathevertribetest',
    },
    imagePreview: null,
  },
];

const TopCreators = () => {
  return (
    <List style={{ padding: '1rem 0', display: 'grid', gridGap: '1.5rem' }}>
      {contents.map((content) => {
        return (
          <li key={content.id}>
            {/* 
              // @ts-ignore */}
            <ContentItem key={content.id} content={content} />
          </li>
        );
      })}
    </List>
  );
};

export default TopCreators;
