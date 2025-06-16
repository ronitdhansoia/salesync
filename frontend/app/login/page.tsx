"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authApi } from "@/lib/api";
import { Mail, Lock, ArrowRight, MessageSquare } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Check for demo credentials first
      if (email === "demo@salesync.in" && password === "demo123") {
        // Create demo user data
        const demoUser = {
          id: "demo-user",
          email: "demo@salesync.in",
          name: "Demo User",
          company: "SaleSync India",
          role: "Sales Manager"
        };
        const demoToken = "demo-token-" + Date.now();
        
        localStorage.setItem("token", demoToken);
        localStorage.setItem("user", JSON.stringify(demoUser));
        router.push("/dashboard");
        return;
      }

      // For other credentials, try API login
      const { user, token } = await authApi.login(email, password);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed. Try demo credentials: demo@salesync.in / demo123");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setEmail("demo@salesync.in");
    setPassword("demo123");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left side - Login Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-[#7760F9] to-[#6651E8] p-2 rounded-xl">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">SaleSync India</h1>
            </div>
            <h2 className="mt-8 text-3xl font-bold text-gray-900">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Sign in to your account to continue
            </p>
          </div>

          <div className="mt-8">
            <div className="mt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 block w-full"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 block w-full"
                      placeholder="Enter your password"
                    />
                  </div>
                </div>

                {error && (
                  <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full flex items-center justify-center space-x-2"
                  >
                    <span>{loading ? "Signing in..." : "Sign in"}</span>
                    {!loading && <ArrowRight className="h-4 w-4" />}
                  </button>
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleDemoLogin}
                    className="text-sm text-[#7760F9] hover:text-[#6651E8] font-medium"
                  >
                    Use demo credentials
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-50 text-gray-500">
                    New to SaleSync?
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href="/register"
                  className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Create account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Feature showcase */}
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 gradient-bg">
          <div className="absolute inset-0 bg-black bg-opacity-10" />
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="max-w-md text-white">
              <h3 className="text-4xl font-bold mb-6">
                WhatsApp-First Sales Automation
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-white bg-opacity-20 rounded-lg p-2">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Bulk WhatsApp Messaging</h4>
                    <p className="text-sm text-gray-200">
                      Reach thousands of prospects with personalized messages
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-white bg-opacity-20 rounded-lg p-2">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Smart Automation</h4>
                    <p className="text-sm text-gray-200">
                      AI-powered responses and campaign optimization
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-white bg-opacity-20 rounded-lg p-2">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Real-time Analytics</h4>
                    <p className="text-sm text-gray-200">
                      Track engagement and optimize your campaigns
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}