import React, {useState, useEffect} from 'react'
import "./View.css"
function CountdownTimer({setTimer}) {

    const [limit, setLimit] = useState(setTimer);
	const [color, setColor] = useState("white");
	const [startTime] = useState(Date.now());
	const [percent, setPercent] = useState("100%");

    	// Code adapted from: https://upmostly.com/tutorials/setinterval-in-react-components-using-hooks
	useEffect(() => {
		const countdown = setInterval(() => {
			setLimit(setTimer - Math.floor((Date.now()-startTime)/1000));
			if(Math.floor(limit*100/setTimer)>0){
			setPercent((limit*100/setTimer)+"%");
			console.log((limit*100/setTimer)+"%");
			} else{setPercent("100%")}
			if(limit/setTimer < 0.101){
				setColor("red");
			}else 
			if(limit/setTimer < 0.51){
				setColor("orange");
			}
			if (limit <= 0) {
				setLimit("Over Time!");
			}

		}, 1000);
		return () => clearInterval(countdown);
	});
	// End of adapted code
    return (
        <div id="countdown-timer">
            <span>Time Remaining: </span>
            <span style={{color: "Black",
			backgroundColor:color,
			display: "block",
			width:percent,}}>{limit}</span>
        </div>
    )
}

export default CountdownTimer
