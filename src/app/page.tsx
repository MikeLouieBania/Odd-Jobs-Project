export default function Home() {
  return (
    <div className=" h-screen w-screen bg-gradient-to-br from-slate-100 via-red-100 to-pink-100 shadow-lg sm:3xl">
      <div className="px-20 py-6">
        {/* <!-- nav --> */}
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center text-3xl font-bold text-gray-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-[50%] h-20"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46"
                />
              </svg>
              TIPerrands
            </div>
          </div>
          <div className="hidden md:flex items-center justify-center">
            <a
              href="/sign-in"
              className="mr-5 text-lg font-semibold text-gray-800 hover:text-cool-gray-700 transition duration-150 ease-in-out"
            >
              Login
            </a>
            <a
              href="/sign-up"
              className="px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-[#FEDF81] to-[#ffa607cc] text-black outline-none focus:outline-none hover:shadow-md hover:from-true-gray-900 transition duration-200 ease-in-out"
            >
              Sign Up
            </a>
          </div>
        </div>
        {/* <!-- /nav --> */}

        {/* <!-- hero section --> */}
        <div className="lg:2/6 xl:w-2/4 mt-20 lg:mt-40 lg:ml-16 text-left">
          <div className="text-4xl italic font-bold text-[#f8a112] leading-none">
            Get things DONE!
          </div>
          <div className="mt-6 text-5xl font-extrabold text-black antialiased">
            Post your <span className="text-[#f8a112]">errands</span>,<br></br>{" "}
            and get <span className="text-[#f8a112]">assistance</span>
            <br></br> with your fellow{" "}
            <span className="text-[#f8a112]">TIPians</span>.
          </div>
          <a
            href="/sign-up"
            className="flex flex-row w-fit mt-28 p-4 rounded-lg text-lg tracking-wider font-semibold bg-gradient-to-r from-[#ffb233] to-[#f8a112] text-black outline-none"
          >
            Join us now
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="ml-4 w-10 h-7"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H-20"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
