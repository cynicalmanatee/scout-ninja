import PlaceholderImage from "./Placeholder-Image";
import "./styles/Upload.css";

const Upload = (props) => {
  return (
    //Code from https://codeburst.io/react-image-upload-with-kittens-cc96430eaece
    <div className="upload">
      <div className="photoButton">
        <label htmlFor="single">
          <PlaceholderImage source="https://dummyimage.com/300/000/fff" />
        </label>
        <input type="file" id="single" onChange={props.onChange} />
      </div>
    </div>
    //End of code from https://codeburst.io/react-image-upload-with-kittens-cc96430eaece
  )
}

export default Upload;