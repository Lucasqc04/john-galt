import { RemoteDataSource } from '@/data/datasource/Remote.datasource';
import { AuthRepository } from '@/data/repositories/Auth.repository';
import { axiosInstance } from '@/infrastructure/api/axiosInstance';
import React, { createContext, useEffect, useState } from 'react';

export type AuthUser = {
  id: string; // Agora não será utilizado, pois não retornamos o ID do login
  username: string;
  acessToken: string; // token JWT recebido do backend (limpo)
  refreshToken: string; // refresh token recebido do backend (limpo)
};

type AuthContextType = {
  user: AuthUser | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

// Instância única para chamadas à API
const remoteDataSource = new RemoteDataSource(import.meta.env.VITE_API_URL);
const authRepository = new AuthRepository(remoteDataSource);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (error) {
        console.error('Erro ao parsear o usuário do localStorage', error);
        return null;
      }
    }
    return null;
  });

  // Configura o header de autorização do axios sempre que o usuário for atualizado
  useEffect(() => {
    if (user?.acessToken) {
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${user.acessToken}`;
      console.log(
        'Token configurado no axios:',
        axiosInstance.defaults.headers.common.Authorization,
      );
    }
  }, [user]);

  // A função do refresh token foi comentada conforme solicitado
  // useEffect(() => {
  //     let isMounted = true;

  //     const refreshToken = async () => {
  //         if (user) {
  //             try {
  //                 const userId = user.id || getUserIdFromToken(user.acessToken);
  //                 console.log("Refresh: userId:", userId);
  //                 const result = await authRepository.refreshToken(userId, user.refreshToken);
  //                 if (result) {
  //                     const newAcessToken = result.acessToken;
  //                     console.log("Novo acessToken recebido no refresh:", newAcessToken);
  //                     const updatedUser: AuthUser = { ...user, acessToken: newAcessToken };
  //                     if (isMounted) {
  //                         setUser(updatedUser);
  //                         localStorage.setItem('user', JSON.stringify(updatedUser));
  //                         axiosInstance.defaults.headers.common.Authorization = `Bearer ${newAcessToken}`;
  //                     }
  //                 }
  //             } catch (error) {
  //                 console.error('Erro ao atualizar token:', error);
  //                 logout();
  //             }
  //         }
  //         if (isMounted) {
  //             setTimeout(refreshToken, 15 * 60 * 1000);
  //         }
  //     };

  //     refreshToken();

  //     return () => {
  //         isMounted = false;
  //     };
  // }, [user]);

  // Login: agora, vamos usar apenas o accessToken e não extraímos o id
  const login = async (username: string, password: string) => {
    try {
      const result = await authRepository.login(username, password);
      if (!result || !result.acessToken || !result.refreshToken) {
        throw new Error('Dados de login incompletos recebidos do backend');
      }

      const loggedUser: AuthUser = {
        id: '', // Não utilizamos mais o ID
        username,
        acessToken: result.acessToken,
        refreshToken: result.refreshToken,
      };
      setUser(loggedUser);
      localStorage.setItem('user', JSON.stringify(loggedUser));
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${loggedUser.acessToken}`;

      console.log('Usuário logado:', loggedUser);
      console.log(
        'Header Authorization:',
        axiosInstance.defaults.headers.common.Authorization,
      );
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  };

  // Registro: apenas registra o usuário; o login deve ser feito separadamente
  const register = async (username: string, password: string) => {
    try {
      const result = await authRepository.register(username, password);
      console.log('Registro realizado:', result);
    } catch (error) {
      console.error('Erro no registro:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    delete axiosInstance.defaults.headers.common.Authorization;
    console.log('Usuário deslogado e token removido do header.');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
