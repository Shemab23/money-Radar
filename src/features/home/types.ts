// 1) API shape
export type UserDTO = { id: number; name: string; email: string };

// 2) Everything the Home screen needs
export type HomeScreenModel = {
  userName: string;
  email: string;
  favoritesCount: number;
};
