import { FiLock, FiSettings } from 'react-icons/fi';

export function Newsletter() {
  return (
    <div className=" dark:bg-gray-800  font-[sans-serif] p-6 rounded-[12px] w-4/5  mt-10 mb-10 mx-auto shadow-lg ">
      <div className="grid lg:grid-cols-2 items-center gap-16 max-w-7xl mx-auto min-h-[350px] ">
        <div>
          <h3 className="dark:text-white-white text-4xl font-bold">
            Subscribe to Our Newsletter
          </h3>
          <p className="text-base mt-6 text-gray-300">
            Subscribe to our newsletter and stay up to date with the latest
            news, updates, and exclusive offers. Get valuable insights. Join our
            community today!
          </p>
          <div className="bg-transparent border border-gray-500 flex p-1 rounded-full mt-12">
            <input
              type="email"
              placeholder="Enter your email"
              className="text-gray-300 w-full outline-none bg-transparent text-sm px-4 py-3"
            />
            <button
              type="button"
              className="bg-orange-500 text-white hover:bg-orange-300 transition-all dark:text-white-white text-sm rounded-full px-6 py-3"
            >
              Submit
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <FiSettings className="w-12 h-12 mb-6 inline-block border border-gray-500 p-3 rounded-md" />
            <h3 className="dark:text-white-white text-xl font-semibold mb-3">
              Customization
            </h3>
            <p className="text-gray-300 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              accumsan, nunc et tempus blandit, metus mi consectetur felis
              turpis vitae ligula.
            </p>
          </div>
          <div>
            <FiLock className="w-12 h-12 mb-6 inline-block border border-gray-500 p-3 rounded-md" />
            <h3 className="dark:text-white-white text-xl font-semibold mb-3">
              Security
            </h3>
            <p className="text-gray-300 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              accumsan, nunc et tempus blandit, metus mi consectetur felis
              turpis vitae ligula.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
