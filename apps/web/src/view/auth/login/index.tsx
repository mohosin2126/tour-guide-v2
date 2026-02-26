import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, LogIn, ShieldCheck, User, Map } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/auth/use-auth";
import { Skeleton } from "@/components/ui/loading";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const demoAccounts = [
  { label: "Sign in as Admin", email: "admin@tourguide.com", password: "admin123", icon: ShieldCheck, color: "bg-violet-600 hover:bg-violet-700" },
  { label: "Sign in as User", email: "user@test.com", password: "user123", icon: User, color: "bg-blue-600 hover:bg-blue-700" },
  { label: "Sign in as Guide", email: "john.guide@tourguide.com", password: "guide123", icon: Map, color: "bg-emerald-600 hover:bg-emerald-700" },
];

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setError("");
    setLoading(true);
    try {
      const result = await login(data.email, data.password);
      if (result.success) {
        toast.success("Welcome back!");
        navigate(from, { replace: true });
      } else {
        setError(result.error || "Invalid email or password");
        toast.error(result.error || "Invalid email or password");
      }
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string; error?: string } } };
      setError(axiosErr.response?.data?.message || axiosErr.response?.data?.error || "Invalid email or password");
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (email: string, password: string) => {
    setError("");
    setDemoLoading(email);
    try {
      const result = await login(email, password);
      if (result.success) {
        const role = email.includes("admin") ? "admin" : email.includes("guide") ? "guide" : "user";
        navigate(`/${role}/overview`, { replace: true });
      } else {
        setError(result.error || "Demo login failed. Please ensure the database is seeded.");
      }
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string; error?: string } } };
      setError(axiosErr.response?.data?.message || axiosErr.response?.data?.error || "Demo login failed");
    } finally {
      setDemoLoading(null);
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat px-4"
      style={{ backgroundImage: "url('/image/register.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <Card className="relative z-10 w-full max-w-md border-0 bg-gray-900/70 backdrop-blur-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-white">Welcome Back</CardTitle>
          <CardDescription className="text-gray-400">Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <div className="rounded-md bg-destructive/15 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}
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
              {errors.email && (
                <p className="text-xs text-red-400">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="border-gray-600 bg-gray-800/50 pr-10 text-white placeholder:text-gray-500"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-400">{errors.password.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full bg-white/70" />
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <LogIn size={18} />
                  Sign In
                </span>
              )}
            </Button>
          </form>

          {/* Demo Login Buttons */}
          <div className="mt-6">
            <div className="relative">
              <Separator className="bg-gray-700" />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900/70 px-3 text-xs text-gray-500">
                Or try a demo account
              </span>
            </div>
            <div className="mt-4 grid gap-2">
              {demoAccounts.map((demo) => {
                const Icon = demo.icon;
                return (
                  <Button
                    key={demo.email}
                    type="button"
                    className={`w-full ${demo.color} text-white`}
                    onClick={() => handleDemoLogin(demo.email, demo.password)}
                    disabled={!!demoLoading || loading}
                  >
                    {demoLoading === demo.email ? (
                      <span className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4 rounded-full bg-white/70" />
                        Signing in...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Icon size={16} />
                        {demo.label}
                      </span>
                    )}
                  </Button>
                );
              })}
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-gray-400">
            Don&apos;t have an account?{" "}
            <Link to="/auth/register" className="font-semibold text-primary hover:underline">
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

