const CONFIG = window.SABRINE_CONFIG || {};
const STORAGE_KEY = 'sabrine_cart_v2';
const CUSTOMER_KEY = 'sabrine_customer_v1';

function prepareProducts(source) {
  if (!Array.isArray(source)) return [];

  const usedIds = new Set();

  return source.map((product, index) => {
    const originalId = String(product?.id || `produto-${index + 1}`).trim();
    let uniqueId = originalId || `produto-${index + 1}`;
    let suffix = 2;

    while (usedIds.has(uniqueId)) {
      uniqueId = `${originalId || `produto-${index + 1}`}-${suffix++}`;
    }

    if (uniqueId !== originalId) {
      console.error(`ID de produto duplicado corrigido em tempo de execução: "${originalId}" -> "${uniqueId}".`);
    }

    usedIds.add(uniqueId);
    return { ...product, id: uniqueId };
  });
}

const products = prepareProducts(window.SABRINE_PRODUCTS || []);

let activeCategory = 'Todos';
let cart = loadJson(STORAGE_KEY, {});

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function loadJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
}

function saveCart() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  renderCartEverywhere();
}

function formatMoney(value) {
  return new Intl.NumberFormat(CONFIG.locale || 'pt-BR', {
    style: 'currency',
    currency: CONFIG.currency || 'BRL'
  }).format(value);
}

function cartEntries() {
  return Object.entries(cart)
    .map(([id, qty]) => ({ product: products.find(p => p.id === id), qty }))
    .filter(item => item.product && item.qty > 0);
}

function cartCount() {
  return cartEntries().reduce((sum, item) => sum + item.qty, 0);
}

function cartTotal() {
  return cartEntries().reduce((sum, item) => sum + item.product.price * item.qty, 0);
}

function setQty(id, qty) {
  const safeQty = Math.max(0, Math.min(99, Number(qty) || 0));
  if (safeQty === 0) delete cart[id];
  else cart[id] = safeQty;
  saveCart();
}

function addToCart(id) {
  setQty(id, (cart[id] || 0) + 1);
  showToast('Produto adicionado ao carrinho.');
}

function renderFilters() {
  const categories = ['Todos', ...new Set(products.map(p => p.category))];
  $('#categoryFilters').innerHTML = categories.map(category => `
    <button class="filter-chip ${category === activeCategory ? 'active' : ''}" data-category="${category}" type="button">${category}</button>
  `).join('');

  $$('.filter-chip').forEach(button => {
    button.addEventListener('click', () => {
      activeCategory = button.dataset.category;
      renderFilters();
      renderProducts();
    });
  });
}

function renderProducts() {
  const list = activeCategory === 'Todos' ? products : products.filter(p => p.category === activeCategory);
  $('#productGrid').innerHTML = list.map(product => {
    const qty = cart[product.id] || 0;
    return `
      <article class="product-card">
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
          <small>${product.category}</small>
        </div>
        <div class="product-content">
          <div class="product-meta">
            <h3>${product.name}</h3>
            <strong>${formatMoney(product.price)}</strong>
          </div>
          <p>${product.description}</p>
          ${qty > 0 ? `
            <div class="qty-control product-qty">
              <button type="button" data-dec="${product.id}" aria-label="Diminuir">−</button>
              <span>${qty}</span>
              <button type="button" data-inc="${product.id}" aria-label="Aumentar">+</button>
            </div>
          ` : `<button class="btn btn-card" type="button" data-add="${product.id}">+ Adicionar</button>`}
        </div>
      </article>
    `;
  }).join('');

  $$('[data-add]').forEach(btn => btn.addEventListener('click', () => addToCart(btn.dataset.add)));
  $$('[data-inc]').forEach(btn => btn.addEventListener('click', () => setQty(btn.dataset.inc, (cart[btn.dataset.inc] || 0) + 1)));
  $$('[data-dec]').forEach(btn => btn.addEventListener('click', () => setQty(btn.dataset.dec, (cart[btn.dataset.dec] || 0) - 1)));
}

function cartItemTemplate({ product, qty }) {
  return `
    <div class="cart-item">
      <div class="mini-product"><img src="${product.image}" alt="${product.name}" loading="lazy"></div>
      <div class="cart-item-info">
        <strong>${product.name}</strong>
        <span>${formatMoney(product.price)} cada</span>
        <div class="qty-control small">
          <button type="button" data-cart-dec="${product.id}">−</button>
          <span>${qty}</span>
          <button type="button" data-cart-inc="${product.id}">+</button>
        </div>
      </div>
      <strong>${formatMoney(product.price * qty)}</strong>
    </div>
  `;
}

