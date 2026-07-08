async function search() {
    const value = document.getElementById("searchInput").value.trim();
    if (!value) return;

    try {
    const blockRes = await fetch(`${config.apiUrl}/block_details?hash=${value}`);
    const blockData = await blockRes.json();

    if (blockData.error) {
        const txRes = await fetch(`${config.apiUrl}/tx_details?hash=${value}`);
        const txData = await txRes.json();
        if (txData.error) {
            document.getElementById("search-result").textContent = t('no_result');
        } else {
            let html = `<h3>${t('transaction')}</h3><br>
            ${t('hash')}: <strong>${txData.result.txDetails.hash} ${copyBtn(txData.result.txDetails.hash)}</strong><br>
            ${t('amount')}: <strong>${(txData.result.txDetails.amount_out / 1e12).toFixed(8)} LVC</strong><br>`;

            const txDate = new Date(txData.result.block.timestamp * 1000);
            const txTime = txDate.toLocaleTimeString("en-GB");
            const txDay = txDate.toLocaleDateString("en-GB");

            html += `${t('timestamp')}: <strong>${txTime} | ${txDay}<br></strong>
            ${t('block_hash')}: <strong>${txData.result.block.hash} ${copyBtn(txData.result.block.hash)}</strong> | ${t('block_height')}: <strong>${txData.result.block.height}</strong><br>
            ${t('status')}: <strong>${txData.result.status}</strong><br>`;

            document.getElementById("search-result").innerHTML = html;
        }
    } else {
        let html = `<h3>${t('block')}</h3><br>
        ${t('hash')}: <strong>${blockData.result.block.hash} ${copyBtn(blockData.result.block.hash)}</strong><br>
        ${t('height')}: <strong>${blockData.result.block.height}</strong><br>
        ${t('difficulty')}: <strong>${blockData.result.block.difficulty}</strong><br>`

        const blockDate = new Date(blockData.result.block.timestamp * 1000);
        const blockTime = blockDate.toLocaleTimeString("en-GB");
        const blockDay = blockDate.toLocaleDateString("en-GB");

        html += `${t('timestamp')}: <strong>${blockTime} | ${blockDay}</strong><br>
        ${t('size')}: <strong>${blockData.result.block.blockSize} B</strong><br>
        ${t('reward')}: <strong>${(blockData.result.block.reward / 1e12).toFixed(8)} LVC</strong><br>
        ${t('fee')}: <strong>${(blockData.result.block.totalFeeAmount / 1e12).toFixed(8)} LVC</strong><br>
        <br>
        ${t('transactions')}<br>`;
        for (const tx of blockData.result.block.transactions) {
            html += `${t('hash')}: <strong>${tx.hash}</strong> ${copyBtn(tx.hash)} | ${t('amount')}: <strong>${(tx.amount_out / 1e12).toFixed(8)} LVC</strong> | ${t('fee')}: <strong>${(tx.fee / 1e12).toFixed(8)} LVC</strong> | ${t('size')}: <strong>${tx.size} B</strong><br>`;
        }

        document.getElementById("search-result").innerHTML = html;
    }

    } catch (error) {
    document.getElementById("search-result").textContent = "Error: " + error.message;
    }
}