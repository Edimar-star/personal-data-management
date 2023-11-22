import Sidebar from "../Components/Sidebar";
import AddPersonPage from "./AddPersonPage";
import EditPersonPage from "./EditPersonPage";
import HomePage from "./HomePage";
import LogsPage from "./LogsPage";
import "../CSS/dashboard.css";
import { useState } from "react";

const Dashboard = () => {
    const [screen, setScreen] = useState(0);
    const screens = [
        <EditPersonPage></EditPersonPage>,
        <AddPersonPage setScreen={setScreen}></AddPersonPage>,
        <LogsPage></LogsPage>,
    ];

    return (
        <div>
            <Sidebar setScreen={setScreen}></Sidebar>
            <div id="content">{screens[screen]}</div>
        </div>
    );
};

export default Dashboard;