function renderCartEverywhere() {
  const entries = cartEntries();
  const count = cartCount();
  const total = cartTotal();

  $$('[data-cart-count]').forEach(el => el.textContent = count);
  $$('[data-cart-total]').forEach(el => el.textContent = formatMoney(total));

  ['desktopCartItems', 'mobileCartItems'].forEach(id => {
    const el = document.getElementById(id);
    el.innerHTML = entries.map(cartItemTemplate).join('');
  });

  const hasItems = entries.length > 0;
  $('#desktopCartEmpty').style.display = hasItems ? 'none' : 'flex';
  $('#mobileCartEmpty').style.display = hasItems ? 'none' : 'flex';
  $('#desktopCartFooter').style.display = hasItems ? 'block' : 'none';
  $('#mobileCartFooter').style.display = hasItems ? 'block' : 'none';
  $('#floatingCartButton').classList.toggle('visible', count > 0);

  document.querySelectorAll('[data-cart-inc]').forEach(btn => btn.onclick = () => setQty(btn.dataset.cartInc, (cart[btn.dataset.cartInc] || 0) + 1));
  document.querySelectorAll('[data-cart-dec]').forEach(btn => btn.onclick = () => setQty(btn.dataset.cartDec, (cart[btn.dataset.cartDec] || 0) - 1));

  renderCheckoutSummary();
  renderProducts();
}

function openCart() {
  $('#cartDrawer').classList.add('open');
  $('#drawerBackdrop').classList.add('show');
  $('#cartDrawer').setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
}

function closeCart() {
  $('#cartDrawer').classList.remove('open');
  $('#drawerBackdrop').classList.remove('show');
  $('#cartDrawer').setAttribute('aria-hidden', 'true');
  document.body.classList.remove('no-scroll');
}

function openCheckout() {
  if (!cartCount()) return showToast('Adicione pelo menos um produto.');
  closeCart();
  restoreCustomerData();
  $('#checkoutModal').classList.add('open');
  $('#checkoutBackdrop').classList.add('show');
  $('#checkoutModal').setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
}

function closeCheckout() {
  $('#checkoutModal').classList.remove('open');
  $('#checkoutBackdrop').classList.remove('show');
  $('#checkoutModal').setAttribute('aria-hidden', 'true');
  document.body.classList.remove('no-scroll');
}

function renderCheckoutSummary() {
  const el = $('#checkoutSummaryItems');
  if (!el) return;
  el.innerHTML = cartEntries().map(({ product, qty }) => `
    <div class="summary-item">
      <span>${qty}x ${product.name}</span>
      <strong>${formatMoney(product.price * qty)}</strong>
    </div>
  `).join('') || '<p class="muted">Nenhum item no carrinho.</p>';
}

function restoreCustomerData() {
  const saved = loadJson(CUSTOMER_KEY, {});
  const form = $('#checkoutForm');
  Object.entries(saved).forEach(([key, value]) => {
    if (form.elements[key]) form.elements[key].value = value;
  });
}

function normalizePhone(value) {
  return value.replace(/\D/g, '');
}

function buildWhatsappMessage(data) {
  const items = cartEntries()
    .map(({ product, qty }) => `${qty}x ${product.name} - ${formatMoney(product.price * qty)}`)
    .join('\n');
  const complement = data.complement ? `, ${data.complement}` : '';

  return `Olá, ${CONFIG.sellerName || 'Sabrine'}!\n\nGostaria de fazer o seguinte pedido:\n\nPRODUTOS\n${items}\n\nTOTAL: ${formatMoney(cartTotal())}\n\nCLIENTE: ${data.name}\nWHATSAPP: ${data.phone}\n\nENDEREÇO DE ENTREGA\n${data.street}, ${data.number}${complement}\n${data.neighborhood}\n${data.city} - ${data.state.toUpperCase()}\nCEP: ${data.cep}\n\nAguardo a confirmação do pedido.`;
}

function handleCheckout(event) {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;

  const data = Object.fromEntries(new FormData(form).entries());
  localStorage.setItem(CUSTOMER_KEY, JSON.stringify(data));

  const sellerPhone = normalizePhone(CONFIG.sellerWhatsapp || '');
  if (sellerPhone.length < 10 || sellerPhone === '5521999999999') {
    showToast('Configure o número da Sabrine no arquivo config.js antes de publicar.');
    return;
  }

  const message = encodeURIComponent(buildWhatsappMessage(data));
  const url = `https://wa.me/${sellerPhone}?text=${message}`;
  window.open(url, '_blank', 'noopener');
  openThankYou();
}

