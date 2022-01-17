import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./Home";
import FollowerCounter from "./FollowerCounter";
import OtherComp from "./OtherComp";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/follower-counter' element={<FollowerCounter />}/>
                <Route path='/other-comp' element={<OtherComp />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App