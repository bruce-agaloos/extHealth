const popupHTML = `
<div id="customPopup" style="position: fixed; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); display: none; justify-content: center; align-items: center; z-index: 1000;">
    <div id="popupContent" style="background-color: white; padding: 20px; border-radius: 5px; color: black;">
        <p></p>
        <button id="closePopupButton" style="color: black;">Close</button>
    </div>
</div>`;

export function togglePopup(show: boolean, articleContent: string = ""): void {
  let popup = document.getElementById("customPopup");
  if (!popup && show) {
    document.body.insertAdjacentHTML("beforeend", popupHTML);
    popup = document.getElementById("customPopup");
    document
      .getElementById("closePopupButton")
      ?.addEventListener("click", () => togglePopup(false));
  }
  if (popup) {
    const paragraph = popup.querySelector("p");
    if (paragraph) {
      paragraph.textContent = articleContent;
    }
    popup.style.display = show ? "flex" : "none";
  }
}
