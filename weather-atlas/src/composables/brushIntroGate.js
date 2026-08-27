import { ref } from 'vue'

/** Bumped on each brand click so Home can remount the intro. */
export const brushIntroTicket = ref(0)

/** True until Home consumes it and starts the brush hero. */
export const pendingBrushIntro = ref(false)

export const requestBrushIntro = () => {
  pendingBrushIntro.value = true
  brushIntroTicket.value += 1
}
