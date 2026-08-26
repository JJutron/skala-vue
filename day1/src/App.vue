<script setup>
import { ref, reactive, computed, watch,watchEffect } from 'vue'
import SampleOne from './components/SampleOne.vue'
import SampleTwo from './components/SampleTwo.vue'
import LifeCycleDemo from './components/LifeCycleDemo.vue'
import PropsEmitsChild from './components/PropsEmitsChild.vue'
import SlotDefaultChild from './components/SlotDefaultChild.vue'
import NamedSlot from './components/NamedSlot.vue'
import ScoppedSlot from './components/ScoppedSlot.vue'
// 2단계: v-html
const rawHtmlData =
  '이 글자는 <span style="color: red; font-weight: bold;">빨간색 굵은 글자</span>이다.'
const inputValue = ref('')
const message = ref('')
function showMessage() {
  message.value = inputValue.value
}

// 3단계: v-text
const content = '안녕하세요! <strong>Skala-Vue</strong> 강의입니다.'

// 4단계: v-bind 기본
const dynamicUrl = 'https://www.naver.com'
const logoImgSrc = 'https://vuejs.org/images/logo.png'
const isButtonDisabled = ref(true)

// 5단계: :class
const isWarning = ref(false)
const themeClass = ref('bg-dark')

// 6단계: :style
const textColor = ref('purple')
const boxWidth = ref(150)
const baseBoxStyle = ref({
  backgroundColor: '#42b883',
  height: '100px',
  transition: 'all 0.3s ease',
})

// 7단계: 이름 같으면 짧게
const id = 'user-profile-card'
const src = 'https://vuejs.org/images/logo.png'

// 8단계: v-if
const isLogged = ref(false)
const score = ref(85)

// 9단계: v-show
const isVisible = ref(true)

// // 10단계: v-for
// const fruits = ref(['사과', '바나나', '딸기'])
// // const user = ref({ name: '홍길동', age: 25, role: '개발자' })
// // const items = ref([
//   { id: 'prod_101', name: '아이폰' },
//   { id: 'prod_102', name: '갤럭시' },
// ])
// function addGrape() {
//   fruits.value.push('포도')
// }

// // 11단계부터 여기 따라 치기
// const count = ref(0)
// const showAlert = () => {
//   alert('함수가 성공적으로 호출되었습니다!')
// }

// 12단계
const position = ref('')
const tagName = ref('')
const getOnlyEvent = (e) => {
  position.value = `좌표: X=${e.clientX}, Y=${e.clientY}`
}
const getWithParam = (name, e) => {
  tagName.value = `대상: ${name} / 클릭된 태그: ${e.target.tagName}`
}

//13단계
const handleLink = () => {
  alert('수식어 덕분에 네이버로 이동하지 않고 함수만 실행')
}
const handleBox = () => {
  alert('부모 박스가 클릭되었습니다!')
}
const handleChild1 = () => {
  alert('1번 자식 클릭!')
}
const handleChild2 = () => {
  alert(`2번 자식 클릭!`)
}

// 14단계
const text1 = ref('')
const text2 = ref('')

//15단계
const comment = ref('')
const isAgreed = ref(false)
const favoriteFruits = ref([])
const gender = ref('')
const selectedCar = ref('')

// 16단계
const lazyText = ref('')
const age = ref('')
const userEmail = ref('')
const price = ref('')

//18단계
const count = ref(0)
const name = ref('홍길동')
const isActive = ref(true)
const items = ref(['사과', '배'])
const user = ref({ name: '이순신', age: 30 })
const increaseRef = () => { count.value++ }
const changeUserName = () => { user.value.name = '장보고' }

//19단계
const userReactive = reactive({ name: '이순신', age:30})
const celebrateReactive = () => {userReactive.age++}
const fruitsReactive = reactive(['사과', '바나나'])
const addItem = () => {fruitsReactive.push(`과일 ${fruitsReactive.length + 1}`)}
const removeItem = (index) => { fruitsReactive.splice(index, 1)}


