const lang = localStorage.getItem('lang') || 'en';
const t = (key) => translations[lang][key];

const translations = {
    en: {
        search_title: "Search by transaction hash, block hash or height",
        search_placeholder: "Enter hash or height",
        latest_blocks: "Latest blocks",
        block: "Block",
        transaction: "Transaction",
        transactions: "Transactions",
        height: "Height",
        hash: "Hash",
        timestamp: "Timestamp",
        tx_count: "Tx count",
        difficulty: "Difficulty",
        reward: "Reward",
        fee: "Fee",
        size: "Size",
        amount: "Amount",
        block_hash: "Block hash",
        block_height: "Block height",
        status: "Status",
        mined_coins: "Mined coins",
        no_result: "No block or transaction found",
        api_docs: "API Docs"
    },
    bg: {
        search_title: "Търсене по хеш на блок/транзакция или височина",
        search_placeholder: "Въведете хеш или височина",
        latest_blocks: "Последни блокове",
        block: "Блок",
        transaction: "Транзакция",
        transactions: "Транзакции",
        height: "Височина",
        hash: "Хеш",
        timestamp: "Време",
        tx_count: "Брой Tx",
        difficulty: "Сложност",
        reward: "Награда",
        fee: "Такса",
        size: "Размер",
        amount: "Сума",
        block_hash: "Блок хеш",
        block_height: "Височина на блок",
        status: "Статус",
        mined_coins: "Изкопани LVC",
        no_result: "Не е намерен блок или транзакция",
        api_docs: "API Документация"
    }
};