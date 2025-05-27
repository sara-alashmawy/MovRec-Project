

import { useState } from "react"
import ContentWrapper from "../../../Components/ContentWrapper/ContentWrapper"
import useFetch from "../../../Hooks/UseFetch"
import Carousel from "../../../Components/Carousel/Carousel"
import SwitchTab from "../../../Components/SwitchTab/SwitchTab"

const NowPlayIng = () => {
  const [endpoint, setEndpoint] = useState("movie")
  const { data, loading } = useFetch(`/${endpoint}/now_playing`)
  const onTabChange = (tab) => {
    setEndpoint(tab === "Movies" ? "movie" : "tv")
  }
  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Now Playing</span>
         <SwitchTab data={["Movies", "Tv Shows"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
    </div>
  )
}

export default NowPlayIng
