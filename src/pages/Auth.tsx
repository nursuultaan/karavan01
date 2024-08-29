import {Outlet} from "react-router-dom";

const Auth = () => {

    return (
        <div className={"w-full  h-[80vh]  flex justify-center items-center"}>
            <Outlet/>
        </div>
    );
};

export default Auth;