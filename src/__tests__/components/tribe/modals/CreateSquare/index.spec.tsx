import MockAdapter from 'axios-mock-adapter';

// api
import axios from 'api';

// utils
import { createRandomString, render, screen, user, waitFor } from 'utils/tests';

// components
import CreateSquare from 'components/tribe/modals/CreateSquare';

// mock data
const onClose = jest.fn();
const defaultProps = {
  onClose,
};

const renderComponent = () => render(<CreateSquare {...defaultProps} />);

test('Create Square', async () => {
  const mock = new MockAdapter(axios);
  renderComponent();

  expect(
    screen.getByRole('dialog', { name: /new square/i })
  ).toBeInTheDocument();

  // validation
  await waitFor(() =>
    user.click(screen.getByRole('button', { name: /confirm/i }))
  );

  // required
  expect(screen.getByText(/name is required/i)).toBeInTheDocument();
  expect(screen.getByText(/topic is required/i)).toBeInTheDocument();

  // max length name
  await waitFor(() => {
    user.type(
      screen.getByRole('textbox', { name: /name/i }),
      createRandomString(21)
    );
  });

  await waitFor(() =>
    user.click(screen.getByRole('button', { name: /confirm/i }))
  );

  expect(screen.getByText(/name is to long/i)).toBeInTheDocument();

  // topics
  await waitFor(() => {
    user.type(
      screen.getByRole('textbox', { name: /topic/i }),
      'some random #hashtag'
    );
  });

  await waitFor(() =>
    user.click(screen.getByRole('button', { name: /confirm/i }))
  );

  expect(
    screen.getByText('Please enter valid topics (start with #)')
  ).toBeInTheDocument();

  // valid data
  await waitFor(() => {
    user.clear(screen.getByRole('textbox', { name: /name/i }));
    user.clear(screen.getByRole('textbox', { name: /topic/i }));
    user.type(
      screen.getByRole('textbox', { name: /name/i }),
      createRandomString(19)
    );
    user.type(
      screen.getByRole('textbox', { name: /topic/i }),
      '#some #random #hashtag'
    );
  });

  // handle submit
  // onError
  const error = { message: 'Create Square Error' };
  mock.onPost('/api/squares/create').reply(400, error);
  user.click(screen.getByRole('button', { name: /confirm/i }));

  await waitFor(() => {
    expect(screen.getByText(error.message)).toBeInTheDocument();
    expect(onClose).not.toHaveBeenCalled();
  });

  // onSuccess
  mock.onPost('/api/squares/create').reply(200);
  user.click(screen.getByRole('button', { name: /confirm/i }));

  await waitFor(() => {
    expect(onClose).toHaveBeenCalled();
  });
});
