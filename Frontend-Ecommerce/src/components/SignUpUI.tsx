import React, { useState } from "react";
import authHero from "../assets/icons/authHero.jpg";
import "../styles/scss/_SignUpUI.scss";
import { Link } from "react-router-dom";

type Message = {
  text: string;
  type: "success" | "error" | "";
};

const SignUpUI: React.FC = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState(""); // email or phone input
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<Message>({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  // validators
  const isValidName = (v: string) => v.trim().length >= 3;
  const isEmail = (v: string) => /^\S+@\S+\.\S+$/.test(v);
  const isPhone = (v: string) => /^\+?\d{7,15}$/.test(v);
  const isValidPassword = (v: string) => v.length >= 5;

  const clearMessage = () => setTimeout(() => setMessage({ text: "", type: "" }), 5000);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    // client-side validation
    if (!isValidName(name)) {
      setMessage({ text: "Name must be at least 3 characters.", type: "error" });
      clearMessage();
      return;
    }

    const contactValue = contact.trim();
    let payload: any = { name, password };

    if (isEmail(contactValue)) {
      payload.email = contactValue;
    } else if (isPhone(contactValue)) {
      payload.phone = contactValue;
    } else {
      setMessage({ text: "Enter a valid email or phone number.", type: "error" });
      clearMessage();
      return;
    }

    if (!isValidPassword(password)) {
      setMessage({ text: "Password must be at least 5 characters.", type: "error" });
      clearMessage();
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // important to allow cookies from BE
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        // backend should return { message: '...' } via your error middleware
        const errMsg = data?.message || data?.error || "Signup failed";
        setMessage({ text: errMsg, type: "error" });
        clearMessage();
        return;
      }

      // success
      setMessage({ text: "Account created successfully.", type: "success" });

      // optional: you might want to redirect or clear the form
      setName("");
      setContact("");
      setPassword("");
      clearMessage();
    } catch (err: any) {
      setMessage({ text: err.message || "Network error", type: "error" });
      clearMessage();
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
      <div className="flex items-center justify-center flex-1 px-6 md:px-10 lg:px-8">
        <div className="flex flex-col gap-8 md:gap-10 lg:gap-[48px] w-full max-w-[500px] lg:max-w-[371px] h-auto py-8 lg:py-0">
          {/* Top message banner */}
          {message.type && (
            <div
              className={`p-3 rounded-sm text-sm ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
            >
              {message.text}
            </div>
          )}

          {/* Header */}
          <div className="flex flex-col gap-5 md:gap-6 lg:gap-6">
            <h1 className="font-inter font-medium text-2xl md:text-3xl lg:text-4xl text-left">
              Create an account
            </h1>
            <p className="font-poppins font-normal text-sm md:text-base text-black leading-normal text-left">
              Enter your details below
            </p>
          </div>

          {/* Form (handled by React; removed native action attribute) */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-8 md:gap-10 lg:gap-10">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name"
              className="font-poppins text-sm md:text-base w-full bg-transparent border-b border-black/40 outline-none focus:border-black pb-2"
            />

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

            {/* Create Account Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 px-4 py-2 font-poppins text-sm md:text-base btn-auth-primary rounded-sm"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          {/* Sign up with Google (keeps existing UI) */}
          <button className="w-full h-14 border border-black/40 px-4 py-2 flex items-center justify-center gap-4 font-poppins text-sm md:text-base hover:bg-gray-50 transition-colors rounded-sm">
            {/* svg icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Sign up with Google
          </button>

          {/* Already have account */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full">
            <p className="font-poppins text-sm md:text-base text-black/70">Already have account?</p>
            <Link to="/" className="font-poppins text-sm md:text-base underline hover:text-black transition-colors">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpUI;
