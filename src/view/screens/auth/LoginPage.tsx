import { useLanguage } from '@/domain/locales/Language';
import AlfredWhiteLogo from '@/view/assets/logo/alfred-white-logo.svg';
import { Background } from '@/view/components/BackgroundAnimatedProduct';
import { useAuth } from '@/view/hooks/useAuth';
import { ROUTES } from '@/view/routes/Routes';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Ícones de olho
import { useNavigate } from 'react-router-dom';
import AlfredImg from '../../assets/AlfredComercial.png'; // imagem promocional do Alfred

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para controle de visibilidade da senha
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const { currentLang } = useLanguage();

  const handleLogin = async () => {
    if (username.length < 6 || password.length < 6) {
      setError('Nome de usuário e senha devem ter pelo menos 6 caracteres.');
      return;
    }
    try {
      await login(username, password);
      console.log('Login efetuado com sucesso.');
      navigate(`/${currentLang}`);
    } catch (error) {
      console.error('Erro no login:', error);
      setError('Erro no login. Confira as credenciais.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Background />
      {/* Conteúdo principal centralizado */}
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-screen-xl px-6 sm:px-12 md:px-20 lg:px-32 xl:px-40 flex flex-col lg:flex-row items-center justify-center">
          {/* Seção do Formulário */}
          <div className="lg:w-1/2 w-full flex flex-col items-center justify-center">
            <div className="mb-10 text-center text-white">
              <h1 className="text-4xl font-bold mb-6">Login Seguro</h1>
              <img
                src={AlfredWhiteLogo}
                alt="Alfred Logo"
                className="w-44 sm:w-60"
              />
            </div>
            <div className="w-full">
              {error && (
                <p className="text-red-500 text-center mb-4">{error}</p>
              )}
              <input
                className="border-2 px-16 py-3 rounded-3xl text-base sm:text-lg text-white placeholder-white bg-black text-center w-full"
                placeholder="Usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <div className="relative mt-6">
                <input
                  className="border-2 px-16 py-3 rounded-3xl text-base sm:text-lg text-white placeholder-white bg-black text-center w-full"
                  type={showPassword ? 'text' : 'password'} // Se a senha estiver visível, muda o tipo para "text"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white"
                  onClick={() => setShowPassword(!showPassword)} // Alterna entre mostrar e esconder a senha
                >
                  {showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
              </div>
              <button
                className="w-full mt-6 p-4 bg-[#F39200] text-white font-bold rounded-3xl hover:bg-[#e68800] transition-colors duration-200"
                onClick={handleLogin}
              >
                Entrar
              </button>
              <div className="mt-6 text-center">
                <p className="text-white">
                  <span>Não tem uma conta? </span>
                  <span
                    className="text-[#F39200] font-bold cursor-pointer"
                    onClick={() =>
                      navigate(ROUTES.auth.register.call(currentLang))
                    }
                  >
                    Registre-se
                  </span>
                </p>
              </div>
            </div>
          </div>
          {/* Seção da Imagem Promocional */}
          <div className="lg:w-1/2 w-full mt-10 lg:mt-0 flex justify-center">
            <img
              src={AlfredImg}
              alt="Imagem Promocional do Alfred"
              className="w-full max-w-md"
            />
          </div>
        </div>
      </div>
      {/* Rodapé opcional */}
      <footer className="p-4 text-center text-white text-sm">
        <p>
          © {new Date().getFullYear()} Alfred. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}
