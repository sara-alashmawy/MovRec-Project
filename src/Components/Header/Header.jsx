"use client"

import { useState, useEffect } from "react"
import { HiOutlineSearch } from "react-icons/hi"
import { SlMenu } from "react-icons/sl"
import { VscChromeClose } from "react-icons/vsc"
import { FaUser, FaSignOutAlt } from "react-icons/fa"
import { useNavigate, useLocation, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../../Store/AuthSlice"
import ContentWrapper from "../ContentWrapper/ContentWrapper"

const Header = () => {
  const [show, setShow] = useState("top")
  const [lastScrollY, setLastScrollY] = useState(0)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [query, setQuery] = useState("")
  const [showSearch, setShowSearch] = useState("")
  const [showUserMenu, setShowUserMenu] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector((state) => state.auth)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide")
      } else {
        setShow("show")
      }
    } else {
      setShow("top")
    }
    setLastScrollY(window.scrollY)
  }

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar)
    return () => {
      window.removeEventListener("scroll", controlNavbar)
    }
  }, [lastScrollY])

  const openSearch = () => {
    setMobileMenu(false)
    setShowSearch(true)
    setShowUserMenu(false)
  }

  const openMobileMenu = () => {
    setMobileMenu(true)
    setShowSearch(false)
    setShowUserMenu(false)
  }

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`)
      setTimeout(() => {
        setShowSearch(false)
      }, 500)
    }
  }

  const navigationHandler = (type) => {
    if (type === "movie") {
      navigate("/explore/movie")
    } else {
      navigate("/explore/tv")
    }
    setMobileMenu(false)
  }

  const handleLogout = () => {
    dispatch(logout())
    setShowUserMenu(false)
    navigate("/")
  }

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <Link to="/" className="logo">
          <div style={{ fontSize: "24px", fontWeight: "700", color: "var(--primary)" }}>Watchly</div>
        </Link>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigationHandler("movie")}>
            Movies
          </li>
          <li className="menuItem" onClick={() => navigationHandler("tv")}>
            TV Shows
          </li>
          <li className="menuItem">
            <HiOutlineSearch className="cursor-pointer" onClick={openSearch} />
          </li>
          {isAuthenticated ? (
            <li className="menuItem userMenu">
              <div className="userAvatar" onClick={() => setShowUserMenu(!showUserMenu)}>
                <span>{user?.name}</span>
              </div>
              {showUserMenu && (
                <div className="userDropdown">
                  <div className="userInfo">
                    <div>
                      <div className="userName">{user?.name}</div>
                      <div className="userEmail">{user?.email}</div>
                    </div>
                  </div>
                  <div className="dropdownDivider"></div>
                  <button onClick={handleLogout} className="logoutBtn">
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              )}
            </li>
          ) : (
            <li className="menuItem authButtons">
              <Link to="/login" className="loginBtn">
                Login
              </Link>
              <Link to="/register" className="registerBtn">
                Sign Up
              </Link>
            </li>
          )}
        </ul>
        <div className="mobileMenuItems">
          <HiOutlineSearch className="cursor-pointer" onClick={openSearch} />
          {isAuthenticated ? (
            <div className="userAvatar mobile" onClick={() => setShowUserMenu(!showUserMenu)}>
              <FaUser />
            </div>
          ) : (
            <Link to="/login" className="mobileAuthBtn">
              <FaUser />
            </Link>
          )}
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} className="cursor-pointer" />
          ) : (
            <SlMenu className="cursor-pointer" onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
                placeholder="Search for movies or TV shows..."
                autoFocus
              />
              <VscChromeClose onClick={() => setShowSearch(false)} className="cursor-pointer" />
            </div>
          </ContentWrapper>
        </div>
      )}
      {showUserMenu && isAuthenticated && (
        <div className="mobileUserMenu">
          <ContentWrapper>
            <div className="userInfo">
              <div>
                <div className="userName">{user?.name}</div>
                <div className="userEmail">{user?.email}</div>
              </div>
            </div>
            <button onClick={handleLogout} className="logoutBtn">
              <FaSignOutAlt /> Logout
            </button>
          </ContentWrapper>
        </div>
      )}
    </header>
  )
}

export default Header

