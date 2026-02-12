import axiosInstance from './axiosInstance';
import type { Destination, BlogPost, Photo } from '../types';

export const destinationsAPI = {
  getAll: () => axiosInstance.get<Destination[]>('/posts?_limit=12'),
  getById: (id: string) => axiosInstance.get<Destination>(`/posts/${id}`),
};

export const blogAPI = {
  getAll: () => axiosInstance.get<BlogPost[]>('/posts?_limit=9'),
  getById: (id: number) => axiosInstance.get<BlogPost>(`/posts/${id}`),
};

export const galleryAPI = {
  getAll: () => axiosInstance.get<Photo[]>('/photos?_limit=12'),
};