/* istanbul ignore file */
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// mui
import { ThemeProvider } from '@material-ui/core/styles';

// styles
import theme from 'styles/theme';

const AllTheProviders = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

const customRender = (
  ui: React.ReactElement,
  options: { container?: Element } = {}
) => {
  const rtl = render(ui, {
    wrapper: AllTheProviders,
    ...options
  });

  return {
    ...rtl,
    rerender: (ui: React.ReactElement) =>
      customRender(ui, {
        container: rtl.container
      }),
    history
  };
};

export { renderHook, act as actHook } from '@testing-library/react-hooks';
export * from '@testing-library/react';

export { customRender as render, userEvent as user };
