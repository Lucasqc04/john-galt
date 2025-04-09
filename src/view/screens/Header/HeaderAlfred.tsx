import { useLanguage } from '@/domain/locales/Language';
import { useContext, useEffect, useRef, useState } from 'react';
import { FaRobot } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { LanguageSwitcher } from '../../components/LanguageSwitcher/LanguageSwitcher';
import { UserLevelBadge } from '../../components/UserLevelBadge';
import { AuthContext } from '../../context/AuthContext';
import { ROUTES } from '../../routes/Routes';
import { NavLinks } from './NavLinks';

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { currentLang } = useLanguage();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
  };

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="flex flex-col items-center justify-center w-full max-w-[100vw] transition-all duration-300 bg-transparent px-2 sm:px-4 py-2 sm:py-4 text-center">
      <nav
        aria-label="Global"
        className="w-full flex flex-row items-center justify-center flex-wrap gap-y-2 gap-x-8"
      >
        <NavLinks isVisible={true} isLargeScreen={false} />
        <LanguageSwitcher
          className="flex justify-center"
          LabelClassName="text-xl sm:text-2xl lg:text-3xl font-pixelade items-center justify-center gap-x-2 font-extralight leading-6"
        />
        <div className="relative" ref={dropdownRef}>
          {user ? (
            <>
              <button
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="flex items-center gap-x-2 text-white hover:text-gray-300 transition-all"
              >
                <FaRobot size={24} />
                <div className="flex flex-col items-start">
                  <span className="inline text-lg font-semibold">
                    {user.username}
                  </span>
                  <div className="text-xs -mt-1">
                    {user.levelName && (
                      <span
                        className={`px-2 py-0.5 rounded-full text-white text-xs ${getLevelColor(user.level)}`}
                      >
                        Nível {user.levelName}
                      </span>
                    )}
                  </div>
                </div>
              </button>
              {isDropdownOpen && (
                <div className="absolute top-14 right-0 bg-gray-800 shadow-lg rounded-lg p-4 flex flex-col items-center z-50 min-w-[200px]">
                  <div className="mb-3 w-full">
                    <UserLevelBadge />
                  </div>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-all w-full"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <button
              onClick={() => navigate(ROUTES.auth.login.call(currentLang))}
              className="flex items-center gap-x-2 bg-transparent text-white hover:text-orange-600 transition-all px-4 py-2 rounded"
            >
              <FaRobot size={24} />
              Faça login
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}

// Função auxiliar para obter a cor baseada no nível
function getLevelColor(level: number): string {
  switch (level) {
    case 0:
      return 'bg-gray-600'; // Madeira
    case 1:
      return 'bg-amber-700'; // Bronze
    case 2:
      return 'bg-gray-400'; // Prata
    case 3:
      return 'bg-yellow-500'; // Ouro
    case 4:
      return 'bg-blue-500'; // Diamante
    case 5:
      return 'bg-violet-500'; // Platina
    default:
      return 'bg-gray-600';
  }
}
