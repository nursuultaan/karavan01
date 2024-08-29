
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import MainlLayout from "./layouts/MainlLayout.tsx";
import Home from "./pages/Home.tsx";
import AddPost from "./pages/AddPost.tsx";
import SignUp from "./components/SignUp.tsx";
import LogIn from "./components/LogIn.tsx";
import Auth from "./pages/Auth.tsx";
import {Provider} from "react-redux";
import {store} from "./store/store.ts";

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<MainlLayout/>}>
        <Route index element={<Home/>}/>

        <Route path={"addPost"} element={<AddPost/>}/>
        <Route element={<Auth/>}>
            <Route path={"signup"} element={<SignUp/>}/>
            <Route path={"login"} element={<LogIn/>}/>
        </Route>

    </Route>
));

ReactDOM.createRoot(document.getElementById('root')!).render(

    <Provider store={store}> {/* Wrap RouterProvider with Provider */}
        <RouterProvider router={router} />
    </Provider>

);
