import { img_300, unavailable } from "../Services/config"
import DetailBox from './DetailBox';


function ContentBox({ id, poster, media_type, title, date}){
  console.log("Hii", media_type)
  return (
    <DetailBox media_type={media_type} id={id}>
        <img
          className="rounded-lg pb-0.5 "
          src={poster ? `${img_300}${poster}` : unavailable}
          alt={title}
        />
        <h1 className="w-full text-center text-lg py-0.5">{title}</h1>
        <div className="flex justify-around">
          <span className=" px-2"> {media_type === "tv" ? "TV Series" : "Movie"}</span>
          <span className=" px-2">{date}</span>
        </div>
      </DetailBox>
  )
}

export default ContentBox
