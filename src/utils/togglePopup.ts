const popupHTML = `
<div id="customPopup" style="position: fixed; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); display: none; justify-content: center; align-items: center; z-index: 1000;">
    <div id="popupContent" style="background-color: white; padding: 20px; border-radius: 5px; color: black;">
        <h2 id="popupTitle"></h2>
        <p id="popupDescription"></p>
        <p id="popupSummary"></p>
        <button id="closePopupButton" style="color: black;">Close</button>
    </div>
</div>`;

export function togglePopup(
  show: boolean,
  content: { title?: string; description?: string; summary?: string } = {}
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
    const descriptionElement = popup.querySelector("#popupDescription");
    const summaryElement = popup.querySelector("#popupSummary");

    if (titleElement) titleElement.textContent = content.title || "";
    if (descriptionElement)
      descriptionElement.textContent = content.description || "";
    if (summaryElement) {
      const paragraphs = content.summary ? content.summary.split(/\n\n/) : [];
      const formattedParagraphs = paragraphs
        .map((paragraph) => `<p style="text-indent: 20px;">${paragraph}</p>`)
        .join("");
      summaryElement.innerHTML = formattedParagraphs;
    }

    popup.style.display = show ? "flex" : "none";
  }
}
