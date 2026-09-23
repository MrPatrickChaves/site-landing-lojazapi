import Image from "next/image";
import { LandingClient } from "../components/LandingClient";

const features = [
  ["/landing-assets/icon-whatsapp-square.png", "Pedido direto no WhatsApp", "Seus clientes compram pelo WhatsApp."],
  ["/landing-assets/icon-chart-square.png", "Painel do vendedor", "Gerencie tudo em um só lugar."],
  ["/landing-assets/icon-box.png", "Separação de pedidos", "Organize e separe com facilidade."],
  ["/landing-assets/icon-cash.png", "Planos baratos", "Solução acessível para o seu negócio."],
];

const steps = [
  ["/landing-assets/icon-user.png", "Patrick monta sua página", "Configuração inicial personalizada para o seu negócio."],
  ["/landing-assets/icon-package-plus.png", "Você cadastra seus produtos", "Foto, nome, descrição e preço."],
  ["/landing-assets/icon-cart.png", "Seu cliente escolhe os itens", "Ele adiciona ao carrinho de forma simples."],
  ["/landing-assets/icon-whatsapp-circle.png", "O pedido vai para o WhatsApp", "O cliente envia a mensagem com os produtos e quantidades."],
  ["/landing-assets/icon-chart-circle.png", "Você acompanha no painel", "Visualize pedidos, separe produtos e marque como vendido."],
];

const plans = [
  {
    name: "Plano Grátis",
    price: "R$ 0",
    note: "/mês até 2 produtos",
    items: [
      "Loja online",
      "Até 2 produtos cadastrados",
      "Pedidos direto no WhatsApp",
      "Todos os recursos básicos necessários para começar",
    ],
    action: "Comece grátis",
    plan: "gratis",
    icon: "/landing-assets/icon-store.png",
  },
  {
    name: "Plano Essencial",
    price: "R$ 9,90",
    note: "/mês de 3 a 7 produtos",
    items: [
      "Todos os recursos principais",
      "Pedidos pelo WhatsApp",
      "Suporte",
      "Ideal para pequenos negócios",
    ],
    action: "Assinar agora",
    plan: "essencial",
    icon: "/landing-assets/icon-box.png",
  },
  {
    name: "Plano Crescimento",
    price: "R$ 14,99",
    note: "/mês de 8 a 15 produtos",
    items: [
      "Todos os recursos do Essencial",
      "Mais produtos",
      "Relatórios",
      "Ideal para negócios em crescimento",
    ],
    action: "Assinar agora",
    plan: "crescimento",
    popular: true,
    icon: "/landing-assets/icon-check.png",
  },
  {
    name: "Plano Pro",
    price: "R$ 23,99",
    note: "/mês de 16 a 30 produtos",
    items: [
      "Todos os recursos",
      "Mais controle e relatórios",
      "Suporte prioritário",
      "Ideal para quem possui um catálogo maior",
    ],
    action: "Assinar agora",
    plan: "pro",
    icon: "/landing-assets/icon-growth-square.png",
  },
];

const resources = [
  ["/landing-assets/icon-box.png", "Cadastro de produtos", "Adicione e edite seus produtos facilmente."],
  ["/landing-assets/icon-cart.png", "Carrinho simples", "Experiência de compra prática e rápida."],
  ["/landing-assets/icon-doc.png", "Pedidos organizados", "Acompanhe todos os seus pedidos."],
  ["/landing-assets/icon-store.png", "Separação de pedidos", "Marque, organize e separe com facilidade."],
  ["/landing-assets/icon-check.png", "Marcar como vendido", "Controle o que já foi entregue."],
  ["/landing-assets/icon-chart-circle.png", "Relatórios e acompanhamento", "Veja suas vendas e resultados."],
];

