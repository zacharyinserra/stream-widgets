import React from "react";

import './Bar.scss';

const Bar = ({
    top,
    left,
    width,
    backgroundColor,
    animationDelay
}) => {

    return (
        <div
            className="bar"
            style={{
                top: top,
                left: left,
                width: width,
                backgroundColor: backgroundColor,
                animationDelay: animationDelay + 's'
            }}>
        </div>
    )
}
export default Bar