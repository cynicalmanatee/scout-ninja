import React, {useState} from 'react'
import "./styles/SlideShow.css";

function SlideShow({images, texts}) {
    const [imageList] = useState(images);
    const [textList] = useState(texts);
    const [showImage, setShowImage] = useState(0);


    return (
        <div id="image-gallery">
            <div className="img-wrapper">
                <img className = "tutorial-image" width="90%" src = {imageList[showImage]}/>
            </div>
            <span className="gallery-progress">{(showImage+1)+"/"+imageList.length}</span>
            <span className="image-instruction-text">{texts[showImage]}</span>
            <div className="gallery-nav gallery-nav-left" onClick={()=>(showImage == 0?setShowImage(imageList.length-1):setShowImage(showImage-1))}>Prev.</div>
            <div className="gallery-nav gallery-nav-right" onClick={()=>(showImage == imageList.length-1?setShowImage(0):setShowImage(showImage+1))}>Next</div>
        </div>
    )
}

export default SlideShow
