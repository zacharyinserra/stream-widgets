import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons'

import './Username.scss';

const Username = () => {
    document.body.style.backgroundColor = 'transparent';

    return (
        <div className="username">
            <h1><FontAwesomeIcon icon={faCode} /> evilbooty</h1>
        </div>
    )
}
export default Username