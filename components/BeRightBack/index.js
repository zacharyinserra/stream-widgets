import React from "react";
import Bar from "./Bar";

import './BeRightBack.scss';

const BeRightBack = () => {
    document.body.style.backgroundColor = 'rgb(34, 40, 49)';

    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    var bars = [];
    var maxBars = 100;
    var colors = ['rgb(238, 238, 238)', 'rgb(0, 173, 181)', 'rgb(57, 62, 70)'];

    for (let i = 1; i <= maxBars; i++) {
        let rLeft = 3440 / maxBars * i + randomIntFromInterval(-((3440 / maxBars) / 2), (3440 / maxBars) / 2);
        let rTop = randomIntFromInterval(-360, 1440);
        let rWidth = randomIntFromInterval(1, 10);
        let rColor = colors[Math.floor(Math.random() * colors.length)];
        let animationDelay = randomIntFromInterval(0, 15);

        bars.push(<Bar top={rTop} left={rLeft} width={rWidth} backgroundColor={rColor} animationDelay={animationDelay} />);
    }

    return (
        <div className="be-right-back">
            {bars}
            <div className="text">
                Be Right Back
            </div>
        </div>
    )
}
export default BeRightBack