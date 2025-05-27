

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { FaSearch } from "react-icons/fa"
import useFetch from "../../../Hooks/UseFetch"
import Img from "../../../Components/LazyLoadImage/LazyLoadImage"
import ContentWrapper from "../../../Components/ContentWrapper/ContentWrapper"

const HeroBanner = () => {
  const navigate = useNavigate()
  const [background, setBackground] = useState("")
  const [query, setQuery] = useState("")
  const { data, loading } = useFetch("/movie/upcoming")
  const { url } = useSelector((state) => state.home)

  useEffect(() => {
    if (data?.results?.length > 0) {
      // Get a random movie from the first 10 results
      const randomIndex = Math.floor(Math.random() * Math.min(10, data.results.length))
      const randomMovie = data.results[randomIndex]
      setBackground(url.backdrop + randomMovie?.backdrop_path)
    }
  }, [data, url])

  const searchQueryHandler = (event) => {
    if ((event.key === "Enter" || event.type === "click") && query.length > 0) {
      navigate(`/search/${query}`)
    }
  }

  return (
    <div className="heroBanner">
      {!loading && background && (
        <div className="backdrop-img">
          <Img src={background} />
        </div>
      )}
      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome.</span>
          <span className="subTitle">Millions of movies, TV shows and people to discover. Explore now.</span>
          <div className="searchInput">
            <input
              type="text"
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
              placeholder="Search for movies or TV shows..."
              value={query}
            />
            <button onClick={searchQueryHandler}>
              <FaSearch style={{ marginRight: "8px" }} /> Search
            </button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  )
}

export default HeroBanner
