import { cache } from 'swr';
import MockAdapter from 'axios-mock-adapter';

// api
import axios from 'api';

// utils
import { createRandomString, render, screen, user, waitFor } from 'utils/tests';

// mocks
import { mockFile } from 'mocks/file';
import { mockTribe, mockTribePermission } from 'tools/mocks/tribe';

// components
import CreateTribe from 'components/tribe/CreateTribe';

// mocks
const permissions = mockTribePermission();
const tribes = [mockTribe({ permissions })];

const onClose = jest.fn();
const defaultProps = {
  onClose,
};

const renderComponent = () => render(<CreateTribe {...defaultProps} />);

window.URL.createObjectURL = jest.fn();

afterEach(() => {
  (window as any).URL.createObjectURL.mockReset();
});

beforeEach(() => {
  cache.set('/api/tribes/followed', { tribes });

  jest.clearAllMocks();
});

test('Create Tribe', async () => {
  const mock = new MockAdapter(axios);
  renderComponent();

  await waitFor(() => {
    expect(
      screen.getByRole('dialog', { name: /new tribe step 1 \/ 2/i })
    ).toBeInTheDocument();
  });

  // SummaryStep
  // validation

  await waitFor(() =>
    user.click(screen.getByRole('button', { name: /next/i }))
  );

  // required
  expect(screen.getByText(/name is required/i)).toBeInTheDocument();
  expect(
    screen.getByText(/unique identifier is required/i)
  ).toBeInTheDocument();
  expect(screen.getByText(/description is required/i)).toBeInTheDocument();

  // maxLength
  await waitFor(() => {
    user.type(
      screen.getByRole('textbox', { name: /name/i }),
      createRandomString(37)
    );
    user.type(
      screen.getByRole('textbox', { name: /unique identifier/i }),
      createRandomString(16)
    );
    user.type(
      screen.getByRole('textbox', { name: /description/i }),
      createRandomString(61)
    );
  });

  await waitFor(() =>
    user.click(screen.getByRole('button', { name: /next/i }))
  );

  expect(screen.getByText(/name its to long/i)).toBeInTheDocument();
  expect(
    screen.getByText(/unique identifier its to long/i)
  ).toBeInTheDocument();
  expect(screen.getByText(/description its to long/i)).toBeInTheDocument();

  const newTribe = createRandomString(36);
  await waitFor(() => {
    user.clear(screen.getByRole('textbox', { name: /name/i }));
    user.clear(screen.getByRole('textbox', { name: /unique identifier/i }));
    user.clear(screen.getByRole('textbox', { name: /description/i }));
    user.type(screen.getByRole('textbox', { name: /name/i }), newTribe);
    user.type(
      screen.getByRole('textbox', { name: /unique identifier/i }),
      createRandomString(15)
    );
    user.type(
      screen.getByRole('textbox', { name: /description/i }),
      createRandomString(60)
    );
    user.click(screen.getByRole('button', { name: /next/i }));
  });

  // Media Step
  await waitFor(() => {
    expect(
      screen.getByRole('dialog', { name: /new tribe step 2 \/ 2/i })
    ).toBeInTheDocument();
  });

  // validation
  // required
  await waitFor(() => {
    user.click(screen.getByRole('button', { name: /create/i }));
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

  expect(screen.queryByText('Cover is required')).not.toBeInTheDocument();
  expect(screen.queryByText('Avatar is required')).not.toBeInTheDocument();

  // onError
  const error = { message: 'Create Tribe Error' };
  mock.onPost('/api/tribes/create').reply(400, error);
  user.click(screen.getByRole('button', { name: /create/i }));

  await waitFor(() => {
    expect(screen.getByText(error.message)).toBeInTheDocument();
    expect(onClose).not.toHaveBeenCalled();
  });

  // onSuccess
  mock.onPost('/api/tribes/create').reply(200, { data: '1000' });
  user.click(screen.getByRole('button', { name: /create/i }));

  await waitFor(() => {
    expect(onClose).toHaveBeenCalled();
  });
});
