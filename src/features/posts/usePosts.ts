import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { fetchPosts, POSTS_PAGE_SIZE } from "./api";
import type { PostDTO, PostsScreenModel } from "./types";

const toPostsModel = (data: InfiniteData<PostDTO[]>): PostsScreenModel => ({
  items: data.pages.flat().map((p) => ({
    id: p.id,
    title: p.title,
    excerpt: p.body.replace(/\n/g, " ").slice(0, 80) + "...",
  })),
});

export function usePosts() {
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam, signal }) => fetchPosts(pageParam, signal),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < POSTS_PAGE_SIZE ? undefined : allPages.length + 1,
    select: toPostsModel,
  });
}
