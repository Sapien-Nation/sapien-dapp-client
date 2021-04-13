import { cache } from 'swr';
import MockAdapter from 'axios-mock-adapter';

// utils
import { createRandomString, render, screen, user, waitFor } from 'utils/tests';

// api
import axios from 'api';

// mocks
import { mockFile } from 'mocks/file';
import { mockChannel } from 'tools/mocks/channel';

// components
import EditChannel from 'components/channels/EditChannel';

const onClose = jest.fn();
const defaultProps = {
  onClose,
};

const renderComponent = () => render(<EditChannel {...defaultProps} />);

const channel = mockChannel();
window.URL.createObjectURL = jest.fn();

afterEach(() => {
  (window as any).URL.createObjectURL.mockReset();
});

beforeEach(() => {
  cache.set('/api/channels/details', { channel });
  jest.clearAllMocks();
});

test('Edit Channel', async () => {
  const mock = new MockAdapter(axios);
  renderComponent();

  expect(
    screen.getByRole('dialog', { name: /edit channel/i })
  ).toBeInTheDocument();

  // Settings
  expect(screen.getByRole('textbox', { name: /name/i })).toHaveValue(
    channel.name
  );
  expect(screen.getByRole('textbox', { name: /description/i })).toHaveValue(
    channel.description
  );

  // Validation
  await waitFor(() => {
    user.clear(screen.getByRole('textbox', { name: /name/i }));
    user.clear(screen.getByRole('textbox', { name: /description/i }));
  });

  await waitFor(() =>
    user.click(screen.getByRole('button', { name: /save changes/i }))
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

  user.click(screen.getByRole('button', { name: /save changes/i }));

  await waitFor(() => {
    expect(screen.getByText(/name is too long/i)).toBeInTheDocument();
    expect(screen.getByText(/description is too long/i)).toBeInTheDocument();
  });

  // Updated values
  await waitFor(() => {
    user.clear(screen.getByRole('textbox', { name: /name/i }));
    user.clear(screen.getByRole('textbox', { name: /description/i }));
    user.type(
      screen.getByRole('textbox', { name: /name/i }),
      createRandomString(36)
    );
    user.type(
      screen.getByRole('textbox', { name: /description/i }),
      createRandomString(36)
    );

    user.upload(
      screen.getByLabelText(/avatar/i) as HTMLInputElement,
      mockFile()
    );
    user.upload(
      screen.getByLabelText(/cover/i) as HTMLInputElement,
      mockFile()
    );
  });

  // onSubmit
  // onError
  const error = { message: 'Edit Channel Error' };
  mock.onPut('/api/channels/details').reply(400, error);
  await waitFor(() => {
    user.click(screen.getByRole('button', { name: /save changes/i }));
  });
  await waitFor(() => {
    expect(screen.getByText(error.message)).toBeInTheDocument();
    expect(onClose).not.toHaveBeenCalled();
  });

  // onSuccess
  mock.onPut('/api/channels/details').reply(200);
  user.click(screen.getByRole('button', { name: /save changes/i }));

  await waitFor(() => {
    expect(onClose).toHaveBeenCalled();
  });

  // Delete Channel
  expect(
    screen.getByRole('button', { name: /delete channel/i })
  ).toBeInTheDocument();
  user.click(screen.getByRole('button', { name: /delete channel/i }));

  // onSubmit
  // onError
  onClose.mockClear();
  mock.onPut('/api/channels/details').reply(400, error);
  await waitFor(() => {
    user.click(screen.getByRole('button', { name: /save changes/i }));
  });
  await waitFor(() => {
    expect(screen.getByText(error.message)).toBeInTheDocument();
    expect(onClose).not.toHaveBeenCalled();
  });

  // onSuccess
  mock.onPut('/api/channels/details').reply(200);
  user.click(screen.getByRole('button', { name: /save changes/i }));

  await waitFor(() => {
    expect(onClose).toHaveBeenCalled();
  });

  // RSS
  user.click(screen.getByRole('tab', { name: /RSS Feeds/i }));
  await waitFor(() => {
    expect(screen.getByText(/\+ Add More/i)).toBeInTheDocument();
  });

  // validation
  await waitFor(() => {
    user.click(screen.getByRole('textbox', { name: /url/i }));
  });
  await waitFor(() => {
    user.keyboard('{Enter}');
  });

  // Valid Url
  expect(screen.getByText(/Please enter a valid url/i)).toBeInTheDocument();

  await waitFor(() => {
    user.type(
      screen.getByRole('textbox', { name: /url/i }),
      'http://sapien.network'
    );
  });

  user.keyboard('{Enter}');

  // onSubmit
  // onError
  onClose.mockClear();
  mock.onPut('/api/channels/details').reply(400, error);

  await waitFor(() => {
    user.click(screen.getByRole('button', { name: /save changes/i }));
  });
  await waitFor(() => {
    expect(screen.getByText(error.message)).toBeInTheDocument();
    expect(onClose).not.toHaveBeenCalled();
  });

  // onSuccess
  mock.onPut('/api/channels/details').reply(200);
  user.click(screen.getByRole('button', { name: /save changes/i }));

  await waitFor(() => {
    expect(onClose).toHaveBeenCalled();
  });
});
