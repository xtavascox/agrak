import {BrowserRouter, Navigate, NavLink, Route, Routes} from "react-router-dom";
import {Home, User} from "../views";

export const Navigation = () => {

    return (


        <BrowserRouter>


            <Routes>
                <Route path="home" element={<Home/>}/>
                <Route path="user" element={<User/>}/>
                <Route path="/" element={<Home/>}/>

                <Route path="/*" element={<Navigate to="/" replace/>}/>
            </Routes>
        </BrowserRouter>
    )
}