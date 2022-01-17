import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const Home = () => {
    

    console.log(React.version);
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code');
    // TO-DO: store code in env-like file securely

    if (!code) {
        axios.get(`https://id.twitch.tv/oauth2/authorize?client_id=${process.env.TWTICH_CLIENT_ID}&redirect_uri=${process.env.TWITCH_REDIRECT_URI}&response_type=code&scope=channel:read:goals`)
            .then((res) => {
                console.log(res.request.responseURL);
                window.location.href = res.request.responseURL;
            });
    } else {
        window.history.pushState({}, document.title, '/');
    }

    return (
        <div>
            <Link to='/follower-counter' state={{ code: code }}>
                Follower Counter
            </Link>
            <Link to='/other-comp'>
                Other Component
            </Link>
        </div>
    )
}
export default Home