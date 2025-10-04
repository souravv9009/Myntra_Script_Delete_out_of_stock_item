# 🛒 E-commerce Wishlist Out-of-Stock Cleaner (Console Script)

This is a robust JavaScript snippet designed to be executed directly in your browser's console to safely and systematically remove "Out of Stock" items from a dynamic e-commerce wishlist page.

---

## ✨ Features

* **100% Safety Guarantee:** Employs a **dynamic, recursive checking** mechanism to ensure **in-stock items are never deleted**. It only targets items actively marked as "Out of Stock."

* **Stable Deletion:** Solves the common "skipping" issue (where deleting one item causes the next to shift) by **re-querying the page** for the next out-of-stock item after every successful removal.

* **Reliable Timing:** Includes a **2-second (2000ms) delay** between each removal click, giving the website time to process the DOM update without errors or throttling.

* **Detailed Logging:** Logs the **Item ID** and **Name** of every item being removed directly to the console for full transparency.

---

## 🛠️ How to Use

This script requires **no installation** and can be run in any modern web browser (Chrome, Firefox, Edge, Safari).

### Step-by-Step Instructions

1.  **Go to Your Wishlist:** Navigate to the specific page on the e-commerce website that displays your full wishlist.

2.  **Open the Developer Console:**
    * **Windows/Linux:** Press `F12` or `Ctrl + Shift + J`.
    * **macOS:** Press `Cmd + Option + J`.

3.  **Copy the Script:** Copy the entire JavaScript code block (found in `wishlist_cleaner.js`) into your clipboard.

4.  **Paste and Run:**
    * Click the **Console** tab in the Developer Tools.
    * Paste the script into the console prompt.
    * Press **Enter**.

5.  **Monitor the Process:** The script will start logging its actions. **Do not interact with the page** while the script is running, as any click or scroll might disrupt the deletion queue.

---

## ⚠️ Important Note on Page Reloads

This script is highly resilient to visual shifting, but it is not resilient to a **full page reload**. If the website forces a full page refresh after a deletion, the script will stop.

If this happens:

1.  Wait for the page to finish reloading.

2.  Repeat **Step 4** (Paste and Run) to let the script clean up the remaining out-of-stock items.

---

## 💻 Technical Details (How it Works)

The script relies on the following structure found on the website to function correctly:

| **Target Element** | **Selector Used** | **Purpose** | 
| :--- | :--- | :--- | 
| **Out-of-Stock Indicator** | `.itemcard-outOfStockText` | Finds items that need to be deleted. | 
| **Main Item Container** | `.itemcard-itemCard` | The parent container that holds the ID and the removal button. | 
| **Removal Button** | `.itemcard-removeIcon > span` | The clickable element used to delete the item. | 

The `findAndRemoveNextItem` function recursively calls itself after a 2-second delay, ensuring it always operates on the most current view of the page, preventing index errors and guaranteeing safety.
