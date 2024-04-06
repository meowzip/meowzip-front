import ZipCard from '@/components/zip/ZipCard';

export default function ZipPage() {
  return (
    <>
      <h1 className="flex h-12 items-center px-4 text-heading-3 text-gr-900">
        모음집
      </h1>
      <section className="h-screen bg-gr-50 p-4">
        <div className="grid grid-cols-2 gap-4 ">
          <ZipCard />
          <ZipCard />
          <ZipCard />
          <ZipCard />
        </div>
      </section>
    </>
  );
}
