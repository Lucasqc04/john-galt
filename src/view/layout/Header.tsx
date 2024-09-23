import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react';
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from '@heroicons/react/20/solid';
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { LanguageSwitcher } from '../components/LanguageSwitcher/LanguageSwitcher';
import { useTheme } from '../screens/useTheme';

const products = [
  {
    name: 'Analytics',
    description: 'Get a better understanding of your traffic',
    href: '#',
    icon: ChartPieIcon,
  },
  {
    name: 'Engagement',
    description: 'Speak directly to your customers',
    href: '#',
    icon: CursorArrowRaysIcon,
  },
  {
    name: 'Security',
    description: 'Your customers’ data will be safe and secure',
    href: '#',
    icon: FingerPrintIcon,
  },
  {
    name: 'Integrations',
    description: 'Connect with third-party tools',
    href: '#',
    icon: SquaresPlusIcon,
  },
  {
    name: 'Automations',
    description: 'Build strategic funnels that will convert',
    href: '#',
    icon: ArrowPathIcon,
  },
];

const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentTheme, toggleTheme } = useTheme();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', currentTheme === 'dark');
  }, [currentTheme]);

  return (
    <header className="absolute z-50 top-0 left-0 p-4 flex items-center justify-between w-full max-w-[100vw]">
      <nav
        aria-label="Global"
        className="w-full flex items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="p-1.5">
            <h1 className="font-extrabold self-center text-2xl whitespace-nowrap dark:text-white">
              DIY LAB
            </h1>
            <span className="sr-only">Your Company</span>
            <img alt="" className="h-8 w-auto" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-white"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 dark:text-white">
              Product
              <ChevronDownIcon
                aria-hidden="true"
                className="h-5 w-5 flex-none text-gray-500 dark:text-white"
              />
            </PopoverButton>

            <PopoverPanel
              transition
              className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white dark:bg-gray-800 dark:text-white shadow-lg ring-1 ring-gray-900/5 transition"
            >
              <div className="p-4">
                {products.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg text-gray-900 dark:text-white group-hover:bg-white dark:group-hover:bg-gray-700">
                      <item.icon
                        aria-hidden="true"
                        className="h-6 w-6 text-gray-500 dark:text-white group-hover:text-indigo-600"
                      />
                    </div>
                    <div className="flex-auto">
                      <a
                        href={item.href}
                        className="block font-semibold text-gray-900 dark:text-white"
                      >
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                      <p className="text-gray-600 dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50 dark:bg-gray-700">
                {callsToAction.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <item.icon
                      aria-hidden="true"
                      className="h-5 w-5 flex-none text-gray-400 dark:text-gray-300"
                    />
                    {item.name}
                  </a>
                ))}
              </div>
            </PopoverPanel>
          </Popover>

          <a
            href="#"
            className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
          >
            Quem Somos
          </a>
          <a
            href="#"
            className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
          >
            Marketplace
          </a>
          <a
            href="#"
            className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
          >
            Company
          </a>
          <LanguageSwitcher />
        </PopoverGroup>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <label className="inline-flex items-center relative cursor-pointer">
            <input
              className="peer hidden"
              id="toggle"
              type="checkbox"
              onClick={toggleTheme}
            />
            <div className="relative w-[110px] h-[50px] bg-white peer-checked:bg-zinc-500 rounded-full after:absolute after:content-[''] after:w-[40px] after:h-[40px] after:bg-gradient-to-r from-orange-500 to-yellow-400 peer-checked:after:from-zinc-900 peer-checked:after:to-zinc-900 after:rounded-full after:top-[5px] after:left-[5px] active:after:w-[50px] peer-checked:after:left-[105px] peer-checked:after:translate-x-[-100%] shadow-sm duration-300 after:duration-300 after:shadow-md"></div>
            <FaSun
              className="fill-white peer-checked:opacity-60 absolute w-6 h-6 left-[13px]"
              style={{ position: 'absolute', left: '13px' }}
            />
            <FaMoon
              className="fill-black opacity-60 peer-checked:opacity-70 peer-checked:fill-white absolute w-6 h-6 right-[13px]"
              style={{ position: 'absolute', right: '13px' }}
            />
          </label>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white dark:bg-gray-800 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:ring-gray-700">
          <div className="flex items-center justify-between">
            <a href="#" className="p-1.5">
              <h1 className="font-extrabold self-center text-2xl whitespace-nowrap dark:text-white">
                DIY LAB
              </h1>
              <span className="sr-only">Your Company</span>
              <img alt="" className="h-8 w-auto" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-md p-2.5 text-gray-700 dark:text-white"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="flow-root">
            <div className="divide-y divide-gray-500/10 dark:divide-gray-700">
              <div className="py-6">
                <Disclosure as="div">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700">
                    Product
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="h-5 w-5 flex-none group-data-[open]:rotate-180 text-gray-500 dark:text-white"
                    />
                  </DisclosureButton>
                  <DisclosurePanel>
                    {[...products, ...callsToAction].map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
                <a
                  href="#"
                  className="block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Quem Somos
                </a>
                <a
                  href="#"
                  className="block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Marketplace
                </a>
                <a
                  href="#"
                  className="block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Company
                </a>
                <div className="block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700">
                  <LanguageSwitcher />
                </div>

                <label className="inline-flex items-center relative cursor-pointer">
                  <input
                    className="peer hidden"
                    id="toggle"
                    type="checkbox"
                    onClick={toggleTheme}
                  />
                  <div className="relative w-[110px] h-[50px] bg-white peer-checked:bg-zinc-500 rounded-full after:absolute after:content-[''] after:w-[40px] after:h-[40px] after:bg-gradient-to-r from-orange-500 to-yellow-400 peer-checked:after:from-zinc-900 peer-checked:after:to-zinc-900 after:rounded-full after:top-[5px] after:left-[5px] active:after:w-[50px] peer-checked:after:left-[105px] peer-checked:after:translate-x-[-100%] shadow-sm duration-300 after:duration-300 after:shadow-md"></div>
                  <FaSun
                    className="fill-white peer-checked:opacity-60 absolute w-6 h-6 left-[13px]"
                    style={{ position: 'absolute', left: '13px' }}
                  />
                  <FaMoon
                    className="fill-black opacity-60 peer-checked:opacity-70 peer-checked:fill-white absolute w-6 h-6 right-[13px]"
                    style={{ position: 'absolute', right: '13px' }}
                  />
                </label>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
