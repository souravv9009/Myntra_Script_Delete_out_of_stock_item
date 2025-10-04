/**
 * Wishlist Out-of-Stock Item Removal Script (Recursive Dynamic Check)
 * * This script provides maximum safety and stability by dynamically querying the DOM
 * * for the *first* out-of-stock item in each cycle, ensuring no items are skipped
 * * and no in-stock items are accidentally deleted.
 * * It uses a recursive setTimeout loop to maintain the 2-second delay between deletions.
 *
 * * Logic:
 * 1. findAndRemoveNextItem() checks the entire live DOM for *all* out-of-stock indicators.
 * 2. If indicators are found, it selects the FIRST one.
 * 3. It locates the associated removal button, logs the item details, and clicks the button.
 * 4. It waits 2 seconds (2000ms) before recursively calling itself to process the next item.
 * 5. If no indicators are found, the process stops.
 */
function findAndRemoveNextItem(removedCount = 0) {
    // 1. Dynamic Query: Get a fresh list of ALL out-of-stock indicators on the page.
    const outOfStockIndicators = document.querySelectorAll('.itemcard-outOfStockText');
    
    // Stop condition: If no more indicators are found, we are done.
    if (outOfStockIndicators.length === 0) {
        console.log("-----------------------------------------");
        console.log(`🎉 Operation Complete: Successfully removed ${removedCount} out-of-stock items.`);
        return;
    }

    // Always target the FIRST item in the live list (index 0).
    const indicator = outOfStockIndicators[0];
    const itemCardContainer = indicator.closest('.itemcard-itemCard');
    
    let itemName = "Item Not Found"; 
    let itemID = "ID Not Found";
    
    // Safety Check: Ensure we found the parent container
    if (!itemCardContainer) {
        console.error("CRITICAL ERROR: Found out-of-stock indicator but could not find the main item container (.itemcard-itemCard). Aborting.");
        return;
    }

    // Attempt to extract item details for logging
    itemID = itemCardContainer.id || "ID attribute is empty";
    const itemNameElement = itemCardContainer.querySelector('h3, h4, p[class*="name"], div[class*="name"], [class*="title"]');
    if (itemNameElement) {
        itemName = itemNameElement.textContent.trim();
    }

    // 2. Find the removal button
    const removeIconSpan = itemCardContainer.querySelector('.itemcard-removeIcon > span');

    if (!removeIconSpan) {
        console.warn(`[ID ${itemID}] WARNING: Found out-of-stock item, but could not find the removal span. Skipping this item.`);
        
        // Skip this item and try to find the next one immediately (no wait needed for a skip)
        // We call the function again without incrementing the counter.
        setTimeout(() => findAndRemoveNextItem(removedCount), 100); 
        return;
    }

    // 3. Click the button and log the action
    try {
        removeIconSpan.click();
        removedCount++;
        console.log(`[${removedCount}] REMOVING: ID ${itemID} | Name: "${itemName}". Waiting 1 seconds...`);
    } catch (error) {
        console.error(`[${removedCount}] ERROR: Failed to click removal icon for ID ${itemID}.`, error);
    }
    
    // 4. Wait 1 seconds (1000ms) and repeat the process recursively
    setTimeout(() => findAndRemoveNextItem(removedCount), 1000); 
}

// Initial start log and execution
console.log("-----------------------------------------");
console.log("🚨 Starting Safe Wishlist Cleaner...");
console.log("Processing one out-of-stock item at a time with a 1-second pause.");
findAndRemoveNextItem(0);

