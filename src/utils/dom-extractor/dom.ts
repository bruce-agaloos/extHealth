
import { TwitterTheme } from "./types";

const getXTheme = (): TwitterTheme => {
    const bodyBackgroundColor = getComputedStyle(document.body).backgroundColor;
    if (bodyBackgroundColor === "rbg(21, 32, 43)") {
        return TwitterTheme.Dim;
    } else if (bodyBackgroundColor === "rgb(225, 225, 225)") {
        return TwitterTheme.White;
    } else {
        return TwitterTheme.Dark;
    }

}


export {
    getXTheme
}