//20단계
const cCount=ref(0)
const dummy=ref(0)
const getMethodResult = () => {
  console.log('X 일반 함수 실행됨!')
  return cCount.value * 2
}
const doubleCount = computed(() => {
  console.log('✅ Computed 연산 실행됨')
  return cCount.value * 2
})

//21단계
const currentCity = ref('서울')
const logMessage = ref('아직 감시 시스템이 작동하지 않았습니다.')
watch(currentCity, (newValue, oldValue) => {
  logMessage.value = `감시자 실행! [${oldValue}]에서 [${newValue}]의 날씨 API를 다시 조회합니다...`
  console.log(`기상청 서버세어 ${newValue}의 날씨 API를 다시 조회합니다...`)
})

//22단계
const city = ref('서울')
const dateType = ref('오늘')
const apiStatus = ref('대기중 ...')
watch([city, dateType], ([newCity, newDate], [oldCity, oldDate]) => {
  apiStatus.value = `[변경 감지] ${oldCity}(${oldDate}) ➡️ ${newCity}(${newDate})`
  console.log(`${newCity}의 ${newDate} 날씨를 불러옵니다...`)
})

//23단계
const member = ref({ name: '홍길동', age: 20 })
const logDeep = ref('아직 반응 없음')
const logTarget = ref('아직 반응 없음')
watch(member, (newVal) => {
  logDeep.value = `[deep] 이름: ${newVal.name}, 나이: ${newVal.age}`
}, { deep: true })
watch(() => member.value.age, (newAge, oldAge) => {
  logTarget.value = `[타겟] 나이 ${oldAge}세 ➡️ ${newAge}세`
})

//24단계
const state = reactive({ productName: '노트북', price: 1000})
const logAutoDeep = ref('대기중...')
const logPrice = ref('대기 중...')
watch(state, (newVal, oldVal) => {
  logAutoDeep.value = `[자동 Deep] 이전인척:${oldVal.price} ➡️ 현재:${newVal.price}`
})
watch(() => state.price, (newPrice, oldPrice) => {
  logPrice.value = `[타겟] 옛날:${oldPrice} ➡️ 바뀐값:${newPrice}`
})

//25단계
const username = ref('홍길동')
const ageFx = ref(20)
const fxLog = ref('대기 중...')
watchEffect(() => {
  fxLog.value = `[자동 감지] 이름: ${username.value} / 나이: ${ageFx.value}세`
  console.log('watchEffect 실행됨')
})

//26단계
const showDemo = ref(true)

//27단계
const messageEmit = ref('Parent 초기 메시지')

const handleUpdateRequest = (newValue) => {
  messageEmit.value = newValue
}




</script>

