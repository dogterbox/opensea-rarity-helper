chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.tabs.executeScript(tabs[0].id, { file: "content_scripts.js" });
});

document.querySelector("#clipboard").addEventListener("click", () => {
  navigator.clipboard
    .writeText("0xEB9275bB2E859562E8314805CE0B39eAb8D0e313")
    .then(() => {
      document.querySelector("#clipboard").setAttribute("aria-label", "Copied");
      setTimeout(() => {
        document
          .querySelector("#clipboard")
          .setAttribute("aria-label", "Copy to clipboard");
      }, 2500);
    });
});
