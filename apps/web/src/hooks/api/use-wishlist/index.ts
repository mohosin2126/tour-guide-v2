import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/hooks/auth/use-api";
import { useAuth } from "@/hooks/auth/use-auth";

export const useWishlist = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["wishlist", user?.email],
    queryFn: async () => {
      const { data } = await api.get(`/wishlists?email=${user!.email}`);
      return data;
    },
    enabled: !!user,
  });
};

export const useAddToWishlist = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (packageId: string) => {
      const { data } = await api.post("/wishlists", {
        email: user!.email,
        packageId,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });
};

export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.delete(`/wishlists/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });
};
