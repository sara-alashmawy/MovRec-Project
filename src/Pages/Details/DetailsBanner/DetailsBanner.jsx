import { useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import dayjs from "dayjs"
import { FaPlay, FaCalendarAlt, FaClock } from "react-icons/fa"

import ContentWrapper from "../../../Components/ContentWrapper/ContentWrapper"
import useFetch from "../../../Hooks/UseFetch"
import Genres from "../../../Components/Carousel/Genres/Genres"
import CircleRating from "../../../Components/Carousel/CircleRating/CircleRating"
import Img from "../../../Components/LazyLoadImage/LazyLoadImage"
import PosterFallback from "../../../assets/no-poster.png"
import Spinner from "../../../Components/Spinner/Spinner"
import VideoPopup from "../../../Components/VideoPopup/VideoPopup" 

const DetailsBanner = ({ video }) => { 
  const [show, setShow] = useState(false)
  const [videoId, setVideoId] = useState(null)
  const { mediaType, id } = useParams()
  const { data, loading } = useFetch(`/${mediaType}/${id}`)
  const { url } = useSelector((state) => state.home)

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`
  }

  const _generes = data?.genres?.map((g) => g?.id)

  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {!!data && (
            <>
              <div>
                <div className="backdrop-img">
                  <Img src={url.backdrop + data.backdrop_path} alt={data.title || data.name} />
                </div>
              </div>

              <div className="opacity-layer"></div>

              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {data.poster_path ? (
                      <Img src={url.backdrop + data.poster_path} className="posterImg" alt={data.title || data.name} />
                    ) : (
                      <Img src={PosterFallback} className="posterImg" alt={data.title || data.name} />
                    )}
                  </div>

                  <div className="right">
                    <div className="title">
                      {`${data.title || data.name} (${dayjs(data.release_date || data.first_air_date).format("YYYY")})`}
                    </div>

                    <div className="subtitle">{data.tagline}</div>
                    <Genres data={_generes} />

                    <div className="row">
                      <CircleRating rating={data?.vote_average?.toFixed(1)} />
                      {video && (
                        <div
                          className="playbtn"
                          onClick={() => {
                            setShow(true)
                            setVideoId(video.key)
                          }}
                        >
                          <FaPlay />
                          <div className="text">Watch Trailer</div>
                        </div>
                      )}
                    </div>

                    <div className="overview">
                      <div className="heading">Overview</div>
                      <div className="description">{data.overview}</div>
                    </div>

                    <div className="info">
                      {data.status && (
                        <div className="infoItem">
                          <span className="text bold">Status: </span>
                          <span className="text">{data.status}</span>
                        </div>
                      )}

                      {(data.release_date || data.first_air_date) && (
                        <div className="infoItem">
                          <span className="text bold">
                            <FaCalendarAlt style={{ marginRight: "5px", fontSize: "14px" }} />
                            Release Date:
                          </span>
                          <span className="text">
                            {dayjs(data.release_date || data.first_air_date).format("MMM D, YYYY")}
                          </span>
                        </div>
                      )}

                      {data.runtime && (
                        <div className="infoItem">
                          <span className="text bold">
                            <FaClock style={{ marginRight: "5px", fontSize: "14px" }} />
                            Runtime:
                          </span>
                          <span className="text">{toHoursAndMinutes(data.runtime)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </ContentWrapper>

              {/* ✅ Video Popup Component */}
              <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
              />
            </>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            {loading && <Spinner initial={true} />}
          </ContentWrapper>
        </div>
      )}
    </div>
  )
}

export default DetailsBanner
