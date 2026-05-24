# 마이링크 (MyLink) 와이어프레임 설계서

본 문서는 마이링크 서비스의 UI/UX 설계안을 **ASCII 아트 스타일**, **Mermaid 컴포넌트 다이어그램**, 그리고 **상세 마크다운 명세**를 활용하여 종합적으로 표현한 와이어프레임 설계서입니다.

---

## 1. 랜딩 & 로그인 화면 (Landing & Login Screen)

가입되지 않았거나 로그아웃된 사용자가 메인 도메인에 최초로 접속했을 때 직면하는 초미니멀 랜딩 화면입니다.

### 1.1 ASCII 아트 와이어프레임

```text
+-----------------------------------------------------------------+
|                                                                 |
|                          M Y L I N K                            |
|                                                                 |
|              가장 심플하게 나를 표현하는 한 장의 카드.           |
|                                                                 |
|                     +-----------------------+                   |
|                     | [G] Google로 시작하기 |                   |
|                     +-----------------------+                   |
|                                                                 |
|                                                     v1.0.0      |
+-----------------------------------------------------------------+
```

### 1.2 Mermaid 구조 다이어그램

```mermaid
graph TD
    subgraph LandingContainer["랜딩 페이지 컨테이너 (Viewport 100vh, Dark Theme)"]
        Title["서비스 타이틀 (M Y L I N K - H1)"]
        Desc["한 줄 서비스 설명 (Paragraph)"]
        
        subgraph ButtonWrapper["소셜 로그인 구역"]
            GoogleLogin["구글 로그인 버튼 (Google Icon + Button)"]
        end
        
        Version["버전 정보 (Footer - Small Text)"]
    end
    
    Title --> Desc
    Desc --> GoogleLogin
    GoogleLogin --> Version
```

---

## 2. 관리자 대시보드 화면 (Owner Dashboard Screen)

로그인 완료 후 본인의 주소를 설정하고 외부 링크 카드를 실시간으로 인라인 편집(Inline Edit)하여 가꾸는 관리 도구 레이아웃입니다. 
우측 상단에 **[내 페이지 보기]** 버튼이 항상 고정 노출되며, 편집 가능한 모든 텍스트 영역에는 항상 **연필 아이콘(✏️)**이 기재되어 사용자의 클릭을 직관적으로 유도합니다.

### 2.1 ASCII 아트 와이어프레임

```text
+-----------------------------------------------------------------+
|  [M Y L I N K]                [로그아웃]        [내 페이지 보기]  | <-- (우측 상단 고정 배치)
|  [내 주소 복사]                                                 |
|                                                                 |
|                 +-------------------------------+               |
|                 |    hyeonjeong_dev ✏️           |  <-- displayName (URL Slug & ✏️ 항상 표시)
|                 |    황 현 정 (Dev) ✏️           |  <-- username (실명 & ✏️ 항상 표시)
|                 |                               |               |
|                 |  미니멀리즘과 코드를 사랑하는 ✏️|  <-- introduction (자기소개 & ✏️ 항상 표시)
|                 |  프론트엔드 개발자입니다.     |               |
|                 +-------------------------------+               |
|                                                                 |
|  [+ 새 링크 추가]                                                |
|                                                                 |
|  +-----------------------------------------------------------+  |
|  | [Favicon]  내 개인 GitHub ✏️                       [X]     |  | <-- Title (✏️ 항상 노출)
|  |            https://github.com/hyeonjeong_dev ✏️    👁️: 42   |  | <-- URL (✏️ 항상 노출)
|  +-----------------------------------------------------------+  |
|                                                                 |
|  +-----------------------------------------------------------+  |
|  | [Favicon]  네이버 블로그 ✏️                        [X]     |  |
|  |            https://blog.naver.com ✏️               👁️: 10   |  |
|  +-----------------------------------------------------------+  |
|                                                                 |
+-----------------------------------------------------------------+
```

### 2.2 Mermaid 구조 다이어그램

