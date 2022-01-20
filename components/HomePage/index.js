import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const Home = () => {
    const [isLoading, setLoading] = useState(true);
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code');

    useEffect(() => {
        axios.get('http://localhost:5000/token')
            .then((res) => {
                if (res.data != "") {
                    setLoading(false);
                } else {
                    if (!code) {
                        var params = {
                            response_type: 'code',
                            client_id: process.env.TWTICH_CLIENT_ID,
                            redirect_uri: process.env.TWITCH_REDIRECT_URI,
                            state: '1234567890'
                        }
                        var scopes = 'scope=channel:read:goals+channel:read:polls+channel:read:subscriptions';

                        axios.get(`https://id.twitch.tv/oauth2/authorize?${scopes}`, { params: params })
                            .then((res) => {
                                window.location.href = res.request.responseURL;
                            });
                    } else {
                        window.history.pushState({}, document.title, '/');
                        axios.post('http://localhost:5000/code', {}, {
                            headers: {
                                'code': code
                            }
                        })
                            .then((res) => {
                                setLoading(false);
                            });
                    }
                }
            });
    }, []);

    if (isLoading) {
        return (
            <div className="">Loading...</div>
        )
    }

    return (
        <div>
            <Link to='/follower-counter'>
                Follower Counter
            </Link>
            <Link to='/polls'>
                Polls
            </Link>
            <Link to='/game'>
                Game
            </Link>
        </div>
    )
}
export default Home