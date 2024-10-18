// Include SheetJS from local directory
importScripts('libs/xlsx.full.min.js');

// Listener for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.numbers) {
    const numbers = message.numbers;

    // Convert the numbers to an array of arrays (Excel format)
    const data = numbers.map(number => [number]);

    // Generate the Excel file using SheetJS
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Numbers");

    // Convert workbook to a binary string
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

    // Create a Blob from the binary string
    const blob = new Blob([s2ab(wbout)], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

    // Create a data URL from the Blob
    const reader = new FileReader();
    reader.onload = function (event) {
      const dataUrl = event.target.result;
      // Trigger the download using chrome.downloads API
      chrome.downloads.download({
        url: dataUrl,
        filename: 'WhatsAppNumbers.xlsx',
        saveAs: true
      });
    };
    reader.readAsDataURL(blob); // Convert Blob to Data URL
  }
});

// Function to convert string to array buffer
function s2ab(s) {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}
