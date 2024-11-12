// import react router dom

import { Routes, Route } from "react-router-dom";
import Home from "../views/home.jsx";
import PostIndex from "../views/posts/index.jsx";
import PostCreate from "../views/posts/create.jsx";
import PostEdit from "../views/posts/edit.jsx";
import FishingIndex from "../views/Fishing/index.jsx";
import FishingEdit from "../views/Fishing/edit.jsx";
import FishingCreate from "../views/Fishing/create.jsx";




function RoutesIndex() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<PostIndex />} />
            <Route path="/posts/create" element={<PostCreate />} />
            <Route path="/posts/edit/:id" element={<PostEdit />} />

            {/* Fishing Routes */}
            <Route path="/fishings" element={<FishingIndex />} />
            <Route path="/fishings/create" element={<FishingCreate />} />
            <Route path="/fishings/edit/:id" element={<FishingEdit />} />
        </Routes>
    );
}

export default RoutesIndex;
