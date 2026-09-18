import { LandingClient } from "../components/LandingClient";

export default function Home() {
  return (
    <>
      <header className="topbar">
        <div className="container topbar-inner">
          <a className="brand" href="#inicio" aria-label="LojaZapi">
            <span className="brand-mark">LZ</span>
            <span>
              Loja<span>Zapi</span>
            </span>
          </a>
          <nav className="top-links" aria-label="Navegação principal">
            <a href="#planos">Planos</a>
            <a href="#visual">Visual</a>
            <a className="header-cta" data-whatsapp href="#">
              Quero minha lojinha
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">SUA LOJA. SEU WHATSAPP.</span>
              <h1>Venda online sem complicação e sem mensalidade alta.</h1>
              <p>
                A LojaZapi foi pensada para pequenos vendedores. Você mostra seus produtos
                ou serviços, o cliente monta o pedido e tudo chega pronto no seu WhatsApp.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" data-whatsapp href="#">
                  Criar minha lojinha
                </a>
                <a className="btn btn-secondary" href="/modelos/ceu/" target="_blank" rel="noopener">
                  Ver loja de exemplo
                </a>
              </div>
              <div className="hero-trust">
                <span>✓ Até 2 produtos grátis</span>
                <span>✓ Funciona no celular e desktop</span>
                <span>✓ Sem comissão sobre vendas</span>
              </div>
            </div>

            <div className="phone-wrap" aria-label="Exemplo de loja no celular">
              <div className="phone">
                <div className="phone-notch" />
                <div className="demo-head">
                  <div className="demo-logo">☁</div>
                  <div>
                    <strong>Loja de Exemplo</strong>
                    <small>modelo padrão LojaZapi</small>
                  </div>
                  <span className="cart">🛒</span>
                </div>
                <div className="demo-cover">
                  <span>Visual leve com nuvens claras</span>
                </div>
                <div className="demo-products">
                  <div className="demo-card">
                    <div className="demo-img one" />
                    <b>Sabonete artesanal</b>
                    <strong>R$ 12,00</strong>
                    <button type="button">+ Adicionar</button>
                  </div>
                  <div className="demo-card">
                    <div className="demo-img two" />
                    <b>Serviço rápido</b>
                    <strong>R$ 25,00</strong>
                    <button type="button">+ Adicionar</button>
                  </div>
                </div>
                <div className="demo-checkout">Pedido direto no WhatsApp</div>
              </div>
            </div>
          </div>
        </section>

        <section className="how" id="como-funciona">
          <div className="container">
            <div className="section-title">
              <span>COMO FUNCIONA</span>
              <h2>Seu cliente compra em poucos passos</h2>
              <p>Sem painel complicado para o comprador e sem depender de checkout complexo.</p>
            </div>
            <div className="steps">
              <article>
                <span>1</span>
                <h3>Abre sua lojinha</h3>
                <p>Você envia o link pelo WhatsApp, Instagram, bio ou onde quiser.</p>
              </article>
              <article>
                <span>2</span>
                <h3>Escolhe produtos ou serviços</h3>
                <p>O cliente adiciona itens e quantidades diretamente no carrinho.</p>
              </article>
              <article>
                <span>3</span>
                <h3>Preenche os dados</h3>
                <p>Nome, WhatsApp e endereço quando necessário.</p>
              </article>
              <article>
                <span>4</span>
                <h3>Recebe o pedido pronto</h3>
                <p>Tudo chega organizado no seu WhatsApp para você confirmar.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="pricing" id="planos">
          <div className="container">
            <div className="section-title">
              <span>PLANOS SIMPLES</span>
              <h2>Preço barato para o pequeno vendedor</h2>
              <p>
                Você paga pouco, começa rápido e só aumenta quando realmente precisar de
                mais produtos.
              </p>
            </div>

            <div className="plans">
              <article className="plan">
                <div className="plan-top">
                  <span className="plan-label">Para testar</span>
                  <h3>Grátis</h3>
                  <div className="price">
                    <strong>R$ 0</strong>
                    <small>/mês</small>
                  </div>
                  <p>Ideal para quem está começando com poucos itens.</p>
                </div>
                <ul>
                  <li>Até 2 produtos</li>
                  <li>Layout padrão LojaZapi</li>
                  <li>Pedido pelo WhatsApp</li>
                  <li>Funciona no celular e desktop</li>
                  <li>Sem personalização visual</li>
                </ul>
                <a className="btn btn-light" data-whatsapp-plan="gratis" href="#">
                  Começar grátis
                </a>
              </article>

              <article className="plan featured">
                <div className="badge">Mais indicado</div>
                <div className="plan-top">
                  <span className="plan-label">Pequena loja</span>
                  <h3>Essencial</h3>
                  <div className="price">
                    <strong>R$ 9,90</strong>
                    <small>/mês</small>
                  </div>
                  <p>Para lojas pequenas com alguns produtos a mais.</p>
                </div>
                <ul>
                  <li>De 3 a 10 produtos</li>
                  <li>Layout padrão LojaZapi</li>
                  <li>Fotos, preços e descrições</li>
                  <li>Pedido pelo WhatsApp</li>
                  <li>Sem personalização visual</li>
                </ul>
                <a className="btn btn-primary" data-whatsapp-plan="essencial" href="#">
                  Quero esse plano
                </a>
              </article>

              <article className="plan">
                <div className="plan-top">
                  <span className="plan-label">Mais catálogo</span>
                  <h3>Completo</h3>
                  <div className="price">
                    <strong>R$ 14,90</strong>
                    <small>/mês</small>
                  </div>
                  <p>Para quem precisa mostrar um catálogo maior.</p>
                </div>
                <ul>
                  <li>De 11 a 30 produtos</li>
                  <li>Layout padrão LojaZapi</li>
                  <li>Fotos, preços e descrições</li>
                  <li>Pedido pelo WhatsApp</li>
                  <li>Sem personalização visual</li>
                </ul>
                <a className="btn btn-light" data-whatsapp-plan="completo" href="#">
                  Quero esse plano
                </a>
              </article>
            </div>

            <div className="addon-card">
              <div>
                <span className="eyebrow">PERSONALIZAÇÃO OPCIONAL</span>
                <h3>Quer uma aparência própria para sua loja?</h3>
                <p>
                  Além dos planos acima, você pode contratar a personalização visual da sua
                  LojaZapi com identidade mais exclusiva.
                </p>
              </div>
              <div className="addon-price">
                <strong>R$ 49,90</strong>
                <small>taxa única</small>
                <span>Personalização da aparência e do layout</span>
              </div>
              <a className="btn btn-primary" data-whatsapp-plan="personalizacao" href="#">
                Quero personalizar
              </a>
            </div>

            <p className="pricing-note">
              Sem comissão sobre suas vendas. O pedido vai direto para o seu WhatsApp.
            </p>
          </div>
        </section>

        <section className="visual" id="visual">
          <div className="container visual-grid">
            <div>
              <span className="eyebrow">VISUAL PADRÃO</span>
              <h2>O modelo padrão já vem bonito, leve e pronto para usar.</h2>
              <p>
                As lojas padrão podem seguir um estilo bem claro e acolhedor, inspirado em
                céu e nuvens suaves. É um visual simples, limpo e confortável para quem
                vende poucos produtos ou serviços.
              </p>
              <ul className="visual-list">
                <li>Fundo suave com nuvens claras</li>
                <li>Leitura leve e limpa</li>
                <li>Ideal para uso sem personalização</li>
                <li>Se quiser algo exclusivo, você adiciona a personalização</li>
              </ul>
            </div>
            <div className="visual-card">
              <div className="cloud-preview">
                <div className="cloud cloud-a" />
                <div className="cloud cloud-b" />
                <div className="cloud cloud-c" />
                <div className="mini-window">
                  <strong>Loja padrão LojaZapi</strong>
                  <span>Visual simples com nuvens claras</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="audience">
          <div className="container audience-grid">
            <div>
              <span className="eyebrow">FEITO PARA QUEM VENDE POUCO E QUER COMEÇAR RÁPIDO</span>
              <h2>Ideal para produtos simples, kits e até pequenos serviços.</h2>
            </div>
            <div className="tags">
              <span>Sabonetes</span>
              <span>Doces</span>
              <span>Bolos</span>
              <span>Artesanato</span>
              <span>Roupas</span>
              <span>Cosméticos</span>
              <span>Lembrancinhas</span>
              <span>Kits</span>
              <span>Pequenos serviços</span>
            </div>
          </div>
        </section>

        <section className="final-cta">
          <div className="container cta-box">
            <div>
              <span>COMECE AGORA</span>
              <h2>Você pode começar grátis e personalizar depois, se quiser.</h2>
              <p>Teste o modelo padrão e avance somente quando o seu negócio crescer.</p>
            </div>
            <a className="btn btn-white" data-whatsapp href="#">
              Quero minha LojaZapi
            </a>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-inner">
          <div>
            <strong>LojaZapi</strong>
            <span>Uma solução FlexyWeb</span>
          </div>
          <div className="credits">
            Desenvolvido por{" "}
            <button data-info="patrick" type="button">
              Patrick Chaves
            </button>{" "}
            · Hospedado por{" "}
            <button data-info="zorbiun" type="button">
              Zorbiun
            </button>
          </div>
        </div>
      </footer>

      <LandingClient />
    </>
  );
}
