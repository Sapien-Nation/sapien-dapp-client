// helpers
import { subtractDays } from 'utils/date';

const messages = [
  {
    id: '1',
    authorID: '1000',
    displayName: 'Ethan Escareño',
    avatarUrl:
      'https://cdn.discordapp.com/avatars/557967782516490270/6a43bfb06a8150801b5c3407c8103339.webp?size=240',
    message:
      'I was wondering, do we have the Figma link for the Create room dialog?',
    createdAt: subtractDays(new Date(), 4).toISOString(),
  },
  {
    id: '2',
    authorID: '1000',
    displayName: 'Ethan Escareño',
    avatarUrl:
      'https://cdn.discordapp.com/avatars/557967782516490270/6a43bfb06a8150801b5c3407c8103339.webp?size=240',
    message: 'Not sure if we even have a JIRA Ticket',
    createdAt: subtractDays(new Date(), 4).toISOString(),
  },
  {
    id: '3',
    authorID: '1000',
    displayName: 'Ethan Escareño',
    avatarUrl:
      'https://cdn.discordapp.com/avatars/557967782516490270/6a43bfb06a8150801b5c3407c8103339.webp?size=240',
    message: 'Will need to ask',
    createdAt: subtractDays(new Date(), 4).toISOString(),
  },
  {
    id: '4',
    authorID: '2000',
    displayName: 'Sabbir Ahmed',
    avatarUrl:
      'https://cdn.discordapp.com/avatars/521591994691092490/c8455efc9d69608406d495b70716b484.webp?size=240',
    message: 'Hey there Ethan!',
    createdAt: subtractDays(new Date(), 4).toISOString(),
  },
  {
    id: '5',
    authorID: '2000',
    displayName: 'Sabbir Ahmed',
    avatarUrl:
      'https://cdn.discordapp.com/avatars/521591994691092490/c8455efc9d69608406d495b70716b484.webp?size=240',
    message: 'Im not sure :S',
    createdAt: subtractDays(new Date(), 4).toISOString(),
  },
  {
    id: '6',
    authorID: '1000',
    displayName: 'Ethan Escareño',
    avatarUrl:
      'https://cdn.discordapp.com/avatars/557967782516490270/6a43bfb06a8150801b5c3407c8103339.webp?size=240',
    message: 'Yoyo',
    createdAt: subtractDays(new Date(), 3).toISOString(),
  },
  {
    id: '7',
    authorID: '2000',
    displayName: 'Sabbir Ahmed',
    avatarUrl:
      'https://cdn.discordapp.com/avatars/521591994691092490/c8455efc9d69608406d495b70716b484.webp?size=240',
    message: 'Sorry about that',
    createdAt: subtractDays(new Date(), 3).toISOString(),
  },
  {
    id: '8',
    authorID: '2000',
    displayName: 'Sabbir Ahmed',
    avatarUrl:
      'https://cdn.discordapp.com/avatars/521591994691092490/c8455efc9d69608406d495b70716b484.webp?size=240',
    message: 'Maybe Moises know?',
    createdAt: subtractDays(new Date(), 3).toISOString(),
  },
  {
    id: '9',
    authorID: '3000',
    displayName: 'Moises Ocañas',
    avatarUrl:
      'https://cdn.discordapp.com/avatars/488565611941593099/afef69595140eacb65e90eeea0febd07.webp?size=240',
    message: 'Hey guys just see the message',
    createdAt: '2022-03-30T11:42:32.761Z',
  },
  {
    id: '10',
    authorID: '3000',
    displayName: 'Moises Ocañas',
    avatarUrl:
      'https://cdn.discordapp.com/avatars/488565611941593099/afef69595140eacb65e90eeea0febd07.webp?size=240',
    message: 'Yeah i have it, let me find it (=',
    createdAt: '2022-03-30T15:42:36.761Z',
  },
  {
    id: '11',
    authorID: '3000',
    displayName: 'Moises Ocañas',
    avatarUrl:
      'https://cdn.discordapp.com/avatars/488565611941593099/afef69595140eacb65e90eeea0febd07.webp?size=240',
    message: 'Here is the link',
    createdAt: '2022-03-30T15:42:39.761Z',
  },
  {
    id: '12',
    authorID: '1000',
    displayName: 'Ethan Escareño',
    avatarUrl:
      'https://cdn.discordapp.com/avatars/557967782516490270/6a43bfb06a8150801b5c3407c8103339.webp?size=240',
    message: 'Awesome!',
    createdAt: '2022-03-30T15:42:55.761Z',
  },
  {
    id: '13',
    authorID: '1000',
    displayName: 'Ethan Escareño',
    avatarUrl:
      'https://cdn.discordapp.com/avatars/557967782516490270/6a43bfb06a8150801b5c3407c8103339.webp?size=240',
    message:
      'Alright i think the next work to do will be start with the Rooms UI',
    createdAt: '2022-03-30T15:43:32.761Z',
  },
  {
    id: '14',
    authorID: '1000',
    displayName: 'Ethan Escareño',
    avatarUrl:
      'https://cdn.discordapp.com/avatars/557967782516490270/6a43bfb06a8150801b5c3407c8103339.webp?size=240',
    message: 'And wait for Mabed for the Websockets thing',
    createdAt: '2022-03-30T15:44:32.761Z',
  },
  {
    id: '15',
    authorID: '2000',
    displayName: 'Sabbir Ahmed',
    avatarUrl:
      'https://cdn.discordapp.com/avatars/521591994691092490/c8455efc9d69608406d495b70716b484.webp?size=240',
    message: 'I can start making the scroll UI',
    createdAt: '2022-04-30T11:44:32.761Z',
  },
  {
    id: '16',
    authorID: '2000',
    displayName: 'Sabbir Ahmed',
    avatarUrl:
      'https://cdn.discordapp.com/avatars/521591994691092490/c8455efc9d69608406d495b70716b484.webp?size=240',
    message: 'Then we just need to focus on the Chat and Websockets',
    createdAt: '2022-04-30T12:44:32.761Z',
  },
  {
    id: '17',
    authorID: '2000',
    displayName: 'Sabbir Ahmed',
    avatarUrl:
      'https://cdn.discordapp.com/avatars/521591994691092490/c8455efc9d69608406d495b70716b484.webp?size=240',
    message: 'makes sense?',
    createdAt: '2022-04-30T15:44:32.761Z',
  },
  {
    id: '18',
    authorID: '1000',
    displayName: 'Ethan Escareño',
    avatarUrl:
      'https://cdn.discordapp.com/avatars/557967782516490270/6a43bfb06a8150801b5c3407c8103339.webp?size=240',
    message: 'yes!',
    createdAt: '2022-04-30T15:46:32.761Z',
  },
  {
    id: '19',
    authorID: '1000',
    displayName: 'Ethan Escareño',
    avatarUrl:
      'https://cdn.discordapp.com/avatars/557967782516490270/6a43bfb06a8150801b5c3407c8103339.webp?size=240',
    message: 'GM',
    createdAt: '2022-03-31T18:30:14.338Z',
  },
];

export default messages;
