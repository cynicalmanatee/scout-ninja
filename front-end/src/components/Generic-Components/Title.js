import "./styles/Title.css";

const Title = ({title, description}) => {

  return(
    <div className={title + " title"}>
      <p>{description}</p>
    </div>
  );
}

export default Title;