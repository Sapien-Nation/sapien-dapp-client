import Link from 'next/link';

const PublicHero = () => {
  return (
    <main className="mt-18 mx-auto max-w-6xl px-4 sm:mt-24">
      <div className="text-center">
        <p className="text-xs uppercase font-bold tracking-tight text-gray-500">
          <span className="block xl:inline">
            In diam placerat dui, auctor sodales. Et.
          </span>
        </p>
        <h1 className="text-4xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
          <span className="block xl:inline">
            Faucibus mauris sit duis convallis sed.
          </span>{' '}
        </h1>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <Link href="/">
            <a className="inline-flex items-center px-7 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
              I am interested
            </a>
          </Link>
        </div>
        <video
          className="text-center mt-14 mx-auto"
          width="750"
          height="500"
          controls
        >
          <source
            src="https://www.youtube.com/embed/sJzaZg9nuNo"
            type="video/mp4"
          />
        </video>
      </div>
    </main>
  );
};

export default PublicHero;
