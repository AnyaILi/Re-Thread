const modal = document.getElementById('product-modal');
if (modal) {
  const modalName = modal.querySelector('.modal-name');
  const modalPrice = modal.querySelector('.modal-price');
  const modalDesc = modal.querySelector('.modal-desc');
  const modalImage = modal.querySelector('.modal-image');
  const modalContact = modal.querySelector('.modal-contact');
  const modalPickupTime = modal.querySelector('.modal-pickup-time');
  const modalPickupLocation = modal.querySelector('.modal-pickup-location');
  const backdrop = modal.querySelector('.modal-backdrop');
  const closeBtn = modal.querySelector('.modal-close');

  const closeModal = () => {
    modal.classList.remove('active');
    modal.classList.add('hidden');
  };

  const openModal = (card) => {
    modalName.textContent = card.dataset.name || card.querySelector('.product-name')?.textContent || '';
    modalPrice.textContent = card.dataset.price || card.querySelector('.product-price')?.textContent || '';
    modalDesc.textContent = card.dataset.desc || 'More info coming soon.';
    if (modalContact) modalContact.textContent = card.dataset.contact || 'N/A';
    if (modalPickupTime) modalPickupTime.textContent = card.dataset.pickupTime || 'N/A';
    if (modalPickupLocation) modalPickupLocation.textContent = card.dataset.pickupLocation || 'N/A';
    if (modalImage) {
      const src = card.dataset.image || '';
      if (src) {
        modalImage.src = src;
        modalImage.alt = card.dataset.name || 'Product image';
        modalImage.style.display = 'block';
      } else {
        modalImage.style.display = 'none';
      }
    }
    modal.classList.remove('hidden');
    modal.classList.add('active');
  };

  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => openModal(card));
  });

  backdrop?.addEventListener('click', closeModal);
  closeBtn?.addEventListener('click', closeModal);
  window.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

function setupProductFilters(searchId, filterId) {
  const searchInput = document.getElementById(searchId);
  const filterSelect = document.getElementById(filterId);
  const cards = Array.from(document.querySelectorAll('.product-card'));
  if (!searchInput || !filterSelect || cards.length === 0) return;

  function priceBucket(priceStr) {
    const num = parseFloat((priceStr || '').replace(/[^0-9.]/g, ''));
    if (isNaN(num)) return '';
    if (num < 15) return 'under15';
    if (num <= 20) return '15to20';
    return 'over20';
  }

  function applyFilters() {
    const q = searchInput.value.trim().toLowerCase();
    const bucket = filterSelect.value;
    cards.forEach(card => {
      const name = (card.dataset.name || '').toLowerCase();
      const desc = (card.dataset.desc || '').toLowerCase();
      const priceStr = card.dataset.price || card.querySelector('.product-price')?.textContent || '';
      const cardBucket = priceBucket(priceStr);
      const matchText = !q || name.includes(q) || desc.includes(q);
      const matchPrice = !bucket || bucket === cardBucket;
      card.style.display = matchText && matchPrice ? '' : 'none';
    });
  }

  searchInput.addEventListener('input', applyFilters);
  filterSelect.addEventListener('change', applyFilters);
  applyFilters();
}

setupProductFilters('trinket-search', 'trinket-filter');
setupProductFilters('book-search', 'book-filter');
setupProductFilters('clothes-search', 'clothes-filter');

// Make header become more transparent after scrolling so content shows through
const header = document.querySelector('header');
if (header) {
  const toggleHeaderState = () => {
    if (window.scrollY > 10) {
      header.classList.add('header-transparent');
    } else {
      header.classList.remove('header-transparent');
    }
  };
  toggleHeaderState();
  window.addEventListener('scroll', toggleHeaderState, { passive: true });
}
