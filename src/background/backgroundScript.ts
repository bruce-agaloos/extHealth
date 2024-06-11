// Listen for a connection from the DevTools page
chrome.runtime.onConnect.addListener((port) => {
  console.assert(port.name === "devtools-page");

  port.onMessage.addListener((message) => {
    // Handle messages sent from the DevTools page
    if (message.type === "greeting") {
      console.log("Received greeting from DevTools page:", message.payload);
      // Respond back to the DevTools page
      port.postMessage({ type: "response", payload: "Hello from background script!" });
    }
  });
});