const additions = [
  ["/landing-assets/icon-store.png", "Domínio personalizado", "Tenha um endereço exclusivo para sua loja.", "Em breve"],
  ["/landing-assets/icon-whatsapp-circle.png", "WhatsApp Oficial", "Conecte com o WhatsApp Business API.", "Em breve"],
  ["/landing-assets/icon-doc.png", "Checkout online", "Receba pagamentos online.", "Consulte"],
];

const heroProducts = [
  { name: "Tênis Verde", price: "R$ 89,90", image: "/landing-assets/hero-product-sneaker.png" },
  { name: "Bolsa Casual", price: "R$ 74,50", image: "/landing-assets/hero-product-bag.png" },
  { name: "Garrafa Térmica", price: "R$ 39,90", image: "/landing-assets/hero-product-bottle.png" },
  { name: "Camisa LojaZapi", price: "R$ 49,90", image: "/landing-assets/hero-product-shirt.png" },
];

export default function Home() {
  return (
    <>
      <header className="site-header">
        <div className="landing-shell site-header-inner">
          <a className="logo-lockup" href="#inicio" aria-label="LojaZapi">
            <Image src="/landing-assets/brand-symbol.png" width={88} height={65} alt="" priority />
            <span>Loja<strong>Zapi</strong></span>
          </a>
          <nav className="main-nav" aria-label="Navegação principal">
            <a href="#como-funciona">Como funciona</a>
            <a href="#planos">Planos</a>
            <a href="#recursos">Recursos</a>
            <a href="#expansoes">Expansões</a>
            <a href="#contato">Contato</a>
          </nav>
          <a className="whatsapp-pill" data-whatsapp href="#">
            <span>☏</span> Falar no WhatsApp
          </a>
        </div>
      </header>

      <main>
        <section className="landing-hero" id="inicio">
          <div className="landing-shell hero-layout">
            <div className="hero-copy">
              <span className="hero-chip">⚡ Pequenos negócios, grandes vendas</span>
              <h1>
                Sua loja no WhatsApp, <strong>pronta para vender.</strong>
              </h1>
              <p>
                Crie uma página profissional para seus produtos, receba pedidos no
                WhatsApp e acompanhe tudo em um painel simples.
              </p>
              <div className="hero-actions">
                <a className="primary-action" data-whatsapp href="#">
                  Começar agora <span>→</span>
                </a>
                <a className="secondary-action" href="/modelos/ceu">
                  <span>▶</span> Ver demonstração
                </a>
              </div>
              <div className="hero-checks">
                <span>Setup rápido</span>
                <span>Sem complicação</span>
                <span>Suporte de verdade</span>
              </div>
            </div>

            <div className="hero-showcase" aria-label="Demonstração do produto">
              <div className="phone-mock">
                <div className="phone-bar">
                  <span>☰</span>
                  <strong>LojaZapi</strong>
                  <span>🛒</span>
                </div>
                <h3>Nossa Loja</h3>
                <label className="search-demo">Buscar produtos...</label>
                <div className="demo-tabs">
                  <span>Todos</span>
                  <span>Moda</span>
                  <span>Acessórios</span>
                  <span>Brindes</span>
                </div>
                <div className="phone-products">
                  {heroProducts.map((item) => (
                    <article key={item.name}>
                      <div className="product-photo">
                        <img src={item.image} alt="" loading="eager" />
                      </div>
                      <strong>{item.name}</strong>
                      <small>{item.price}</small>
                      <button type="button">+</button>
                    </article>
                  ))}
                </div>
                <div className="phone-checkout">Ver carrinho (2) R$ 164,40</div>
              </div>

              <div className="notebook-asset" aria-hidden="true">
                <Image src="/landing-assets/notebook-header.png" width={369} height={326} alt="" priority />
              </div>

              <div className="hero-hand-note top">Do seu catálogo ao pedido no WhatsApp em poucos cliques!</div>
              <div className="hero-hand-note bottom">Mais vendas para o seu negócio!</div>
              <div className="hero-whatsapp-badge">☏</div>
            </div>
          </div>

          <div className="landing-shell feature-strip">
            {features.map(([icon, title, text]) => (
              <article key={title}>
                <span className="feature-icon">
                  <img src={icon} width={74} height={74} alt="" loading="eager" />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="landing-section" id="como-funciona">
          <div className="landing-shell">
            <SectionHeading title="Como funciona" subtitle="Em poucos passos sua loja já está vendendo no WhatsApp." />
            <div className="steps-grid">
              {steps.map(([icon, title, text], index) => (
                <article key={title} className="step-card">
                  <span className="step-number">{index + 1}</span>
                  <div className="step-illustration">
                    <img src={icon} width={118} height={118} alt="" loading="eager" />
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="landing-section plans-section" id="planos">
          <div className="landing-shell">
            <SectionHeading title="Planos" subtitle="Comece grátis e venda pelo WhatsApp. 30 dias grátis para testar. Sem cartão." />
            <p className="plans-note">Grátis para até 2 produtos. Depois dos 30 dias, continue gratuitamente ou escolha um plano pago para cadastrar mais produtos.</p>
            <div className="plans-grid">
              {plans.map((plan) => (
                <article className={`pricing-card${plan.popular ? " popular" : ""}`} key={plan.name}>
                  {plan.popular ? <span className="popular-badge">Mais popular</span> : null}
                  <div className="pricing-icon">
                    <img src={plan.icon} width={76} height={76} alt="" loading="eager" />
                  </div>
                  <h3>{plan.name}</h3>
                  <strong>{plan.price}</strong>
                  <small>{plan.note}</small>
                  <ul>
                    {plan.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <a className="plan-action" data-whatsapp-plan={plan.plan} href="#">
                    {plan.action} <span>→</span>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="landing-section" id="recursos">
          <div className="landing-shell">
            <SectionHeading title="Recursos" subtitle="Tudo o que você precisa para vender mais, de forma simples." />
            <div className="resources-grid">
              {resources.map(([icon, title, text]) => (
                <article key={title}>
                  <span>
                    <img src={icon} width={62} height={62} alt="" loading="eager" />
                  </span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="landing-section" id="expansoes">
          <div className="landing-shell">
            <SectionHeading title="Expansões e adicionais" subtitle="Mais possibilidades para fazer seu negócio crescer." />
            <div className="addons-grid">
              {additions.map(([icon, title, text, label]) => (
                <article key={title}>
                  <div className="addon-icon">
                    <img src={icon} width={72} height={72} alt="" loading="eager" />
                  </div>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                  <span>{label}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="final-banner" id="contato">
          <div className="landing-shell final-banner-inner">
            <div>
              <h2>Quer sua loja pronta para vender?</h2>
              <p>Fale agora no WhatsApp e tire suas dúvidas com o Patrick.</p>
              <div>
                <span>Atendimento rápido</span>
                <span>Tire suas dúvidas</span>
                <span>Comece a vender hoje</span>
              </div>
            </div>
            <a className="phone-action" data-whatsapp href="#">
              ☏ (11) 94027-1034 <small>Chamar no WhatsApp →</small>
            </a>
            <Image
              className="final-asset"
              src="/landing-assets/banner-footer.png"
              width={2032}
              height={258}
              alt=""
            />
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="landing-shell footer-layout">
          <a className="footer-logo" href="#inicio" aria-label="LojaZapi">
            <Image src="/landing-assets/brand-symbol.png" width={62} height={46} alt="" />
            <span>Loja<strong>Zapi</strong></span>
          </a>
          <span>Sua loja no WhatsApp, mais vendas para o seu negócio.</span>
          <span>© 2026 LojaZapi. Todos os direitos reservados.</span>
          <button data-info="patrick" type="button">Desenvolvido por Patrick Chaves</button>
          <button data-info="zorbiun" type="button">Hospedado por Zorbiun</button>
        </div>
      </footer>

      <LandingClient />
    </>
  );
}

function SectionHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="section-heading">
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  );
}
