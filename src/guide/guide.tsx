import React from "react";
import { createRoot } from "react-dom/client";

import Navbar from './layout/navbar';
import Header from './layout/header';
import SetUp from './layout/setup';
import Features from './layout/features';
import Faqs from './layout/faqs';

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