import React from 'react'
import BackIcon from "./assets/left-arrow.png";

const BackButton = (props) => {

  const redirect = () => props.back;

    return (
        <div onClick={redirect()}>
            <img src={BackIcon} width="50px" height="50px"></img>
        </div>
    )
}

export default BackButton
