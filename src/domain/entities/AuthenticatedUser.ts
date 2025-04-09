export type AuthenticatedUser = {
  id: string;
  username: string;
  acessToken: string;
  refreshToken: string;
  level: number;
  levelName: string;
};
