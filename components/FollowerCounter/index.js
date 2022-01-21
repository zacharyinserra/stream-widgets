import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMeteor } from '@fortawesome/free-solid-svg-icons'

import './FollowerCounter.scss';

const FollowerCounter = () => {
    const [isLoading, setLoading] = useState(true);
    const [goalsData, setGoalsData] = useState({});

    function getGoals() {
        axios.get('http://localhost:8000/creator-goals')
            .then((res) => {
                // If call fails redirect to get new token
                setGoalsData(res.data.data[0]);
                setLoading(false);
            });
    }

    useEffect(() => {
        getGoals();
        setInterval(function () { getGoals() }, 30000);
    }, []);



    if (isLoading) {
        return (
            <div className="">Loading...</div>
        )
    }

    return (
        <div className='follower-counter'>
            <h1><FontAwesomeIcon icon={faMeteor} /> Follower Goal <span>{goalsData.current_amount}</span> / {goalsData.target_amount}</h1>
        </div>
    )
}
export default FollowerCounter