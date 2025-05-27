import axios from "axios"

const BASE_URL = "https://api.themoviedb.org/3"
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN

// Create axios instance with default config
const tmdbApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `bearer ${TMDB_TOKEN}`,
  },
  params: {
    language: "en-US",
  },
})

export const fetchDataFormApi = async (endpoint, params = {}) => {
  try {
    const { data } = await tmdbApi.get(endpoint, { params })
    return data
  } catch (error) {
    console.error("API Error:", error)
    return error
  }
}

// Helper functions 
export const getMovieDetails = (id) => fetchDataFormApi(`/movie/${id}`)
export const getTvDetails = (id) => fetchDataFormApi(`/tv/${id}`)
export const getTrending = (timeWindow = "day") => fetchDataFormApi(`/trending/all/${timeWindow}`)
export const getPopular = (mediaType = "movie") => fetchDataFormApi(`/${mediaType}/popular`)
export const getTopRated = (mediaType = "movie") => fetchDataFormApi(`/${mediaType}/top_rated`)
export const getUpcoming = () => fetchDataFormApi("/movie/upcoming")
export const getNowPlaying = () => fetchDataFormApi("/movie/now_playing")
export const searchMulti = (query, page = 1) => fetchDataFormApi("/search/multi", { query, page })
