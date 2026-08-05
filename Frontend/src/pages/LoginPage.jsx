import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const validateEmail = (value) => {
    setEmail(value)
    if (value.length > 0 && (!value.includes('@') || !value.includes('.'))) {
      setEmailError(true)
    } else {
      setEmailError(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Navigate to dashboard on submit
    navigate('/dashboard')
  }

  return (
    <main className="flex min-h-screen w-full">
      {/* Left Side: Visual Anchor */}
      <section className="hidden lg:flex lg:w-1/2 relative bg-primary-container items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover opacity-80 mix-blend-overlay"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkDZoOwaa2LEld5ExJS1epmsBJGqfXQ8gQnpGG2ApriRO3kGFPprR3jWVeG7Q3jeeOmfrrOLt2lM7PxS7jSodyJ-vyju_2hBR6HB0v1KPEHMyYaZwCS8cKBrkjubUEHBkB2svEa2F-pBV1SZzQkoE4TSpXgnnSePiwDoU-KQvFqX-iOKktW_WWNh1hgwXZMxMjbojEHQCwRLXaC3dnIxxb6khuc_8CvFVzYUZMHeQIzsPNz6YcH15sANvb911ZAAigXcTHYHRIGCg"
            alt="Healthcare professionals"
          />
        </div>
        <div className="relative z-10 px-8 max-w-xl text-on-primary">
          <div className="mb-6">
            <span className="inline-block px-4 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold tracking-widest uppercase mb-4 border border-white/20">
              HEALTHCARE SOLUTIONS
            </span>
            <h1 className="text-[32px] font-bold leading-10 mb-4 tracking-tight">
              Advanced Care for Every Patient.
            </h1>
            <p className="text-base opacity-90 leading-6">
              Seamlessly manage patient records, appointments, and prescriptions with our integrated clinical dashboard designed for modern medical practitioners.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 rounded-full border-2 border-white bg-surface-container overflow-hidden">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8uRB9_EfmLNZ6kU_3Fb87oEZ4OoTQuZL0nO0z5_clabSLmIyusjtbYc1eveE8RvmyrbFVCybVZKZ5Gt80LXmgtyJidEg6oFg8S4Hl3-9YzvUHbSRbF9wCLPq8DBPXmkbIbvSA-wXStJEjDl-wA8Cb2lw4dDErK3uxChiDByYRPf5vmwC-SFWAUFZW9zmWCP4Va67sirJ1gaIhAqRVmsD0Hh7aZggWOQYveZu7VUQZEq84WfUJgaRWh4kTWQAvrRawAyfmDmBnb8s" alt="Doctor 1" />
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-white bg-surface-container overflow-hidden">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWqY9TzXsl10oyv5oTrGz9A_Z0U4K2zSe6RTbesrKL_D1xl-3jZPT-bcZdwpSjrXi1FXovLQkX6-RAoxBNquW4exu-xjao9YKRA6qK1AlSBKzgwoHpppKggByc1RPM3eIZmqM4nNLVoeWJGBpeS0Uw20NcqSs65ntMb9vtVQUAFGzHJraVK0ZNPfNMkqCcmqx6W14tnc_ichteEgvPvfEuDnm8vmmy315MfTHQTEAsYCUPxd3a9M3xiWLBup3yFXFLSP90P2IgOj4" alt="Nurse" />
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-white bg-surface-container overflow-hidden">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCH2BWQx8Y5DG-sXXFxWNvmYPHSybM5oGh9khNVfpVmRSCZgfLPNQJpQG-gLfygq8iQq2ReJml6KyotZE9SMHAyqFXg9YR5X-s8NUKAxXgsuuEzO13lx_XwXVvMCP4g7UVfmttDE6XNb_KooGUfNE1s8UVve4YyAeMB5T-ld39f_wfQN2w-UnvRlN5Ocdsq27l5Uj22i526HkC7lxyT2ro9wLIhZGAnpzpCmEMvhm7U87xXefs-B0LA5Krs7QBAw9ivaFJ98BuK9Vs" alt="Researcher" />
              </div>
            </div>
            <span className="text-sm font-semibold">Join 2,000+ medical staff</span>
          </div>
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/60 to-transparent pointer-events-none"></div>
      </section>

      {/* Right Side: Login Form */}
      <section className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 py-8 bg-white relative">
        <div className="w-full max-w-md">
          {/* Brand Identity */}
          <div className="flex flex-col items-center mb-8">
            <img
              alt="MedSys Healthcare Logo"
              className="h-16 w-16 mb-4"
              src="https://lh3.googleusercontent.com/aida/AP1WRLtkT2iApqDom4IMziqHdsIEOXXT4iCaL0YnlSToIJzhmGFX16cK93xc_NNZI_tJdpglMGB9byESVBqyRkFNaixRKAy42SYWLfWik3dwjLCNtFpZsNFH-8o_2I3wUUsArOgnDY10AxOVikTmArAkv7Sp5yN8vpBaM_9YEM_cGlaos5Z6bpW2tTEDN3Pz_C0blSu1t0DZB5F4DMDw8dPj42NY_QNmJaVjeeiS3ze4R-AEf0hVPXjaBuWXHA"
            />
            <h2 className="text-2xl font-semibold text-primary tracking-tight">MedSys Healthcare</h2>
            <p className="text-sm text-on-surface-variant mt-1">Professional Clinical Access Portal</p>
          </div>

          {/* Form Header */}
          <div className="mb-6">
            <h3 className="text-[32px] font-bold text-on-surface leading-10 tracking-tight">Welcome Back</h3>
            <p className="text-base text-on-surface-variant leading-6">Please enter your credentials to access your dashboard.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-on-surface-variant" htmlFor="login-email">
                Email Address
              </label>
              <div className="relative">
                <input
                  className={`w-full px-4 py-2 bg-white border ${emailError ? 'border-error' : 'border-outline-variant'} rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-base`}
                  id="login-email"
                  placeholder="dr.smith@cityhospital.com"
                  type="email"
                  value={email}
                  onChange={(e) => validateEmail(e.target.value)}
                />
                {emailError && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-error">
                    <span className="material-symbols-outlined">error</span>
                  </div>
                )}
              </div>
              {emailError && (
                <p className="text-sm text-error font-medium flex items-center gap-1">
                  Invalid email format
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-on-surface-variant" htmlFor="login-password">
                  Password
                </label>
                <Link className="text-sm text-primary font-semibold hover:underline" to="/forgot-password">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <input
                  className="w-full px-4 py-2 bg-white border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-base"
                  id="login-password"
                  placeholder="••••••••"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-on-surface-variant hover:text-primary transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                >
                  <span className="material-symbols-outlined">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <label className="flex items-center cursor-pointer group">
                <input
                  className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="ml-4 text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">
                  Keep me signed in for 30 days
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              className="w-full py-4 px-6 bg-primary text-on-primary text-xl font-semibold rounded-lg shadow-md hover:bg-primary-container active:scale-[0.98] transition-all flex justify-center items-center gap-4"
              type="submit"
            >
              Login
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-8 text-center space-y-4">
            <p className="text-base text-on-surface-variant">
              Don't have an account?{' '}
              <Link className="text-primary font-bold hover:underline" to="/register">
                Register here
              </Link>
            </p>
            <div className="pt-6 border-t border-outline-variant flex flex-col items-center">
              <p className="text-xs font-semibold tracking-widest uppercase text-on-surface-variant/60 mb-4">
                Enterprise SSO Login
              </p>
              <div className="flex gap-4">
                <button
                  aria-label="Sign in with Microsoft"
                  className="p-4 border border-outline-variant rounded-lg hover:bg-surface-container-low transition-colors active:scale-95"
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
                  className="p-4 border border-outline-variant rounded-lg hover:bg-surface-container-low transition-colors active:scale-95"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Legal Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-on-surface-variant/40">
              © 2024 MedSys Healthcare. HIPAA Compliant System.
            </p>
            <p className="text-sm text-on-surface-variant/40 mt-1">
              <a className="hover:underline" href="#">Terms of Service</a> • <a className="hover:underline" href="#">Privacy Policy</a>
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
