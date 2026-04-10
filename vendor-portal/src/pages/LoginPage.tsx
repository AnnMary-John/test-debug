import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogIn, ShieldCheck } from 'lucide-react';
import { toast } from "sonner";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const {user}= useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (!success) {
      toast.error("Invalid credentials. Please try again.");
    }
  };

  useEffect(() => {
  if (!user) return;
  console.log(user.role);
  if (user.role === "platform_user") {
    toast.error("only vendors can log in!");
  } else {
    toast.success("Welcome back!");
    navigate("/");
  }
}, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 text-foreground selection:bg-primary/30">
      <div className="max-w-md w-full bg-card border border-border p-10 rounded-2xl shadow-2xl relative overflow-hidden group transition-all duration-500 hover:border-primary/20">
        {/* Decorative background element */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-500" />
        
        <div className="relative text-center mb-10">
          <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/20 shadow-inner">
            <ShieldCheck className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Vendor Portal</h1>
          <p className="mt-3 text-muted-foreground text-sm font-medium">Internal Asset Management System</p>
        </div>

        <form onSubmit={handleSubmit} className="relative space-y-6">
          
          
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Corporate Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-muted/30 border border-input rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/30 text-sm"
              placeholder="e.g. j.doe@vendor.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Secure Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-muted/30 border border-input rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/30 text-sm"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20 active:scale-[0.98]"
          >
            <LogIn className="w-5 h-5" />
            Authenticate Access
          </button>
        </form>

        <div className="relative mt-8 text-center">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-border" />
          <span className="relative bg-card px-4 text-[10px] font-bold text-muted-foreground/50 uppercase tracking-widest">
            Authorization Required
          </span>
        </div>
        
        <div className="mt-8 text-center text-xs text-muted-foreground/40 leading-relaxed font-medium">
          Protected by end-to-end encryption. <br />
          Contact <span className="text-primary/60">ops-support@fleet.hub</span> for password resets.
        </div>
      </div>
    </div>
  );
};

