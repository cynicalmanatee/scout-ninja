import React from "react";
import PropTypes from "prop-types";

const Button = ({title, description, color, onClick}) => {
  return(
    <div className="button">
      <button className={title} 
      onClick={onClick}
            style={{ background: color, display: "block" }}>{description}</button>
    </div>
  )
};

export default Button;