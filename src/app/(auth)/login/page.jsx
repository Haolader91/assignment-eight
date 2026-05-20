"use client";

import React, { useState } from "react";
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  Image as ImageIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());
    // console.log(user);
    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });
    // console.log(data);
    if (error) {
      alert(error.message || "Signup failed");
      return;
    }

    if (data) {
      e.currentTarget;
      router.push("/");
    }

    const { data: tokenData } = await authClient.token();
    console.log(tokenData);
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="min-h-screen bg-[#fcfbfe] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-[#0b132a] tracking-tight">
            Welcome Back to <span className="text-[#6366F1]">StudyNook</span>
          </h2>
          <p className="mt-2 text-sm text-gray-500 font-medium">
            Find your perfect quiet space to learn and create.
          </p>
        </div>

        <div className="bg-white p-8 border border-gray-100 rounded-3xl shadow-xl shadow-indigo-950/5 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 tracking-wide uppercase">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-3 text-black bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#6366F1] focus:bg-white transition"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 tracking-wide uppercase">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  name="password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 text-black bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#6366F1] focus:bg-white transition"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-[#6366F1] hover:bg-[#5356e2] text-white font-bold text-sm py-4 rounded-xl shadow-lg shadow-indigo-600/10 active:scale-98 transition transform duration-150"
            >
              Sign In
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="divider divider-info text-xs font-medium text-slate-400 uppercase my-8">
            or continue with
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 border border-gray-200 text-gray-700 font-semibold text-sm py-3 rounded-xl hover:bg-gray-50 transition active:scale-98 transform duration-150"
          >
            <FcGoogle size={20} />
            Continue with Google
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 font-medium">
          New to StudyNook?
          <Link
            href="/login"
            className="font-bold text-[#6366F1] hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
