import React from "react";

const Features = () => {
  return (
    <section id="features">
        <h2>
            Features
        </h2>
        <div>
            <img src="iconCheckThisOut2.png" alt="" />
            <h4>The eXtHealth detects posts containing health-related information</h4>
            <p>When you're browsing X and come across a post with health content, you will see a 'Check This Out' button. Click this button to request a fact-check.</p>
        </div>
        <div>
            <img src="iconCheck.png" alt="" />
            <h4>The eXtHealth prevents the spread of misinformation</h4>
            <p>From the eXtHealth extension side-panel, you can access corrected information from credible sources to help users stay informed with accurate health data while browsing.</p>
        </div>
        <div>
            <img src="iconIdea.png" alt="" />
            <h4>The eXtHealth provides health information from trusted sources</h4>
            <p>Health reminders displayed in the eXtHealth extension pop-up contain general health information from reliable and credible sources.</p>
        </div>
    </section>
  );
};

export default Features;