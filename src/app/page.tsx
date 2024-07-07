import Image from 'next/image';
import Link from 'next/link';
import StarBackground from '@/components/star-background';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen">
      <StarBackground />

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#7f5aff] to-[#00c6ff] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl py-12">
          <div className="text-center">
            <Image
              className="inline-block"
              src="/2-removebg-preview.png"
              width={200}
              height={200}
              alt="dev finder logo"
            />

            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              Code with awesome devs online!
            </h1>
            <div className="w-[90%] z-[0] max-sm:h-[75px]">
              <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
              <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
              <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
              <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
            </div>
            <p className="mt-7 text-lg leading-8 text-gray-600 dark:text-gray-200">
              Whether you&apos;re coding a project, brainstorming ideas, or
              chatting about tech topics, DevOrbit is your ultimate space for
              devs!
            </p>
            <div className="mt-7 flex items-center justify-center gap-x-6">
              <Link
                href="/browse"
                className="relative z-20 rounded-md overflow-hidden bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:from-gray-900 hover:to-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 focus:ring-offset-gray-50 transition-all duration-300 ease-in-out"
              >
                <button className="relative rounded-md overflow-hidden bg-gradient from-gray-800 to-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-sm cursor-pointer">
                  Get started
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#7f5aff] to-[#00c6ff] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
