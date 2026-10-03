import { isArrayOf, isRecord } from "../../services/guards";
import { request } from "../../services/http";
import type { PostDTO } from "./types";

export const POSTS_PAGE_SIZE = 10;

export const isPostDTO = (d: unknown): d is PostDTO =>
  isRecord(d) &&
  typeof d.id === "number" &&
  typeof d.title === "string" &&
  typeof d.body === "string";

export const fetchPosts = (page: number, signal?: AbortSignal) =>
  request({
    endpoint: "/posts",
    params: { _page: page, _limit: POSTS_PAGE_SIZE },
    guard: isArrayOf(isPostDTO),
    signal,
  });
