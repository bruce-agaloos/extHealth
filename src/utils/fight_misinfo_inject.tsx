import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import Frame from 'react-frame-component';

interface Premise {
  premise: string;
  relationship: string;
  url: string;
}

interface Hypothesis {
  hypothesis: string;
  premises: Premise[];
}

interface ResponseData {
  result: Hypothesis[];
}

const FightMisinfoInject = ({ response }: { response: ResponseData }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [activeSection, setActiveSection] = useState('entailment');

  useEffect(() => {
    // This code runs after the component mounts

    return () => {
      // This cleanup function runs when the component is about to unmount
      const frame = document.getElementById('uniqueFrameIdOfExtHealthFactCheck');
      if (frame && frame.parentNode) {
        frame.parentNode.removeChild(frame);
      }
    };
  }, []);

  const closeModal = () => {
    setIsVisible(false);
  };

  const toggleSection = (section: string) => {
    setActiveSection(section);
  };

  if (!isVisible) return null;

  const renderPremises = (relationship: string) => {
    const premises = response.result[0].premises.filter(p => p.relationship === relationship);
    return premises.map((premise, index) => (
      <div key={index} style={{ margin: '1.5rem', borderBottom: '1px solid #00000033' }}>
        <h4 style={{ fontFamily: "'Roboto Slab', serif" }}>{premise.premise}</h4>
        <p style={{ color: '#524A3E' }}>View full article at <a href={premise.url} style={{ textDecoration: 'none', color: 'inherit' }} target="_blank" rel="noopener noreferrer">{premise.url}</a></p>
      </div>
    ));
  };

  return (
    <Frame 
      id="uniqueFrameIdOfExtHealthFactCheck" 
      style={{
        position: 'absolute', 
        right: '0%', 
        top: '50%', transform: 'translateY(-50%)', 
        boxShadow: '0 2px 4px rgba(30, 25, 25, 0.08)', 
        height: '80%', 
        width: '25%', 
        backgroundColor: 'white',
      }}head={[
      <link
        key="roboto-slab"
        href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;700&display=swap"
        rel="stylesheet"
        type="text/css"
      />,
    ]}>
      <div id="exthealth-fact-check" style={{ 
        boxShadow: '0 2px 4px rgba(30, 25, 25, 0.08)', 
        height: '100%', 
        width: '100%', 
        display: 'flex', 
        backgroundColor: 'white',
        flexDirection: 'column' }}>
        {/* header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
          <div>
            <h3 style={{ fontFamily: "'Roboto Slab', serif" }}>extHealth</h3>
          </div>
          <span style={{ display: 'inline-block', padding: '0.5rem', cursor: 'pointer', fontSize: '2rem', userSelect: 'none' }} onClick={closeModal}>
            &times;
          </span>
        </div>
        {/* claim/hypothesis */}
        <div style={{ borderTop: '1px solid #DFDCD8', padding: '0.5rem 1.5rem' }}>
          <h3 style={{ fontFamily: "'Roboto Slab', serif" }}>Claim:</h3>
          <p style={{ fontFamily: "'Roboto Slab', serif" }}>{response.result[0].hypothesis}</p>
        </div>
        {/* types of premise */}
        <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
          {['entailment', 'contradiction', 'neutral'].map((section) => (
            <div key={section} className="clickable-div" data-target={section} style={{ display: 'flex', alignItems: 'center', flexGrow: 1, justifyContent: 'center', borderStyle: 'solid', borderColor: '#DFDCD8', borderWidth: '1px', borderBottom: activeSection === section ? 'none' : '1px solid #DFDCD8' }} onClick={() => toggleSection(section)}>
              <span style={{ height: '5px', width: '5px', backgroundColor: section === 'entailment' ? 'blue' : section === 'contradiction' ? 'red' : '#545454', borderRadius: '50%', display: 'inline-block', marginRight: '0.5rem' }}></span>
              <p style={{ fontFamily: "'Roboto Slab', serif" }}>{section.charAt(0).toUpperCase() + section.slice(1)}</p>
            </div>
          ))}
        </div>
        {/* premise sections */}
        {['entailment', 'contradiction', 'neutral'].map((section) => (
          <div key={section} id={section} style={{ overflowY: 'auto', display: activeSection === section ? 'block' : 'none' }}>
            {renderPremises(section)}
          </div>
        ))}
      </div>
    </Frame>
  );
};

function fight_misinfo_inject(response: any) {
  const existingDiv = document.getElementById('fight-misinfo-root-exthealth');
  
  // If an existing div is found, remove it to clean up previous React trees
  if (existingDiv) {
    const root = createRoot(existingDiv); // Use the existing div as root
    root.unmount(); // Unmount the component
    document.body.removeChild(existingDiv); // Remove the div from the body
  }

  // Create a new div for the new React tree
  const div = document.createElement('div');
  div.id = 'fight-misinfo-root-exthealth'; // Assign an ID to the div
  div.style.width = '0';
  div.style.height = '0';
  div.style.padding = '0';
  div.style.margin = '0';
  document.body.appendChild(div);
  
  // Create a root and render the new React component
  const root = createRoot(div);
  root.render(<FightMisinfoInject response={response} />);
}

export { fight_misinfo_inject };