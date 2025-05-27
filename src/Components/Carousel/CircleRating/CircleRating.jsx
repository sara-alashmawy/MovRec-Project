import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

const CircleRating = ({ rating }) => {
  const getRatingColor = (rating) => {
    if (rating < 5) return "var(--rating-low)"
    if (rating < 7) return "var(--rating-medium)"
    return "var(--rating-high)"
  }

  return (
    <div className="circleRating">
      <CircularProgressbar
        value={rating}
        maxValue={10}
        text={rating}
        styles={buildStyles({
          pathColor: getRatingColor(rating),
          textSize: "34px",
          textColor: "var(--text-primary)",
          trailColor: "var(--gray-200)",
        })}
      />
    </div>
  )
}

export default CircleRating
