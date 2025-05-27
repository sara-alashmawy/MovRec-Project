"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { FaEye, FaEyeSlash, FaUser, FaLock, FaEnvelope } from "react-icons/fa"
import ContentWrapper from "../../Components/ContentWrapper/ContentWrapper"
import { registerStart, registerSuccess, registerFailure, clearError } from "../../Store/AuthSlice"

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState({})

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/")
    }
  }, [isAuthenticated, navigate])

  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name) {
      newErrors.name = "Name is required"
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    }

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    dispatch(registerStart())

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock successful registration
      const userData = {
        id: 1,
        name: formData.name,
        email: formData.email,
        avatar: "/src/assets/avatar.png",
      }

      dispatch(registerSuccess(userData))
      navigate("/")
    } catch (err) {
      dispatch(registerFailure("Registration failed. Please try again."))
    }
  }

  return (
    <div className="authPage">
      <ContentWrapper>
        <div className="authContainer">
          <div className="authCard">
            <div className="authHeader">
              <h1>Join Watchly</h1>
              <p>Create your account to start exploring</p>
            </div>

            <form onSubmit={handleSubmit} className="authForm">
              <div className="inputGroup">
                <div className="inputWrapper">
                  <FaUser className="inputIcon" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? "error" : ""}
                  />
                </div>
                {errors.name && <span className="errorText">{errors.name}</span>}
              </div>

              <div className="inputGroup">
                <div className="inputWrapper">
                  <FaEnvelope className="inputIcon" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "error" : ""}
                  />
                </div>
                {errors.email && <span className="errorText">{errors.email}</span>}
              </div>

              <div className="inputGroup">
                <div className="inputWrapper">
                  <FaLock className="inputIcon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? "error" : ""}
                  />
                  <button type="button" className="passwordToggle" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && <span className="errorText">{errors.password}</span>}
              </div>

              <div className="inputGroup">
                <div className="inputWrapper">
                  <FaLock className="inputIcon" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={errors.confirmPassword ? "error" : ""}
                  />
                  <button
                    type="button"
                    className="passwordToggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.confirmPassword && <span className="errorText">{errors.confirmPassword}</span>}
              </div>

              {error && <div className="authError">{error}</div>}

              <button type="submit" className="authButton" disabled={loading}>
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <div className="authFooter">
              <p>
                Already have an account?{" "}
                <Link to="/login" className="authLink">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </div>
  )
}

export default Register
