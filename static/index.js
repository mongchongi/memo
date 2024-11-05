const memoForm = document.querySelector('.memo-form');
const memoInput = document.querySelector('#memo-input');
const memoList = document.querySelector('.memo-list');

// delete
async function deleteMemo(e) {
  const id = e.target.dataset.id;

  const res = await fetch(`/memos/${id}`, {
    method: 'DELETE',
  });

  readMemo();
}

// update
async function editMemo(e) {
  const id = e.target.dataset.id;
  const editVal = prompt('수정할 내용 입력');

  const res = await fetch(`/memos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      content: editVal,
    }),
  });

  readMemo();
}

function displayMemo(memo) {
  const li = document.createElement('li');
  li.innerText = `[${memo.id}] ${memo.content}`;

  const editBtn = document.createElement('button');
  editBtn.innerText = '수정';
  editBtn.dataset.id = memo.id;
  editBtn.addEventListener('click', editMemo);

  const deleteBtn = document.createElement('button');
  deleteBtn.innerText = '삭제';
  deleteBtn.dataset.id = memo.id;
  deleteBtn.addEventListener('click', deleteMemo);

  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
  memoList.appendChild(li);
}

// read
async function readMemo() {
  const res = await fetch('/memos');
  const data = await res.json();

  memoList.innerHTML = '';
  memoInput.value = '';
  memoInput.focus();

  data.forEach(displayMemo);
}

// create
async function createMemo(val) {
  const res = await fetch('/memos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: new Date().getTime(),
      content: val,
    }),
  });

  readMemo();
}

function handleSubmitMemo(e) {
  e.preventDefault();

  createMemo(memoInput.value);
  memoInput.value = '';
}

readMemo();
memoForm.addEventListener('submit', handleSubmitMemo);
