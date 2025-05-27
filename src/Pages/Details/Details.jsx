
import useFetch from "../../Hooks/UseFetch"
import { useParams } from "react-router-dom"
import DetailsBanner from "./DetailsBanner/DetailsBanner"
import Cast from "./Cast/Cast"
import Similar from "./Carousels/Similar"
import Recommendation from "./Carousels/Recommendation"

const Details = () => {
  const { mediaType, id } = useParams()
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`)
  const { data: credits, loading: creditsLoading } = useFetch(`/${mediaType}/${id}/credits`)
  const trailer = data?.results?.find((vid) => vid.type === "Trailer" && vid.site === "YouTube")

  return (
    <>
      <DetailsBanner video={trailer} />
      <Cast data={credits?.cast} loading={creditsLoading} />
      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />
    </>
  )
}
export default Details