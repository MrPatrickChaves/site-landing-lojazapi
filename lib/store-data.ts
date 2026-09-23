export type StoreProduct = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
};

export type StoreTheme = {
  slug: string;
  title: string;
  subtitle: string;
  badge: string;
  heroTitle: string;
  heroText: string;
  mark: string;
  art: string[];
  aboutTitle: string;
  aboutText: string;
  sellerName: string;
  sellerWhatsapp: string;
  storageKey: string;
  customerKey: string;
  serviceMessage: string;
  styles: {
    bg: string;
    soft: string;
    primary: string;
    text: string;
    muted: string;
    line: string;
    hero: string;
  };
  products: StoreProduct[];
};

const demoProducts: StoreProduct[] = [
  {
    id: "sabonete-nuvem",
    name: "Sabonete Artesanal Nuvem",
    category: "Produtos",
    price: 12,
    image: "/theme-assets/modelos/ceu/assets/products/sabonete-nuvem.svg",
    description: "Exemplo de produto simples para quem vende itens artesanais e quer começar com poucos produtos.",
  },
  {
    id: "geleia-citrus",
    name: "Geleia para Banho Citrus",
    category: "Produtos",
    price: 18,
    image: "/theme-assets/modelos/ceu/assets/products/geleia-citrus.svg",
    description: "Outro exemplo de item de autocuidado, com visual leve e descrição curta.",
  },
  {
    id: "brownie-caseiro",
    name: "Brownie Caseiro",
    category: "Produtos",
    price: 8,
    image: "/theme-assets/modelos/ceu/assets/products/brownie-caseiro.svg",
    description: "A LojaZapi também pode servir para doces, bolos, salgados e outros produtos simples.",
  },
  {
    id: "vela-aromatica",
    name: "Vela Aromática",
    category: "Produtos",
    price: 22,
    image: "/theme-assets/modelos/ceu/assets/products/vela-aromatica.svg",
    description: "Exemplo adicional para quem vende presentes, aromatizadores e pequenos itens para o lar.",
  },
  {
    id: "kit-presente",
    name: "Kit Presente Delicado",
    category: "Kits",
    price: 39,
    image: "/theme-assets/modelos/ceu/assets/products/kit-presente.svg",
    description: "Mostra que é possível vender combinações de itens em um único kit.",
  },
  {
    id: "embalagem-presente",
    name: "Embalagem para Presente",
    category: "Serviços",
    price: 8,
    image: "/theme-assets/modelos/ceu/assets/products/embalagem-presente.svg",
    description: "Exemplo de serviço complementar que pode ser adicionado ao pedido.",
  },
  {
    id: "montagem-kit",
    name: "Montagem de Kit Personalizado",
    category: "Serviços",
    price: 15,
    image: "/theme-assets/modelos/ceu/assets/products/montagem-kit.svg",
    description: "Exemplo de serviço simples para montagem, personalização ou atendimento sob medida.",
  },
];

const sabrineProducts: StoreProduct[] = [
  {
    id: "sabonete-rosa-verde",
    name: "Sabonete Rosa Verde",
    category: "Sabonetes",
    price: 12,
    image: "/loja/lojinha-sabrine/assets/products/sabonete-rosa-verde.png",
    description: "Sabonete artesanal em formato de rosa, delicado e ideal para presentes ou autocuidado.",
  },
  {
    id: "sabonete-sortido-aromas",
    name: "Sabonetes Sortidos",
    category: "Sabonetes",
    price: 15,
    image: "/loja/lojinha-sabrine/assets/products/sabonetes-sortidos-aromas.png",
    description: "Sabonetes artesanais em vários aromas, como algodão, mar e sal, capim-limão, melancia e outros.",
  },
  {
    id: "sabonete-sortido-aromas-tipo-x",
    name: "Sabonetes Sortidos TIPO X",
    category: "Sabonetes",
    price: 18,
    image: "/loja/lojinha-sabrine/assets/products/sabonetes-sortidos-typoX.png",
    description: "Sabonetes artesanais em vários aromas, como algodão, mar e sal, capim-limão, melancia e outros.",
  },
  {
    id: "geleia-maracuja",
    name: "Geleia para Banho Maracujá",
    category: "Geleias para banho",
    price: 18,
    image: "/loja/lojinha-sabrine/assets/products/kit-geleias-sortidas.png",
    description: "Geleia para banho com brilho e fragrância de maracujá, perfeita para um banho especial.",
  },
  {
    id: "geleia-pitaya",
    name: "Geleia para Banho Pitaya",
    category: "Geleias para banho",
    price: 18,
    image: "/loja/lojinha-sabrine/assets/products/kit-geleias-sortidas.png",
    description: "Geleia para banho com visual marcante e fragrância frutada de pitaya.",
  },
  {
    id: "kit-geleias-sortidas",
    name: "Kit Geleias Sortidas",
    category: "Kits",
    price: 55,
    image: "/loja/lojinha-sabrine/assets/products/kit-geleias-sortidas.png",
    description: "Kit com produtos variados, incluindo geleias para banho e sabonetes artesanais.",
  },
  {
    id: "kit-caixa-maracuja",
    name: "Kit Caixa Maracujá",
    category: "Kits",
    price: 35,
    image: "/loja/lojinha-sabrine/assets/products/kit-caixa-maracuja.png",
    description: "Kit presente com geleia de banho de maracujá e sabonete artesanal em embalagem especial.",
  },
  {
    id: "kit-banho-maracuja",
    name: "Kit Banho Maracujá",
    category: "Kits",
    price: 32,
    image: "/loja/lojinha-sabrine/assets/products/kit-banho-maracuja.png",
    description: "Kit com geleia de banho e sabonetes artesanais para um momento completo de cuidado.",
  },
];

