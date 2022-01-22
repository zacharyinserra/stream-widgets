import React, { useState, useEffect } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad } from '@fortawesome/free-solid-svg-icons'
import Loader from '../Loader/index';

import './CurrentGame.scss';

const CurrentGame = () => {
    const [isLoading, setLoading] = useState(true);
    const [gameData, setGameData] = useState();

    useEffect(() => {
        axios.get('http://localhost:8000/game-name')
            .then((res) => {
                console.log(res.data.data[0]);
                setGameData(res.data.data[0]);
                setLoading(false);
            });
    }, []);


    if (isLoading) {
        return (
            <Loader />
        )
    }

    document.body.style.backgroundColor = 'transparent';
    return (
        <div className="current-game">
            <h1><FontAwesomeIcon icon={faGamepad} />{gameData.game_name}</h1>
        </div>
    )
}
export default CurrentGame