async function fetchInfo() {
    try {
        const blockHeaderResponse = await fetch(`${config.apiUrl}/last_block_header`);
        const blockHeaderData = await blockHeaderResponse.json();

        const lastBlockRes = await fetch(`${config.apiUrl}/block_details?hash=${blockHeaderData.height}`);
        const lastBlockInfo = await lastBlockRes.json();

        let html = `<div id='fetch-stats'> <p>${t('difficulty')}: <strong>${blockHeaderData.difficulty}</strong> | ${t('height')}: <strong>${blockHeaderData.height}</strong> | ${t('reward')}: <strong>${(blockHeaderData.reward / 1e12).toFixed(8)} LVC</strong> | ${t('mined_coins')}: <strong>${(lastBlockInfo.result.block.alreadyGeneratedCoins / 1e12).toFixed(0)}</strong> | ${t('transactions')}: <strong>${lastBlockInfo.result.block.alreadyGeneratedTransactions}</strong></p> </div>`;

        document.getElementById("info").innerHTML = html;
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("info").textContent = "Error: " + error.message;
    }
}

fetchInfo();
setInterval(fetchInfo, 10000);