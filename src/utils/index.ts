import { startTimer } from "./schedule";

import {
    getCurrentTab,
    sendExtensionStateToContentScript,
    initialScroll,
} from "./general";
import { setExtensionState, getExtensionState } from "./storage";

export {
    sendExtensionStateToContentScript,
    initialScroll,
    getExtensionState,
    setExtensionState,
    getCurrentTab,
    startTimer,
};

