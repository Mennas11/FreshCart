import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faLock, faEye, faEyeSlash, faShield, faStar, faTruck, faRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { toast } from 'react-toastify'
import logo from '../../assets/Images/freshcart-logo.svg'
import loginImage from '../../assets/Images/FreshCartLogin.png'

import { useAuth } from "../../Context/Auth-context"

async function handleLogin(values) {
  const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', {
    email: values.email,
    password: values.password,
  })
  return response
}

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [keepSignedIn, setKeepSignedIn] = useState(false)
  const [authStep, setAuthStep] = useState('login') // 'login' | 'forgot' | 'verify' | 'reset'
  const [forgotEmail, setForgotEmail] = useState('')

  // Login Form
  const loginFormik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('*Invalid email address').required('*Email is required'),
      password: Yup.string().required('*Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await handleLogin(values)
        login({
          firstName: response.data.user.name.split(' ')[0],
          lastName: response.data.user.name.split(' ').slice(1).join(' ') || '',
          email: response.data.user.email,
          phone: response.data.user.phone || '',
          keepSignedIn: keepSignedIn,
        })
        toast.success('Logged in successfully!')
        setTimeout(() => navigate('/'), 2000)
      } catch (error) {
        toast.error(error.response?.data?.message || 'Something went wrong. Please try again.')
      }
    },
  })

  // Forgot Password Form
  const forgotFormik = useFormik({
    initialValues: { email: '' },
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: Yup.object({
      email: Yup.string().email('*Invalid email address').required('*Email is required'),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', {
          email: values.email,
        })
        setForgotEmail(values.email)
        toast.success('Reset code sent to your email!')
        setAuthStep('verify')
      } catch (error) {
        toast.error(error.response?.data?.message || 'Something went wrong. Please try again.')
      }
    },
  })

  // Verify Code Form
  const verifyFormik = useFormik({
    initialValues: { resetCode: '' },
    validationSchema: Yup.object({
      resetCode: Yup.string().required('*Reset code is required'),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', {
          resetCode: values.resetCode,
        })
        toast.success('Code verified!')
        setAuthStep('reset')
      } catch (error) {
        toast.error(error.response?.data?.message || 'Invalid or expired code.')
      }
    },
  })

  // Reset Password Form
  const resetFormik = useFormik({
    initialValues: { newPassword: '', confirmPassword: '' },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .min(8, '*Password must be at least 8 characters')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
          '*Must contain uppercase, lowercase, number and special character'
        )
        .required('*Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], '*Passwords do not match')
        .required('*Please confirm your password'),
    }),
    onSubmit: async (values) => {
      try {
        await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', {
          email: forgotEmail,
          newPassword: values.newPassword,
        })
        toast.success('Password reset successfully!')
        setAuthStep('login')
        setTimeout(() => navigate('/Login'), 2000)
      } catch (error) {
        toast.error(error.response?.data?.message || 'Something went wrong. Please try again.')
      }
    },
  })

  // Step indicator for forgot/verify/reset
  const steps = ['forgot', 'verify', 'reset']
  const currentStepIndex = steps.indexOf(authStep)

  return (
    <>
      <div className="bg-gray-50 flex flex-col">
        <div className="grid md:grid-cols-2 gap-10 p-10 items-center max-w-6xl mx-auto w-full">

          {/* Left Side */}
          <div className="flex flex-col items-center text-center">
            <div className="rounded-2xl overflow-hidden w-full max-w-md mb-6">
              <img src={loginImage} alt="FreshCart Shopping" className="w-full object-cover" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              FreshCart - Your One-Stop Shop for Fresh Products
            </h2>
            <p className="text-gray-500 mb-6 text-sm">
              Join thousands of happy customers who trust FreshCart for their daily grocery needs
            </p>
            <div className="flex flex-wrap gap-6 justify-center text-sm text-gray-600">
              <span className="flex gap-2 items-center">
                <FontAwesomeIcon icon={faTruck} className="text-primary-600" />
                Free Delivery
              </span>
              <span className="flex gap-2 items-center">
                <FontAwesomeIcon icon={faShield} className="text-primary-600" />
                Secure Payment
              </span>
              <span className="flex gap-2 items-center">
                <FontAwesomeIcon icon={faStar} className="text-primary-600" />
                24/7 Support
              </span>
            </div>
          </div>

          {/* Right Side */}
          <div className="p-10 flex flex-col justify-center border border-gray-200 rounded-xl shadow-lg bg-white">

            {/* LOGIN STEP */}
            {authStep === 'login' && (
              <>
                <div className="text-center mb-6">
                  <img src={logo} alt="FreshCart Logo" className="mx-auto mb-3 h-8" />
                  <h2 className="text-2xl font-bold text-gray-800">Welcome Back!</h2>
                  <p className="text-gray-500 text-sm">Sign in to continue your fresh shopping experience</p>
                </div>

                <div className="flex flex-col gap-3 mb-4">
                  <button type="button" className="flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 text-sm hover:border-primary-500 hover:shadow-[0_0_0_3px_rgba(34,197,94,0.15)] transition">
                    <FontAwesomeIcon icon={faGoogle} className="text-red-500" />
                    Continue with Google
                  </button>
                  <button type="button" className="flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 text-sm hover:border-primary-500 hover:shadow-[0_0_0_3px_rgba(34,197,94,0.15)] transition">
                    <FontAwesomeIcon icon={faFacebookF} className="text-blue-600" />
                    Continue with Facebook
                  </button>
                </div>

                <div className="flex items-center gap-3 my-4">
                  <hr className="flex-1 border-gray-200" />
                  <span className="text-gray-400 text-xs font-medium tracking-wide">OR CONTINUE WITH EMAIL</span>
                  <hr className="flex-1 border-gray-200" />
                </div>

                <form onSubmit={loginFormik.handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Email Address</label>
                    <div className="relative">
                      <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                      <input
                        type="email"
                        name="email"
                        className={`w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 pl-9 py-2 text-sm outline-none ${loginFormik.touched.email && loginFormik.errors.email ? 'border-red-500' : ''}`}
                        placeholder="Enter your email"
                        onChange={loginFormik.handleChange}
                        onBlur={loginFormik.handleBlur}
                        value={loginFormik.values.email}
                      />
                    </div>
                    {loginFormik.touched.email && loginFormik.errors.email && (
                      <p className="text-red-500 text-xs mt-1">{loginFormik.errors.email}</p>
                    )}
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-sm font-medium">Password</label>
                      <button type="button" onClick={() => setAuthStep('forgot')} className="text-sm text-primary-600 hover:underline">
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        className={`w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 pl-9 pr-9 py-2 text-sm outline-none ${loginFormik.touched.password && loginFormik.errors.password ? 'border-red-500' : ''}`}
                        placeholder="Enter your password"
                        onChange={loginFormik.handleChange}
                        onBlur={loginFormik.handleBlur}
                        value={loginFormik.values.password}
                      />
                      <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" onClick={() => setShowPassword(!showPassword)}>
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                      </button>
                    </div>
                    {loginFormik.touched.password && loginFormik.errors.password && (
                      <p className="text-red-500 text-xs mt-1">{loginFormik.errors.password}</p>
                    )}
                  </div>

                  <div className="flex gap-2 items-center">
                    <input type="checkbox" id="remember" className="w-4 h-4 accent-primary-600" checked={keepSignedIn} onChange={(e) => setKeepSignedIn(e.target.checked)} />
                    <label htmlFor="remember" className="text-sm text-gray-500">Keep me signed in</label>
                  </div>

                  <button type="submit" className="bg-primary-600 text-white hover:bg-primary-700 w-full py-3 rounded-md font-medium transition">
                    Sign In
                  </button>

                  <p className="text-center text-sm text-gray-500">
                    New to FreshCart?{' '}
                    <Link to="/SignUp" className="text-primary-600 font-medium hover:underline">Create an account</Link>
                  </p>

                  <div className="flex justify-center gap-6 text-xs text-gray-400 mt-2 pt-4 border-t border-gray-100">
                    <span className="flex gap-1 items-center"><FontAwesomeIcon icon={faLock} /> SSL Secured</span>
                    <span className="flex gap-1 items-center"><FontAwesomeIcon icon={faShield} /> 50K+ Users</span>
                    <span className="flex gap-1 items-center"><FontAwesomeIcon icon={faStar} /> 4.9 Rating</span>
                  </div>
                </form>
              </>
            )}

            {/* FORGOT / VERIFY / RESET STEPS */}
            {authStep !== 'login' && (
              <>
                {/* Step Indicators */}
                <div className="flex items-center justify-center gap-2 mb-6">
                  {steps.map((s, i) => (
                    <div key={s} className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-200 ${currentStepIndex >= i ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                        {i + 1}
                      </div>
                      {i < steps.length - 1 && (
                        <div className={`w-10 h-1 rounded ${currentStepIndex > i ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
                      )}
                    </div>
                  ))}
                </div>

                {/* FORGOT STEP */}
                {authStep === 'forgot' && (
                  <>
                    <div className="text-center mb-6">
                      <img src={logo} alt="FreshCart Logo" className="mx-auto mb-3 h-8" />
                      <h2 className="text-2xl font-bold text-gray-800">Forgot Password?</h2>
                      <p className="text-gray-500 text-sm">Enter your email and we'll send you a reset code</p>
                    </div>
                    <form onSubmit={forgotFormik.handleSubmit} className="flex flex-col gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Email Address</label>
                        <div className="relative">
                          <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                          <input
                            type="email"
                            name="email"
                            className={`w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 pl-9 py-2 text-sm outline-none ${forgotFormik.touched.email && forgotFormik.errors.email ? 'border-red-500' : ''}`}
                            placeholder="Enter your email"
                            onChange={forgotFormik.handleChange}
                            onBlur={forgotFormik.handleBlur}
                            value={forgotFormik.values.email}
                          />
                        </div>
                        {forgotFormik.touched.email && forgotFormik.errors.email && (
                          <p className="text-red-500 text-xs mt-1">{forgotFormik.errors.email}</p>
                        )}
                      </div>
                      <button type="submit" className="bg-primary-600 text-white hover:bg-primary-700 w-full py-3 rounded-md font-medium transition">
                        Send Reset Code
                      </button>
                      <p className="text-center text-sm text-gray-500">
                        <button type="button" onClick={() => setAuthStep('login')} className="text-primary-600 font-medium hover:underline">
                          ← Back to Sign In
                        </button>
                      </p>
                    </form>
                  </>
                )}

                {/* VERIFY STEP */}
                {authStep === 'verify' && (
                  <>
                    <div className="text-center mb-6">
                      <img src={logo} alt="FreshCart Logo" className="mx-auto mb-3 h-8" />
                      <h2 className="text-2xl font-bold text-gray-800">Enter Reset Code</h2>
                      <p className="text-gray-500 text-sm">
                        We sent a code to <span className="text-primary-600 font-medium">{forgotEmail}</span>
                      </p>
                    </div>
                    <form onSubmit={verifyFormik.handleSubmit} className="flex flex-col gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Reset Code</label>
                        <input
                          type="text"
                          name="resetCode"
                          className={`w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 px-4 py-2 text-sm outline-none text-center tracking-widest text-lg ${verifyFormik.touched.resetCode && verifyFormik.errors.resetCode ? 'border-red-500' : ''}`}
                          placeholder="Enter code"
                          onChange={verifyFormik.handleChange}
                          onBlur={verifyFormik.handleBlur}
                          value={verifyFormik.values.resetCode}
                        />
                        {verifyFormik.touched.resetCode && verifyFormik.errors.resetCode && (
                          <p className="text-red-500 text-xs mt-1">{verifyFormik.errors.resetCode}</p>
                        )}
                      </div>
                      <button type="submit" className="bg-primary-600 text-white hover:bg-primary-700 w-full py-3 rounded-md font-medium transition">
                        Verify Code
                      </button>
                      <p className="text-center text-sm text-gray-500">
                        Didn't receive a code?{' '}
                        <button type="button" onClick={() => forgotFormik.submitForm()} className="text-primary-600 font-medium hover:underline">
                          Resend
                        </button>
                      </p>
                      <p className="text-center text-sm text-gray-500">
                        <button type="button" onClick={() => setAuthStep('forgot')} className="text-primary-600 font-medium hover:underline">
                          ← Back
                        </button>
                      </p>
                    </form>
                  </>
                )}

                {/* RESET STEP */}
                {authStep === 'reset' && (
                  <>
                    <div className="text-center mb-6">
                      <img src={logo} alt="FreshCart Logo" className="mx-auto mb-3 h-8" />
                      <h2 className="text-2xl font-bold text-gray-800">Reset Password</h2>
                      <p className="text-gray-500 text-sm">Create a new strong password</p>
                    </div>
                    <form onSubmit={resetFormik.handleSubmit} className="flex flex-col gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">New Password</label>
                        <div className="relative">
                          <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                          <input
                            type={showNewPassword ? 'text' : 'password'}
                            name="newPassword"
                            className={`w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 pl-9 pr-9 py-2 text-sm outline-none ${resetFormik.touched.newPassword && resetFormik.errors.newPassword ? 'border-red-500' : ''}`}
                            placeholder="Enter new password"
                            onChange={resetFormik.handleChange}
                            onBlur={resetFormik.handleBlur}
                            value={resetFormik.values.newPassword}
                          />
                          <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" onClick={() => setShowNewPassword(!showNewPassword)}>
                            <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} />
                          </button>
                        </div>
                        {resetFormik.touched.newPassword && resetFormik.errors.newPassword && (
                          <p className="text-red-500 text-xs mt-1">{resetFormik.errors.newPassword}</p>
                        )}
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Confirm Password</label>
                        <div className="relative">
                          <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            className={`w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 pl-9 pr-9 py-2 text-sm outline-none ${resetFormik.touched.confirmPassword && resetFormik.errors.confirmPassword ? 'border-red-500' : ''}`}
                            placeholder="Confirm new password"
                            onChange={resetFormik.handleChange}
                            onBlur={resetFormik.handleBlur}
                            value={resetFormik.values.confirmPassword}
                          />
                          <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                          </button>
                        </div>
                        {resetFormik.touched.confirmPassword && resetFormik.errors.confirmPassword && (
                          <p className="text-red-500 text-xs mt-1">{resetFormik.errors.confirmPassword}</p>
                        )}
                      </div>
                      <button type="submit" className="bg-primary-600 text-white hover:bg-primary-700 w-full py-3 rounded-md font-medium transition">
                        Reset Password
                      </button>
                    </form>
                  </>
                )}
              </>
            )}

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-primary-50 py-8">
          <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
            <div className="flex gap-3 items-center">
              <div className="bg-primary-100 text-primary-600 p-3 rounded-full">
                <FontAwesomeIcon icon={faTruck} />
              </div>
              <div>
                <p className="font-bold text-sm">Free Shipping</p>
                <p className="text-gray-500 text-xs">On orders over 500 EGP</p>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <div className="bg-primary-100 text-primary-600 p-3 rounded-full">
                <FontAwesomeIcon icon={faRotateLeft} />
              </div>
              <div>
                <p className="font-bold text-sm">Easy Returns</p>
                <p className="text-gray-500 text-xs">14-day return policy</p>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <div className="bg-primary-100 text-primary-600 p-3 rounded-full">
                <FontAwesomeIcon icon={faLock} />
              </div>
              <div>
                <p className="font-bold text-sm">Secure Payment</p>
                <p className="text-gray-500 text-xs">100% secure checkout</p>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <div className="bg-primary-100 text-primary-600 p-3 rounded-full">
                <FontAwesomeIcon icon={faStar} />
              </div>
              <div>
                <p className="font-bold text-sm">24/7 Support</p>
                <p className="text-gray-500 text-xs">Contact us anytime</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}