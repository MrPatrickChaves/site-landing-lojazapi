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
    name: "Criação da página",
    price: "R$ 100,00",
    note: "pagamento único",
    items: ["Página personalizada", "Layout profissional", "Configuração completa"],
    action: "Quero minha página",
    plan: "setup",
    icon: "/landing-assets/icon-store.png",
  },
  {
    name: "Plano Básico",
    price: "R$ 9,90",
    note: "/mês até 5 produtos",
    items: ["Todos os recursos principais", "Suporte por WhatsApp", "Ideal para começar"],
    action: "Assinar agora",
    plan: "basico",
    icon: "/landing-assets/icon-box.png",
  },
  {
    name: "Plano Essencial",
    price: "R$ 14,90",
    note: "/mês de 6 a 10 produtos",
    items: ["Todos os recursos do Básico", "Mais produtos", "Relatórios simples"],
    action: "Assinar agora",
    plan: "essencial",
    popular: true,
    icon: "/landing-assets/icon-check.png",
  },
  {
    name: "Plano Completo",
    price: "R$ 19,90",
    note: "/mês de 11 a 15 produtos",
    items: ["Todos os recursos", "Mais controle e relatórios", "Suporte prioritário"],
    action: "Assinar agora",
    plan: "completo",
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
                  <span>Bebidas</span>
                  <span>Snacks</span>
                  <span>Limpeza</span>
                </div>
                <div className="phone-products">
                  {["Coca-Cola", "Doritos", "Água Mineral", "Pão de Forma"].map((item, index) => (
                    <article key={item}>
                      <div className={`product-blob product-blob-${index}`} />
                      <strong>{item}</strong>
                      <small>R$ {(3 + index * 1.45).toFixed(2).replace(".", ",")}</small>
                      <button type="button">+</button>
                    </article>
                  ))}
                </div>
                <div className="phone-checkout">Ver carrinho (2) R$ 14,50</div>
              </div>

              <div className="dashboard-mock">
                <div className="dash-sidebar">
                  <strong>LojaZapi</strong>
                  <span>Início</span>
                  <span>Pedidos</span>
                  <span>Produtos</span>
                  <span>Clientes</span>
                  <span>Relatórios</span>
                </div>
                <div className="dash-content">
                  <div className="dash-title">
                    <strong>Pedidos</strong>
                    <span>02</span>
                  </div>
                  {[
                    ["#1024", "João Silva", "R$ 14,50", "Pendente"],
                    ["#1023", "Maria Souza", "R$ 28,90", "Separação"],
                    ["#1022", "Carlos Lima", "R$ 18,50", "Concluído"],
                  ].map((order) => (
                    <div className="order-row" key={order[0]}>
                      <span>{order[0]}</span>
                      <span>{order[1]}</span>
                      <span>{order[2]}</span>
                      <b>{order[3]}</b>
                    </div>
                  ))}
                </div>
              </div>

              <div className="whatsapp-note">Novos pedidos direto no WhatsApp</div>
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
            <SectionHeading title="Planos" subtitle="Escolha o plano ideal para o seu negócio e comece a vender." />
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
              src="/landing-assets/whatsapp-cta-strip.png"
              width={1086}
              height={362}
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
