import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
    }, 1200)
  }

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      {/* Left Side: Hero Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDdt9RJBvnPNkDEHVgUYRyMQCM9sl2F0ijnhQwKu4FPOiGjSdqWJpZa5-8aHk8Ws48bmOnKQMN_Rn8NV7wt6gFkHhUx3W25R8iB3-FIiX9Z6IvssCv_Ld1LJh3H5lUon_XxMYXbLpf4DDbXy5fnzhih4O_LZct6oTmHAYBgPjSRHTUf0IhjuT2nYQ1xUfAF_RuDcF46cp3NT2esxJlIDmBbOXTAuqjmJyQSF3pSvffE8Lk04AD6XQ7l')`,
          }}
        ></div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        <div className="absolute bottom-16 left-16 right-16 z-10 text-white">
          <h2 className="text-4xl font-bold leading-tight mb-4">Securing your healthcare journey.</h2>
          <p className="text-lg opacity-90 max-w-md">
            Our advanced security protocols ensure your patient data and medical records remain private and accessible only to you.
          </p>
        </div>
      </div>

      {/* Right Side: Reset Password Form */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 lg:px-24 bg-white">
        <div className="w-full max-w-sm flex flex-col min-h-[600px]">
          {/* Brand Header */}
          <div className="flex flex-col items-center mb-12">
            <img
              alt="MedSys Healthcare Logo"
              className="h-12 w-auto mb-8"
              src="https://lh3.googleusercontent.com/aida/AP1WRLuewydWyIkVyoscvkzhSHF0RPKIBFoeXNVosJnYSzRbpIfWzcLYHlpPCyjjooGAd6Tolm8-LeTurECBqG5i6GkLqYW_qdsro1i2mrZiiej4le24RasSJtZRmuDy4Lxvavxdk7FJ9SZrdSHuek73RktLWgNYL19NxGabPnk-ffk2GQ35aatnDO-QqSOKLMpqGNHfI4wXaUX8RilhAmNYnqMcX1qCv7ou3CECpPE7Z7goWvKzM3NaBAjixQ"
            />
            <div className="text-center">
              <h1 className="text-2xl font-semibold text-on-surface mb-3">Reset Your Password</h1>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Enter your email address and we will send you a link to reset your password.
              </p>
            </div>
          </div>

          {/* Form */}
          {!isSuccess ? (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-on-surface-variant" htmlFor="reset-email">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-outline">
                    <span className="material-symbols-outlined text-xl">mail</span>
                  </div>
                  <input
                    className="form-input-focus block w-full pl-10 pr-4 py-3 bg-white border border-outline rounded-sm text-on-surface placeholder:text-outline transition-all"
                    id="reset-email"
                    name="email"
                    placeholder="e.g. doctor@medsys.com"
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <button
                className="w-full flex items-center justify-center gap-2 bg-primary text-on-primary py-3 px-6 rounded-sm font-semibold text-sm hover:bg-[#004491] transition-colors focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Send Reset Link</span>
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </>
                )}
              </button>
            </form>
          ) : null}

          {/* Back to Login */}
          <div className="mt-8 text-center">
            <Link className="inline-flex items-center gap-1 text-primary text-sm font-medium hover:underline" to="/login">
              <span className="material-symbols-outlined text-lg">chevron_left</span>
              Back to Login
            </Link>
          </div>

          {/* Success Message */}
          {isSuccess && (
            <div className="mt-8 p-4 bg-primary-fixed border border-primary/20 rounded-sm animate-fade-in">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined filled text-primary">check_circle</span>
                <div>
                  <p className="text-sm font-semibold text-on-primary-fixed">Link Sent!</p>
                  <p className="text-xs text-on-primary-fixed/80 mt-1">
                    Check your inbox for instructions. If you don't see it, please check your spam folder.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-auto pt-12 text-center text-[11px] uppercase tracking-wider text-outline">
            © 2024 MedSys Healthcare Systems. All Rights Reserved.
          </div>
        </div>
      </div>
    </div>
  )
}
