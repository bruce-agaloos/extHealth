import React, { useEffect, useRef } from "react";

import './css/faqs.css';

const Faqs = () => {
  const faqContainerRef = useRef(null);
  const radioGroupRef = useRef(null);
  const contentDivRef = useRef(null);

  useEffect(() => {
    const radios = document.querySelectorAll('#faqs input[type="radio"][name="options"]');
    const paragraphs = document.querySelectorAll('#faqs p');

    radios.forEach((radio, index) => {
      radio.addEventListener('change', () => {
        paragraphs.forEach((p, pIndex) => {
          if (index === pIndex) {
            p.classList.remove('not-selected');
            p.classList.add('selectedOption');
          } else {
            p.classList.remove('selectedOption');
            p.classList.add('not-selected');
          }
        });
      });
    });

    // Cleanup event listeners on component unmount
    return () => {
      radios.forEach((radio) => {
        radio.removeEventListener('change', () => {});
      });
    };
  }, []);

  return (
    <section id="faqs">
      <h2>FAQs</h2>
      <div>
        <div className={'radioGroup'}>
          <input type="radio" name="options" id="option1" defaultChecked />
          <label htmlFor="option1">How do I install the eXtHealth browser extension?</label>
          
          <input type="radio" name="options" id="option2" />
          <label htmlFor="option2">What should I do if the eXtHealth extension is not working?</label>
          
          <input type="radio" name="options" id="option3" />
          <label htmlFor="option3">What types of trusted websites or sources does eXtHealth use for fact-checking?</label>
          
          <input type="radio" name="options" id="option4" />
          <label htmlFor="option4">Does eXtHealth work with all web browsers?</label>

          <input type="radio" name="options" id="option5" />
          <label htmlFor="option5">Can eXtHealth be used with other social media platforms besides X (formerly Twitter)?</label>
        </div>
        <div>
          <p id="text1" className="selectedOption">Follow the guide to this google drive: 
            <a href="https://drive.google.com/drive/folders/1SSDzXor4WuWJIDO1ol0I-CSYDpZhm_4X" target="_blank"
            style={{
              color: 'yellow',
              marginLeft: '10px'
            }}
            > Google drive</a>
            </p>
          <p id="text2" className="not-selected">
            If the eXtHealth extension is not working, it might be because the server is down.
            You can contact any of us for technical support.
          </p>
          <p id="text3" className="not-selected">
            Government organizations, universities, and other reputable sources are used for fact-checking.
          </p>
          <p id="text4" className="not-selected">
            It has only been tested on Chrome extensively, it MIGHT work on other chromium browsers, such as edge or opera, but errors might arise.
          </p>
          <p id="text5" className="not-selected">
            The auto-detect feature is only currently working on X (formerly Twitter), but the manual fact-checking can be used on any platform.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Faqs;