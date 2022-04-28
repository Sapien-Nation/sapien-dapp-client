// api
import { mintPassport } from 'api/passport';

// utils
import {
  cache,
  mockRouter,
  render,
  setUser,
  waitFor,
  screen,
  setAllTribes,
  user,
} from 'utils/testUtils';

// components
import MintPage from 'pages/mint';

// mocks
import { mockProfileTribe } from 'tools/mocks/tribe';

jest.mock('api/passport');

const tribe = mockProfileTribe();
const push = jest.fn();
const router = mockRouter({
  push,
  pathname: '/mint',
});

const tokenId = '1';
(mintPassport as jest.Mock).mockReturnValue({ tokenId });

const error = { message: 'Error' };
const getMintButton = () =>
  screen.getByRole('button', { name: 'Mint Passport' });

const renderPage = () => render(<MintPage />, { route: router });

beforeEach(() => {
  jest.clearAllMocks();

  setUser();
  cache.set('/core-api/passport/mint-checker', {
    code: 100,
    avatar: 'http://',
  });
});

test('mint passport', async () => {
  setAllTribes([tribe]);
  renderPage();

  expect(
    screen.getByRole('heading', {
      name: 'Find your tribe and ignite the new renaissance!',
    })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('img', {
      name: /sapien avatar transition/i,
    })
  ).toHaveAttribute('src', 'http://');
  expect(
    screen.getByText(/minting passport as wanna use other account\?/i)
  ).toBeInTheDocument();

  // on error
  (mintPassport as jest.Mock).mockRejectedValueOnce(error.message);
  await user.click(getMintButton());

  expect(await screen.findByText(error.message)).toBeInTheDocument();
  expect(mintPassport).toHaveBeenCalledTimes(1);

  // on success
  await user.click(getMintButton());

  await waitFor(() => {
    expect(mintPassport).toHaveBeenCalledTimes(2);
  });

  expect(push).toHaveBeenCalledWith(`/tribes/1000/passport?tokenID=${tokenId}`);
});

test('when already have a passport minted', () => {
  cache.set('/core-api/passport/mint-checker', { code: null });
  renderPage();

  expect(
    screen.getByRole('img', { name: 'People working on laptops' })
  ).toHaveAttribute(
    'src',
    'https://images.newindianexpress.com/uploads/user/imagelibrary/2021/11/27/w1200X800/Metaverse_is_Coming.jpg'
  );

  expect(
    screen.getByRole('link', {
      name: 'Launch App',
    })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('link', {
      name: 'Switch Account',
    })
  ).toBeInTheDocument();
  expect(
    screen.getByText(/You already have a Passport minted with the email/i)
  ).toBeInTheDocument();
});

test('Whe user need to buy a passport on dist apps', async () => {
  cache.set('/core-api/passport/mint-checker', { code: 101 });
  renderPage();

  expect(
    screen.getByRole('img', { name: 'People working on laptops' })
  ).toHaveAttribute(
    'src',
    'https://images.newindianexpress.com/uploads/user/imagelibrary/2021/11/27/w1200X800/Metaverse_is_Coming.jpg'
  );
  expect(
    screen.getByText(/To mint a passport, you need first to/i)
  ).toBeInTheDocument();
  expect(
    (
      screen.getByRole('link', {
        name: 'Buy a passport',
      }) as HTMLLinkElement
    ).href
  ).toBe('http://localhost/HOSTpassport/purchase');
});

test('when user need to finish passport flow on dist apps', async () => {
  cache.set('/core-api/passport/mint-checker', { code: 102 });
  renderPage();

  expect(
    screen.getByRole('img', { name: 'People working on laptops' })
  ).toHaveAttribute(
    'src',
    'https://images.newindianexpress.com/uploads/user/imagelibrary/2021/11/27/w1200X800/Metaverse_is_Coming.jpg'
  );
  expect(
    screen.getByText(
      /Please finish the avatar select flow and then come back to min/i
    )
  ).toBeInTheDocument();
  expect(
    (
      screen.getByRole('link', {
        name: 'Click here to continue',
      }) as HTMLLinkElement
    ).href
  ).toBe('http://localhost/HOSTpassport/purchase');
});
