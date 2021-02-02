/* istanbul ignore file */
import { ReactElement } from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// mui
import { ThemeProvider } from '@material-ui/core/styles';

// styles
import theme from 'styles/theme';

// context
import { TribeNavigationStateContext } from 'context/tribes';

const AllTheProviders = ({ children, tribeNavigation }) => {
  const Provider = (
    <ThemeProvider theme={theme}>
      <TribeNavigationStateContext.Provider value={tribeNavigation}>
        {children}
      </TribeNavigationStateContext.Provider>
    </ThemeProvider>
  );

  return Provider;
};

interface CustomRenderOptions {
  container?: Element;
  tribeNavigation?: {
    id: string;
  };
}

const customRender = (ui: ReactElement, options: CustomRenderOptions = {}) => {
  const { tribeNavigation, ...rest } = options;
  const rtl = render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders tribeNavigation={tribeNavigation}>{children}</AllTheProviders>
    ),
    ...rest
  });

  return {
    ...rtl,
    rerender: (ui: ReactElement, rerenderOptions: CustomRenderOptions = {}) =>
      customRender(ui, {
        container: rtl.container,
        ...options,
        ...rerenderOptions
      })
  };
};

export { renderHook, act as actHook } from '@testing-library/react-hooks';
export * from '@testing-library/react';

export { customRender as render, userEvent as user };
