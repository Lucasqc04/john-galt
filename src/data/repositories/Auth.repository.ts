import { z } from 'zod';
import { RemoteDataSource } from '../datasource/Remote.datasource';

const LoginResponseSchema = z.object({
  // O backend retorna apenas o token e o refresh token
  acessToken: z.string(),
  refreshToken: z.string(),
});

const RegisterResponseSchema = z.object({
  id: z.string(),
  username: z.string(),
});

export class AuthRepository {
  constructor(private remote: RemoteDataSource) {}

  async login(username: string, password: string) {
    return this.remote.post({
      url: '/auth/login',
      body: { username, password },
      model: LoginResponseSchema,
    });
  }

  async register(username: string, password: string) {
    return this.remote.post({
      url: '/auth/register',
      body: { username, password },
      model: RegisterResponseSchema,
    });
  }

  async refreshToken(userId: string, refreshToken: string) {
    return this.remote.post({
      url: '/auth/refresh',
      body: { userId, refreshToken },
      model: z.object({ acessToken: z.string() }),
    });
  }
}
