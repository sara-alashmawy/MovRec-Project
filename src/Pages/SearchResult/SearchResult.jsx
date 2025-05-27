

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import InfiniteScroll from "react-infinite-scroll-component"
import { searchMulti } from "../../api"
import Spinner from "../../Components/Spinner/Spinner"
import ContentWrapper from "../../Components/ContentWrapper/ContentWrapper"
import MovieCard from "../../Components/MovieCard/MovieCard"
import { FaSearch } from "react-icons/fa"

const SearchResult = () => {
  const [data, setData] = useState(null)
  const [pageNum, setPageNum] = useState(1)
  const [loading, setLoading] = useState(false)
  const { query } = useParams()

  const fetchInitialData = async () => {
    setLoading(true)
    try {
      const result = await searchMulti(query, 1)
      setData(result)
      setPageNum(2)
    } catch (error) {
      console.error("Error fetching search results:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchNextPageData = async () => {
    try {
      const result = await searchMulti(query, pageNum)
      if (data?.results) {
        setData({
          ...data,
          results: [...data.results, ...result.results],
        })
      } else {
        setData(result)
      }
      setPageNum((prev) => prev + 1)
    } catch (error) {
      console.error("Error fetching next page:", error)
    }
  }

  useEffect(() => {
    setPageNum(1)
    fetchInitialData()
  }, [query])

  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${data.total_results > 1 ? "results" : "result"} for "${query}"`}
              </div>
              <InfiniteScroll
                next={fetchNextPageData}
                hasMore={pageNum <= data.total_pages}
                loader={<Spinner />}
                className="content"
                dataLength={data?.results?.length || 0}
              >
                {data?.results?.map((item, i) => {
                  if (item.media_type === "person") return null
                  return <MovieCard key={i} data={item} fromSearch={true} />
                })}
              </InfiniteScroll>
            </>
          ) : (
            <div className="resultNotFound">
              <FaSearch style={{ fontSize: "48px", marginBottom: "20px", opacity: 0.5 }} />
              <div>No results found for "{query}"</div>
              <p style={{ marginTop: "10px", fontSize: "14px", color: "var(--gray-500)" }}>
                Try checking your spelling or use more general terms
              </p>
            </div>
          )}
        </ContentWrapper>
      )}
    </div>
  )
}

export default SearchResult
