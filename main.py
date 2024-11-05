from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

class Memo(BaseModel):
  id: int
  content: str

memos = []

app = FastAPI()

# create
@app.post('/memos')
def create_memo(memo: Memo):
  memos.append(memo)
  return '메모 추가 성공'

# read
@app.get('/memos')
def read_memo():
  return memos

# update
@app.put('/memos/{memo_id}')
def update_memo(req_memo: Memo):
  for memo in memos:
    if memo.id == req_memo.id:
      memo.content = req_memo.content
      return '메모 수정 성공'
  return '메모 수정 실패'

# delete
@app.delete('/memos/{memo_id}')
def delete_memo(memo_id):
  for index, memo in enumerate(memos):
    if memo.id == int(memo_id):
      memos.pop(index)
      return '메모 삭제 성공'
  return '메모 삭제 실패'

app.mount("/", StaticFiles(directory="static", html=True), name="static")