import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Lock, Mail, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MedAegisLogo } from "@/components/icons/MedAegisLogo";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Navigate to dashboard (placeholder - no real auth)
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div 
        className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative overflow-hidden"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiLz48cGF0aCBkPSJNMjAgMjBtLTEgMGExIDEgMCAxIDAgMiAwYTEgMSAwIDEgMCAtMiAwIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIi8+PC9nPjwvc3ZnPg==')] opacity-30" />
        
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
          <div className="mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
                <Shield className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl xl:text-5xl font-bold text-white mb-4 leading-tight">
              Secure Medical<br />Record Authority
            </h1>
            <p className="text-lg text-white/70 max-w-md">
              Protecting the authenticity and integrity of medical records through advanced cryptographic security.
            </p>
          </div>

          <div className="space-y-4 animate-slide-up stagger-2">
            <div className="flex items-center gap-3 text-white/80">
              <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                <Shield className="w-4 h-4 text-success" />
              </div>
              <span className="text-sm">PKI-Based Digital Signatures</span>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                <Lock className="w-4 h-4 text-success" />
              </div>
              <span className="text-sm">End-to-End Encryption</span>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                <Shield className="w-4 h-4 text-success" />
              </div>
              <span className="text-sm">Tamper-Proof Audit Logging</span>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-20 right-20 w-64 h-64 bg-accent/5 rounded-full blur-2xl" />
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-background">
        <div className="w-full max-w-md animate-scale-in">
          <div className="mb-8">
            <MedAegisLogo size="lg" className="mb-6 lg:hidden" />
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Welcome back
            </h2>
            <p className="text-muted-foreground">
              Sign in to access the secure portal
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email / Doctor ID
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="text"
                  placeholder="Enter your email or Doctor ID"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11 input-secure"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-11 input-secure"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <a href="#" className="text-primary hover:underline font-medium">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              variant="secure"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Signing in...
                </span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Secure Sign In
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-border">
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Shield className="w-3.5 h-3.5 text-success" />
              <span>Protected by MedAegis Security</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
