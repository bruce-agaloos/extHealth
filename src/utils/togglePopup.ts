const popupHTML = `
<div id="customPopup" style="position: fixed; right: 0; top: 0; width: 300px; background-color: transparent; display: none; justify-content: center; align-items: center; z-index: 1000;">
    <div id="popupContent" style="background-color: white; padding: 20px; border-radius: 5px; color: black;">
        <h2 id="popupTitle" style="font-weight: bold; font-size: 18px; margin-bottom: 10px;" class="css-1jxf684 r-bcqeeo r-1ttztb7 r-qvutc0 r-poiln3"></h2>
        <p id="popupSummary" style="font-size: 14px; color: #333;" class="css-1jxf684 r-bcqeeo r-1ttztb7 r-qvutc0 r-poiln3"></p>
        <a id="popupUrl" href="" target="_blank" style="color: blue;"></a>
        <button id="closePopupButton" style="color: black; background-color: #007bff; color: #fff; border: none; border-radius: 5px; padding: 5px 10px; cursor: pointer;"></button>
    </div>
</div>
`;

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