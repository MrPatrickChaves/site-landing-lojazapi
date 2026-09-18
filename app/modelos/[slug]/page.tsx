import { notFound } from "next/navigation";
import { StoreClient } from "../../../components/StoreClient";
import { getModelStore, modelStores } from "../../../lib/store-data";

export function generateStaticParams() {
  return modelStores.map((store) => ({ slug: store.slug }));
}

type ModeloParams = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: ModeloParams }) {
  const { slug } = await params;
  const store = getModelStore(slug);
  if (!store) return {};
  return {
    title: `${store.title} - Modelo LojaZapi`,
    description: store.heroText,
  };
}

export default async function ModeloPage({ params }: { params: ModeloParams }) {
  const { slug } = await params;
  const store = getModelStore(slug);
  if (!store) notFound();
  return <StoreClient store={store} />;
}
