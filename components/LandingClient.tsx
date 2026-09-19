"use client";

import { useEffect, useState } from "react";

const salesPhone = "5511940271034";
const servicePhone = "5511940271034";

const planMessages: Record<string, string> = {
  setup: "Olá, Patrick! Quero contratar a criação da minha página LojaZapi por R$ 100,00.",
  basico: "Olá, Patrick! Tenho interesse no Plano Básico da LojaZapi por R$ 9,90/mês.",
  essencial: "Olá, Patrick! Tenho interesse no Plano Essencial da LojaZapi por R$ 14,90/mês.",
  completo: "Olá, Patrick! Tenho interesse no Plano Completo da LojaZapi por R$ 19,90/mês.",
};

function waLink(phone: string, message: string) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function LandingClient() {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setModalOpen(false);
    }

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <>
      <div
        className={`modal-backdrop${modalOpen ? " show" : ""}`}
        id="modalBackdrop"
        onClick={() => setModalOpen(false)}
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
      <a className="floating-whatsapp" data-whatsapp href="#" aria-label="Falar no WhatsApp">
        <img src="/landing-assets/whatsapp-mark.svg" alt="" aria-hidden="true" />
      </a>
      <ClientLinkData setModalOpen={setModalOpen} />
    </>
  );
}

function ClientLinkData({ setModalOpen }: { setModalOpen: (open: boolean) => void }) {
  useEffect(() => {
    const genericMessage = "Olá, Patrick! Quero saber como ter minha lojinha na LojaZapi.";

    document.querySelectorAll<HTMLAnchorElement>("[data-whatsapp]").forEach((link) => {
      link.href = waLink(salesPhone, genericMessage);
      link.target = "_blank";
      link.rel = "noopener";
    });

    document.querySelectorAll<HTMLAnchorElement>("[data-whatsapp-plan]").forEach((link) => {
      const message = planMessages[link.dataset.whatsappPlan || ""];
      if (!message) return;
      link.href = waLink(salesPhone, message);
      link.target = "_blank";
      link.rel = "noopener";
    });

    const infoButtons = document.querySelectorAll<HTMLButtonElement>("[data-info]");
    const openModal = () => setModalOpen(true);
    infoButtons.forEach((button) => button.addEventListener("click", openModal));

    return () => {
      infoButtons.forEach((button) => button.removeEventListener("click", openModal));
    };
  }, [setModalOpen]);

  return null;
}
