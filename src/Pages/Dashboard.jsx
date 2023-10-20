import Sidebar from "../Components/Sidebar";
import AddPersonPage from "./AddPersonPage";
import EditPersonPage from "./EditPersonPage";
import HomePage from "./HomePage";
import LogsPage from "./LogsPage";
import "../css/dashboard.css";
import { useState } from "react";

const Dashboard = () => {
    const screens = [
        <HomePage></HomePage>,
        <AddPersonPage></AddPersonPage>,
        <EditPersonPage></EditPersonPage>,
        <LogsPage></LogsPage>,
    ];

    const [screen, setScreen] = useState(0);

    return (
        <div>
            <Sidebar setScreen={setScreen}></Sidebar>
            <div id="content">{screens[screen]}</div>
        </div>
    );
};

export default Dashboard;
