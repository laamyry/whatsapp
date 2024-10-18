document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('export-btn').addEventListener('click', () => {
        const scrollSize = parseInt(document.getElementById('scroll-size').value, 10);
        const scrollCount = parseInt(document.getElementById('scroll-count').value, 10);

        // Inject the function into the active tab
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: scrollAndExtractNumbers,
                args: [scrollSize, scrollCount]  // Pass user inputs to the function
            });
        });
    });
});

// This function will be injected into the WhatsApp Web page
function scrollAndExtractNumbers(scrollSize, scrollCount) {
    // Function to highlight the sidebar
    function highlightSidebar() {
        const sidebar = document.querySelector('#pane-side');
        if (sidebar) {
            sidebar.style.boxShadow = '0px 0px 10px 3px #00c456';  // Bright green shadow
        }
    }

    // Function to remove the highlight from the sidebar
    function removeHighlightSidebar() {
        const sidebar = document.querySelector('#pane-side');
        if (sidebar) {
            sidebar.style.boxShadow = '';  // Remove the shadow
        }
    }

    // Function to extract numbers from visible WhatsApp Web contacts
    function extractNumbers() {
        const numbers = [];
        const contacts = document.querySelectorAll('span[title]');
        
        contacts.forEach(contact => {
            const number = contact.getAttribute('title');
            if (number.startsWith('+212')) {  // You can adjust the number format check as needed
                numbers.push(number);
            }
        });
        
        return numbers;
    }

    // Function to wait until the sidebar element is available
    function waitForElement(selector) {
        return new Promise((resolve) => {
            const element = document.querySelector(selector);
            if (element) {
                resolve(element);
            } else {
                const observer = new MutationObserver((mutations, me) => {
                    const element = document.querySelector(selector);
                    if (element) {
                        resolve(element);
                        me.disconnect();  // Stop observing once the element is found
                    }
                });
                observer.observe(document, { childList: true, subtree: true });
            }
        });
    }

    // Scroll and extract numbers
    async function executeScrollAndExtract(scrollSize, scrollCount) {
        let numbers = [];
        let currentScrolls = 0;

        const scrollable = await waitForElement('#pane-side');
        if (!scrollable) {
            console.error('Sidebar not found');
            return;
        }

        // Highlight the sidebar
        highlightSidebar();

        while (currentScrolls < scrollCount) {
            const newNumbers = extractNumbers();
            numbers = [...new Set([...numbers, ...newNumbers])];  // Combine and remove duplicates

            // Scroll the sidebar
            scrollable.scrollBy(0, scrollSize);

            // Wait for the content to load
            await new Promise(resolve => setTimeout(resolve, 4000));  // Adjust the delay if needed

            currentScrolls += 1;
        }

        // Remove the highlight after scrolling is complete
        removeHighlightSidebar();

        // Send the extracted numbers to the background script
        chrome.runtime.sendMessage({ numbers });
    }

    // Start the scrolling and extraction process
    executeScrollAndExtract(scrollSize, scrollCount);
}
