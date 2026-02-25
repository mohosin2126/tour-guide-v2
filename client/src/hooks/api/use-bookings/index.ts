import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/hooks/auth/use-api";
import { useAuth } from "@/hooks/auth/use-auth";

export const useBookings = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const { data } = await api.get(`/bookings?email=${user!.email}`);
      return data;
    },
    enabled: !!user,
  });
};

export const useGuideBookings = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["guideBookings", user?.email],
    queryFn: async () => {
      const { data } = await api.get(`/bookings/guide?email=${user!.email}`);
      return data;
    },
    enabled: !!user && user.role === "guide",
  });
};

export const useAllBookings = () => {
  return useQuery({
    queryKey: ["allBookings"],
    queryFn: async () => {
      const { data } = await api.get("/bookings/all");
      return data;
    },
  });
};

export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookingData: Record<string, unknown>) => {
      const { data } = await api.post("/bookings", bookingData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
};

export const useCancelBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.patch(`/bookings/${id}/cancel`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["guideBookings"] });
      queryClient.invalidateQueries({ queryKey: ["allBookings"] });
    },
  });
};

export const useUpdateBookingStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { data } = await api.patch(`/bookings/${id}/status/${status}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["guideBookings"] });
      queryClient.invalidateQueries({ queryKey: ["allBookings"] });
    },
  });
};
