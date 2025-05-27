import { useSelector } from "react-redux"
import ContentWrapper from "../../../Components/ContentWrapper/ContentWrapper"
import Img from "../../../Components/LazyLoadImage/LazyLoadImage"
import avatar from "../../../assets/avatar.png"
import Spinner from "../../../Components/Spinner/Spinner"
const Cast = ({ data, loading }) => {
  const { url } = useSelector((state) => state.home)

  
  return (
    <>
      {data === null || data?.length === 0 ? (
        ""
      ) : (
        <div className="castSection">
          <ContentWrapper>
            <div className="sectionHeading">Top Cast</div>
            {!loading ? (
              <div className="listItems">
                {!!data && (
                  <>
                    {data?.map((item) => {
                      const imgUrl = item.profile_path ? url.profile + item.profile_path : avatar
                      return (
                        <div key={item.id}>
                          <div className="listItem">
                            <div className="profileImg">
                              <Img src={imgUrl} alt="profile img" />
                            </div>
                            <div className="name">{item.name}</div>
                            <div className="character">{item.character}</div>
                          </div>
                        </div>
                      )
                    })}
                  </>
                )}
              </div>
            ) : (
              <div>
                {loading && <Spinner initial={true} />}
              </div>
            )}
          </ContentWrapper>
        </div>
      )}
    </>
  )
}

export default Cast
