interface Props {
  error: {
    message: string;
  };
  onClick?: () => void;
  resetErrorBoundary?: () => void;
}

const ErrorView = ({
  error,
  onClick,
  resetErrorBoundary = onClick ||
    (() => {
      if (process.browser) {
        return window.location.reload();
      }
      return null;
    }),
}: Props) => (
  <div className="bg-white min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
    <div className="max-w-max mx-auto">
      <main className="sm:flex">
        <div>
          <div className="sm:border-gray-200">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
              {error.message}
            </h1>
          </div>
          <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent">
            <button
              onClick={resetErrorBoundary}
              type="button"
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Retry
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>
);

export default ErrorView;
