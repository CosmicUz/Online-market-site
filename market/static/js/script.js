const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const hamburger = document.getElementById('hamburger');

function openSidebar() {
  sidebar.classList.add('open');
  overlay.classList.add('show');
}

function closeSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('show');
}

hamburger.addEventListener('click', () => {
  if (sidebar.classList.contains('open')) closeSidebar();
  else openSidebar();
});

overlay.addEventListener('click', closeSidebar);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeSidebar();
});

const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const categorySelect = document.getElementById('categorySelect');
const productsWrapper = document.getElementById('products');

function filterProducts() {
  const q = searchInput.value.toLowerCase().trim();
  const cat = categorySelect.value;

  const cards = productsWrapper.querySelectorAll('.card');

  cards.forEach(card => {
    const title = card.dataset.title;
    const productCat = card.dataset.category;

    const matchQ = !q || title.includes(q);
    const matchC = cat === 'all' || productCat === cat;

    if (matchQ && matchC) card.style.display = '';
    else card.style.display = 'none';
  });
}

searchBtn.addEventListener('click', filterProducts);
searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') filterProducts();
});
categorySelect.addEventListener('change', filterProducts);
