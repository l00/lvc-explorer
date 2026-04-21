# LVC Explorer
Blockchain explorer and API for the Levcoin cryptocurrency.

Accessible at https://explorer.levcoin.net/

## API Endpoints

`GET /last_block_header` — Returns difficulty, height and reward of the last block

`GET /height` — Returns current height

`GET /tx/{hash}` — Returns information about a transaction

`GET /block/{hash}` — Returns information about a block, accepts hash or height as argument

## Usage

To host your own instance of the explorer:
- Download the daemon at https://mega.nz/file/AN11HIyA#fc9tvf7H1X88xtgk7hmHnF7GnW2Ri54G3hNzGgF6b6w
- Unzip and run this command in the `levcoin-portable` directory:
- `LD_LIBRARY_PATH=./lib-boost ./bin/levcoind --data-dir=./data --rpc-bind-ip=127.0.0.1 --rpc-bind-port=18081`
- (On your first launch it may take several hours to sync the blockchain)
- Start a uvicorn server for the API
- Example: `uvicorn main:app --reload' (By default uvicorn servers are on port 8000)
- Change `apiUrl` in the `config.js` file to your API URL
- Example: `const config = {
  apiUrl: "http://127.0.0.1:8000"
};`
- Start Nginx/Apache2/web server of your choice
