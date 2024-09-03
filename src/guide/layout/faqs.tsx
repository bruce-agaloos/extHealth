import React, { useEffect } from "react";

const Faqs = () => {
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
        <div>
          <input type="radio" name="options" id="option1" defaultChecked />
          <input type="radio" name="options" id="option2" />
          <input type="radio" name="options" id="option3" />
          <input type="radio" name="options" id="option4" />
        </div>
        <div>
          <p id="text1" className="selectedOption">Text for option 1</p>
          <p id="text2" className="not-selected">Text for option 2</p>
          <p id="text3" className="not-selected">Text for option 3</p>
          <p id="text4" className="not-selected">Text for option 4</p>
        </div>
      </div>
    </section>
  );
};

export default Faqs;