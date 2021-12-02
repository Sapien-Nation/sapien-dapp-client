import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

interface AllTheProvidersProps {
  children: React.ReactElement;
}

const AllTheProviders = ({ children }: AllTheProvidersProps) => {
  return <div>{children}</div>;
};

interface OptionsProps {}

const customRender = (ui: React.ReactElement, options: OptionsProps = {}) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { axe, customRender as render, userEvent as user };
