// import React, { useState,  useEffect, useRef  } from 'react';
// import './css/default.css'; // Assuming styles are defined here

// import HealthTipsSection from "../components/healthTips/section"
// import Settings from "../components/views/settings/section"

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons'; 
// import { faGear, faLightbulb } from "@fortawesome/free-solid-svg-icons";


// const Layout = () => {
//     const [activeOption, setActiveOption] = useState('healthReminders');
  
//     const options = [
//       { id: 'healthReminders', name: 'Health Reminders', imgSrc: 'iconReminder.png', altText: 'reminderLogo' },
//       { id: 'settings', name: 'Settings', imgSrc: 'iconSettings.png', altText: 'settingsLogo' },
//     ];

//     const previousActiveOptionRef = useRef(activeOption);
  
//     useEffect(() => {
//         const appearClasses = ['appearRight', 'appearLeft'];
//         const disappearClasses = ['disappearRight', 'disappearLeft'];
//         const activeElement = document.querySelector(`#${activeOption}`);
//         const previousActiveElement = document.querySelector(`#${previousActiveOptionRef.current}`);
    
//         if (activeElement === previousActiveElement) return;
    
//         const currentIndex = options.findIndex(option => option.id === activeOption);
//         const previousIndex = options.findIndex(option => option.id === previousActiveElement?.id);
    
//         if (previousActiveElement) {
//             // Remove all appear classes before adding disappear classes
//             appearClasses.forEach(cls => previousActiveElement.classList.remove(cls));
    
//             const disappearClass = currentIndex > previousIndex ? disappearClasses[0] : disappearClasses[1];
//             previousActiveElement.classList.remove('selectedOption');
//             previousActiveElement.classList.add(disappearClass);
    
//             // Use a timeout to remove the disappear class and add hidden class after the animation completes
//             setTimeout(() => {
//                 previousActiveElement.classList.remove(disappearClass);
//                 previousActiveElement.classList.add('hidden');
//             }, 500); // Adjust this timing to match your animation duration
//         }
    
//         if (activeElement) {
//             // Remove hidden and any lingering disappear classes before adding appear classes
//             activeElement.classList.remove('hidden');
//             disappearClasses.forEach(cls => activeElement.classList.remove(cls));
    
//             const appearClass = currentIndex > previousIndex ? appearClasses[0] : appearClasses[1];
//             activeElement.classList.add('selectedOption', appearClass);
//         }
    
//         previousActiveOptionRef.current = activeOption;
//     }, [activeOption, options]);
  
  
//     const handleOptionClick = () => {
//       setActiveOption((prevOption) => (prevOption === 'healthReminders' ? 'settings' : 'healthReminders'));
//     };
  
//     return (
//       <div id="grid">
//         <header className="board">
//           <div className="TitleLogo">
//             <div>
//               <img src="icon.png" alt="Logo" className="logo" />
//               <h2 id="popupTitle" className="popupTitle">
//                 Reminders
//               </h2>
//             </div>
//             <div>
//               <span onClick={() => chrome.tabs.create({ url: chrome.runtime.getURL('guide.html') })}>
//                 <FontAwesomeIcon icon={faCircleQuestion} /> <span>How to use?</span>
//               </span>
//               <span onClick={handleOptionClick}>
//                   {activeOption === 'healthReminders' ? (
//                       <>
//                           <FontAwesomeIcon icon={faGear} /> <span>Settings</span>
//                       </>
//                   ) : (
//                       <>
//                           <FontAwesomeIcon icon={faLightbulb} /> <span>Reminders</span>
//                       </>
//                   )}
//               </span>
//             </div>
//           </div>
//         </header>
//         <section id="body">
//           <div id="healthReminders" className={`${activeOption === 'healthReminders' ? 'selectedOption' : ''} appearLeft`}>
//             <HealthTipsSection/>
//           </div>
//           <div id="settings" className={`${activeOption === 'settings' ? 'selectedOption' : ''} ${activeOption !== 'settings' ? 'disappearLeft' : ''}`}>
//             <Settings/>
//           </div>
//         </section>
//       </div>
//     );
//   };
  
//   export default Layout;