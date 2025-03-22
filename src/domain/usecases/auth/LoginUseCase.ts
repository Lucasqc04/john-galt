import { AuthRepository } from '@/data/repositories/Auth.repository';
import { AuthenticatedUser } from '../../entities/AuthenticatedUser';

export class LoginUseCase {
  constructor(private authRepo: AuthRepository) {}

  async execute(
    username: string,
    password: string,
  ): Promise<AuthenticatedUser> {
    const result = await this.authRepo.login(username, password);
    if (!result) throw new Error('Falha ao realizar login');

    // Agora o id vem da resposta do backend
    const user: AuthenticatedUser = {
      id: result.id,
      username,
      acessToken: result.acessToken,
      refreshToken: result.refreshToken,
    };

    return user;
  }
}
