import React from "react";
import { createRoot } from "react-dom/client";

import Navbar from './layout/navbar';
import Header from ;
import SetUp from ;
import Features from ;
import Faqs from ;

const Guide = () => {

    return (
        <>  
            <Navbar/>
            <Header/>
            <SetUp/>
            <Features/>
            <Faqs/>
        </>
    );
};

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(<Guide />);