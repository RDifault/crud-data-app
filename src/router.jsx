import {Navigate, createBrowserRouter} from "react-router-dom";
import PostDetail from "./views/PostDetail";
import Home from "./views/Home";
import AddPost from "./views/AddPost";
import EditPost from "./views/EditPost";

const router = createBrowserRouter([
    {
        path: "/crud-data-app",
        element: <Home />,
    },
    {
        path: "/crud-data-app/posts/:id",
        element: <PostDetail />,
    },
    {
        path: "/crud-data-app/add-post",
        element: <AddPost />,
    },
    {
        path: "/crud-data-app/posts/edit-post/:id",
        element: <EditPost />,
    },
    {
        path: "*",
        element: <Navigate to="/crud-data-app" />,
    },
]);

export default router;