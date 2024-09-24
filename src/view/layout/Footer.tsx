export function Footer() {
  return (
    <footer className=" rounded-t-xl shadow dark:bg-slate-800">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8  dark:bg-slate-800">
        <div className="sm:flex sm:items-center sm:justify-between  dark:bg-slate-800">
          <a
            href="#"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <h1 className="font-extrabold self-center text-2xl whitespace-nowrap dark:text-white-white">
              DIY LAB
            </h1>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium dark:text-white-white sm:mb-0 dark:text-white-gray-400">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:text-white-white lg:my-8" />
        <span className="block text-smdark:text-white-white sm:text-center dark:text-white-gray-400">
          © 2024{' '}
          <a href="#" className="hover:underline">
            DIY LAB™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
