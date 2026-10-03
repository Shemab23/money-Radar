// 1) API shape
export type PostDTO = { id: number; title: string; body: string };

// 2) The row the screen renders
export type PostItem = { id: number; title: string; excerpt: string };

// 3) Everything the Posts screen needs
export type PostsScreenModel = { items: PostItem[] };
