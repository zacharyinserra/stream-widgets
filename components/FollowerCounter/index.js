import React, { useEffect, useState } from 'react';
import axios from 'axios'

import './FollowerCounter.scss';

const FollowerCounter = () => {
    const [isLoading, setLoading] = useState(true);
    const [goalsData, setGoalsData] = useState({});

    useEffect(() => {
        axios.get('http://localhost:5000/creator-goals')
            .then((res) => {
                setGoalsData(res.data.data[0]);
                setLoading(false);
            })
    }, []);

    if (isLoading) {
        return (
            <div className="">Loading...</div>
        )
    }

    return (
        <div className='follower-counter'>
            <h1>Followers {goalsData.current_amount} / {goalsData.target_amount}</h1>
        </div>
    )
}
export default FollowerCounter