# LVC Explorer
Blockchain explorer and API for the Levcoin cryptocurrency.

## API Endpoints

`GET /last_block_header` — Returns difficulty, height and reward of the last block

`GET /height` — Returns current height

`GET /tx/{hash}` — Returns information about a transaction

`GET /block/{hash}` — Returns information about a block, accepts hash or height as argument
