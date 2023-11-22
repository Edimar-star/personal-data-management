import React from "react";
import { useState } from "react";

const Sidebar = ({ setScreen }) => {
    const options = [
        { name: "records", icon: "bi bi-folder2", screen: 0 },
        { name: "Add", icon: "bi bi-file-earmark-plus", screen: 1 },
        { name: "Logs", icon: "bi bi-layout-text-window-reverse", screen: 2 },
    ];

    const [activeOption, setActiveOption] = useState(null);

    const changeScreen = (e, screen) => {
        setScreen(screen);
        setActiveOption(screen);
    };

    return (
        <section
            className="container pt-4 bg-white"
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                height: "100%",
                width: "10em",
                zIndex: 1,
            }}
        >
            <div
                className="d-flex align-items-center click"
                onClick={(e) => changeScreen(e, 2)}
            >
                <img
                    src="/logoD.png"
                    className="img-fluid"
                    height={50}
                    width={50}
                />
                <h4 className="ms-2 mt-2">PDM</h4>
            </div>
            <hr />
            <div className="mt-5 text-secondary ms-1">
                {options.map((op, index) => (
                    <div
                        key={index}
                        className={`d-flex mb-3 ms-2 click ${
                            activeOption === op.screen ? "text-primary" : ""
                        }`}
                        onClick={(e) => changeScreen(e, op.screen)}
                    >
                        <i className={op.icon + " me-2"}></i>
                        <h5>{op.name}</h5>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Sidebar;
