import { Routes, Route } from "react-router-dom";  // Correct import
import Home from "../views/home.jsx";
import PostIndex from "../views/posts/index.jsx";
import PostCreate from "../views/posts/create.jsx";
import PostEdit from "../views/posts/edit.jsx";
import FishingIndex from "../views/Fishing/index.jsx";
import FishingEdit from "../views/Fishing/edit.jsx";
import FishingCreate from "../views/Fishing/create.jsx";
import Login from "../views/auth/login.jsx";
import Register from "../views/auth/Register.jsx";
import Dashboard from "../views/auth/Dashboard.jsx";


function RoutesIndex() {
    return (
        <Routes>  {/* Using Routes instead of Switch */}
            <Route path="/" element={<Login />} /> 
            <Route path="/register" element={<Register />} />
            {/* <Route path="/home" element={<Home />} /> */}
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path="/posts" element={<PostIndex />} /> */}
            {/* <Route path="/posts/create" element={<PostCreate />} /> */}
            {/* <Route path="/posts/edit/:id" element={<PostEdit />} /> */}
            {/* <Route path="/fishings" element={<FishingIndex />} /> */}
            {/* <Route path="/fishings/create" element={<FishingCreate />} /> */}
            {/* <Route path="/fishings/edit/:id" element={<FishingEdit />} /> */}
        </Routes>
    );
}

export default RoutesIndex;
