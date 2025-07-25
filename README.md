# 🐱 Meow.zip Frontend

**길고양이 케어테이커들을 위한 종합 돌봄 일지 서비스의 프론트엔드 레포지토리**

> 📋 **서비스 전체 소개**: [Meow.zip organization README.md](https://github.com/meowzip) 참고

## 🛠 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS + shadcn/ui
- **State Management**: Jotai
- **Data Fetching**: TanStack Query (React Query)
- **Authentication**: NextAuth.js
- **Package Manager**: pnpm
- **Code Quality**: Prettier, ESLint

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── @modal/            # 모달 인터셉팅 라우트
│   ├── api/               # API 라우트 핸들러
│   ├── community/         # /community
│   │   └── page.tsx
│   ├── profile/           # /profile
│   │   └── [id]/
│   │       └── page.tsx   # /profile/[id]
│   ├── zip/               # /zip
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           #
│   ├── loading.tsx        # 전역 로딩 UI
│   └── error.tsx          # 전역 에러 UI
├── components/            # 재사용 컴포넌트
│   ├── ui/                # 기본 UI 컴포넌트 (shadcn/ui)
│   ├── common/            # 공통 컴포넌트
│   └── [domain]/          # 도메인별 컴포넌트
├── hooks/                 # 커스텀 훅
├── services/              # API 서비스 레이어
├── store/                 # Jotai 전역 상태 관리
├── types/                 # Types
└── utils/                 # 유틸리티 함수
```

## 🚀 개발 환경 설정

### 필수 조건

- **Node.js**: 18.17 이상
- **pnpm**: 9.8.0 이상

### 설치 및 실행

```bash
# 1. 저장소 클론
git clone https://github.com/meowzip/meowzip-front.git
cd meowzip-front

# 2. 의존성 설치
pnpm install

# 3. 환경 변수 설정
cp .env.example .env.local
# .env.local 파일 편집 필요

# 4. 개발 서버 실행
pnpm dev
```

## 📜 개발 스크립트

```bash
# 개발 서버 실행
pnpm dev

# 프로덕션 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start

```

## 🏗 개발 가이드라인

### 컴포넌트 작성 규칙

1. **디렉토리 구조**

   ```
   components/
   ├── ui/           # 재사용 가능한 기본 컴포넌트
   ├── common/       # 도메인 무관한 공통 컴포넌트
   └── [domain]/     # 특정 도메인 전용 컴포넌트
   ```

2. **파일명 규칙**

   - 컴포넌트: `PascalCase.tsx`
   - 훅: `use(prefix) + camelCase.ts or tsx`
   - 유틸: `camelCase.ts`
   - 타입: `camelCaseType.ts`

3. **컴포넌트 구조**

   ```typescript
   // 타입 정의
   interface ComponentProps {
     // props 타입
   }

   // 컴포넌트 정의
   export default function Component({ ...props }: ComponentProps) {
     // 로직
     return (
       // JSX
     );
   }
   ```

### 상태 관리

- **전역 상태**: Jotai atoms (`src/store/`)
- **서버 상태**: TanStack Query (`src/hooks/`)
- **로컬 상태**: React useState

### API service layer

```typescript
// services 레이어 사용
import { getUserProfile } from '@/services/profile';

// TanStack Query 훅 사용
import { useQuery } from '@tanstack/react-query';

const { data, isLoading, error } = useQuery({
  queryKey: ['profile', userId],
  queryFn: () => getUserProfile(userId)
});
```

## 🤝 기여하기

### Pull Request 가이드

1. **브랜치 생성**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **커밋 컨벤션**
   ```
   feat: 새로운 기능 추가
   fix: 버그 수정
   docs: 문서 수정
   style: 코드 포맷팅
   refactor: 코드 리팩토링
   test: 테스트 추가
   chore: 빌드 업무 수정
   ```
