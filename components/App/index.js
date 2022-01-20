import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../HomePage/index";
import FollowerCounter from "../FollowerCounter/index";
import Polls from "../Polls/index";
import Game from "../CurrentGame/index";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/follower-counter' element={<FollowerCounter />} />
                <Route path='/polls' element={<Polls />} />
                <Route path='/game' element={<Game />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App