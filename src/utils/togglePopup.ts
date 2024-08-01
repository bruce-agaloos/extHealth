import "./popupHTML.css";
const popupHTML = `
<div id="customPopup" class="customPopup">
    <div id="popupContent" class="popupContent">
        <div class="popupHeader">
          <h3>Health Reminder</h3>
          <label>by extHeatlh</label>
        </div>
        
        <h2 id="popupTitle" class="popupTitle"></h2>
      
        <p id="popupSummary" class="popupSummary"></p>
        <div class="moin">
          <a id="popupUrl" href="" target="_blank" class="popupUrl"></a>
          <label>From www.nhs.uk</label>
        </div> 
    </div>
</div>
`;

//<button id="closePopupButton" class="closePopupButton" aria-label="Close">×</button>
export function togglePopup(
  show: boolean,
  content: { headline?: string; summary?: string; url?: string } = {}
): void {
  let popup = document.getElementById("customPopup");
  if (!popup && show) {
    document.body.insertAdjacentHTML("beforeend", popupHTML);
    popup = document.getElementById("customPopup");
    document
      .getElementById("closePopupButton")
      ?.addEventListener("click", () => togglePopup(false));
  }
  if (popup) {
    const titleElement = popup.querySelector("#popupTitle");
    const summaryElement = popup.querySelector("#popupSummary");
    const urlElement = popup.querySelector("#popupUrl") as HTMLAnchorElement;

    if (titleElement) titleElement.textContent = content.headline || "";
    if (summaryElement) {
      const paragraphs = content.summary ? content.summary.split(/\n\n/) : [];
      const formattedParagraphs = paragraphs
        .map((paragraph) => `<p style="text-indent: 20px;">${paragraph}</p>`)
        .join("");
      summaryElement.innerHTML = formattedParagraphs;
    }
    if (urlElement) {
      urlElement.href = content.url || "#";
      urlElement.textContent = content.url ? "More Info" : ""; // Hide or show the link text based on if a URL is provided
    }

    popup.style.display = show ? "flex" : "none";
  }
}
