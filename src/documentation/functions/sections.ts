// sections.js
import Introduction from './../pages/Introduction';
import BrowserCompatibility from './../pages/BrowserCompatibility';
import { Looks, History, Settings } from './../pages/HealthTips';
import { AutoDetection, ContextMenu, KeywordsSupported } from './../pages/HealthDetection';
import { HowToUse, Modes, AllHistory } from './../pages/FactChecking';

const sections = [
    { name: 'Getting Started', type: 'header' },
    { name: 'Introduction', path: '/', component: Introduction },
    { name: 'Browser Compatibility', path: '/browser-compatibility', component: BrowserCompatibility },
    { name: 'Sections', type: 'header' },
    {
        name: 'Health Tips',
        subSections: [
            { name: 'Looks', path: '/health-tips/looks', component: Looks },
            { name: 'History', path: '/health-tips/history', component: History },
            { name: 'Settings', path: '/health-tips/settings', component: Settings },
        ],
    },
    {
        name: 'Health Detection',
        subSections: [
            { name: 'Auto Detection', path: '/health-detections/auto-detection', component: AutoDetection },
            { name: 'Context Menu', path: '/health-detections/context-menu', component: ContextMenu },
            { name: 'Keywords Supported', path: '/health-detections/keywords-supported', component: KeywordsSupported }
        ],
    },
    {
        name: 'Fact Checking',
        subSections: [
            { name: 'How to use', path: '/fact-checking/how-to-use', component: HowToUse },
            { name: 'Modes', path: '/fact-checking/modes', component: Modes },
            { name: 'All history', path: '/fact-checking/history', component: AllHistory },
        ],
    },
];

export default sections;
