import { AuthRepository } from '@/data/repositories/Auth.repository';
import { AuthenticatedUser } from '../../entities/AuthenticatedUser';

export class RegisterUseCase {
  constructor(private authRepo: AuthRepository) {}

  async execute(
    username: string,
    password: string,
  ): Promise<AuthenticatedUser> {
    const result = await this.authRepo.register(username, password);
    if (!result) throw new Error('Falha ao realizar registro');

    return {
      id: result.id,
      username: result.username,
      acessToken: '',
      refreshToken: '',
    };
  }
}