```mermaid
graph TB
    subgraph DashboardLayout["대시보드 전체 레이아웃 (Glassmorphism Grid)"]
        subgraph HeaderSection["헤더 영역"]
            Logo["로고 (H1)"]
            LogoutBtn["로그아웃 버튼"]
            CopyUrlBtn["내 주소 복사 버튼 (Clipboard Toast API)"]
            ViewMyPageBtn["내 페이지 보기 버튼 (우측 상단 항상 고정, target='_blank')"]
        end

        subgraph ProfileSection["인라인 편집 가능 프로필 카드 (연필 ✏️ 상시 노출)"]
            DispNameInput["displayName (Input - 고유 URL Slug) + ✏️ 아이콘"]
            UserNameInput["username (Input - 실제 이름) + ✏️ 아이콘"]
            IntroTextarea["introduction (Textarea - 자기소개) + ✏️ 아이콘"]
        end

        subgraph LinkManageSection["링크 관리 구역"]
            AddLinkBtn["+ 새 링크 추가 버튼 (Fade-in Action)"]
            
            subgraph LinkCardInstance["개별 링크 카드 컴포넌트"]
                FaviconLoader["실시간 구글 파비콘 API 이미지"]
                LinkTitleInput["링크 타이틀 (인라인 Input) + ✏️ 아이콘"]
                LinkUrlInput["링크 URL (인라인 Input - 자동 스키마 보정) + ✏️ 아이콘"]
                ClickStat["누적 클릭 수 (Clicks Count Icon)"]
                DeleteBtn["휴지통 아이콘 (Fade-out Delete Action)"]
            end
        end
    end
```

---

## 3. 퍼블릭 프로필 화면 (Public Profile Screen)

제3자 및 일반 방문자가 사용자의 고유 주소(`/:displayName`)로 직접 진입했을 때 마주하는, 연필 아이콘이나 편집 기능이 완전히 탈거된 미니멀리즘 링크 트리 화면입니다.

### 3.1 ASCII 아트 와이어프레임

```text
+-----------------------------------------------------------------+
|                                                                 |
|                                                                 |
|                 +-------------------------------+               |
|                 |       hyeonjeong_dev          |               |
|                 |       황 현 정 (Dev)          |               |
|                 |                               |               |
|                 |  미니멀리즘과 코드를 사랑하는 |               |
|                 |  프론트엔드 개발자입니다.     |               |
|                 +-------------------------------+               |
|                                                                 |
|  +-----------------------------------------------------------+  |
|  | [Favicon]  내 개인 GitHub                                 |  | <-- 클릭 시 새 창 링크 이동 및 Clicks 1 증가
|  +-----------------------------------------------------------+  |
|                                                                 |
|  +-----------------------------------------------------------+  |
|  | [Favicon]  네이버 블로그                                  |  |
|  +-----------------------------------------------------------+  |
|                                                                 |
+-----------------------------------------------------------------+
```

### 3.2 Mermaid 구조 다이어그램

```mermaid
graph TB
    subgraph PublicLayout["퍼블릭 뷰 레이아웃 (반응형 최적화 그리드)"]
        subgraph PublicProfile["프로필 전시 카드 (편집 ✏️ 표시 없음)"]
            PubDispName["displayName 표기 (텍스트)"]
            PubUsername["username 표기 (텍스트)"]
            PubIntro["introduction 표기 (텍스트)"]
        end

        subgraph PublicLinkList["퍼블릭 링크 목록"]
            subgraph PublicLinkCard["방문자용 링크 카드 컴포넌트 (Hover 모션 카드)"]
                PubFavicon["실시간 구글 파비콘 아이콘"]
                PubTitle["링크 타이틀 텍스트 (target='_blank')"]
            end
        end
    end

    PublicLinkCard -.->|클릭 이벤트 발생| IncrementEvent["Firestore clicks 필드 1 증가 연산 실행"]
    IncrementEvent -.-> Redirect["외부 목적지 사이트 새 탭 브라우저 렌더링"]
```
