import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { faStar, faTruck, faShield, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { toast } from 'react-toastify'

function getPasswordStrength(password) {
  if (!password) return null
  const strong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/
  const medium = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/
  if (strong.test(password)) return 'strong'
  if (medium.test(password)) return 'medium'
  return 'weak'
}

async function handleSignup(values) {
  const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', {
    name: values.name,
    email: values.email,
    password: values.password,
    rePassword: values.confirmPassword,
    phone: values.phone,
  })
  return response
}

export default function SignUp() {
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      terms: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('*Name is required'),
      email: Yup.string().email('*Invalid email address').required('*Email is required'),
      password: Yup.string()
        .min(8, '*Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
          '*Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        )
        .required('*Please create a strong password'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], '*Passwords do not match')
        .required('*Please confirm your password'),
      phone: Yup.string()
        .matches(/^01[0125][0-9]{8}$/, '*Please enter a valid Egyptian phone number (e.g. 01234567890)')
        .required('*Phone number is required'),
      terms: Yup.boolean().oneOf([true], '*Please check terms and conditions'),
    }),
    onSubmit: async (values) => {
  try {
    const response = await handleSignup(values)
    toast.success('Account created successfully!')
    setTimeout(() => navigate('/Login'), 2000)
    console.log('Success:', response.data)
  } catch (error) {
    toast.error(error.response?.data?.message || 'Something went wrong. Please try again.')
  }
},
})

const passwordStrength = getPasswordStrength(formik.values.password)

  const strengthConfig = {
    weak: { width: 'w-1/4', color: 'bg-red-500', label: 'Very Weak', textColor: 'text-red-500' },
    medium: { width: 'w-2/4', color: 'bg-yellow-400', label: 'Medium', textColor: 'text-yellow-500' },
    strong: { width: 'w-full', color: 'bg-green-500', label: 'Strong', textColor: 'text-green-500' },
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2 gap-6 p-6 items-start">

      {/* Left Side */}
      <div className="bg-gray-50 p-10 flex flex-col justify-start border border-gray-200 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold mb-2">
          Welcome to <span className="text-primary-600">FreshCart</span>
        </h1>
        <p className="text-gray-500 mb-8">
          Join thousands of happy customers who enjoy fresh groceries delivered right to their doorstep.
        </p>

        <div className="flex flex-col gap-6 mb-8">
          <div className="flex gap-4 items-start">
            <div className="bg-primary-100 text-primary-600 p-3 rounded-full">
              <FontAwesomeIcon icon={faStar} />
            </div>
            <div>
              <h3 className="font-bold">Premium Quality</h3>
              <p className="text-gray-500 text-sm">Premium quality products sourced from trusted suppliers.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="bg-primary-100 text-primary-600 p-3 rounded-full">
              <FontAwesomeIcon icon={faTruck} />
            </div>
            <div>
              <h3 className="font-bold">Fast Delivery</h3>
              <p className="text-gray-500 text-sm">Same-day delivery available in most areas.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="bg-primary-100 text-primary-600 p-3 rounded-full">
              <FontAwesomeIcon icon={faShield} />
            </div>
            <div>
              <h3 className="font-bold">Secure Shopping</h3>
              <p className="text-gray-500 text-sm">Your data and payments are completely secure.</p>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-xl p-5 bg-white">
          <div className="flex gap-3 items-center mb-3">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Sarah Johnson" className="w-10 h-10 rounded-full" />
            <div>
              <p className="font-semibold text-sm">Sarah Johnson</p>
              <div className="text-yellow-400 text-sm">★★★★★</div>
            </div>
          </div>
          <p className="text-gray-500 text-sm italic">
            "FreshCart has transformed my shopping experience. The quality of the products is outstanding, and the delivery is always on time. Highly recommend!"
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="p-10 flex flex-col justify-start border border-gray-200 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-1">Create Your Account</h2>
        <p className="text-gray-500 text-center mb-6">Start your fresh journey with us today</p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <button type="button" className="btn flex items-center justify-center gap-2 border border-gray-300">
            <FontAwesomeIcon icon={faGoogle} className="text-red-500" />
            Google
          </button>
          <button type="button" className="btn flex items-center justify-center gap-2 border border-gray-300">
            <FontAwesomeIcon icon={faFacebookF} className="text-blue-600" />
            Facebook
          </button>
        </div>

        <div className="text-center text-gray-400 mb-4">or</div>

  
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">

          <div>
            <label className="text-lg font-medium mb-1 block">Name</label>
            <input type="text" name="name" className={`form-control w-full ${formik.touched.name && formik.errors.name ? 'border-red-500' : ''}`} placeholder="Menna Suliman" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} />
            {formik.touched.name && formik.errors.name && <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>}
          </div>

          <div>
            <label className="text-lg font-medium mb-1 block">Email</label>
            <input type="email" name="email" className={`form-control w-full ${formik.touched.email && formik.errors.email ? 'border-red-500' : ''}`} placeholder="menna@gmail.com" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
            {formik.touched.email && formik.errors.email && <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>}
          </div>

          <div>
            <label className="text-lg font-medium mb-1 block">Password</label>
            <input type="password" name="password" className={`form-control w-full ${formik.touched.password && formik.errors.password ? 'border-red-500' : ''}`} placeholder="create a strong password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
            {formik.values.password && (
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className={`h-1.5 rounded-full transition-all duration-300 ${strengthConfig[passwordStrength].width} ${strengthConfig[passwordStrength].color}`}></div>
                </div>
                <p className={`text-xs mt-1 ${strengthConfig[passwordStrength].textColor}`}>{strengthConfig[passwordStrength].label}</p>
              </div>
            )}
            {formik.touched.password && formik.errors.password && <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>}
          </div>

          <div>
            <label className="text-lg font-medium mb-1 block">Confirm Password</label>
            <input type="password" name="confirmPassword" className={`form-control w-full ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : ''}`} placeholder="confirm your password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.confirmPassword} />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{formik.errors.confirmPassword}</p>}
          </div>

          <div>
            <label className="text-lg font-medium mb-1 block">Phone Number</label>
            <input type="tel" name="phone" className={`form-control w-full ${formik.touched.phone && formik.errors.phone ? 'border-red-500' : ''}`} placeholder="01234567890" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} />
            {formik.touched.phone && formik.errors.phone && <p className="text-red-500 text-xs mt-1">{formik.errors.phone}</p>}
          </div>

          <div>
            <div className="flex gap-2 items-center">
              <input type="checkbox" id="terms" name="terms" className="w-4 h-4 accent-primary-600" onChange={formik.handleChange} onBlur={formik.handleBlur} checked={formik.values.terms} />
              <label htmlFor="terms" className="text-sm text-gray-500">
                I agree to the <Link to="/terms" className="text-primary-600 hover:underline">Terms of Service</Link> and <Link to="/privacy-policy" className="text-primary-600 hover:underline">Privacy Policy</Link>
              </label>
            </div>
            {formik.touched.terms && formik.errors.terms && <p className="text-red-500 text-xs mt-1">{formik.errors.terms}</p>}
          </div>

          <button type="submit" className="btn bg-primary-600 text-white hover:bg-primary-700 w-full mt-2">
            <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
            Create Account
          </button>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/Login" className="text-primary-600 font-medium hover:underline">Sign in</Link>
          </p>

        </form>
      </div>
    </div>
  )
}