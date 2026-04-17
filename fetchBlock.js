async function fetchBlock() {
    try {
        const heightRes = await fetch(`${config.apiUrl}/height`);
        const heightData = await heightRes.json();
        const height = heightData.height;
        
        const response = await fetch(`${config.apiUrl}/blocks?height=${height}`);

    const data = await response.json();

    let html = "<table id='blocks-table' border='1' cellpadding='6'>";
    html += `<tr><th>${t('height')}</th><th>${t('hash')}</th><th>${t('timestamp')}</th><th>${t('tx_count')}</th></tr>`;

    for (let i = 0; i < 10; i++) {
    const block = data.blocks[i];
    const date = new Date(block.timestamp * 1000);
    const time = date.toLocaleTimeString("en-GB");
    const day = date.toLocaleDateString("en-GB");
    
    html += `<tr>
        <td>${block.height}</td>
        <td>${block.hash}</td>
        <td>${time} | ${day}</td>
        <td>${block.tx_count}</td>
    </tr>`;
    }

    html += "</table>";
    document.getElementById("last-ten-blocks").innerHTML = html;

    } catch (error) {
        console.error("Error:", error);
        document.getElementById("last-ten-blocks").textContent = "Error: " + error.message;
    }
}

fetchBlock();
setInterval(fetchBlock, 30000);