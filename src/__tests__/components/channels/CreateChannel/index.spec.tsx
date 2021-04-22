import { cache } from 'swr';

import MockAdapter from 'axios-mock-adapter';

// api
import axios from 'api';

// utils
import { createRandomString, render, screen, user, waitFor } from 'utils/tests';

// mocks
import { mockFile } from 'mocks/file';
import { mockTribes } from 'tools/mocks/tribe';
import { mockTribeBadges, mockSubscriptionBadges } from 'tools/mocks/badges';

// components
import CreateChannel from 'components/channels/CreateChannel';

// mock data
const tribes = mockTribes();
const tribeBadges = mockTribeBadges();
const subscriptionBadges = mockSubscriptionBadges();
const onClose = jest.fn();
const defaultProps = {
  onClose,
};

const renderComponent = () => render(<CreateChannel {...defaultProps} />);

window.URL.createObjectURL = jest.fn();

afterEach(() => {
  (window as any).URL.createObjectURL.mockReset();
});

beforeEach(() => {
  cache.set('/api/tribes/followed', { tribes });
  cache.set('/api/tribes/badges', {
    tribeBadges,
    subscriptionBadges,
  });
  jest.clearAllMocks();
});

test('Create Channel', async () => {
  const mock = new MockAdapter(axios);
  renderComponent();

  await waitFor(() => {
    expect(
      screen.getByRole('dialog', { name: /new channel step 1 \/ 4/i })
    ).toBeInTheDocument();
  });

  // SummaryStep
  // validation

  await waitFor(() =>
    user.click(screen.getByRole('button', { name: /next/i }))
  );

  // required
  expect(screen.getByText(/name is required/i)).toBeInTheDocument();
  expect(screen.getByText(/description is required/i)).toBeInTheDocument();

  // maxLength
  await waitFor(() => {
    user.type(
      screen.getByRole('textbox', { name: /name/i }),
      createRandomString(37)
    );
    user.type(
      screen.getByRole('textbox', { name: /description/i }),
      createRandomString(61)
    );
  });

  await waitFor(() =>
    user.click(screen.getByRole('button', { name: /next/i }))
  );

  expect(screen.getByText(/name is to long/i)).toBeInTheDocument();
  expect(screen.getByText(/description is to long/i)).toBeInTheDocument();

  const newChannel = createRandomString(36);
  await waitFor(() => {
    user.clear(screen.getByRole('textbox', { name: /name/i }));
    user.clear(screen.getByRole('textbox', { name: /description/i }));
    user.type(screen.getByRole('textbox', { name: /name/i }), newChannel);
    user.type(
      screen.getByRole('textbox', { name: /description/i }),
      createRandomString(60)
    );
    user.click(screen.getByRole('button', { name: /next/i }));
  });

  await waitFor(() => {
    expect(
      screen.getByRole('dialog', { name: /new channel step 2 \/ 4/i })
    ).toBeInTheDocument();
  });
  expect(screen.getByRole('heading', { name: /viewers/i })).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { name: /contributors/i })
  ).toBeInTheDocument();
  expect(screen.getByText('Subscription')).toBeInTheDocument();
  expect(
    screen.getByText(
      'Select at least 1 badge to be granted to the channel’s subscribers'
    )
  ).toBeInTheDocument();

  expect(screen.getAllByTestId('tribe-badges')).toHaveLength(
    tribeBadges.length
  );
  expect(screen.getAllByTestId('tribe-subscription-badges')).toHaveLength(
    subscriptionBadges.length
  );

  // Media Step
  await waitFor(() => {
    user.click(screen.getByRole('button', { name: /next/i }));
  });

  await waitFor(() => {
    expect(
      screen.getByRole('dialog', { name: /new channel step 3 \/ 4/i })
    ).toBeInTheDocument();
  });

  // validation
  // required
  await waitFor(() => {
    user.click(screen.getByRole('button', { name: /next/i }));
  });

  expect(screen.getByText('Avatar is required')).toBeInTheDocument();
  expect(screen.getByText('Cover is required')).toBeInTheDocument();
  await waitFor(() => {
    user.upload(
      screen.getByLabelText(/avatar/i) as HTMLInputElement,
      mockFile()
    );
    user.upload(
      screen.getByLabelText(/cover/i) as HTMLInputElement,
      mockFile()
    );
  });

  expect(screen.queryByText('Avatar is required')).not.toBeInTheDocument();
  expect(screen.queryByText('Cover is required')).not.toBeInTheDocument();

  await waitFor(() => {
    user.click(screen.getByRole('button', { name: /next/i }));
  });

  // RSS Step
  await waitFor(() => {
    expect(
      screen.getByRole('dialog', { name: /new channel step 4 \/ 4/i })
    ).toBeInTheDocument();
  });

  // validation
  // required
  await waitFor(() => {
    user.click(screen.getByRole('button', { name: /create/i }));
  });

  expect(screen.getByText(/label is required/i)).toBeInTheDocument();
  await waitFor(() => {
    user.type(
      screen.getByRole('textbox', { name: /label/i }),
      createRandomString(37)
    );
  });

  // maxLength
  expect(screen.getByText(/label is to long/i)).toBeInTheDocument();

  await waitFor(() => {
    user.clear(screen.getByRole('textbox', { name: /label/i }));
    user.type(
      screen.getByRole('textbox', { name: /label/i }),
      createRandomString(36)
    );
  });

  // onError
  const error = { message: 'Create Channel Error' };
  mock.onPost('/api/channels/create').reply(400, error);
  user.click(screen.getByRole('button', { name: /create/i }));

  await waitFor(() => {
    expect(screen.getByText(error.message)).toBeInTheDocument();
    expect(onClose).not.toHaveBeenCalled();
  });

  // onSuccess
  mock.onPost('/api/channels/create').reply(200, { data: '1001' });
  user.click(screen.getByRole('button', { name: /create/i }));

  await waitFor(() => {
    expect(onClose).not.toHaveBeenCalled();
  });
});