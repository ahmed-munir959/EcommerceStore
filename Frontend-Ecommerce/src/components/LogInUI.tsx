import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authHero from "../assets/icons/authHero.jpg";
import { showSuccessToast, showErrorToast } from "../utils/toast.config";
import "../styles/scss/_LogInUI.scss";

const LogInUI: React.FC = () => {
  const [contact, setContact] = useState(""); // email or phone
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isEmail = (v: string) => /^\S+@\S+\.\S+$/.test(v);
  const isPhone = (v: string) => /^\+?\d{7,15}$/.test(v);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const val = contact.trim();
    if (!val) {
      showErrorToast("Enter email or phone");
      return;
    }
    if (!isEmail(val) && !isPhone(val)) {
      showErrorToast("Enter valid email or phone number");
      return;
    }
    if (!password || password.length < 6) {
      showErrorToast("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      // Build payload - send as { contact, password } so backend auto-detects
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // allow backend to set refresh cookie
        body: JSON.stringify({ contact: val, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        showErrorToast(data?.message || "Login failed");
        return;
      }

      // Success: backend returns accessToken + user
      const { accessToken } = data;
      if (accessToken) {
        // store accessToken for client-side auth checks (simple)
        sessionStorage.setItem("accessToken", accessToken);
      }

      showSuccessToast("Logged in successfully! Redirecting...");
      
      // Small delay to let user see the toast before redirect
      setTimeout(() => {
        navigate("/home", { replace: true });
      }, 500);
    } catch (err: any) {
      showErrorToast(err?.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center w-full min-h-screen bg-white overflow-hidden">
      {/* Left Side */}
      <div className="hidden lg:block lg:w-[60%] xl:w-[805px] h-[500px] lg:h-[650px] xl:h-[781px] shrink-0 relative overflow-hidden bg-[#CBE4E8]">
        <img src={authHero} alt="Shopping" className="w-full h-full object-cover" />
      </div>

      {/* Right Side */}
      <div className="flex items-center justify-center flex-1 px-6 sm:px-8 md:px-10 lg:px-8">
        <div className="flex flex-col gap-8 md:gap-10 lg:gap-[40px] w-full md:w-[500px] lg:w-full lg:max-w-[371px] h-auto py-8 lg:py-0">
          {/* Header */}
          <div className="flex flex-col gap-5 md:gap-6 lg:gap-6">
            <h1 className="font-inter font-medium text-2xl md:text-3xl lg:text-4xl text-left">
              Log in to Exclusive
            </h1>
            <p className="font-poppins font-normal text-sm md:text-base text-black leading-normal text-left">
              Enter your details below
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-8 md:gap-10 lg:gap-10">
            <input
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              type="text"
              placeholder="Email or Phone Number"
              className="font-poppins text-sm md:text-base w-full bg-transparent border-b border-black/40 outline-none focus:border-black pb-2"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="font-poppins text-sm md:text-base w-full bg-transparent border-b border-black/40 outline-none focus:border-black pb-2"
            />

            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 w-full">
              <button type="submit" disabled={loading} className="w-full md:w-auto h-14 px-8 py-2 font-poppins text-sm md:text-base btn-auth-primary rounded-sm">
                {loading ? "Logging..." : "Log In"}
              </button>

              <a href="/forgot-password" className="font-poppins text-sm md:text-base hover:underline text-auth-primary text-left">
                Forget Password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogInUI;