import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/hooks/auth/use-api";
import type { PackageFilters } from "@/types";

export const usePackages = (filters: PackageFilters = {}) => {
  return useQuery({
    queryKey: ["packages", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      const { data } = await api.get(`/packages?${params}`);
      return data;
    },
  });
};

export const usePackage = (id: string | undefined) => {
  return useQuery({
    queryKey: ["package", id],
    queryFn: async () => {
      const { data } = await api.get(`/packages/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

export const useGuidePackages = (guideId: string | undefined) => {
  return useQuery({
    queryKey: ["guidePackages", guideId],
    queryFn: async () => {
      const { data } = await api.get(`/packages/guide/${guideId}`);
      return data;
    },
    enabled: !!guideId,
  });
};

export const useCreatePackage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (packageData: Record<string, unknown>) => {
      const { data } = await api.post("/packages", packageData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] });
    },
  });
};

export const useUpdatePackage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...packageData }: { id: string; [key: string]: unknown }) => {
      const { data } = await api.put(`/packages/${id}`, packageData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] });
    },
  });
};

export const useDeletePackage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.delete(`/packages/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] });
    },
  });
};
