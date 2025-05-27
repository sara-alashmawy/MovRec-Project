"use client"
import { VscChromeClose } from "react-icons/vsc"
import ReactPlayer from "react-player/youtube"

const VideoPopup = ({ show, setShow, videoId, setVideoId }) => {
  const hidePopup = () => {
    setShow(false)
    setVideoId(null)
  }

  return (
    <div className={`videoPopup ${show ? "visible" : ""}`}>
      <div className="opacityLayer" onClick={hidePopup}></div>
      <div className="videoPlayer">
        <div className="closeBtn" onClick={hidePopup}>
          <VscChromeClose />
        </div>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoId}`}
          controls
          width="100%"
          height="100%"
          playing={show}
        />
      </div>
    </div>
  )
}

export default VideoPopup
