import { DiaryRegisterReqObj } from '@/app/diary/diaryType';
import { fetchExtendedForm } from '@/services/nickname';

export const registerDiaryOnServer = async (reqObj: {
  diary: DiaryRegisterReqObj;
  images?: string[] | [];
}) => {
  const formData = new FormData();
  formData.append(
    'diary',
    new Blob([JSON.stringify(reqObj?.diary)], {
      type: 'application/json'
    })
  );

  const files = reqObj.images?.map(image => base64ToFile(image, 'image.jpg'));
  if (files) {
    files.forEach(file => {
      file && formData.append('images', file);
    });
  }

  const requestOptions = {
    method: 'POST',
    body: formData
  };

  try {
    const response = await fetchExtendedForm('/diaries', requestOptions);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error('일지 등록 중 오류 발생:' + error.message);
    } else {
      throw new Error('일지 등록 중 오류 발생:');
    }
  }
};

const base64ToFile = (base64String: string | null, filename: string) => {
  // Split the base64 string into parts
  if (!base64String) return;

  const parts = base64String.split(';base64,');
  const decodedData = window.atob(parts[1]); // Decode base64 string

  // Convert decoded data to binary
  const uint8Array = new Uint8Array(decodedData.length);
  for (let i = 0; i < decodedData.length; ++i) {
    uint8Array[i] = decodedData.charCodeAt(i);
  }

  // Create a Blob from the binary data
  const blob = new Blob([uint8Array]);

  // Create a File from the Blob
  const file = new File([blob], filename);

  return file;
};
