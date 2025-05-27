

"use client"

import { useEffect } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { fetchDataFormApi } from "./api"
import { useSelector, useDispatch } from "react-redux"
import { getApiConfiguration, getGenres } from "./Store/HomeSlice"
import HomePage from "./Pages/HomePage/HomePage"
import Details from "./Pages/Details/Details"
import SearchResult from "./Pages/SearchResult/SearchResult"
import Explore from "./Pages/Explore/Explore"
import ErrorPage from "./Pages/ErrorPage/ErrorPage"
import Login from "./Pages/Auth/Login"
import Register from "./Pages/Auth/Register"
import Footer from "./Components/Footer/Footer"
import Header from "./Components/Header/Header"

const App = () => {
  const dispatch = useDispatch()
  const { url } = useSelector((state) => state.home)

  useEffect(() => {
    fetchApiConfig()
    genresCall()
  }, [])

  const fetchApiConfig = async () => {
    try {
      const result = await fetchDataFormApi("/configuration")
      const url = {
        backdrop: result.images.secure_base_url + "original",
        poster: result.images.secure_base_url + "original",
        profile: result.images.secure_base_url + "original",
      }
      dispatch(getApiConfiguration(url))
    } catch (error) {
      console.error("Error fetching API configuration:", error)
    }
  }

  const genresCall = async () => {
    try {
      const endpoints = ["tv", "movie"]
      const promises = endpoints.map((url) => fetchDataFormApi(`/genre/${url}/list`))
      const data = await Promise.all(promises)

      const allGenres = {}
      data.forEach(({ genres }) => {
        genres?.forEach((item) => {
          allGenres[item.id] = item
        })
      })

      dispatch(getGenres(allGenres))
    } catch (error) {
      console.error("Error fetching genres:", error)
    }
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
