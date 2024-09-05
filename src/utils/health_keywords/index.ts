import cancers from "./keyword_module/cancer";
import covid from "./keyword_module/covid";
import generalHealthKeywords from "./general_health_keywords";
import polio from "./keyword_module/polio";



const allKeywords = [
...cancers,
...covid,
...polio,
...generalHealthKeywords


];

export default allKeywords;