<template>
  <div style="padding: 20px">
    <div class="columns">
      <div class="column">
        <SampleOne />
      </div>
      <div class="column">
        <SampleTwo />
      </div>
    </div>

    <h2>2단계. {{ }} vs v-html</h2>
    <div class="columns">
      <div class="column">
        <h3>일반 보간</h3>
        <p>{{ rawHtmlData }}</p>
        <h3>v-html</h3>
        <p v-html="rawHtmlData"></p>
      </div>
      <div class="column">
        <h3>v-html XSS 연습</h3>
        <input v-model="inputValue" placeholder="내용을 입력하세요" />
        <button @click="showMessage">확인</button>
        <div v-html="message"></div>
      </div>
    </div>

    <h2>3단계. v-text</h2>
    <div class="columns">
      <div class="column">
        <p>1) {{ }} : {{ content }}</p>
        <p v-text="'2) v-text: ' + content"></p>
      </div>
      <div class="column">
        <p>3) v-html (태그가 진짜로 적용됨)</p>
        <p v-html="content"></p>
      </div>
    </div>

    <h2>4단계. v-bind (:href, :src, :disabled)</h2>
    <div class="columns">
      <div class="column">
        <h3>링크 / 이미지</h3>
        <a :href="dynamicUrl">네이버로 이동</a>
        <br />
        <img :src="logoImgSrc" alt="Vue 로고" style="width: 100px" />
      </div>
      <div class="column">
        <h3>버튼 잠금</h3>
        <p>잠김?: {{ isButtonDisabled }}</p>
        <button :disabled="isButtonDisabled">동의해야 클릭 가능</button>
        <button @click="isButtonDisabled = !isButtonDisabled">잠금 토글</button>
      </div>
    </div>

    <h2>5단계. :class</h2>
    <div class="columns">
      <div class="column">
        <p :class="{ 'text-danger': isWarning }">경고 상태: {{ isWarning }}</p>
        <button @click="isWarning = !isWarning">경고 토글</button>
      </div>
      <div class="column">
        <div :class="[themeClass, isWarning ? 'border-red' : 'border-gray']">
          박스 (경고 켜면 빨간 테두리)
        </div>
      </div>
    </div>

    <h2>6단계. :style</h2>
    <div class="columns">
      <div class="column">
        <p :style="{ color: textColor, fontWeight: 'bold' }">색이 바뀝니다</p>
        <button @click="textColor = textColor === 'purple' ? 'blue' : 'purple'">
          색 토글
        </button>
      </div>
      <div class="column">
        <label>박스 가로(px): </label>
        <input type="number" v-model="boxWidth" step="50" />
        <div :style="[baseBoxStyle, { width: boxWidth + 'px' }]">
          <p style="color: white; padding: 10px; text-align: center">
            {{ boxWidth }}px
          </p>
        </div>
      </div>
    </div>

    <h2>7단계. 이름 같으면 짧게</h2>
    <div class="columns">
      <div class="column">
        <div :id>
          <img :src alt="Vue 로고" style="width: 50px" />
        </div>
        <p>이 div의 id는 {{ id }}</p>
      </div>
      <div class="column">
        <p>변수명이 src, id와 같아서</p>
        <p><code>:src="src"</code> 대신 <code>:src</code> 만 써도 됨</p>
      </div>
    </div>

    <h2>8단계. v-if / v-else-if / v-else</h2>
    <div class="columns">
      <div class="column">
        <p v-if="isLogged">회원 전용 화면</p>
        <p v-else>로그인이 필요합니다</p>
        <button @click="isLogged = !isLogged">
          {{ isLogged ? '로그아웃' : '로그인' }}
        </button>
      </div>
      <div class="column">
        <label>점수: </label>
        <input type="number" v-model="score" min="0" max="100" />
        <div v-if="score >= 90">A학점</div>
        <div v-else-if="score >= 80">B학점</div>
        <div v-else-if="score >= 70">C학점</div>
        <div v-else>F학점</div>
      </div>
    </div>

    <h2>9단계. v-show</h2>
    <div class="columns">
      <div class="column">
        <button @click="isVisible = !isVisible">토글</button>
        <p>isVisible: {{ isVisible }}</p>
      </div>
      <div class="column">
        <div v-show="isVisible" class="box">
          v-show 상자 (꺼도 DOM에는 남아 있음)
        </div>
      </div>
    </div>

    <h2>10단계. v-for + :key</h2>
    <div class="columns">
      <div class="column">
        <h3>배열</h3>
        <button @click="addGrape">포도 추가</button>
        <ul>
          <li v-for="(fruit, index) in fruits" :key="index">
            {{ index + 1 }}번: {{ fruit }}
          </li>
        </ul>
      </div>
      <div class="column">
        <h3>객체</h3>
        <ul>
          <li v-for="(value, key) in user" :key="key">
            {{ key }} : {{ value }}
          </li>
        </ul>
        <h3>배열 안 객체</h3>
        <ul>
          <li v-for="item in items" :key="item.id">{{ item.name }}</li>
        </ul>
      </div>
    </div>

    <h2>11단계. v-on (@click)</h2>
    <div class="columns">
      <div class="column">
        <h3>1) 인라인 연산 처리</h3>
        <p>현재 카운트: {{ count }}</p>
        <button @click="count++">1씩 증가</button>
      </div>
      <div class="column">
        <h3>2) 스크립트 함수 호출</h3>
        <button @click="showAlert">알림창 띄우기</button>
      </div>
    </div>

    <h2>12단계. $event</h2>
    <div class="columns">
      <div class="column">
        <p>좌표: {{ position }}</p>
        <button @click="getOnlyEvent">클릭 좌표 알아내기</button>
      </div>
      <div class="column">
        <p>태그: {{ tagName }}</p>
        <button @click="getWithParam('회원A', $event)">회원 정보와 태그 확인</button>
      </div>
    </div>

    <h2>13단계. .prevent / .stop</h2>
    <div class="columns">
      <div class="column">
        <h3>1) .prevent (기본동작막기)</h3>
        <a href="https://www.naver.com" @click.prevent="handleLink">네이버링크</a>
      </div>
      <div class="column">
        <h3>2) .stop (이벤트 버블링 막기)</h3>
        <div @click="handleBox" style="padding: 20px; background-color: #eee">
          <p>부모 영역 (클릭시 alert 발동)</p>
          <button @click="handleChild1">버블링 발생 버튼</button>
          <button @click.stop="handleChild2">버블링 차단 버튼</button>
        </div>
      </div>
    </div>

    <h2>14단계. v-model 양방향</h2>
    <div class="columns">
      <div class="column">
        <h3> 1) v-model 축약 문법(양방향)</h3>
        <input type="text" v-model="text1" placeholder="여기에 입력하세요" />
        <p>입력된 값: <strong>{{  text1  }}</strong></p>
      </div>
      <div class="column">
        <h3>2) v-model의 내부 작동 원리 (단방향+이벤트)</h3>
        <input
        type="text"
        :value="text2"
        @input="(e) => (text2 = e.target.value)"
        placeholder="원리 파악용 입력창" />
        <p>입력된 값: <strong>{{  text2  }}</strong></p>
      </div>
    </div>

    <h2>15단계. Form 요소 매핑</h2>
    <div class="columns">
      <div class="column">
        <h3>1) Textarea</h3>
        <textarea v-model="comment" placeholder="의견을 남겨주세요"></textarea>
        <p>데이터 상태: {{ comment }}</p>

        <h3>2) 단일 Checkbox</h3>
        <label>
          <input type="checkbox" v-model="isAgreed" /> 약관에 동의합니다.
        </label>
        <p>데이터 상태: {{ isAgreed }}</p>
      </div>
      <div class="column">
        <h3>3) 다중 Checkbox</h3>
        <label><input type="checkbox" value="사과" v-model="favoriteFruits" /> 사과</label>
        <label><input type="checkbox" value="바나나" v-model="favoriteFruits" /> 바나나</label>
        <label><input type="checkbox" value="딸기" v-model="favoriteFruits" /> 딸기</label>
        <p>데이터 상태 (배열): {{ favoriteFruits }}</p>

        <h3>4) Radio</h3>
        <label><input type="radio" value="남성" v-model="gender" /> 남성</label>
        <label><input type="radio" value="여성" v-model="gender" /> 여성</label>
        <p>데이터 상태: {{ gender }}</p>

        <h3>5) Select</h3>
        <select v-model="selectedCar">
          <option value="">-- 선택하세요 --</option>
          <option value="tesla">테슬라</option>
          <option value="hyundai">현대자동차</option>
          <option value="bmw">BMW</option>
        </select>
        <p>데이터 상태: {{ selectedCar }}</p>
      </div>
    </div>

    <h2>16단계. v-model 수식어</h2>
    <div class="columns">
      <div class="column">
        <h3>1) .lazy</h3>
        <input type="text" v-model.lazy="lazyText" placeholder="입력 후 Enter 또는 외부 클릭" />
        <p>확정된 값: <strong>{{ lazyText }}</strong></p>

        <h3>2) .number</h3>
        <input type="text" v-model.number="age" placeholder="나이를 입력하세요" />
        <p>값: <strong>{{ age }}</strong></p>
        <p>타입: <strong>{{ typeof age }}</strong></p>
      </div>
      <div class="column">
        <h3>3) .trim</h3>
        <input type="text" v-model.trim="userEmail" placeholder="앞뒤 공백을 포함해 입력" />
        <p>값: <strong>"{{ userEmail }}"</strong></p>
        <p>길이: <strong>{{ userEmail.length }}</strong></p>

        <h3>4) Chaining (.trim.number)</h3>
        <input type="text" v-model.trim.number="price" placeholder="공백과 숫자를 섞어 입력" />
        <p>값: <strong>"{{ price }}"</strong></p>
        <p>타입: <strong>{{ typeof price }}</strong></p>
      </div>
    </div>

    <h2>17단계. Scoped 스타일</h2>
    <div class="columns">
      <div class="column">
        <p class="title">이 글자는 이 컴포넌트 내부에서만 빨간색이 됩니다.</p>
      </div>
      <div class="column">
        <button class="btn-external">이 파일 scoped CSS로 입힌 버튼</button>
      </div>
    </div>

    <h2>18단계.ref </h2>
    <div class="columns">
      <div class="column">
        <p>Ref count: <strong>{{  count  }}</strong></p>
        <p> 이름: <input v-model="name" />{{ name }}</p>
        <p>활성 상태: {{ isActive ? '활성' : '비활성'}}</p>
        <p>과일 목록 : {{ items.join(', ') }}</p>
        <p>사용자 정보 : {{ user.name }}, 나이 = {{ user.age }}</p>
        <button @click="increaseRef">Ref 변수 증가</button>
        <button @click="isActive = !isActive">토글</button>
        <button @click="items.push('귤')">과일 추가</button>
        <button @click="changeUserName">사용자 이름 변경</button>
      </div>
    </div>
    <h2>19단계.reactive </h2>
    <div class="columns">
      <div class="column">
        <p>이름: {{ userReactive.name }} / 나이 : {{ userReactive.age }}세</p>
        <button @click="celebrateReactive">reactive 나이 한 살 추가</button>
        <ul>
          <li v-for="(item, index) in fruitsReactive" :key="index">
            {{ item }}
            <button @click="removeItem(index)">삭제</button>
          </li>
        </ul>
        <button @click="addItem">과일 항목 추가</button>
        </div>
    </div>
    <h2>20단계.computed </h2>
    <div class="columns">
      <div class="column">
        <p>count : {{ cCount }} | dummy: {{ dummy }}</p>
        <button @click="cCount++">count 증가</button>
        <button @click="dummy++">dummy 증가</button>
        <p>일반함수 : {{ getMethodResult() }}</p>
        <p>Computed : {{ doubleCount }}</p>
      </div>
      </div>
    <h2>21단계.watch </h2>
    <div class="columns">
      <div class="column">
        <p>현재 선택된 도시 : {{  currentCity }}</p>
        <button @click="currentCity = '서울'">서울</button>
        <button @click="currentCity = '수원'">수원</button>
        <button @click="currentCity = '부산'">부산</button>
        <p>{{ logMessage }}</p>
        </div>
        </div>
    
    <h2>22단계.watch 여러개 </h2>
    <div class="columns">
      <div class="column">
        <select v-model="city">
          <option valdue="서울">서울</option>
          <option valdue="수원">수원</option>
          <option valdue="부산">부산</option>
        </select>
      <label><input type="radio" value="오늘" v-model="dateType"/>오늘</label>
      <label><input type="radio" value="내일" v-model="dateType"/>내일</label>
      <label><input type="radio" value="주간예보" v-model="dateType"/>주간예보</label>
      <p>현재 상태: {{ apiStatus }}</p>
      </div>
      </div>
     <h2>23단계.Deep Watch </h2>
    <div class="columns">
      <div class="column">
        <p>이름: {{ member.name }} / {{ member.age }}세</p>
        <button @click="member.name = '이순신'">이름만 변경</button>
        <button @click="member.age = '이순신'">나이만 변경</button>
      <p>{{ logDeep }}</p>
      <p>{{ logTarget }}</p>
      </div>
    </div>
    <h2>24단계.reactive+ Watch </h2>
    <div class="columns">
      <div class="column">
        <p>{{  state.productName }} / {{ state.price }}</p>
        <button @click="state.price += 500">가격 500원 인상</button>
        <p>{{ logAutoDeep }}</p>
        <p>{{ logPrice }}</p>
        </div>
        </div>
    <h2>25단계 WatchEffect </h2>
    <div class="columns">
      <div class="column">
        <p>이름 : {{ username }} / 나이 : {{ ageFx }}세</p>
        <button @click="username = '이순신'">이름변경</button>
        <button @click="ageFx++">나이 +1</button>
        <p>{{ fxLog }}</p>
        </div>
        </div>

    <h2>26단계 생명주기</h2>
    <div class="columns">
      <div class="column">
    
    <LifeCycleDemo v-if="showDemo" />
    <button @click="showDemo = !showDemo">컴포넌트 켜기/끄기</button>
    </div>
    </div>

    <h2>27단계 Props & Emit</h2>
    <div class="columns">
      <div class="column">
        <div class="practice-section">
          <h2>Props & Emit</h2>
          <p>
            현재 로컬 데이터(State) : <strong>{{ messageEmit }}</strong>
          </p>
          <br />
          <PropsEmitsChild
          :parent-data="messageEmit"
          @update-request="handleUpdateRequest"
          />
        </div>
        </div>
        </div>  
    <h2>28단계 Slot</h2>
    <div class="columns">
      <div class="column">
        <div class="section">
          <h2>Default Slot 레이아웃 주입 실습</h2>
          <SlotDefaultChild>
            <p>단순한 텍스트 문장을 주입합니다.</p>
          </SlotDefaultChild>
          <SlotDefaultChild>
            <h2 style="color: #e74c3c">경고상태</h2>
            <button>확인</button>
          </SlotDefaultChild>
        </div>
        </div>
        </div>  

        <div class="columns">
          <div class="column">
          <div class="practice-section">
            <h2>Named Slot 주입실습</h2>
            <NamedSlot>
              <template v-slot:header>
                <h3>Child 주입 제목</h3>
              </template>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt...
              </p>
            </NamedSlot>
          </div>
          </div>


        </div>

        <div class="columns">
          <div class="column">
          <div class="practice-section">
            <h2>Scopped Slot 주입 실습</h2>
            <h3>상위 컴포넌트 (parent)</h3>
            <ScoppedSlot v-slot="slotBag">
              <p>알림 메시지: {{ slotBag.text }}</p>
              <p>접속자 수 : {{ slotBag.count }}명</p>
            </ScoppedSlot>
            <ScoppedSlot></ScoppedSlot>
          </div>
        </div>
        </div>

        










  </div>
</template>

<style scoped>
.columns {
  display: flex;
  gap: 16px;
  align-items: stretch;
  margin-bottom: 16px;
}

.column {
  flex: 1;
  min-width: 0;
  padding: 16px;
  border: 1px solid #e3e2e0;
  border-radius: 8px;
  background: #f7f6f3;
}

@media (max-width: 700px) {
  .columns {
    flex-direction: column;
  }
}

.text-danger {
  color: red;
  font-weight: bold;
}
.bg-dark {
  background-color: #333;
  color: white;
  padding: 15px;
}
.border-red {
  border: 3px solid red;
}
.border-gray {
  border: 3px solid #ccc;
}
.box {
  padding: 10px;
  margin-top: 5px;
  color: white;
  border-radius: 5px;
  background-color: #3498db;
}
.title {
  color: #ff7675;
  font-weight: bold;
  font-size: 18px;
}
.btn-external {
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  background: #42b983;
  color: white;
  cursor: pointer;
}
</style>
