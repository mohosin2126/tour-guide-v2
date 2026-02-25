import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/auth/use-auth";
import { Skeleton } from "@/components/ui/loading";

const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    phone: z.string().optional(),
    photo: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("user");
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    setError("");
    setLoading(true);
    try {
      const result = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone || "",
        photo: data.photo || "",
        role,
      });
      if (result.success) {
        toast.success("Account created! Welcome aboard.");
        navigate("/");
      } else {
        setError(result.error || "Registration failed. Please try again.");
        toast.error(result.error || "Registration failed");
      }
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { error?: string } } };
      setError(axiosErr.response?.data?.error || "Registration failed. Please try again.");
      toast.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat px-4 py-12"
      style={{ backgroundImage: "url('/image/register.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <Card className="relative z-10 w-full max-w-md border-0 bg-gray-900/70 backdrop-blur-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-white">Create Account</CardTitle>
          <CardDescription className="text-gray-400">Join Tour Guide today</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <div className="rounded-md bg-destructive/15 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-300">
                Full Name
              </Label>
              <Input
                id="name"
                placeholder="John Doe"
                className="border-gray-600 bg-gray-800/50 text-white placeholder:text-gray-500"
                {...register("name")}
              />
              {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="border-gray-600 bg-gray-800/50 text-white placeholder:text-gray-500"
                {...register("email")}
              />
              {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="photo" className="text-gray-300">
                Photo URL (optional)
              </Label>
              <Input
                id="photo"
                placeholder="https://example.com/photo.jpg"
                className="border-gray-600 bg-gray-800/50 text-white placeholder:text-gray-500"
                {...register("photo")}
              />
              {errors.photo && <p className="text-xs text-red-400">{errors.photo.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-300">
                Phone (optional)
              </Label>
              <Input
                id="phone"
                placeholder="+1 234 567 8900"
                className="border-gray-600 bg-gray-800/50 text-white placeholder:text-gray-500"
                {...register("phone")}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300">Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="border-gray-600 bg-gray-800/50 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">Traveler</SelectItem>
                  <SelectItem value="guide">Tour Guide</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••"
                    className="border-gray-600 bg-gray-800/50 pr-10 text-white placeholder:text-gray-500"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-400">{errors.password.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-300">
                  Confirm
                </Label>
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••"
                  className="border-gray-600 bg-gray-800/50 text-white placeholder:text-gray-500"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="text-xs text-red-400">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full bg-white/70" />
                  Creating account...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <UserPlus size={18} />
                  Sign Up
                </span>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/auth/login" className="font-semibold text-primary hover:underline">
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

