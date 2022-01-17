import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useLocation } from 'react-router-dom'

import './FollowerCounter.css';

const FollowerCounter = () => {

    const { code } = useLocation().state;

    const [isLoading, setLoading] = useState(true);
    const [goalsData, setGoalsData] = useState({});
    // const [userData, setUserData] = useState({ id: process.env.TWTICH_USER_ID, login: process.env.TWTICH_LOGIN });
    const userData = { id: process.env.TWTICH_USER_ID, login: process.env.TWTICH_LOGIN };

    useEffect(() => {
        axios.post(`https://id.twitch.tv/oauth2/token?client_id=${process.env.TWTICH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=authorization_code&code=${code}&redirect_uri=${process.env.TWITCH_REDIRECT_URI}`)
            .then((res) => {
                var accessToken = res.data.access_token;

                // axios.all([axios.get(`https://api.twitch.tv/helix/users?login=eviltooty&client_id=${process.env.TWITCH_CLIENT_ID}`, {
                //     headers: {
                //         'Client-ID': ${process.env.TWITCH_CLIENT_ID},
                //         'Authorization': `Bearer ${accessToken}`
                //     }
                // }),
                // axios.get(`https://api.twitch.tv/helix/users/follows?to_id=${userData.id}`, {
                //     headers: {
                //         'Client-ID': ${process.env.TWITCH_CLIENT_ID},
                //         'Authorization': `Bearer ${accessToken}`
                //     }
                // }),
                // axios.get(`https://api.twitch.tv/helix/goals?broadcaster_id=${userData.id}`), {

                // }
                // ])
                //     .then(axios.spread((firstRes, secondRes) => {
                //         setUserData(firstRes.data.data[0]);
                //         setFollowers(secondRes.data.total);
                //         setLoading(false);
                //     }));

                var config = {
                    method: 'get',
                    url: `https://api.twitch.tv/helix/goals?broadcaster_id=${process.env.TWTICH_USER_ID}`,
                    headers: {
                        'client-id': process.env.TWTICH_CLIENT_ID,
                        'Authorization': `Bearer ${accessToken}`
                    }
                };
                axios(config)
                    .then((res) => {
                        setGoalsData(res.data.data[0]);
                        setLoading(false);
                    });

            })
            .catch((err) => console.log(err));
    }, []);

    if (isLoading) {
        return (
            <div className="">Loading...</div>
        )
    }

    return (
        <div className='follower-counter'>
            <h1>Followers {goalsData.current_amount} / {goalsData.target_amount}</h1>
            <h2>{userData.login} - {userData.id}</h2>
        </div>
    )
}
export default FollowerCounter