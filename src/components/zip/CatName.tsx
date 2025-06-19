import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Topbar from '../ui/Topbar';
import { Input } from '../ui/Input';
import { CatRegisterReqObj } from '@/app/zip/catType';
import { useToast } from '../ui/hooks/useToast';

const catNameSchema = z.object({
  name: z
    .string()
    .min(1, '고양이 이름을 입력해주세요')
    .max(12, '띄어쓰기 포함 12자 미만으로 입력해주세요')
    .regex(
      /^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9\s]+$/,
      '이름에는 한글, 영문, 숫자만 입력 가능합니다'
    )
    .refine(
      name => name.trim().length > 0,
      '공백만으로는 이름을 설정할 수 없습니다'
    )
});

type CatNameFormData = z.infer<typeof catNameSchema>;

interface CatNameProps {
  setStep: () => void;
  setPrev: () => void;
  setCatData: (
    data: (prevData: CatRegisterReqObj) => CatRegisterReqObj
  ) => void;
}

export default function CatName({
  setStep,
  setCatData,
  setPrev
}: CatNameProps) {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch
  } = useForm<CatNameFormData>({
    resolver: zodResolver(catNameSchema),
    defaultValues: {
      name: ''
    },
    mode: 'onChange'
  });

  const watchedName = watch('name');

  const onSubmit = (data: CatNameFormData) => {
    setCatData((prev: CatRegisterReqObj) => ({
      ...prev,
      name: data.name.trim()
    }));
    setStep();
  };

  const handleFormSubmit = () => {
    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0];
      toast({
        title: '입력 오류',
        description: firstError?.message || '올바른 이름을 입력해주세요.'
      });
      return;
    }

    handleSubmit(onSubmit)();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 mx-auto h-full min-w-[320px] max-w-[640px] bg-gr-white">
      <Topbar type="three">
        <Topbar.Back onClick={setPrev} />
        <Topbar.Title title="고양이 등록(1/3)" />
        <Topbar.Complete onClick={handleFormSubmit} />
      </Topbar>
      <section className="mx-auto mt-16 max-w-[640px] p-6 text-gray-800">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="mb-[32px]">
            <p className="text-[24px] font-bold">냥이 이름이 뭐예요?</p>
            <p>길냥이에게 멋있는 이름을 선물해주세요</p>
          </div>
          <div className="pb-4">
            <Input
              {...register('name')}
              variant="outlined"
              placeholder="예) 냥냥이"
              helperText={
                errors.name
                  ? errors.name.message
                  : `띄어쓰기 포함 12자 미만 (${watchedName?.length || 0}/12)`
              }
              className={errors.name ? 'border-red-500' : ''}
              error={!!errors.name}
            />
          </div>
        </form>
      </section>
    </div>
  );
}
