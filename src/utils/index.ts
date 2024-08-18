import { startTimer } from "./timer";

import {
    getCurrentTab,
    sendMessageToContentScript,
    initialScroll,
} from "./general";
import { setHealthTipState, getHealthTipState, setCategoryState, getCategoryState } from "./storage";
import { getHealthTips } from "./api_health_tips";

export {
    sendMessageToContentScript,
    initialScroll,
    getHealthTipState,
    setHealthTipState,
    getCurrentTab,
    startTimer,
    getHealthTips,
    getCategoryState,
    setCategoryState
};

