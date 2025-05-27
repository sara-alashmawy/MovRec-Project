import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa"
import ContentWrapper from "../ContentWrapper/ContentWrapper"

const Footer = () => {
  return (
    <footer className="footer">
      <ContentWrapper>
        <ul className="menuItems">
          <li className="menuItem">Terms Of Use</li>
          <li className="menuItem">Privacy Policy</li>
          <li className="menuItem">About</li>
          <li className="menuItem">Blog</li>
          <li className="menuItem">FAQ</li>
        </ul>
        <div className="infoText">
          Watchly is your ultimate destination for discovering movies and TV shows. Browse through our extensive
          collection, find detailed information about your favorite titles, and stay updated with the latest releases.
          Powered by TMDB API, we provide high-quality data and images to enhance your browsing experience.
        </div>
        <div className="socialIcons">
          <span className="icon">
            <FaFacebookF />
          </span>
          <span className="icon">
            <FaInstagram />
          </span>
          <span className="icon">
            <FaTwitter />
          </span>
          <span className="icon">
            <FaLinkedin />
          </span>
          <span className="icon">
            <FaGithub />
          </span>
        </div>
      </ContentWrapper>
    </footer>
  )
}

export default Footer
