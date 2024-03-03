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

  // const file = base64ToFile(reqObj.images, 'image.jpg');
  // file && formData.append('profileImage', file);

  const requestOptions = {
    method: 'POST',
    body: formData
  };

  try {
    const response = await fetchExtendedForm('/diaries', requestOptions);

    return response.body;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error('일지 등록 중 오류 발생:' + error.message);
    } else {
      throw new Error('일지 등록 중 오류 발생:');
    }
  }
};
