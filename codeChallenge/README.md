# day1

지시자, Composition API, 컴포넌트, Pinia, Axios, Element Plus Code Challenge를 `App.vue`에 칸으로 쌓아 둔 폴더입니다.

```bash
npm install
npm run dev
```

실습 전체 목록은 저장소 루트 `README.md`에도 있습니다.

## Element Plus

`main.js`에 `element-plus`와 CSS를 전역 등록했습니다. day1에 Vue Router가 없어서 PDF의 router 줄은 빼 두었습니다. 카드는 새 `.vue`로 안 쪼개고 `App.vue` 맨 아래 `.column`에 붙였습니다.

### 실습 1. 회원가입 Form

`userForm`(email, agree), `el-card`, `el-input`, `el-switch`, `el-button`, `ElMessage`.
헤더는 회원가입, 함수명은 `handleResgister`입니다. `@` 없거나 약관 미동의하면 메시지를 띄웁니다.

### 실습 2. 수량 및 별점

`productQuantity`(기본 1, 최대 10), `productRate`(기본 4).
`el-input-number`, `el-rate`에 `show-score`와 `{value} 점`.
헤더는 상품 수량 및 평점 선택입니다.

### 실습 3. 삭제 Confirm과 Progress

`ElMessageBox.confirm`으로 삭제 확인, `el-progress`로 동기화 진행률.
헤더는 파일 작업입니다.

날씨 앱 Hands on UI Library는 아직 이 폴더에 없습니다.

## Axios 예제

`AxiosWeather.vue`입니다. OpenWeather 키는 코드에 넣지 않았습니다. 쓰려면 `.env`에 `VITE_OPENWEATHER_KEY`를 두면 됩니다.
