# 프로젝트 초기화 및 트러블슈팅 정리 (gemini.md)

이 문서는 `my-app` 프로젝트에서 진행된 shadcn/ui 설정 초기화 과정과 Windows 환경에서 발생한 의존성 문제를 해결한 트러블슈팅 내역을 종합 정리한 파일입니다.

---

## 1. 수행한 작업 개요

- **목표**: `my-app` 디렉터리 내에 `npx shadcn@latest init --preset b3bFX64ULI --base base --template next --yes` 설정을 안전하게 적용하고 빌드가 정상적으로 완료되는지 검증합니다.
- **적용 결과**: 
  - `components.json` 설정 파일이 성공적으로 생성되었습니다.
  - `components/ui/button.tsx`, `lib/utils.ts` 공통 유틸리티 및 컴포넌트가 추가되었습니다.
  - `app/globals.css` 파일에 shadcn/ui 기반 테마 스타일이 자동 반영되었습니다.
  - 관련 핵심 라이브러리(`@base-ui/react`, `class-variance-authority`, `clsx`, `lucide-react`, `shadcn`, `tailwind-merge`, `tw-animate-css`)가 설치되었습니다.

---

## 2. Windows 환경 의존성 트러블슈팅 내역

초기화 완료 후 빌드(`npm run build`) 검증 과정에서 Windows 환경 특유의 **네이티브 바이너리 패키지 손상 문제**가 발생하여 이를 수동으로 해결하였습니다.

### Issue 1: `@next/swc` 네이티브 모듈 로드 실패
- **증상**: Next.js 빌드 중 `next-swc.win32-x64-msvc.node is not a valid Win32 application` 에러 발생.
- **원인**: 다운로드된 SWC 바이너리 파일 크기가 약 654KB로, 정상 파일 크기(약 136MB)에 비해 비정상적으로 손상되어 있었습니다.
- **해결**: npm 캐시를 우회하여 해당 모듈을 강제 재설치하였습니다.
  ```bash
  npm i @next/swc-win32-x64-msvc --prefer-offline=false --force
  ```

### Issue 2: `lightningcss` 네이티브 바인딩 로드 실패
- **증상**: 빌드 과정 중 `Cannot find module '../lightningcss.win32-x64-msvc.node'` 에러 발생.
- **해결**: Tailwind CSS v4가 의존하는 lightningcss의 Windows 네이티브 모듈을 명시적으로 설치하였습니다.
  ```bash
  npm i lightningcss-win32-x64-msvc --prefer-offline=false --force
  ```

### Issue 3: `@tailwindcss/oxide` 네이티브 바인딩 손상
- **증상**: `tailwindcss-oxide.win32-x64-msvc.node is not a valid Win32 application` 에러 발생.
- **원인**: 다운로드된 oxide 바이너리가 약 129KB로 손상되어 있었습니다.
- **해결**: 해당 모듈을 캐시 없이 강제 재설치하여 정상 크기(약 3.15MB)로 복구하였습니다.
  ```bash
  npm i @tailwindcss/oxide-win32-x64-msvc --prefer-offline=false --force
  ```

---

## 3. 최종 빌드 검증 결과

의존성 패키지 손상 문제를 모두 해결한 뒤 `npm run build`를 재수행하여 정적 빌드가 에러 없이 완벽히 성공하는 것을 검증하였습니다.

```bash
▲ Next.js 16.1.7 (Turbopack)
  Creating an optimized production build ...
✓ Compiled successfully in 1695.1ms
  Running TypeScript ...
  Collecting page data using 11 workers ...
  Generating static pages using 11 workers (0/4) ...
✓ Generating static pages using 11 workers (4/4) in 352.0ms
  Finalizing page optimization ...

Route (app)             Size     First Load JS
┌ ○ /                   163 B          87.8 kB
└ ○ /_not-found         934 B          88.6 kB
+ First Load JS shared by all                 87.6 kB
  ├ parts/148-77981f21db2653fb.js             28.4 kB
  ├ parts/867-b50a2416b23114f4.js             53.7 kB
  └ parts/webpack-b40b8a4f9a0c7931.js         5.55 kB
```

---

## 4. Git 변경 관리
- 모든 초기화 및 해결 과정 이후 프로젝트를 Git 저장소로 초기화하고(`git init`), 작업 내역을 상세하게 한글 커밋 메시지로 작성하여 최초 커밋(`main` 브랜치)을 완료하였습니다.
