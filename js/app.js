// Minimal app logic: fake auth, add/read books with IndexedDB wrapper (db.js), camera preview, notification demo
const $ = (sel) => document.querySelector(sel);
const loginBtn = $('#login-btn');
const appSection = $('#app');
const authSection = $('#auth');
const booksList = $('#books-list');
const addForm = $('#add-form');
const preview = $('#preview');

loginBtn.addEventListener('click', () => {
  // demo 'login'
  authSection.hidden = true;
  appSection.hidden = false;
  loadBooks();
});

addForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = $('#book-title').value.trim();
  const author = $('#book-author').value.trim();
  const fileInput = $('#camera');
  let cover = null;
  if (fileInput.files && fileInput.files[0]) {
    cover = await fileToDataURL(fileInput.files[0]);
    preview.src = cover;
  }
  if (!title) return alert('Provide a title');
  const book = { title, author, cover, createdAt: Date.now() };
  await dbAddBook(book);
  addForm.reset();
  loadBooks();
});

function fileToDataURL(file){
  return new Promise((res, rej) => {
    const fr = new FileReader();
    fr.onload = () => res(fr.result);
    fr.onerror = rej;
    fr.readAsDataURL(file);
  });
}

async function loadBooks(){
  const books = await dbGetAllBooks();
  booksList.innerHTML = '';
  books.forEach(b => {
    const li = document.createElement('li');
    li.className = 'book-card';
    li.innerHTML = `<strong>${b.title}</strong><div>${b.author || ''}</div>`;
    booksList.appendChild(li);
  });
}

// Notification demo
$('#notify-btn').addEventListener('click', async () => {
  if (!('Notification' in window)) return alert('Notifications not supported');
  const perm = await Notification.requestPermission();
  if (perm !== 'granted') return alert('Permission denied');
  const reg = await navigator.serviceWorker.getRegistration();
  if (reg) {
    reg.showNotification('Bookly Reminder', { body: 'You have books to read!', icon: '/icons/icon-192.png' });
  } else {
    new Notification('Bookly Reminder', { body: 'You have books to read!' });
  }
});
