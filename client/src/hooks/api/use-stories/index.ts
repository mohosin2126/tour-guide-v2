import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/hooks/auth/use-api";
import { useAuth } from "@/hooks/auth/use-auth";

export const useStories = () => {
  return useQuery({
    queryKey: ["stories"],
    queryFn: async () => {
      const { data } = await api.get("/stories");
      return data;
    },
  });
};

export const useStory = (id: string | undefined) => {
  return useQuery({
    queryKey: ["story", id],
    queryFn: async () => {
      const { data } = await api.get(`/stories/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

export const useUserStories = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["userStories", user?.email],
    queryFn: async () => {
      const { data } = await api.get(`/stories/user?email=${user!.email}`);
      return data;
    },
    enabled: !!user,
  });
};

export const useCreateStory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (storyData: Record<string, unknown>) => {
      const { data } = await api.post("/stories", storyData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stories"] });
      queryClient.invalidateQueries({ queryKey: ["userStories"] });
    },
  });
};

export const useUpdateStory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...storyData }: { id: string; [key: string]: unknown }) => {
      const { data } = await api.put(`/stories/${id}`, storyData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stories"] });
      queryClient.invalidateQueries({ queryKey: ["userStories"] });
    },
  });
};

export const useDeleteStory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.delete(`/stories/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stories"] });
      queryClient.invalidateQueries({ queryKey: ["userStories"] });
    },
  });
};

export const useToggleLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ storyId, userId }: { storyId: string; userId: string }) => {
      const { data } = await api.post("/stories/like", { storyId, userId });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stories"] });
    },
  });
};
