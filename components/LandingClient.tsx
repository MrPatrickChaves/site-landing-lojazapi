"use client";

import { FormEvent, useEffect, useState } from "react";

const salesPhone = "5511940271034";
const servicePhone = "5511940271034";
const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://lojazapi.flexyweb.com.br/api";

const planNames: Record<string, string> = {
  gratis: "Plano Grátis",
  essencial: "Plano Essencial",
  crescimento: "Plano Crescimento",
  pro: "Plano Pro",
};

function waLink(phone: string, message: string) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function LandingClient() {
  const [modalOpen, setModalOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("gratis");
  const [signupMessage, setSignupMessage] = useState("");
  const [signupStep, setSignupStep] = useState<"form" | "code" | "done">("form");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupWhatsappUrl, setSignupWhatsappUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setModalOpen(false);
        setSignupOpen(false);
      }
    }

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

  async function submitPlan(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "").trim().toLowerCase();
    setLoading(true);
    setSignupMessage("Enviando cadastro...");
    try {
      const response = await fetch(`${apiUrl}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          whatsapp: form.get("whatsapp"),
          password: form.get("password"),
          planCode: selectedPlan,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Não foi possível concluir o cadastro.");
      setSignupEmail(email);
      setSignupWhatsappUrl("");
      setSignupStep("code");
      setSignupOpen(true);
      setSignupMessage("Enviamos um código para o seu email. Digite o código abaixo para confirmar seu cadastro.");
    } catch (error) {
      setSignupMessage(error instanceof Error ? error.message : "Erro ao enviar cadastro.");
    } finally {
      setLoading(false);
    }
  }


  async function submitCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setLoading(true);
    setSignupMessage("Confirmando código...");
    try {
      const response = await fetch(`${apiUrl}/auth/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: signupEmail, code: form.get("code") }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Não foi possível confirmar o código.");
      const whatsappUrl = data.whatsappUrl || "";
      setSignupWhatsappUrl(whatsappUrl);
      setSignupStep("done");
      setSignupMessage("Email confirmado. Em alguns instantes você receberá um email com seus dados de acesso ao painel administrativo.");
      if (whatsappUrl) window.open(whatsappUrl, "_blank", "noopener");
    } catch (error) {
      setSignupMessage(error instanceof Error ? error.message : "Erro ao confirmar código.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div
        className={`modal-backdrop${modalOpen || signupOpen ? " show" : ""}`}
        id="modalBackdrop"
        onClick={() => {
          setModalOpen(false);
          setSignupOpen(false);
        }}
      />
      <div className={`modal${modalOpen ? " show" : ""}`} id="infoModal" aria-hidden={!modalOpen}>
        <button
          className="modal-close"
          id="modalClose"
          aria-label="Fechar"
          type="button"
          onClick={() => setModalOpen(false)}
        >
          ×
        </button>
        <span className="modal-kicker">FLEXYWEB</span>
        <h3>Precisa de uma página, site ou sistema para seu negócio?</h3>
        <p>
          Patrick Chaves desenvolve páginas comerciais, sites, catálogos, sistemas web,
          automações e soluções sob medida para pequenos negócios.
        </p>
        <a
          className="btn btn-primary"
          href={waLink(
            servicePhone,
            "Olá, Patrick! Vi a LojaZapi e gostaria de saber sobre desenvolvimento de páginas, sites ou sistemas para meu negócio.",
          )}
          target="_blank"
          rel="noopener"
        >
          Falar com Patrick no WhatsApp
        </a>
      </div>

      <div className={`modal plan-signup-modal${signupOpen ? " show" : ""}`} aria-hidden={!signupOpen}>
        <button className="modal-close" aria-label="Fechar" type="button" onClick={() => setSignupOpen(false)}>×</button>
        <span className="modal-kicker">{planNames[selectedPlan] || "Plano LojaZapi"}</span>
        {signupStep === "form" ? (
          <>
            <h3>Comece sua loja agora</h3>
            <p>
              Preencha seus dados para receber o código no email. O cadastro final e o WhatsApp só continuam depois da confirmação.
            </p>
            <form className="plan-signup-form" onSubmit={submitPlan}>
              <label>Nome<input name="name" type="text" required placeholder="Seu nome" /></label>
              <label>Email<input name="email" type="email" required placeholder="voce@email.com" /></label>
              <label>WhatsApp<input name="whatsapp" type="tel" required placeholder="(11) 99999-9999" /></label>
              <label>Senha<input name="password" type="password" required minLength={6} placeholder="Mínimo 6 caracteres" /></label>
              <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? "Enviando..." : "Continuar"}</button>
            </form>
          </>
        ) : null}
        {signupStep === "code" ? (
          <>
            <h3>Confirme seu email</h3>
            <p>Digite o código enviado para <strong>{signupEmail}</strong>. Somente depois dessa confirmação seus dados de acesso serão enviados.</p>
            <form className="plan-signup-form" onSubmit={submitCode}>
              <label>Código de confirmação<input name="code" inputMode="numeric" required placeholder="000000" /></label>
              <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? "Confirmando..." : "Confirmar código"}</button>
            </form>
          </>
        ) : null}
        {signupStep === "done" ? (
          <>
            <h3>Email confirmado</h3>
            <p className="signup-done-text">Em alguns instantes você receberá um email com seus dados de acesso ao painel administrativo.</p>
            {signupWhatsappUrl ? <a className="btn btn-secondary" href={signupWhatsappUrl} target="_blank" rel="noopener">Abrir WhatsApp</a> : null}
            <a className="btn btn-primary" href="/sistema/">Ir para o painel</a>
          </>
        ) : null}
        {signupMessage ? <p className="signup-feedback">{signupMessage}</p> : null}
      </div>

      <a className="floating-whatsapp" data-whatsapp href="#" aria-label="Falar no WhatsApp">
        <img src="/landing-assets/whatsapp-mark.svg" alt="" aria-hidden="true" />
      </a>
      <ClientLinkData
        setModalOpen={setModalOpen}
        openSignup={(plan) => {
          setSelectedPlan(plan);
          setSignupMessage("");
          setSignupEmail("");
          setSignupWhatsappUrl("");
          setSignupStep("form");
          setSignupOpen(true);
        }}
      />
    </>
  );
}

function ClientLinkData({ setModalOpen, openSignup }: { setModalOpen: (open: boolean) => void; openSignup: (plan: string) => void }) {
  useEffect(() => {
    const genericMessage = "Olá, Patrick! Quero saber como ter minha lojinha na LojaZapi.";

    document.querySelectorAll<HTMLAnchorElement>("[data-whatsapp]").forEach((link) => {
      link.href = waLink(salesPhone, genericMessage);
      link.target = "_blank";
      link.rel = "noopener";
    });

    const planLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-whatsapp-plan]"));
    const planHandlers = new Map<HTMLAnchorElement, EventListener>();
    planLinks.forEach((link) => {
      const handler = (event: Event) => {
        event.preventDefault();
        openSignup(link.dataset.whatsappPlan || "gratis");
      };
      planHandlers.set(link, handler);
      link.addEventListener("click", handler);
    });

    const infoButtons = document.querySelectorAll<HTMLButtonElement>("[data-info]");
    const openModal = () => setModalOpen(true);
    infoButtons.forEach((button) => button.addEventListener("click", openModal));

    return () => {
      planHandlers.forEach((handler, link) => link.removeEventListener("click", handler));
      infoButtons.forEach((button) => button.removeEventListener("click", openModal));
    };
  }, [setModalOpen, openSignup]);

  return null;
}
