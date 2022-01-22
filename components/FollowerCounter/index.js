import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMeteor } from '@fortawesome/free-solid-svg-icons'
import Loader from '../Loader/index';

import './FollowerCounter.scss';

const FollowerCounter = () => {
    const [isLoading, setLoading] = useState(true);
    const [goalsData, setGoalsData] = useState({});

    function getGoals() {
        console.log('polling...')
        axios.get('http://localhost:8000/creator-goals')
            .then((res) => {
                // If call fails redirect to get new token
                setGoalsData(res.data.data[0]);
                setLoading(false);
            })
            .catch((res) => {
                console.log(res);
            });
    }

    useEffect(() => {
        getGoals();
        setInterval(function () { getGoals() }, 30000);
    }, []);

    if (isLoading) {
        return (
            <Loader />
        )
    }

    document.body.style.backgroundColor = 'transparent';
    return (
        <div className='follower-counter'>
            <h1><FontAwesomeIcon icon={faMeteor} /> Follower Goal <span>{goalsData.current_amount}</span> / {goalsData.target_amount}</h1>
        </div>
    )
}
export default FollowerCounter