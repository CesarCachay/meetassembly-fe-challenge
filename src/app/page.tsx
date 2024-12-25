'use client';
import GalleryWrapper from '@/components/GalleryWrapper';
// vendors
import { useFetchPexels } from '@/hooks/useFetchPexels';

export default function Home() {
  const { data, loading } = useFetchPexels('nature', 12);

  if (loading) return <div>Loading images ...</div>;

  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
        <h1>MeetAssembly Challenge Gallery</h1>
        <GalleryWrapper photos={data} />
      </main>
    </div>
  );
}
