"use client"

import { useEffect, useState } from "react"
import { fetchDataFormApi } from "../api"
const useFetch = (url) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading("loading...")
    setData(null)
    setError(null)

    fetchDataFormApi(url)
      .then((res) => {
        setLoading(false)
        setData(res)
      })
      .catch((err) => {
        setLoading(false)
        setError("Something went wrong!")
      })
  }, [url])

  return { data, loading, error }
}

export default useFetch
