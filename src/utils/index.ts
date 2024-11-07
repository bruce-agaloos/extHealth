import {
    getCurrentTab,
    sendMessageToContentScript,
    initialScroll,
} from "./general";
import { setHealthTipState, getHealthTipState, setCategoryState, getCategoryState, setHealthTipsEnabled, getXAutoDetectState } from "./storage";
import { getHealthTips } from "./api_health_tips";

export {
    sendMessageToContentScript,
    initialScroll,
    getHealthTipState,
    setHealthTipState,
    getCurrentTab,
    getHealthTips,
    getCategoryState,
    setCategoryState,
    getXAutoDetectState,
    setHealthTipsEnabled
};

