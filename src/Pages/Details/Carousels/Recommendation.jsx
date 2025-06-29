import Carousel from "../../../Components/Carousel/Carousel"
import useFetch from "../../../Hooks/UseFetch"

const Recommendation = ({ mediaType, id }) => {
  const { data, loading } = useFetch(`/${mediaType}/${id}/recommendations`)
  return (
    <>
      {data === null || data.results.length === 0 ? (
        ""
      ) : (
        <Carousel title="Recommendations" data={data?.results} loading={loading} endpoint={mediaType} />
      )}
    </>
  )
}

export default Recommendation
