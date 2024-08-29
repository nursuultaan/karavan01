import {Outlet} from "react-router-dom";
import Header from "../components/Header.tsx";

const MainlLayout = () => {
    return (
        <div className={" h-[100vh]"}>
            <div className={"h-[10%] "}>
                <Header/>

            </div>
            <section className={"h-[90%] "}>

                <Outlet/>

            </section>

        </div>

    );
};

export default MainlLayout;