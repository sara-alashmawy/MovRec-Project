"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { FaEye, FaEyeSlash, FaUser, FaLock } from "react-icons/fa"
import ContentWrapper from "../../Components/ContentWrapper/ContentWrapper"
import { loginStart, loginSuccess, loginFailure, clearError } from "../../Store/AuthSlice"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
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

    dispatch(loginStart())

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock successful login
      const userData = {
        id: 1,
        name: "John Doe",
        email: formData.email,
        avatar: "/src/assets/avatar.png",
      }

      dispatch(loginSuccess(userData))
      navigate("/")
    } catch (err) {
      dispatch(loginFailure("Invalid email or password"))
    }
  }

  return (
    <div className="authPage">
      <ContentWrapper>
        <div className="authContainer">
          <div className="authCard">
            <div className="authHeader">
              <h1>Welcome Back</h1>
              <p>Sign in to your Watchly account</p>
            </div>

            <form onSubmit={handleSubmit} className="authForm">
              <div className="inputGroup">
                <div className="inputWrapper">
                  <FaUser className="inputIcon" />
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

              {error && <div className="authError">{error}</div>}

              <button type="submit" className="authButton" disabled={loading}>
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            <div className="authFooter">
              <p>
                Don't have an account?{" "}
                <Link to="/register" className="authLink">
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </div>
  )
}

export default Login
