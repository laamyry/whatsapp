# WhatsApp Number Exporter

WhatsApp Number Exporter is a Chrome extension that allows you to easily export WhatsApp numbers from WhatsApp Web.

## Features

- Extracts WhatsApp numbers from visible contacts on WhatsApp Web.
- Allows customization of scroll size and number of scrolls.
- Highlights the sidebar during the extraction process.
- Exports the extracted numbers to a downloadable file.

## Installation

1. Clone the repository or download the ZIP file.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" by toggling the switch in the top right corner.
4. Click on "Load unpacked" and select the directory containing the extension files.

## Usage

1. Open WhatsApp Web in a new tab.
2. Click on the extension icon to open the popup.
3. Enter the desired scroll size and number of scrolls.
4. Click the "Export Numbers" button.
5. The extension will scroll through the contacts and extract the numbers.
6. The extracted numbers will be sent to the background script for further processing.

## Files

- `background.js`: Contains the background script for the extension.
- `popup.js`: Contains the script for the popup interface and the function to be injected into WhatsApp Web.
- `popup.html`: Contains the HTML for the popup interface.
- `popup.css`: Contains the CSS for the popup interface.
- `manifest.json`: Contains the extension manifest file.
- `libs/xlsx.full.min.js`: Library for exporting data to Excel files.
- `icons/`: Directory containing the extension icons.
- `images/`: Directory containing the extension images.

## Permissions

The extension requires the following permissions:

- `activeTab`: To interact with the active tab.
- `scripting`: To inject scripts into the active tab.
- `downloads`: To download the extracted numbers as a file.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.