function openThankYou() {
  $('#thankYouModal').classList.add('open');
  $('#thankYouBackdrop').classList.add('show');
  $('#thankYouModal').setAttribute('aria-hidden', 'false');
}

function finishOrder() {
  cart = {};
  localStorage.removeItem(STORAGE_KEY);
  saveCart();
  closeCheckout();
  $('#thankYouModal').classList.remove('open');
  $('#thankYouBackdrop').classList.remove('show');
  $('#thankYouModal').setAttribute('aria-hidden', 'true');
  document.body.classList.remove('no-scroll');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (history.replaceState) history.replaceState(null, '', '#inicio');
}

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2600);
}

const SERVICE_WHATSAPP = '5511940271034';
const SERVICE_MESSAGE = 'Olá, Patrick! Vi a página da Sabrine e gostaria de saber como posso ter uma página, site ou sistema para o meu negócio.';

function openServiceModal() {
  $('#serviceModal').classList.add('open');
  $('#serviceBackdrop').classList.add('show');
  $('#serviceModal').setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
}

function closeServiceModal() {
  $('#serviceModal').classList.remove('open');
  $('#serviceBackdrop').classList.remove('show');
  $('#serviceModal').setAttribute('aria-hidden', 'true');
  document.body.classList.remove('no-scroll');
}

function openServiceWhatsapp() {
  const url = `https://wa.me/${SERVICE_WHATSAPP}?text=${encodeURIComponent(SERVICE_MESSAGE)}`;
  window.open(url, '_blank', 'noopener');
}

function setupMasks() {
  const cep = $('#checkoutForm').elements.cep;
  cep.addEventListener('input', () => {
    const digits = cep.value.replace(/\D/g, '').slice(0, 8);
    cep.value = digits.length > 5 ? `${digits.slice(0,5)}-${digits.slice(5)}` : digits;
  });

  const phone = $('#checkoutForm').elements.phone;
  phone.addEventListener('input', () => {
    const digits = phone.value.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 2) phone.value = digits;
    else if (digits.length <= 7) phone.value = `(${digits.slice(0,2)}) ${digits.slice(2)}`;
    else phone.value = `(${digits.slice(0,2)}) ${digits.slice(2,7)}-${digits.slice(7)}`;
  });

  const state = $('#checkoutForm').elements.state;
  state.addEventListener('input', () => state.value = state.value.replace(/[^a-zA-Z]/g, '').slice(0,2).toUpperCase());
}

function setupEvents() {
  $('#mobileCartButton').addEventListener('click', openCart);
  $('#floatingCartButton').addEventListener('click', openCart);
  $('#desktopCartButton').addEventListener('click', () => {
    if (window.innerWidth >= 980) document.querySelector('#desktopCartPanel').scrollIntoView({ behavior: 'smooth', block: 'center' });
    else openCart();
  });
  $('#closeCartButton').addEventListener('click', closeCart);
  $('#drawerBackdrop').addEventListener('click', closeCart);
  $('#mobileCheckoutButton').addEventListener('click', openCheckout);
  $('#desktopCheckoutButton').addEventListener('click', openCheckout);
  $('#closeCheckoutButton').addEventListener('click', closeCheckout);
  $('#checkoutBackdrop').addEventListener('click', closeCheckout);
  $('#checkoutForm').addEventListener('submit', handleCheckout);
  $('#thankYouOkButton').addEventListener('click', finishOrder);
  $('#thankYouCloseButton').addEventListener('click', finishOrder);
  $('#thankYouBackdrop').addEventListener('click', finishOrder);
  $$('[data-service-contact]').forEach(button => button.addEventListener('click', openServiceModal));
  $('#closeServiceModal').addEventListener('click', closeServiceModal);
  $('#serviceBackdrop').addEventListener('click', closeServiceModal);
  $('#serviceWhatsappButton').addEventListener('click', openServiceWhatsapp);

  $('#heroWhatsappButton').addEventListener('click', () => {
    const phone = normalizePhone(CONFIG.sellerWhatsapp || '');
    if (phone.length < 10 || phone === '5521999999999') return showToast('Configure o WhatsApp em config.js.');
    window.open(`https://wa.me/${phone}`, '_blank', 'noopener');
  });

  window.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeCart();
      closeCheckout();
      closeServiceModal();
    }
  });
}

renderFilters();
renderProducts();
renderCartEverywhere();
setupEvents();
setupMasks();
