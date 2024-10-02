import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react';
import {
  ArrowPathIcon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  PhoneIcon,
  PlayCircleIcon,
  SquaresPlusIcon,
} from '@heroicons/react/20/solid';
import { ReactNode } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { LanguageSwitcher } from '../../components/LanguageSwitcher/LanguageSwitcher';

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

export function NavLinks({
  closeButton,
  isVisible,
  isLargeScreen,
  LinkCallBack,
}: {
  closeButton?: ReactNode;
  isVisible: boolean;
  isLargeScreen: boolean;
  LinkCallBack?: () => void;
}) {
  const navigate = useNavigate();

  const handleOnLink = (path: string, callback?: () => void) => {
    if (callback) {
      callback();
    }
    navigate(path);
  };

  return (
    <>
      {isVisible && (
        <>
          {closeButton && (
            <div className="w-screen flex justify-end pt-4 pr-6">
              {closeButton}
            </div>
          )}
          <PopoverGroup className="flex flex-col items-center justify-center gap-y-10 lg:gap-x-12 lg:flex-row lg:gap-y-0">
            <Popover className="relative">
              <PopoverButton className="text-2xl flex items-center justify-center gap-x-1 lg:text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                Produtos
                <MdKeyboardArrowDown
                  aria-hidden="true"
                  size={isLargeScreen ? 24 : 28}
                  className="flex-none text-gray-500 dark:text-white"
                />
              </PopoverButton>

              <PopoverPanel
                transition
                className="absolute -left-32 lg:-left-8 top-full z-10  w-screen max-w-md overflow-hidden rounded-3xl bg-white dark:bg-gray-800 dark:text-white shadow-lg ring-1 ring-gray-900/5 transition"
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
                        <button
                          onClick={() => handleOnLink(item.href)}
                          className="block font-semibold text-gray-900 dark:text-white"
                        >
                          {item.name}
                          <span className="absolute inset-0" />
                        </button>
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

            <button
              onClick={() => handleOnLink('#', LinkCallBack)}
              className="text-2xl lg:text-sm font-semibold leading-6 text-gray-900 dark:text-white"
            >
              Quem Somos
            </button>
            <button
              onClick={() => handleOnLink('#', LinkCallBack)}
              className="text-2xl lg:text-sm font-semibold leading-6 text-gray-900 dark:text-white"
            >
              Marketplace
            </button>
            <button
              onClick={() => handleOnLink('#', LinkCallBack)}
              className="text-2xl lg:text-sm font-semibold leading-6 text-gray-900 dark:text-white"
            >
              Company
            </button>
            <LanguageSwitcher />
          </PopoverGroup>
        </>
      )}
    </>
  );
}
