import { useQuery } from "@tanstack/react-query";
import api from "@/hooks/auth/use-api";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await api.get("/categories");
      return data;
    },
  });
};

export const useGuides = () => {
  return useQuery({
    queryKey: ["guides"],
    queryFn: async () => {
      const { data } = await api.get("/guides");
      return data;
    },
  });
};

export const useGuide = (id: string | undefined) => {
  return useQuery({
    queryKey: ["guide", id],
    queryFn: async () => {
      const { data } = await api.get(`/guides/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

export const useComments = (storyId?: string) => {
  return useQuery({
    queryKey: ["comments", storyId],
    queryFn: async () => {
      const params = storyId ? `?storyId=${storyId}` : "";
      const { data } = await api.get(`/comments${params}`);
      return data;
    },
  });
};
