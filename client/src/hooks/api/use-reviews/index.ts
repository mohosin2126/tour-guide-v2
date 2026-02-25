import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/hooks/auth/use-api";

export const useLatestReviews = (limit = 6) => {
  return useQuery({
    queryKey: ["latestReviews", limit],
    queryFn: async () => {
      const { data } = await api.get(`/reviews/latest?limit=${limit}`);
      return data;
    },
  });
};

export const useGuideReviews = (guideId: string | undefined) => {
  return useQuery({
    queryKey: ["guideReviews", guideId],
    queryFn: async () => {
      const { data } = await api.get(`/reviews/guide/${guideId}`);
      return data;
    },
    enabled: !!guideId,
  });
};

export const useUserReviews = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["userReviews", userId],
    queryFn: async () => {
      const { data } = await api.get(`/reviews/user/${userId}`);
      return data;
    },
    enabled: !!userId,
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reviewData: Record<string, unknown>) => {
      const { data } = await api.post("/reviews", reviewData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guideReviews"] });
      queryClient.invalidateQueries({ queryKey: ["userReviews"] });
    },
  });
};
