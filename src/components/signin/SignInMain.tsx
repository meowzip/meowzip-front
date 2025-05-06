import Image from 'next/image';
import { signIn } from 'next-auth/react';
import Button from '@/components/ui/Button';
import { DEFAULT_CAT_IMAGES } from '@/constants/cats';
import { useEffect } from 'react';
import { useWebView } from '@/hooks/useWebView';

interface SignInMainProps {
  setStep: () => void;
}

const SignInMain = ({ setStep }: SignInMainProps) => {
  const { safePostMessage, platform } = useWebView();
  const isWebViewEnvironment = platform !== 'Web';

  // ReactNative 객체 초기화
  useEffect(() => {
    if (isWebViewEnvironment && typeof window !== 'undefined') {
      (window as any).ReactNative = {
        postMessage: function (message: string) {
          window.postMessage(message, '*');
        }
      };
    }
  }, [isWebViewEnvironment]);

  useEffect(() => {
    if (!isWebViewEnvironment) return;

    const handleAppleAuthReceived = (event: CustomEvent) => {
      try {
        console.log('애플 인증 이벤트 수신:', event.detail);
        if (event.detail?.token) {
          processAppleToken(event.detail.token);
        }
      } catch (error) {
        console.error('애플 인증 이벤트 처리 오류:', error);
      }
    };

    const handleMessage = (event: MessageEvent) => {
      // React DevTools 메시지 무시
      if (
        event.source === window &&
        event.data?.source === 'react-devtools-bridge'
      ) {
        return;
      }

      try {
        const data =
          typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        console.log('메시지 데이터:', data);

        if (data.type === 'APPLE_AUTH_TOKEN' && data.token) {
          processAppleToken(data.token);
        }
      } catch (error) {
        console.error('메시지 처리 오류:', error);
      }
    };

    const processAppleToken = async (token: string) => {
      try {
        console.log('애플 토큰 처리 시작:', token.substring(0, 20) + '...');
        const result = await signIn('apple', {
          redirect: false,
          id_token: token
        });

        if (result?.ok) {
          window.location.href = '/diary';
        } else {
          console.error('Next-auth 로그인 실패:', result?.error);
        }
      } catch (error) {
        console.error('애플 로그인 처리 오류:', error);
      }
    };

    window.addEventListener(
      'appleAuthReceived',
      handleAppleAuthReceived as EventListener
    );
    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener(
        'appleAuthReceived',
        handleAppleAuthReceived as EventListener
      );
      window.removeEventListener('message', handleMessage);
    };
  }, [isWebViewEnvironment]);

  const handleAppleSignIn = () => {
    if (isWebViewEnvironment) {
      safePostMessage({
        type: 'REQUEST_APPLE_LOGIN'
      });
    } else {
      signIn('apple', {
        callbackUrl: '/diary',
        redirect: true
      });
    }
  };

  return (
    <div className="p-[40px 16px 0px 16px] flex-[1 0 0] flex max-w-[640px] flex-col items-center self-stretch">
      <div className="w-full">
        <div className="flex flex-col items-center px-10 text-center text-heading-2">
          <p>
            당신이 마주친
            <br /> 모든 길냥이들을 위해
          </p>
          <Image
            className="my-4 rounded-lg"
            src={DEFAULT_CAT_IMAGES[1].imageSrc}
            alt="cat-image"
            width={300}
            height={200}
            quality={100}
          />
        </div>
        <div className="flex flex-col items-center p-4">
          <Button
            onClick={setStep}
            className="w-full max-w-[320px] rounded-16 bg-pr-500 px-4 py-2"
          >
            <Button.Text
              text="이메일로 계속하기"
              className="text-btn-1 text-gr-white"
            />
          </Button>
        </div>
        <div className="flex flex-col items-center justify-end gap-6 py-6">
          <div className="flex flex-col justify-end gap-6 py-6 text-body-4 text-gr-300">
            SNS 계정으로 간편하게 시작하기
          </div>
          <div className="flex items-end justify-center gap-6">
            <button
              onClick={() =>
                signIn('kakao', {
                  callbackUrl: '/diary',
                  redirect: true
                })
              }
            >
              <Image
                width={48}
                height={48}
                src="https://meowzip.s3.ap-northeast-2.amazonaws.com/images/icon/social-login/kakao.svg"
                alt="kakao-icon"
              />
            </button>
            <button
              onClick={() =>
                signIn('google', {
                  callbackUrl: '/diary',
                  redirect: true
                })
              }
            >
              <Image
                width={48}
                height={48}
                src="https://meowzip.s3.ap-northeast-2.amazonaws.com/images/icon/social-login/google.svg"
                alt="google-icon"
              />
            </button>
            <button onClick={handleAppleSignIn}>
              <Image
                width={48}
                height={48}
                src="https://meowzip.s3.ap-northeast-2.amazonaws.com/images/icon/social-login/apple.svg"
                alt="apple-icon"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

SignInMain.displayName = 'SignInMain';
export default SignInMain;
