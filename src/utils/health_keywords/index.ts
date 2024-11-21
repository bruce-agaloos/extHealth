import cancers from "./keyword_module/cancer";
import covid from "./keyword_module/covid";
import generalHealthKeywords from "./general_health_keywords";
import polio from "./keyword_module/polio";
import mental_health from "./mental_health_keyword";
import extraWords from "./keyword_module/extraWords";


const allKeywords = [
...cancers,
...covid,
...polio,
...mental_health,
...generalHealthKeywords,
...extraWords
];

export default allKeywords;