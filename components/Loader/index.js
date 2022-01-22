import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlash } from '@fortawesome/free-solid-svg-icons'

import './Loader.scss';

const Loader = () => {
    document.body.style.backgroundColor = 'rgb(34, 40, 49)';
    return (
        <div className="loader">
            <FontAwesomeIcon icon={faSlash} />
            <p>Loading...</p>
        </div>
    )
}

export default Loader