// Original text scramble is taken from codepen. Pen by Lorenzo
// https://codepen.io/lollocll/pen/qPmLMr
// Thanks!

// Was updated by me for my needs :)
class TextScramble {
  constructor(el: Element, config = {}) {
    this.el = el
    this.doodles = '!<>-_\\/[]{}—=+*^?#________'
    this.update = this.update.bind(this)
    this.animate = this.animate.bind(this)

    // configuration
    this.phrases = config.phrases || [this.el.innerText]
    this.infinite = config.infinite || false
    this.interval = config.interval || 2500
    this.currIndex = 0
  }
  setText(newText) {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise(resolve => (this.resolve = resolve))
    this.queue = []
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      const start = Math.floor(Math.random() * 40)
      const end = start + Math.floor(Math.random() * 40)
      this.queue.push({ from, to, start, end })
    }
    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }
  update() {
    let output = ''
    let complete = 0
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.getDoodle()
          this.queue[i].char = char
        }
        output += `<span class='doodle'>${char}</span>`
      } else {
        output += from
      }
    }
    this.el.innerHTML = output
    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
  }
  getDoodle() {
    return this.doodles[Math.floor(Math.random() * this.doodles.length)]
  }
  animate() {
    if (this.currIndex < this.phrases.length) {
      this.setText(this.phrases[this.currIndex]).then(() => {
        this.currIndex++
        if (this.infinite) this.currIndex %= this.phrases.length
        setTimeout(this.animate, this.interval)
      })
    } else {
      // reset animator till next call
      this.currIndex = 0
    }
  }
}

export const textScramble = (node: Element, delay = 0) => {
  const scramble = new TextScramble(node)
  setTimeout(scramble.animate, delay)
}
