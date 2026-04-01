from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import rpc

app = FastAPI()

class Block(BaseModel):
    height: int
    hash: str
    timestamp: int
    cumul_size: int
    tx_count: int

class BlocksResponse(BaseModel):
    status: str
    blocks: list[Block]

class LastBlockHeaderResponse(BaseModel):
    difficulty: int
    height: int
    reward: int

class HeightResponse(BaseModel):
    height: int

@app.get("/last_block_header")
async def get_last_block_header() -> LastBlockHeaderResponse:
    raw = rpc.get_last_block_header()
    block = raw["result"]["block_header"]
    return LastBlockHeaderResponse(
        difficulty=block["difficulty"],
        height=block["height"],
        reward=block["reward"]
    )

@app.get("/height")
async def get_height() -> HeightResponse:
    raw = rpc.get_last_block_header()
    return HeightResponse(height=raw["result"]["block_header"]["height"])

@app.get("/blocks") 
async def get_blocks_list(height: int) -> BlocksResponse:
    raw = rpc.get_blocks_list(height)
    return BlocksResponse(
        status=raw["result"]["status"],
        blocks=raw["result"]["blocks"]
    )

@app.get("/tx_details")
async def get_tx_details(hash: str):
    response = rpc.get_tx_details(hash)
    return response

@app.get("/block_details")
async def get_block_details(hash: str):
    response =  rpc.get_block_details(hash)
    return response
