import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const customRender = (
  ui: React.ReactElement,
  options: { container?: Element } = {}
) => {
  const rtl = render(ui, {
    wrapper: ({ children }) => <>{children}</>,
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
