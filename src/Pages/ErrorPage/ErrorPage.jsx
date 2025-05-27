import { Link } from "react-router-dom"
import ContentWrapper from "../../Components/ContentWrapper/ContentWrapper"
import { FaExclamationTriangle, FaHome } from "react-icons/fa"

const ErrorPage = () => {
  return (
    <ContentWrapper>
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-4">
        <FaExclamationTriangle className="text-6xl text-red-500 mb-6" />
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-xl mb-8 text-gray-400 max-w-md">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link
          to="/"
          className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary px-6 py-3 rounded-full text-white font-medium hover:opacity-90 transition-all"
        >
          <FaHome /> Return to Home
        </Link>
      </div>
    </ContentWrapper>
  )
}

export default ErrorPage
