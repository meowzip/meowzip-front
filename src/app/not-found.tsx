import Button from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="text-xl font-bold text-gr-900">
            [404] 페이지를 찾을 수 없습니다
          </h1>
          <p className="text-sm text-gr-600">
            요청하신 페이지가 존재하지 않거나, 접근할 수 없습니다.
          </p>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={() => (window.location.href = '/')}
            className="w-full rounded-md border border-gr-500 p-2"
          >
            <Button.Text
              text="홈으로 돌아가기"
              className="text-body-3 text-gr-900"
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
