const DirectMessagesPOCData = [
  {
    id: '1',
    profile: {
      avatar: 'https://material-ui.com/static/images/avatar/1.jpg',
      avatar_original: 'https://material-ui.com/static/images/avatar/1.jpg',
      cover: 'https://material-ui.com/static/images/avatar/1.jpg',
      cover_original: 'https://material-ui.com/static/images/avatar/1.jpg',
      id: '1',
      username: 'ollie_hampton',
      displayName: 'Ollie Hampton',
      followingCount: '124',
      followersCount: '345',
      postsCount: '2',
      featuredBadges: [
        {
          name: '',
          avatar: '',
        },
      ],
      isFollowing: 'false',
    },
    messages: [
      {
        id: '1',
        body: 'Let’s go!',
        createdAt: '2021-08-09T04:35:15.149Z',
        seenAt: '2021-08-09T04:35:15.149Z',
        authorId: '1',
        badgesCount: '',
        grantedBadges: [
          {
            avatar: '',
            name: '',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    profile: {
      id: '2',
      avatar: 'https://material-ui.com/static/images/avatar/2.jpg',
      avatar_original: 'https://material-ui.com/static/images/avatar/2.jpg',
      cover: 'https://material-ui.com/static/images/avatar/1.jpg',
      cover_original: 'https://material-ui.com/static/images/avatar/1.jpg',
      username: 'michael_perry',
      displayName: 'Michael Perry',
      followingCount: '300',
      followersCount: '200',
      postsCount: '6',
      featuredBadges: [
        {
          name: '',
          avatar: '',
        },
      ],
      isFollowing: 'true',
    },
    messages: [
      {
        id: '1',
        body: 'Let’s go!',
        createdAt: '2021-08-09T04:35:15.149Z',
        seenAt: '2021-08-09T04:35:15.149Z',
        authorId: '1',
        badgesCount: '',
        grantedBadges: [
          {
            avatar: '',
            name: '',
          },
        ],
      },
    ],
  },
  {
    id: '3',
    profile: {
      id: '1',
      avatar: 'https://material-ui.com/static/images/avatar/3.jpg',
      avatar_original: 'https://material-ui.com/static/images/avatar/3.jpg',
      cover: 'https://material-ui.com/static/images/avatar/3.jpg',
      cover_original: 'https://material-ui.com/static/images/avatar/3.jpg',
      username: 'amanda_ben',
      displayName: 'Amanda Ben',
      followingCount: '124',
      followersCount: '345',
      postsCount: '21',
      featuredBadges: [
        {
          name: '',
          avatar: '',
        },
      ],
      isFollowing: 'false',
    },
    messages: [],
  },
];

export const getDirectMessageHeader = (messageID: string) => {
  return DirectMessagesPOCData.find(({ id }) => id === messageID);
};
