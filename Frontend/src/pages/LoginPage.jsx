import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ROLES = [
  {
    key: "Patient",
    label: "Patient",
    icon: (active) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`w-5 h-5 ${active ? "text-[#1D4ED8]" : "text-slate-500"}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
        />
      </svg>
    ),
    dashboard: "/patient",
  },
  {
    key: "Doctor",
    label: "Doctor",
    icon: (active) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`w-5 h-5 ${active ? "text-[#1D4ED8]" : "text-slate-500"}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    ),
    dashboard: "/doctor",
  },
  {
    key: "Admin",
    label: "Admin",
    icon: (active) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`w-5 h-5 ${active ? "text-[#1D4ED8]" : "text-slate-500"}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
        />
      </svg>
    ),
    dashboard: "/admin",
  },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("Patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const validateEmail = (value) => {
    setEmail(value);
    if (value.length > 0 && (!value.includes("@") || !value.includes("."))) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to the dashboard for the selected role
    // (Auth validation will be enforced once backend is connected)
    const role = ROLES.find((r) => r.key === selectedRole);
    localStorage.setItem("hmsRole", selectedRole);
    navigate(role.dashboard);
  };

  return (
    <main className="flex min-h-screen w-full">
      {/* Left Side: Visual Anchor */}
      <section className="hidden lg:flex lg:w-1/2 relative bg-primary-container items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover opacity-80"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkDZoOwaa2LEld5ExJS1epmsBJGqfXQ8gQnpGG2ApriRO3kGFPprR3jWVeG7Q3jeeOmfrrOLt2lM7PxS7jSodyJ-vyju_2hBR6HB0v1KPEHMyYaZwCS8cKBrkjubUEHBkB2svEa2F-pBV1SZzQkoE4TSpXgnnSePiwDoU-KQvFqX-iOKktW_WWNh1hgwXZMxMjbojEHQCwRLXaC3dnIxxb6khuc_8CvFVzYUZMHeQIzsPNz6YcH15sANvb911ZAAigXcTHYHRIGCg"
            alt="Healthcare professionals"
          />
        </div>
        {/* Dark gradient overlay matching your screenshot */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0F2860]/80 via-[#1D4ED8]/40 to-transparent pointer-events-none" />
        <div className="relative z-10 px-10 max-w-xl text-white">
          <h1 className="text-[36px] font-bold leading-tight mb-3 tracking-tight">
            Join Our Healthcare
            <br />
            Community
          </h1>
          <p className="text-base opacity-85 leading-6">
            Seamlessly manage patient records, appointments, and prescriptions
            with our integrated clinical dashboard.
          </p>
        </div>
      </section>

      {/* Right Side: Login Form */}
      <section className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 py-10 bg-white relative">
        <div className="w-full max-w-md">
          {/* Brand Identity */}
          <div className="flex flex-col items-center mb-7">
            <p className="text-[#1D4ED8] font-bold text-base tracking-wide">
              Medimate Healthcare
            </p>
          </div>

          {/* Form Header */}
          <div className="mb-6">
            <h1 className="text-[30px] font-bold text-slate-900 leading-tight tracking-tight">
              Welcome Back
            </h1>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Role Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold tracking-widest uppercase text-slate-500">
                Select Your Role
              </label>
              <div className="grid grid-cols-3 gap-3">
                {ROLES.map((role) => {
                  const isActive = selectedRole === role.key;
                  return (
                    <button
                      key={role.key}
                      type="button"
                      id={`role-${role.key.toLowerCase()}`}
                      onClick={() => setSelectedRole(role.key)}
                      className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border-2 font-semibold text-sm transition-all duration-150 cursor-pointer
                        ${
                          isActive
                            ? "border-[#1D4ED8] bg-[#EFF6FF] text-[#1D4ED8] shadow-sm"
                            : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                    >
                      {role.icon(isActive)}
                      <span
                        className={`text-xs font-semibold ${isActive ? "text-[#1D4ED8]" : "text-slate-600"}`}
                      >
                        {role.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-1">
              <label
                className="text-sm font-medium text-slate-700"
                htmlFor="login-email"
              >
                Email Address
              </label>
              <input
                className={`w-full px-3.5 py-2.5 bg-white border ${emailError ? "border-red-400 focus:ring-red-300" : "border-slate-300 focus:ring-[#1D4ED8]/30"} rounded-lg focus:ring-2 focus:border-[#1D4ED8] transition-all outline-none text-sm text-slate-800`}
                id="login-email"
                placeholder="examples@gmail.com"
                type="email"
                value={email}
                onChange={(e) => validateEmail(e.target.value)}
              />
              {emailError && (
                <p className="text-xs text-red-500 font-medium mt-1">
                  Email not required. Please try again
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label
                  className="text-sm font-medium text-slate-700"
                  htmlFor="login-password"
                >
                  Password
                </label>
                <Link
                  className="text-sm text-[#1D4ED8] font-semibold hover:underline"
                  to="/forgot-password"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <input
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1D4ED8]/30 focus:border-[#1D4ED8] transition-all outline-none text-sm text-slate-800 pr-11"
                  id="login-password"
                  placeholder="••••••••••••••••••"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.8}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.8}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2">
              <input
                className="w-4 h-4 rounded border-slate-300 text-[#1D4ED8] focus:ring-[#1D4ED8] cursor-pointer"
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label
                htmlFor="remember-me"
                className="text-sm text-slate-600 cursor-pointer select-none"
              >
                Keep me signed in for 30 days
              </label>
            </div>

            {/* Submit Button */}
            <button
              className="w-full py-3.5 px-6 bg-[#1D4ED8] hover:bg-[#1e40af] text-white text-base font-semibold rounded-xl shadow-md active:scale-[0.98] transition-all flex justify-center items-center gap-2 cursor-pointer"
              type="submit"
              id="login-submit"
            >
              Login
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 border-t border-slate-200" />

          {/* SSO Buttons */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-3">
              <button
                aria-label="Sign in with Microsoft"
                className="p-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors active:scale-95 cursor-pointer"
              >
                <svg className="w-6 h-6" fill="#f25022" viewBox="0 0 23 23">
                  <path d="M0 0h11v11H0z"></path>
                  <path d="M12 0h11v11H12z" fill="#7fba00"></path>
                  <path d="M0 12h11v11H0z" fill="#00a4ef"></path>
                  <path d="M12 12h11v11H12z" fill="#ffb900"></path>
                </svg>
              </button>
              <button
                aria-label="Sign in with Google"
                className="p-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors active:scale-95 cursor-pointer"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  ></path>
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  ></path>
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    fill="#FBBC05"
                  ></path>
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  ></path>
                </svg>
              </button>
            </div>
            <p className="text-sm text-slate-500">
              Don't have an account?{" "}
              <Link
                className="text-[#1D4ED8] font-semibold hover:underline"
                to="/register"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
