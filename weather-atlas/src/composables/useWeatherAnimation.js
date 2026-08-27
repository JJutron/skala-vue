import { onBeforeUnmount } from 'vue'
import anime from 'animejs/lib/anime.es.js'
import { regionEnterOrder } from '../data/regions.js'

const reduced = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

const regionIndex = (el) => {
  const id = el.closest?.('[data-region]')?.getAttribute('data-region')
  const index = regionEnterOrder.indexOf(id)
  return index === -1 ? 99 : index
}

const byDrawOrder = (a, b) => {
  const region = regionIndex(a) - regionIndex(b)
  if (region) return region
  return (b.getTotalLength?.() ?? 0) - (a.getTotalLength?.() ?? 0)
}

export const useWeatherAnimation = () => {
  const running = []

  const track = (instance) => {
    running.push(instance)
    return instance
  }

  const stopAll = () => {
    running.splice(0).forEach((instance) => instance.pause?.())
  }

  const drawMap = ({ majors = [], specks = [], labels = [] } = {}) => {
    const coasts = [...majors].sort(byDrawOrder)
    const islands = [...specks].sort(byDrawOrder)
    const names = [...labels].sort(byDrawOrder)

    if (reduced()) {
      ;[...coasts, ...islands].forEach((el) => {
        el.style.strokeDashoffset = '0'
        el.style.fillOpacity = '1'
      })
      names.forEach((el) => {
        el.style.opacity = '1'
      })
      return
    }

    ;[...coasts, ...islands].forEach((el) => {
      const length = Math.max(el.getTotalLength?.() ?? 0, 1)
      el.style.fillOpacity = '0'
      el.style.strokeDasharray = `${length}`
      el.style.strokeDashoffset = `${length}`
      el.style.willChange = 'stroke-dashoffset, fill-opacity'
    })
    names.forEach((el) => {
      el.style.opacity = '0'
    })

    const timeline = track(
      anime.timeline({
        easing: 'easeOutCubic',
        complete: () => {
          ;[...coasts, ...islands].forEach((el) => {
            el.style.willChange = 'auto'
          })
        },
      }),
    )

    if (coasts.length) {
      timeline.add({
        targets: coasts,
        strokeDashoffset: 0,
        delay: anime.stagger(48),
        duration: 1180,
      })
    }

    if (islands.length) {
      timeline.add(
        {
          targets: islands,
          strokeDashoffset: 0,
          delay: anime.stagger(16),
          duration: 520,
          easing: 'easeOutCubic',
        },
        '-=640',
      )
    }

    const fills = [...coasts, ...islands]
    if (fills.length) {
      timeline.add(
        {
          targets: fills,
          fillOpacity: [0, 1],
          delay: anime.stagger(36),
          duration: 640,
          easing: 'easeOutCubic',
        },
        '-=720',
      )
    }

    if (names.length) {
      timeline.add(
        {
          targets: names,
          opacity: [0, 1],
          translateY: [6, 0],
          delay: anime.stagger(70),
          duration: 420,
          easing: 'easeOutQuad',
        },
        '-=280',
      )
    }
  }

  const hoverRegion = (el) => {
    if (!el) return
    anime.remove(el)
    if (reduced()) {
      el.style.opacity = '1'
      return
    }
    track(
      anime({
        targets: el,
        opacity: 1,
        duration: 180,
        easing: 'easeOutQuart',
      }),
    )
  }

  const leaveRegion = (el, dimmed) => {
    if (!el) return
    anime.remove(el)
    if (reduced()) {
      el.style.opacity = dimmed ? '0.28' : '1'
      return
    }
    track(
      anime({
        targets: el,
        opacity: dimmed ? 0.28 : 1,
        duration: 220,
        easing: 'easeOutQuart',
      }),
    )
  }

  onBeforeUnmount(stopAll)

  return {
    drawMap,
    hoverRegion,
    leaveRegion,
    stopAll,
    reduced,
  }
}
