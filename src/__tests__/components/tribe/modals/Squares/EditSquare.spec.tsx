import MockAdapter from 'axios-mock-adapter';

// api
import axios from 'api';

// utils
import { createRandomString, render, screen, user, waitFor } from 'utils/tests';

// mocks
import { mockSquare } from 'tools/mocks/square';

// components
import EditSquare from 'components/tribe/modals/Squares/EditSquare';

// mock data
const onClose = jest.fn();
const square = mockSquare({ topics: ['#test'] });
const defaultProps = {
  onClose,
  square,
};

const renderComponent = (props = {}) =>
  render(<EditSquare {...defaultProps} {...props} />);

test('Edit Square', async () => {
  const mock = new MockAdapter(axios);
  renderComponent({ square });

  expect(
    screen.getByRole('dialog', { name: /edit square/i })
  ).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByRole('textbox', { name: /name/i })).toHaveValue(
      square.name
    );
    expect(screen.getByRole('textbox', { name: /topic/i })).toHaveValue(
      '#test'
    );
    user.clear(screen.getByRole('textbox', { name: /name/i }));
    user.clear(screen.getByRole('textbox', { name: /topic/i }));
  });

  // validation
  user.click(screen.getByRole('button', { name: /save changes/i }));

  // required
  await waitFor(() => {
    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/topic is required/i)).toBeInTheDocument();
  });

  // max length name
  await waitFor(() => {
    user.type(
      screen.getByRole('textbox', { name: /name/i }),
      createRandomString(21)
    );
  });

  user.click(screen.getByRole('button', { name: /save changes/i }));

  await waitFor(() => {
    expect(screen.getByText(/name is to long/i)).toBeInTheDocument();
  });

  // topics
  await waitFor(() => {
    user.type(
      screen.getByRole('textbox', { name: /topic/i }),
      'some random #hashtag'
    );
  });

  user.click(screen.getByRole('button', { name: /save changes/i }));

  await waitFor(() => {
    expect(screen.getByText('Topic should start with #')).toBeInTheDocument();
  });

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
  const error = { message: 'Edit Square Error' };
  mock.onPut(`/api/squares/edit/${square.id}`).reply(400, error);
  user.click(screen.getByRole('button', { name: /save changes/i }));

  await waitFor(() => {
    expect(screen.getByText(error.message)).toBeInTheDocument();
    expect(onClose).not.toHaveBeenCalled();
  });

  // onSuccess
  mock.onPut(`/api/squares/edit/${square.id}`).reply(200);
  user.click(screen.getByRole('button', { name: /save changes/i }));

  await waitFor(() => {
    expect(onClose).toHaveBeenCalled();
  });
});
