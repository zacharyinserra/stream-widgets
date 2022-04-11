import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../HomePage/index";
import Username from "../Username/index";
import FollowerCounter from "../FollowerCounter/index";
import Polls from "../Polls/index";
import Game from "../CurrentGame/index";
import BeRightBack from "../BeRightBack";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/username' element={<Username />} />
                <Route path='/follower-counter' element={<FollowerCounter />} />
                <Route path='/game' element={<Game />} />
                <Route path='/polls' element={<Polls />} />
                <Route path='/be-right-back' element={<BeRightBack />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App