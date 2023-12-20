import React from 'react';

interface CheckAccountProps {
  setStep: () => void;
}
export default function Email({ setStep }: CheckAccountProps) {
  return (
    <>
      <div>이전에 가입한 계정을 확인하세요</div>
      <div>기존 계정으로 로그인하기</div>
      <h2 onClick={setStep}>메인으로 가좍</h2>
    </>
  );
}
