from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
import rpc
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

limiter = Limiter(key_func=get_remote_address)

app = FastAPI()
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

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
@limiter.limit("30/minute;2/second")
async def get_last_block_header(request: Request) -> LastBlockHeaderResponse:
    raw = rpc.get_last_block_header()
    block = raw["result"]["block_header"]
    return LastBlockHeaderResponse(
        difficulty=block["difficulty"],
        height=block["height"],
        reward=block["reward"]
    )

@app.get("/height")
@limiter.limit("30/minute;2/second")
async def get_height(request: Request) -> HeightResponse:
    raw = rpc.get_last_block_header()
    return HeightResponse(height=raw["result"]["block_header"]["height"])

@app.get("/blocks")
@limiter.limit("30/minute;2/second")
async def get_blocks_list(height: int, request: Request) -> BlocksResponse:
    raw = rpc.get_blocks_list(height)
    return BlocksResponse(
        status=raw["result"]["status"],
        blocks=raw["result"]["blocks"]
    )

@app.get("/tx_details")
@limiter.limit("30/minute;2/second")
async def get_tx_details(hash: str, request: Request):
    response = rpc.get_tx_details(hash)
    return response

@app.get("/block_details")
@limiter.limit("30/minute;2/second")
async def get_block_details(hash: str, request: Request):
    response =  rpc.get_block_details(hash)
    return response
