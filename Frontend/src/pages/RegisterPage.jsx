import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { patientApi } from '../services/api'
import toast from 'react-hot-toast'
import { getFriendlyErrorMessage } from '../utils/userMessages'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 3

  // Step 1 fields
  const [fullName, setFullName] = useState('')
  const [dob, setDob] = useState('')
  const [bloodGroup, setBloodGroup] = useState('')
  const [gender, setGender] = useState('')
  const [nationalId, setNationalId] = useState('')

  // Step 2 fields
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [allergies, setAllergies] = useState('')
  const [existingConditions, setExistingConditions] = useState('')
  const [currentMedications, setCurrentMedications] = useState('')
  const [medicalNotes, setMedicalNotes] = useState('')
  const [emergencyName, setEmergencyName] = useState('')
  const [emergencyRelationship, setEmergencyRelationship] = useState('')
  const [emergencyPhone, setEmergencyPhone] = useState('')
  const [emergencyEmail, setEmergencyEmail] = useState('')

  // Step 3 fields
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const getPasswordStrength = (val) => {
    if (!val) return { score: 0, label: 'Empty', color: 'text-on-surface-variant' }
    let score = 0
    if (val.length > 5) score++
    if (val.length > 8) score++
    if (/[A-Z]/.test(val) && /[0-9]/.test(val)) score++
    if (/[^A-Za-z0-9]/.test(val)) score++

    if (score <= 1) return { score: 1, label: 'Weak', color: 'text-error' }
    if (score === 2) return { score: 2, label: 'Medium', color: 'text-yellow-600' }
    if (score === 3) return { score: 3, label: 'Strong', color: 'text-secondary' }
    return { score: 4, label: 'Excellent', color: 'text-secondary' }
  }

  const strength = getPasswordStrength(password)

  const barColors = ['bg-surface-container-highest', 'bg-surface-container-highest', 'bg-surface-container-highest', 'bg-surface-container-highest']
  if (strength.score >= 1) barColors[0] = strength.score === 1 ? 'bg-error' : strength.score === 2 ? 'bg-yellow-500' : 'bg-secondary'
  if (strength.score >= 2) barColors[1] = strength.score === 2 ? 'bg-yellow-500' : 'bg-secondary'
  if (strength.score >= 3) barColors[2] = 'bg-secondary'
  if (strength.score >= 4) barColors[3] = 'bg-secondary'

  const changeStep = (direction) => {
    const newStep = currentStep + direction
    if (newStep < 1 || newStep > totalSteps) return
    setCurrentStep(newStep)
  }

  const generateTempPassword = () => {
    const randomPart = Math.random().toString(36).slice(2, 8).toUpperCase()
    const timestampPart = Date.now().toString(36).slice(-4).toUpperCase()
    return `Pat@${randomPart}${timestampPart}`
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')

    if (password !== confirmPassword) {
      const message = 'Passwords do not match'
      setSubmitError(message)
      toast.error(message)
      return
    }

    setLoading(true)
    try {
      const payload = {
        fullName,
        email,
        password: password || generateTempPassword(),
        phone,
        dob,
        bloodGroup,
        gender,
        nationalId,
        address,
        allergies,
        existingConditions,
        currentMedications,
        medicalNotes,
        emergencyName,
        emergencyRelationship,
        emergencyPhone,
        emergencyEmail,
        status: 'Active',
      }

      await patientApi.create(payload)
      toast.success('Patient registered successfully')
      navigate('/login')
    } catch (err) {
      console.error('Failed to register patient:', err)
      const message = getFriendlyErrorMessage(err, 'We could not register the patient. Please try again.')
      setSubmitError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const getStepIndicatorStyle = (step) => {
    if (step < currentStep) return 'bg-secondary text-on-secondary'
    if (step === currentStep) return 'bg-primary text-on-primary'
    return 'bg-surface-container-high text-on-surface-variant'
  }

  return (
    <main className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side: Visual Anchor */}
      <section className="hidden md:flex md:w-5/12 lg:w-1/2 relative bg-primary overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover opacity-90"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQeXyXclWpUZ7hM1Zcwe4kSaOemj8KxDe04W39DrftoHIi8bhN3-RTa20P1lxsvd3-kZAxQPBYtdhHFptcHpoy3gTqa0GJAV-Em_QYUzCqFyWOe2euuy0QeHqQpYwL0KxsiZOiUPIT5_ufb8Z3Er1dl6bCnougQFfEgQFFLscOrBCY2Fvx7PYxbsCnC95xXgrZO_qdzECQ1seT1FkTDE9dUhthankpjvdqWSWEg-Oufr488syI4S9TEv-j6xh2HTQRyRuwdFKekWM"
            alt="Healthcare professionals"
          />
        </div>
        <div className="relative z-10 p-8 flex flex-col justify-end w-full h-full bg-gradient-to-t from-primary/80 to-transparent">
          <div className="max-w-md">
            <h1 className="text-[32px] font-bold text-on-primary mb-4 leading-10 tracking-tight">
              Join Our Healthcare Community
            </h1>
            <p className="text-base text-primary-fixed mb-8 leading-6">
              Register today to access your personalized medical dashboard, appointment scheduling, and secure record management.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary">verified_user</span>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-primary-fixed">
                  Secure &amp; HIPAA Compliant
                </p>
                <p className="text-sm text-on-primary-container">
                  Your data is protected by industry-standard encryption.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Right Side: Registration Form */}
      <section className="w-full md:w-7/12 lg:w-1/2 flex flex-col items-center justify-center p-4 lg:p-8 bg-surface">
        <div className="w-full max-w-lg">
          {/* Brand Header */}
          <div className="flex items-center gap-2 mb-8 md:mb-6">
            <span className="material-symbols-outlined filled text-primary text-4xl">health_and_safety</span>
            <span className="text-2xl font-semibold text-primary tracking-tight">MedSys Healthcare</span>
          </div>

          <div className="mb-6 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
            This registration form is for patients only. Admin and doctor accounts are created by the system admin and can sign in with existing credentials.
          </div>

          {/* Multi-step Indicator */}
          <nav aria-label="Registration Progress" className="flex items-center justify-between mb-8 relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-surface-container-high -translate-y-1/2 z-0"></div>
            {[
              { step: 1, label: 'Personal' },
              { step: 2, label: 'Contact' },
              { step: 3, label: 'Security' },
            ].map(({ step, label }) => (
              <div key={step} className="relative z-10 flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors ${getStepIndicatorStyle(step)}`}>
                  {step < currentStep ? (
                    <span className="material-symbols-outlined text-lg">check</span>
                  ) : step}
                </div>
                <span className={`text-xs font-semibold tracking-widest uppercase mt-1 ${
                  step <= currentStep ? 'text-on-surface' : 'text-on-surface-variant'
                }`}>
                  {label}
                </span>
              </div>
            ))}
          </nav>

          {/* Registration Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {submitError && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {submitError}
              </div>
            )}

            {/* Step 1: Personal Details */}
            {currentStep === 1 && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-semibold text-on-surface mb-2 leading-7">Personal Details</h2>
                <p className="text-sm text-on-surface-variant mb-6">Please provide your personal identification information.</p>
                <div className="space-y-4">
                  <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase mb-1 text-on-surface-variant" htmlFor="full_name">
                      Full Name <span className="text-error">*</span>
                    </label>
                    <input
                      className="w-full h-12 px-4 bg-white border border-outline-variant rounded-lg text-base form-input-focus transition-all"
                      id="full_name"
                      placeholder="John Doe"
                      required
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase mb-1 text-on-surface-variant" htmlFor="national_id">
                        National ID / NIC
                      </label>
                      <input
                        className="w-full h-12 px-4 bg-white border border-outline-variant rounded-lg text-base form-input-focus transition-all"
                        id="national_id"
                        placeholder="Enter NIC if available"
                        type="text"
                        value={nationalId}
                        onChange={(e) => setNationalId(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase mb-1 text-on-surface-variant" htmlFor="blood_group">
                        Blood Group <span className="text-error">*</span>
                      </label>
                      <select
                        className="w-full h-12 px-4 bg-white border border-outline-variant rounded-lg text-base form-input-focus transition-all appearance-none"
                        id="blood_group"
                        required
                        value={bloodGroup}
                        onChange={(e) => setBloodGroup(e.target.value)}
                      >
                        <option value="">Select Group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase mb-1 text-on-surface-variant" htmlFor="dob">
                        Date of Birth <span className="text-error">*</span>
                      </label>
                      <input
                        className="w-full h-12 px-4 bg-white border border-outline-variant rounded-lg text-base form-input-focus transition-all"
                        id="dob"
                        required
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase mb-1 text-on-surface-variant">
                      Gender <span className="text-error">*</span>
                    </label>
                    <div className="flex items-center gap-8 mt-2">
                      {['male', 'female', 'other'].map((g) => (
                        <label key={g} className="flex items-center gap-2 cursor-pointer group">
                          <input
                            className="w-5 h-5 rounded-full border-outline-variant text-primary custom-radio focus:ring-offset-2 focus:ring-primary transition-all"
                            name="gender"
                            required
                            type="radio"
                            value={g}
                            checked={gender === g}
                            onChange={(e) => setGender(e.target.value)}
                          />
                          <span className="text-base text-on-surface group-hover:text-primary transition-colors capitalize">
                            {g}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Contact Details */}
            {currentStep === 2 && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-semibold text-on-surface mb-2 leading-7">Contact Details</h2>
                <p className="text-sm text-on-surface-variant mb-6">How can we reach you for updates and care?</p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase mb-1 text-on-surface-variant" htmlFor="reg-email">
                      Email Address <span className="text-error">*</span>
                    </label>
                    <input
                      className="w-full h-12 px-4 bg-white border border-outline-variant rounded-lg text-base form-input-focus transition-all"
                      id="reg-email"
                      placeholder="john.doe@example.com"
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase mb-1 text-on-surface-variant" htmlFor="allergies">
                      Allergies <span className="text-error">*</span>
                    </label>
                    <textarea
                      className="w-full p-4 bg-white border border-outline-variant rounded-lg text-base form-input-focus transition-all resize-none"
                      id="allergies"
                      placeholder="List known allergies"
                      required
                      rows="3"
                      value={allergies}
                      onChange={(e) => setAllergies(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase mb-1 text-on-surface-variant" htmlFor="existing_conditions">
                        Existing Medical Conditions
                      </label>
                      <textarea
                        className="w-full p-4 bg-white border border-outline-variant rounded-lg text-base form-input-focus transition-all resize-none"
                        id="existing_conditions"
                        placeholder="e.g. Diabetes, asthma, hypertension"
                        rows="3"
                        value={existingConditions}
                        onChange={(e) => setExistingConditions(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase mb-1 text-on-surface-variant" htmlFor="current_medications">
                        Current Medications
                      </label>
                      <textarea
                        className="w-full p-4 bg-white border border-outline-variant rounded-lg text-base form-input-focus transition-all resize-none"
                        id="current_medications"
                        placeholder="List current medicines and dosage if known"
                        rows="3"
                        value={currentMedications}
                        onChange={(e) => setCurrentMedications(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase mb-1 text-on-surface-variant" htmlFor="medical_notes">
                      Additional Medical Notes
                    </label>
                    <textarea
                      className="w-full p-4 bg-white border border-outline-variant rounded-lg text-base form-input-focus transition-all resize-none"
                      id="medical_notes"
                      placeholder="Add any other relevant medical notes"
                      maxLength="500"
                      rows="3"
                      value={medicalNotes}
                      onChange={(e) => setMedicalNotes(e.target.value)}
                    ></textarea>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      {medicalNotes.length}/500 characters
                    </span>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase mb-1 text-on-surface-variant" htmlFor="phone">
                      Phone Number <span className="text-error">*</span>
                    </label>
                    <input
                      className="w-full h-12 px-4 bg-white border border-outline-variant rounded-lg text-base form-input-focus transition-all"
                      id="phone"
                      placeholder="+1 (555) 000-0000"
                      required
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase mb-1 text-on-surface-variant" htmlFor="address">
                      Home Address <span className="text-error">*</span>
                    </label>
                    <textarea
                      className="w-full p-4 bg-white border border-outline-variant rounded-lg text-base form-input-focus transition-all resize-none"
                      id="address"
                      placeholder="Street name, City, Zip Code"
                      required
                      rows="3"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="pt-2 border-t border-outline-variant/60">
                    <h3 className="text-sm font-semibold text-on-surface mb-4">Emergency Contact</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold tracking-widest uppercase mb-1 text-on-surface-variant" htmlFor="emergency_name">
                          Emergency Name <span className="text-error">*</span>
                        </label>
                        <input
                          className="w-full h-12 px-4 bg-white border border-outline-variant rounded-lg text-base form-input-focus transition-all"
                          id="emergency_name"
                          placeholder="Emergency contact name"
                          required
                          type="text"
                          value={emergencyName}
                          onChange={(e) => setEmergencyName(e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold tracking-widest uppercase mb-1 text-on-surface-variant" htmlFor="emergency_relationship">
                            Relationship <span className="text-error">*</span>
                          </label>
                          <input
                            className="w-full h-12 px-4 bg-white border border-outline-variant rounded-lg text-base form-input-focus transition-all"
                            id="emergency_relationship"
                            placeholder="e.g. Parent"
                            required
                            type="text"
                            value={emergencyRelationship}
                            onChange={(e) => setEmergencyRelationship(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold tracking-widest uppercase mb-1 text-on-surface-variant" htmlFor="emergency_phone">
                            Emergency Phone <span className="text-error">*</span>
                          </label>
                          <input
                            className="w-full h-12 px-4 bg-white border border-outline-variant rounded-lg text-base form-input-focus transition-all"
                            id="emergency_phone"
                            placeholder="+1 (555) 000-0000"
                            required
                            type="tel"
                            value={emergencyPhone}
                            onChange={(e) => setEmergencyPhone(e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold tracking-widest uppercase mb-1 text-on-surface-variant" htmlFor="emergency_email">
                          Emergency Email
                        </label>
                        <input
                          className="w-full h-12 px-4 bg-white border border-outline-variant rounded-lg text-base form-input-focus transition-all"
                          id="emergency_email"
                          placeholder="contact@example.com"
                          type="email"
                          value={emergencyEmail}
                          onChange={(e) => setEmergencyEmail(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Security */}
            {currentStep === 3 && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-semibold text-on-surface mb-2 leading-7">Security &amp; Privacy</h2>
                <p className="text-sm text-on-surface-variant mb-6">Secure your patient account with a strong password.</p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase mb-1 text-on-surface-variant" htmlFor="reg-password">
                      Password <span className="text-error">*</span>
                    </label>
                    <div className="relative">
                      <input
                        className="w-full h-12 px-4 bg-white border border-outline-variant rounded-lg text-base form-input-focus transition-all"
                        id="reg-password"
                        required
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant"
                        onClick={() => setShowPassword(!showPassword)}
                        type="button"
                      >
                        <span className="material-symbols-outlined">
                          {showPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                    {/* Password Strength */}
                    <div className="mt-2 flex gap-1">
                      {barColors.map((color, i) => (
                        <div key={i} className={`strength-bar flex-1 ${color}`}></div>
                      ))}
                    </div>
                    <p className={`text-[10px] mt-1 font-semibold tracking-widest uppercase ${strength.color}`}>
                      Strength: {strength.label}
                    </p>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase mb-1 text-on-surface-variant" htmlFor="confirm_password">
                      Confirm Password <span className="text-error">*</span>
                    </label>
                    <div className="relative">
                      <input
                        className="w-full h-12 px-4 bg-white border border-outline-variant rounded-lg text-base form-input-focus transition-all"
                        id="confirm_password"
                        required
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <button
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        type="button"
                      >
                        <span className="material-symbols-outlined">
                          {showConfirmPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 pt-2">
                    <input
                      className="mt-1 rounded border-outline-variant text-primary focus:ring-primary"
                      id="terms"
                      required
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                    />
                    <label className="text-sm text-on-surface-variant" htmlFor="terms">
                      I agree to the{' '}
                      <a className="text-primary font-semibold hover:underline" href="#">Terms of Service</a>{' '}
                      and{' '}
                      <a className="text-primary font-semibold hover:underline" href="#">Privacy Policy</a>.
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex flex-col gap-4 pt-6">
              <div className="flex gap-4">
                {currentStep > 1 && (
                  <button
                    className="flex-1 h-12 border border-primary text-primary font-semibold rounded-lg hover:bg-primary-fixed transition-colors flex items-center justify-center gap-2"
                    onClick={() => changeStep(-1)}
                    type="button"
                  >
                    <span className="material-symbols-outlined">arrow_back</span> Back
                  </button>
                )}
                {currentStep < totalSteps && (
                  <button
                    className="flex-1 h-12 bg-primary text-on-primary font-semibold rounded-lg hover:bg-primary-container active:scale-95 transition-all shadow-sm flex items-center justify-center gap-2"
                    onClick={() => changeStep(1)}
                    type="button"
                  >
                    Continue <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                )}
                {currentStep === totalSteps && (
                  <button
                    className="flex-1 h-12 bg-primary text-on-primary font-semibold rounded-lg hover:bg-primary-container active:scale-95 transition-all shadow-sm disabled:opacity-60"
                    disabled={loading}
                    type="submit"
                  >
                    {loading ? 'Creating...' : 'Create Account'}
                  </button>
                )}
              </div>
              <p className="text-center text-sm text-on-surface-variant">
                Already have an account?{' '}
                <Link className="text-primary font-bold hover:underline" to="/login">Log in</Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}
