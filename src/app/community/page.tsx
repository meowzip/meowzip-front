import CommunityContents from '@/components/community/CommunityContents';

export default async function CommunityPage() {
  return (
    <>
      <h1 className="flex h-12 w-full items-center bg-gr-white pl-4 align-middle text-heading-3 text-gr-900">
        커뮤니티
      </h1>
      <CommunityContents />
    </>
  );
}
