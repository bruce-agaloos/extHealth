import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./popup.css";


import { Toggle } from "./components";

import FactCheckingSection from "./components/factcheck/FactCheckingSection"


const Popup = () => {
    const sampleFact = {
        result: [
          {
            hypothesis: 'polio is deadly1',
            premises: [
              {
                premise: '1',
                relationship: 'contradiction',
                url: 'https://example.com',
              },
              {
                premise: '2',
                relationship: 'entailment',
                url: 'https://example.com',
              },
              {
                premise: '3',
                relationship: 'neutral',
                url: 'https://example.com',
              },
            ],
          },
          {
            hypothesis: 'polio ',
            premises: [
              {
                premise: '1',
                relationship: 'contradiction',
                url: 'https://example.com',
              },
              {
                premise: '2',
                relationship: 'entailment',
                url: 'https://example.com',
              },
              {
                premise: '3',
                relationship: 'neutral',
                url: 'https://example.com',
              },
            ],
          },
          {
            hypothesis: '3',
            premises: [
              {
                premise: '1',
                relationship: 'contradiction',
                url: 'https://example.com',
              },
              {
                premise: '2',
                relationship: 'entailment',
                url: 'https://example.com',
              },
              {
                premise: '3',
                relationship: 'neutral',
                url: 'https://example.com',
              },
            ],
          },
        ],
      };
    useEffect(() => {
        chrome.storage.local.set({ extHealthFacts: sampleFact });
    }, []);

    return (
        <>
            <h1>Hello</h1>
            {/* <Toggle onToggle={(isOn) => {
                chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, { toggleState: isOn });
                });
            }} /> */}

            <FactCheckingSection />

        </>
    );
};

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(<Popup />);