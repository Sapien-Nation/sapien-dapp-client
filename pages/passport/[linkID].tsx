import { useRouter } from 'next/router';

// components
import { Head, Query, Redirect } from 'components/common';
import { FeedbackView, HistoricalFiguresSearch } from 'components/passport';

// context
import { useAuth } from 'context/user';

interface LinkCheckResponse {
  allowedPassports?: number;
  availablePassports?: number;
  distributionId?: string;
  statusCode?: number;
  message?: string;
}

const PassportPage = () => {
  const { query } = useRouter();
  const { me, isLoggingIn } = useAuth();

  if (isLoggingIn === true) return null;

  if (me === null) return <Redirect path="/" />;

  if (!query.linkID) return null;

  const renderView = ({
    allowedPassports,
    availablePassports,
    statusCode,
  }: LinkCheckResponse) => {
    if (statusCode) {
      return <FeedbackView code={statusCode} />;
    }

    return (
      <HistoricalFiguresSearch
        allowedPassports={allowedPassports}
        availablePassports={availablePassports}
        linkID={String(query.linkID)}
      />
    );
  };

  return (
    <>
      <Head title="Create Passport" />

      <div className="bg-gray-50">
        <main className="lg:relative">
          <div className="mx-auto max-w-6xl w-full pt-16 pb-20 text-center lg:py- lg:text-center">
            <Query api={`/api/v3/passport/check-link?linkId=${query.linkID}`}>
              {(response: LinkCheckResponse) => <>{renderView(response)}</>}
            </Query>
          </div>
        </main>
      </div>
    </>
  );
};

export default PassportPage;
