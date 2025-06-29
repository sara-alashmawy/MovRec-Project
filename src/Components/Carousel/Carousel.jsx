import { useRef } from "react"
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import dayjs from "dayjs"

import ContentWrapper from "../ContentWrapper/ContentWrapper"
import Img from "../LazyLoadImage/LazyLoadImage"
import PosterFallback from "../../assets/no-poster.png"
import CircleRating from "./CircleRating/CircleRating"
import Genres from "./Genres/Genres"
import Spinner from "../Spinner/Spinner"

const Carousel = ({ data, loading, endpoint,title }) => {
  const carouselContainer = useRef()
  const { url } = useSelector((state) => state.home)
  const navigate = useNavigate()

  const navigation = (direction) => {
    const container = carouselContainer.current
    const scrollAmount =
      direction === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20)
    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    })
  }

  return (
    <div className="carousel">
      <ContentWrapper>
          {!!title && <div className="carouselTitle">{title}</div>}
        <BsFillArrowLeftCircleFill className="carouselLeftNav arrow" onClick={() => navigation("left")} />
        <BsFillArrowRightCircleFill className="carouselRightNav arrow" onClick={() => navigation("right")} />

        {loading ? (
          <div>
            <Spinner initial={true} />
          </div>
        ) : (
          <div className="carouselItems" ref={carouselContainer}>
            {data?.map((item) => {
              const posterUrl = item?.poster_path ? url?.poster + item?.poster_path : PosterFallback
              return (
                <div
                  key={item.id}
                  className="carouselItem"
                  onClick={() => navigate(`/${item.media_type || endpoint}/${item.id}`)}
                >
                  <div className="posterBlock">
                    <Img src={posterUrl} />
                    <CircleRating rating={item.vote_average ? item.vote_average.toFixed(1) : null} />
                    <Genres data={item.genre_ids ? item.genre_ids.slice(0, 2) : []} />
                  </div>
                  <div className="textBlock">
                    <span className="title">{item.title || item.name}</span>
                    <span className="date">{dayjs(item.release_date).format("MMMM D, YYYY")}</span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </ContentWrapper>
    </div>
  )
}

export default Carousel