const themeStyles = {
  ceu: {
    bg: "#f7fbff",
    soft: "#e8f5ff",
    primary: "#3478e5",
    text: "#15243b",
    muted: "#63758f",
    line: "#d7e8f8",
    hero: "linear-gradient(180deg, #e4f3ff 0%, #f8fcff 100%)",
  },
  rosa: {
    bg: "#fffaf8",
    soft: "#fff1ed",
    primary: "#a93e57",
    text: "#261f1f",
    muted: "#746565",
    line: "#eadcda",
    hero: "linear-gradient(180deg, #fff7f4 0%, #fffaf8 100%)",
  },
  moderno: {
    bg: "#f7fffb",
    soft: "#e7fff1",
    primary: "#009f63",
    text: "#11231b",
    muted: "#5b7066",
    line: "#d7eee1",
    hero: "linear-gradient(180deg, #edfff5 0%, #f9fffc 100%)",
  },
  dark: {
    bg: "#10161f",
    soft: "#1c2938",
    primary: "#56d48c",
    text: "#f6fff9",
    muted: "#b4c4d5",
    line: "#2c3b4c",
    hero: "linear-gradient(180deg, #111b27 0%, #10161f 100%)",
  },
  elegante: {
    bg: "#fffdf8",
    soft: "#f8efe0",
    primary: "#9a703c",
    text: "#251d15",
    muted: "#746859",
    line: "#eadfce",
    hero: "linear-gradient(180deg, #fff7ea 0%, #fffdf8 100%)",
  },
};

export const modelStores: StoreTheme[] = [
  makeDemoStore("ceu", "Loja de Exemplo", "modelo padrão LojaZapi", "☁", ["☁", "☼", "☘"]),
  makeDemoStore("rosa", "Modelo Rosa", "personalização delicada", "♡", ["♡", "✿", "✦"]),
  makeDemoStore("moderno", "Modelo Moderno", "visual limpo e comercial", "◆", ["◆", "▣", "✓"]),
  makeDemoStore("dark", "Modelo Escuro", "catálogo com presença forte", "●", ["●", "◐", "◆"]),
  makeDemoStore("elegante", "Modelo Elegante", "vitrine premium e discreta", "✦", ["✦", "◌", "◆"]),
];

export const sabrineStore: StoreTheme = {
  slug: "lojinha-sabrine",
  title: "Sabrine",
  subtitle: "Sabonetes artesanais",
  badge: "Feito à mão, com cuidado",
  heroTitle: "Pequenos cuidados. Grandes sensações.",
  heroText: "Sabonetes artesanais, geleias para banho e kits especiais para transformar o banho em um momento de bem-estar.",
  mark: "♡",
  art: ["🌹", "💜", "🌼"],
  aboutTitle: "Autocuidado artesanal para o seu dia.",
  aboutText: "Uma vitrine simples e acolhedora para escolher sabonetes, geleias para banho e presentes. Você monta o pedido no seu tempo e finaliza diretamente pelo WhatsApp.",
  sellerName: "Sabrine",
  sellerWhatsapp: "5524999684239",
  storageKey: "sabrine_cart_v3",
  customerKey: "sabrine_customer_v2",
  serviceMessage: "Olá, Patrick! Vi a página da Sabrine e gostaria de saber como posso ter uma página, site ou sistema para o meu negócio.",
  styles: themeStyles.rosa,
  products: sabrineProducts,
};

export function getModelStore(slug: string) {
  return modelStores.find((store) => store.slug === slug);
}

function makeDemoStore(slug: keyof typeof themeStyles, title: string, subtitle: string, mark: string, art: string[]): StoreTheme {
  return {
    slug,
    title,
    subtitle,
    badge: slug === "ceu" ? "Modelo padrão LojaZapi" : "Modelo de personalização",
    heroTitle: slug === "ceu" ? "Uma loja leve, clara e pronta para usar." : `${title} para apresentar seus produtos com estilo.`,
    heroText: "Esta é uma loja de demonstração com carrinho, categorias e finalização pelo WhatsApp. Ela pode servir para produtos, kits e serviços simples.",
    mark,
    art,
    aboutTitle: "Um exemplo simples para pequenas vendas.",
    aboutText: "Esta loja mostra como a LojaZapi pode atender um pequeno vendedor com poucos produtos, kits ou até pequenos serviços. O cliente monta o pedido e finaliza tudo direto no WhatsApp.",
    sellerName: title,
    sellerWhatsapp: "5511940271034",
    storageKey: `lojazapi_${slug}_cart_v1`,
    customerKey: `lojazapi_${slug}_customer_v1`,
    serviceMessage: "Olá, Patrick! Vi uma loja de demonstração da LojaZapi e quero saber como posso ter uma página assim.",
    styles: themeStyles[slug],
    products: demoProducts.map((product) => ({
      ...product,
      image: product.image.replace("/theme-assets/modelos/ceu/", `/theme-assets/modelos/${slug}/`),
    })),
  };
}
