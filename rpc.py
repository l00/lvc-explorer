import requests

URL = "http://127.0.0.1:18081/json_rpc"

def get_blocks_list(height: int):
    json = {
        "jsonrpc": "2.0",
        "id": "0",
        "method": "f_blocks_list_json",
        "params": {"height": height}
    }
    r = requests.post(URL, json=json)
    r.raise_for_status()
    return r.json()

def get_tx_details(hash: str):
    json =  {
    "jsonrpc": "2.0",
    "id": "0",
    "method": "f_transaction_json",
    "params": {
        "hash": hash
    }
 }
    r = requests.post(URL, json=json)
    return r.json()

def get_block_details(hash: str):
    json =  {
    "jsonrpc": "2.0",
    "id": "0",
    "method": "f_block_json",
    "params": {
        "hash": hash
    }
 }
    r = requests.post(URL, json=json)
    return r.json()

def get_last_block_header():
    json =  {
    "jsonrpc": "2.0",
    "id": "0",
    "method": "getlastblockheader",
    "params": {
			"height_or_depth": -6
    }
 }
    r = requests.get(URL, json=json)
    return r.json()
