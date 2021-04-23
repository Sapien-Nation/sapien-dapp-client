// utils
import { render, user, screen, within } from 'utils/tests';

// components
import { Autocomplete } from 'components/common/fields';

// mock data
import { mockTribe, mockTribes } from 'tools/mocks/tribe';

const OptionComponent = ({ option }) => {
  return <span>{option.name}</span>;
};

const onChange = jest.fn();
const defaultValue = mockTribe();
const getCurrentValue = jest.fn();
const name = 'autocomplete-test';
const open = true;
const options = mockTribes();
const defaultProps = {
  defaultValue,
  getCurrentValue,
  name,
  open,
  OptionComponent,
  options,
  onChange,
};

const renderComponent = () => render(<Autocomplete {...defaultProps} />);

test('Autocomplete works fine', async () => {
  renderComponent();

  const autocomplete = screen.getByRole('textbox');
  const optionsList = screen.getByRole('presentation');
  const { getByText: getByBodyText } = within(optionsList);

  const option = getByBodyText('General');
  expect(option).toBeInTheDocument();
  user.click(option as HTMLElement);
  expect(autocomplete).toHaveProperty('value', 'General');
});
