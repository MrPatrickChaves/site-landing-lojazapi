import Link from "next/link";
import type { CSSProperties } from "react";
import { modelStores } from "../../lib/store-data";

export const metadata = {
  title: "Modelos de loja - LojaZapi",
  description: "Veja modelos de loja LojaZapi com carrinho e pedido pelo WhatsApp.",
};

export default function ModelosPage() {
  return (
    <main className="store-page" style={{ "--store-bg": "#f5fff9", "--store-primary": "#08b85f" } as CSSProperties}>
      <section className="store-hero">
        <div className="store-shell">
          <span className="store-eyebrow">Modelos LojaZapi</span>
          <h1>Escolha pela aparência da loja.</h1>
          <p>Veja uma prévia visual de cada modelo e abra a opção que combina melhor com o seu negócio.</p>
          <div className="theme-gallery">
            {modelStores.map((store) => (
              <article
                className="theme-card"
                key={store.slug}
                style={{
                  "--preview-bg": store.styles.bg,
                  "--preview-soft": store.styles.soft,
                  "--preview-primary": store.styles.primary,
                  "--preview-text": store.styles.text,
                  "--preview-muted": store.styles.muted,
                  "--preview-line": store.styles.line,
                  "--preview-hero": store.styles.hero,
                } as CSSProperties}
              >
                <Link className="theme-preview" href={`/modelos/${store.slug}`} aria-label={`Abrir ${store.title}`}>
                  <div className="theme-preview-browser">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="theme-preview-hero">
                    <div>
                      <strong>{store.title}</strong>
                      <small>{store.subtitle}</small>
                    </div>
                    <span>{store.mark}</span>
                  </div>
                  <div className="theme-preview-tabs">
                    <span>Todos</span>
                    <span>Produtos</span>
                    <span>Kits</span>
                  </div>
                  <div className="theme-preview-grid">
                    {store.products.slice(0, 4).map((product, index) => (
                      <div className="theme-product-mini" key={product.id}>
                        <span className={`theme-product-art theme-product-art-${index}`} />
                        <b>{product.name.split(" ").slice(0, 2).join(" ")}</b>
                        <small>{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(product.price)}</small>
                      </div>
                    ))}
                  </div>
                  <div className="theme-preview-cart">Carrinho pelo WhatsApp</div>
                </Link>
                <div className="theme-card-content">
                  <div>
                    <span className="theme-kicker">{store.badge}</span>
                    <h2>{store.title}</h2>
                    <p>{store.heroText}</p>
                  </div>
                  <Link className="plan-action" href={`/modelos/${store.slug}`}>Ver este modelo →</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
