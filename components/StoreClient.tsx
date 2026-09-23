"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import type { StoreProduct, StoreTheme } from "../lib/store-data";

type Cart = Record<string, number>;
type CustomerData = Record<string, string>;

const serviceWhatsapp = "5511940271034";

export function StoreClient({ store }: { store: StoreTheme }) {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [cart, setCart] = useState<Cart>({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [customer, setCustomer] = useState<CustomerData>({});

  useEffect(() => {
    setCart(loadJson<Cart>(store.storageKey, {}));
  }, [store.storageKey]);

  useEffect(() => {
    localStorage.setItem(store.storageKey, JSON.stringify(cart));
  }, [cart, store.storageKey]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2400);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", drawerOpen || checkoutOpen);
    return () => document.body.classList.remove("no-scroll");
  }, [drawerOpen, checkoutOpen]);

  const categories = useMemo(() => ["Todos", ...new Set(store.products.map((product) => product.category))], [store.products]);
  const visibleProducts = activeCategory === "Todos" ? store.products : store.products.filter((product) => product.category === activeCategory);
  const entries = cartEntries(store.products, cart);
  const count = entries.reduce((sum, item) => sum + item.qty, 0);
  const total = entries.reduce((sum, item) => sum + item.product.price * item.qty, 0);

  function setQty(id: string, qty: number) {
    setCart((current) => {
      const safeQty = Math.max(0, Math.min(99, Number(qty) || 0));
      const next = { ...current };
      if (safeQty === 0) delete next[id];
      else next[id] = safeQty;
      return next;
    });
  }

  function addToCart(id: string) {
    setQty(id, (cart[id] || 0) + 1);
    setToast("Produto adicionado ao carrinho.");
  }

  function openCheckout() {
    if (!count) {
      setToast("Adicione pelo menos um produto.");
      return;
    }
    setCustomer(loadJson<CustomerData>(store.customerKey, {}));
    setDrawerOpen(false);
    setCheckoutOpen(true);
  }

  function updateCustomer(name: string, value: string) {
    let nextValue = value;
    if (name === "cep") {
      const digits = value.replace(/\D/g, "").slice(0, 8);
      nextValue = digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits;
    }
    if (name === "phone") {
      const digits = value.replace(/\D/g, "").slice(0, 11);
      if (digits.length <= 2) nextValue = digits;
      else if (digits.length <= 7) nextValue = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
      else nextValue = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    }
    if (name === "state") nextValue = value.replace(/[^a-zA-Z]/g, "").slice(0, 2).toUpperCase();
    setCustomer((current) => ({ ...current, [name]: nextValue }));
  }

  function handleCheckout(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    localStorage.setItem(store.customerKey, JSON.stringify(customer));
    const sellerPhone = store.sellerWhatsapp.replace(/\D/g, "");
    if (sellerPhone.length < 10) {
      setToast("Configure o WhatsApp antes de publicar.");
      return;
    }
    window.open(`https://wa.me/${sellerPhone}?text=${encodeURIComponent(buildWhatsappMessage(store, entries, customer, total))}`, "_blank", "noopener");
    setCheckoutOpen(false);
    setCart({});
    setToast("Pedido aberto no WhatsApp.");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div
      className="store-page"
      style={{
        "--store-bg": store.styles.bg,
        "--store-soft": store.styles.soft,
        "--store-primary": store.styles.primary,
        "--store-text": store.styles.text,
        "--store-muted": store.styles.muted,
        "--store-line": store.styles.line,
        "--store-hero": store.styles.hero,
      } as CSSProperties}
    >
      <header className="store-topbar">
        <div className="store-shell store-topbar-inner">
          <a href="#inicio" className="store-brand" aria-label={`${store.title} - início`}>
            <span className="store-brand-mark">{store.mark}</span>
            <span>
              <strong>{store.title}</strong>
              <small>{store.subtitle}</small>
            </span>
          </a>
          <nav className="store-nav" aria-label="Navegação principal">
            <a href="#produtos">Produtos</a>
            <a href="#sobre">Sobre</a>
            <button className="store-cart-trigger" type="button" onClick={() => document.querySelector("#desktopCartPanel")?.scrollIntoView({ behavior: "smooth", block: "center" })}>
              Carrinho <span className="store-cart-count">{count}</span>
            </button>
          </nav>
          <button className="mobile-cart-button" aria-label="Abrir carrinho" type="button" onClick={() => setDrawerOpen(true)}>
            🛍️ <span className="store-cart-count">{count}</span>
          </button>
        </div>
      </header>

      <main>
        <section className="store-hero" id="inicio">
          <div className="store-shell store-hero-grid">
            <div>
              <span className="store-eyebrow">{store.badge}</span>
              <h1>{store.heroTitle}</h1>
              <p>{store.heroText}</p>
              <div className="store-actions">
                <a href="#produtos" className="store-button primary">Ver produtos</a>
                <button className="store-button secondary" type="button" onClick={() => window.open(`https://wa.me/${store.sellerWhatsapp}`, "_blank", "noopener")}>Falar no WhatsApp</button>
              </div>
              <div className="store-badges">
                <span>Produção simples</span>
                <span>Pedido organizado</span>
                <span>WhatsApp direto</span>
              </div>
            </div>
            <div className="store-art" aria-hidden="true">
              <div className="store-card store-card-main">
                <div className="store-art-icon">{store.art[0]}</div>
                <span>{store.title}</span>
              </div>
              <div className="store-card store-card-small one"><div className="store-art-icon">{store.art[1]}</div></div>
              <div className="store-card store-card-small two"><div className="store-art-icon">{store.art[2]}</div></div>
            </div>
          </div>
        </section>

        <section className="catalog-section" id="produtos">
          <div className="store-shell">
            <div className="store-section-heading">
              <div>
                <span className="store-eyebrow">Escolha livremente</span>
                <h2>Produtos</h2>
                <strong className="store-product-count">{store.products.length} produtos cadastrados</strong>
              </div>
              <p>Adicione quantos itens quiser. Seu carrinho fica salvo somente neste dispositivo.</p>
            </div>

            <div className="filters">
              {categories.map((category) => (
                <button key={category} className={`filter-chip${category === activeCategory ? " active" : ""}`} type="button" onClick={() => setActiveCategory(category)}>
                  {category}
                </button>
              ))}
            </div>

            <div className="catalog-layout">
              <div className="product-grid" aria-live="polite">
                {visibleProducts.map((product) => {
                  const qty = cart[product.id] || 0;
                  return (
                    <article className="product-card" key={product.id}>
                      <div className="product-image">
                        <img src={product.image} alt={product.name} loading="lazy" />
                        <small>{product.category}</small>
                      </div>
                      <div className="product-content">
                        <div className="product-meta">
                          <h3>{product.name}</h3>
                          <strong>{formatMoney(product.price)}</strong>
                        </div>
                        <p>{product.description}</p>
                        {qty > 0 ? (
                          <QtyControl qty={qty} dec={() => setQty(product.id, qty - 1)} inc={() => setQty(product.id, qty + 1)} />
                        ) : (
                          <button className="store-button secondary" type="button" onClick={() => addToCart(product.id)}>+ Adicionar</button>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>

              <aside className="desktop-cart-panel" id="desktopCartPanel">
                <CartPanel entries={entries} count={count} total={total} setQty={setQty} openCheckout={openCheckout} />
              </aside>
            </div>
          </div>
        </section>

        <section className="about-section" id="sobre">
          <div className="store-shell about-grid">
            <div>
              <span className="store-eyebrow">Sobre</span>
              <h2>{store.aboutTitle}</h2>
            </div>
            <p>{store.aboutText}</p>
          </div>
        </section>
      </main>

      <button className={`floating-cart${count > 0 ? " visible" : ""}`} type="button" aria-label="Ver carrinho" onClick={() => setDrawerOpen(true)}>
        🛍️ <span>Ver carrinho</span> <strong>{count}</strong>
      </button>

      <div className={`drawer-backdrop${drawerOpen ? " show" : ""}`} onClick={() => setDrawerOpen(false)} />
      <aside className={`cart-drawer${drawerOpen ? " open" : ""}`} aria-hidden={!drawerOpen}>
        <div className="drawer-header">
          <div><span className="store-eyebrow">Seu pedido</span><h3>Meu carrinho</h3></div>
          <button className="icon-button" type="button" aria-label="Fechar carrinho" onClick={() => setDrawerOpen(false)}>✕</button>
        </div>
        <div className="drawer-body">
          <CartItems entries={entries} setQty={setQty} />
          {!entries.length ? <CartEmpty mark={store.mark} /> : null}
        </div>
        {entries.length ? (
          <div className="drawer-footer">
            <div className="cart-total-row"><span>Total</span><strong>{formatMoney(total)}</strong></div>
            <button className="store-button primary" type="button" onClick={openCheckout}>Continuar para envio</button>
          </div>
        ) : null}
      </aside>

      <div className={`checkout-backdrop${checkoutOpen ? " show" : ""}`} onClick={() => setCheckoutOpen(false)} />
      <section className={`checkout-modal${checkoutOpen ? " open" : ""}`} aria-hidden={!checkoutOpen}>
        <div className="checkout-card">
          <div className="checkout-header">
            <div><span className="store-eyebrow">Finalizar pedido</span><h3>Seus dados</h3></div>
            <button className="icon-button" type="button" aria-label="Fechar finalização" onClick={() => setCheckoutOpen(false)}>✕</button>
          </div>
          <div className="checkout-grid">
            <form className="checkout-form" onSubmit={handleCheckout}>
              <CheckoutFields customer={customer} updateCustomer={updateCustomer} />
              <button className="store-button whatsapp" type="submit">Enviar pedido pelo WhatsApp</button>
              <p className="form-note">O pedido não é pago neste site. A mensagem será aberta no WhatsApp para confirmação.</p>
            </form>
            <aside className="checkout-summary">
              <span className="store-eyebrow">Conferência</span>
              <h4>Resumo do pedido</h4>
              <div className="summary-items">
                {entries.map(({ product, qty }) => (
                  <div className="summary-item" key={product.id}>
                    <span>{qty}x {product.name}</span>
                    <strong>{formatMoney(product.price * qty)}</strong>
                  </div>
                ))}
              </div>
              <div className="cart-total-row summary-total"><span>Total</span><strong>{formatMoney(total)}</strong></div>
            </aside>
          </div>
        </div>
      </section>

      <section className="store-service" aria-label="Tenha uma página como esta">
        <div className="store-shell store-service-card">
          <div>
            <span className="store-eyebrow">Para o seu negócio</span>
            <h2>Você também pode ter uma loja como esta.</h2>
            <p>Catálogo, pedidos pelo WhatsApp, sites, sistemas web, automações e soluções personalizadas para o seu negócio.</p>
          </div>
          <button className="store-button primary" type="button" onClick={() => window.open(`https://wa.me/${serviceWhatsapp}?text=${encodeURIComponent(store.serviceMessage)}`, "_blank", "noopener")}>Quero uma página assim</button>
        </div>
      </section>

      <footer className="store-footer">
        <div className="store-shell store-footer-inner">
          <div className="store-brand"><span className="store-brand-mark">{store.mark}</span><span><strong>{store.title}</strong><small>{store.subtitle}</small></span></div>
          <span>Pedido rápido pelo WhatsApp.</span>
        </div>
      </footer>

      <div className={`toast${toast ? " show" : ""}`} role="status" aria-live="polite">{toast}</div>
    </div>
  );
}

function QtyControl({ qty, dec, inc }: { qty: number; dec: () => void; inc: () => void }) {
  return (
    <div className="qty-control">
      <button type="button" onClick={dec} aria-label="Diminuir">−</button>
      <span>{qty}</span>
      <button type="button" onClick={inc} aria-label="Aumentar">+</button>
    </div>
  );
}

function CartPanel({ entries, count, total, setQty, openCheckout }: { entries: { product: StoreProduct; qty: number }[]; count: number; total: number; setQty: (id: string, qty: number) => void; openCheckout: () => void }) {
  return (
    <div className="desktop-cart-sticky">
      <div className="cart-panel-title">
        <div><span className="store-eyebrow">Seu pedido</span><h3>Carrinho</h3></div>
        <span className="store-cart-count large">{count}</span>
      </div>
      <CartItems entries={entries} setQty={setQty} />
      {!entries.length ? <CartEmpty mark="🧺" /> : null}
      {entries.length ? (
        <div className="cart-footer">
          <div className="cart-total-row"><span>Total</span><strong>{formatMoney(total)}</strong></div>
          <button className="store-button primary" type="button" onClick={openCheckout}>Continuar</button>
          <small>Os itens são armazenados apenas neste navegador/dispositivo.</small>
        </div>
      ) : null}
    </div>
  );
}

function CartItems({ entries, setQty }: { entries: { product: StoreProduct; qty: number }[]; setQty: (id: string, qty: number) => void }) {
  return (
    <div className="cart-items">
      {entries.map(({ product, qty }) => (
        <div className="cart-item" key={product.id}>
          <div className="mini-product"><img src={product.image} alt={product.name} loading="lazy" /></div>
          <div className="cart-item-info">
            <strong>{product.name}</strong>
            <span>{formatMoney(product.price)} cada</span>
            <div className="qty-control small">
              <button type="button" onClick={() => setQty(product.id, qty - 1)}>−</button>
              <span>{qty}</span>
              <button type="button" onClick={() => setQty(product.id, qty + 1)}>+</button>
            </div>
          </div>
          <strong>{formatMoney(product.price * qty)}</strong>
        </div>
      ))}
    </div>
  );
}

function CartEmpty({ mark }: { mark: string }) {
  return (
    <div className="cart-empty">
      <div className="empty-icon">{mark}</div>
      <strong>Seu carrinho está vazio</strong>
      <span>Escolha alguns produtos.</span>
    </div>
  );
}

function CheckoutFields({ customer, updateCustomer }: { customer: CustomerData; updateCustomer: (name: string, value: string) => void }) {
  return (
    <>
      <div className="form-section">
        <h4>Contato</h4>
        <label>Nome completo<input name="name" type="text" autoComplete="name" required placeholder="Seu nome" value={customer.name || ""} onChange={(event) => updateCustomer("name", event.target.value)} /></label>
        <label>WhatsApp<input name="phone" type="tel" autoComplete="tel" required placeholder="(11) 99999-9999" value={customer.phone || ""} onChange={(event) => updateCustomer("phone", event.target.value)} /></label>
      </div>
      <div className="form-section">
        <h4>Endereço de entrega</h4>
        <div className="form-row two">
          <label>CEP<input name="cep" type="text" inputMode="numeric" required placeholder="00000-000" maxLength={9} value={customer.cep || ""} onChange={(event) => updateCustomer("cep", event.target.value)} /></label>
          <label>Número<input name="number" type="text" required placeholder="123" value={customer.number || ""} onChange={(event) => updateCustomer("number", event.target.value)} /></label>
        </div>
        <label>Rua<input name="street" type="text" required placeholder="Rua / Avenida" value={customer.street || ""} onChange={(event) => updateCustomer("street", event.target.value)} /></label>
        <label>Complemento<input name="complement" type="text" placeholder="Apto, casa, bloco..." value={customer.complement || ""} onChange={(event) => updateCustomer("complement", event.target.value)} /></label>
        <label>Bairro<input name="neighborhood" type="text" required placeholder="Seu bairro" value={customer.neighborhood || ""} onChange={(event) => updateCustomer("neighborhood", event.target.value)} /></label>
        <div className="form-row two">
          <label>Cidade<input name="city" type="text" required placeholder="Cidade" value={customer.city || ""} onChange={(event) => updateCustomer("city", event.target.value)} /></label>
          <label>UF<input name="state" type="text" required maxLength={2} placeholder="SP" value={customer.state || ""} onChange={(event) => updateCustomer("state", event.target.value)} /></label>
        </div>
      </div>
    </>
  );
}

function cartEntries(products: StoreProduct[], cart: Cart) {
  return Object.entries(cart)
    .map(([id, qty]) => ({ product: products.find((product) => product.id === id), qty }))
    .filter((item): item is { product: StoreProduct; qty: number } => Boolean(item.product && item.qty > 0));
}

function buildWhatsappMessage(store: StoreTheme, entries: { product: StoreProduct; qty: number }[], data: CustomerData, total: number) {
  const items = entries
    .map(({ product, qty }) => `${qty}x ${product.name} - ${formatMoney(product.price * qty)}`)
    .join("\n");
  const complement = data.complement ? `, ${data.complement}` : "";

  return `Olá, ${store.sellerName}!\n\nGostaria de fazer o seguinte pedido:\n\nPRODUTOS\n${items}\n\nTOTAL: ${formatMoney(total)}\n\nCLIENTE: ${data.name}\nWHATSAPP: ${data.phone}\n\nENDEREÇO DE ENTREGA\n${data.street}, ${data.number}${complement}\n${data.neighborhood}\n${data.city} - ${(data.state || "").toUpperCase()}\nCEP: ${data.cep}\n\nAguardo a confirmação do pedido.`;
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

function loadJson<T>(key: string, fallback: T): T {
  try {
    return JSON.parse(localStorage.getItem(key) || "") || fallback;
  } catch {
    return fallback;
  }
}
