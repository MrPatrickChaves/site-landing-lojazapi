import { StoreClient } from "../../../components/StoreClient";
import { sabrineStore } from "../../../lib/store-data";

export const metadata = {
  title: "Sabrine - Sabonetes Artesanais",
  description: "Sabrine Sabonetes Artesanais - catálogo, carrinho e pedido pelo WhatsApp.",
};

export default function SabrinePage() {
  return <StoreClient store={sabrineStore} />;
}
