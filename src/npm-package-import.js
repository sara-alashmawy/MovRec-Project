import "react-toastify/dist/ReactToastify.css"

// react-loader-spinner

import { Audio } from "react-loader-spinner"
;<Audio height="80" width="80" radius="9" color="green" ariaLabel="three-dots-loading" wrapperStyle wrapperClass />
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App"
import "./index.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
])
ReactDOM.createRoot(document.getElementById("root")).render(<RouterProvider router={router} />)

// CommonJS
const Swal = require("sweetalert2")

Swal.fire({
  title: "Error!",
  text: "Do you want to continue",
  icon: "error",
  confirmButtonText: "Cool",
})
