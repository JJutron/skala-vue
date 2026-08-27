import { ref } from 'vue'

/** Bumped on each brand click so Home can remount the intro. */
export const brushIntroTicket = ref(0)

/** True until Home consumes it and starts the brush hero. */
export const pendingBrushIntro = ref(false)

/** When true, next Home mount skips the hero (지도 메뉴). */
export const skipBrushIntroOnce = ref(false)

export const requestBrushIntro = () => {
  skipBrushIntroOnce.value = false
  pendingBrushIntro.value = true
  brushIntroTicket.value += 1
}

export const requestSkipIntro = () => {
  pendingBrushIntro.value = false
  skipBrushIntroOnce.value = true
}
