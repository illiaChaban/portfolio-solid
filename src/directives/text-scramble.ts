// Original text scramble is taken from codepen. Pen by Lorenzo
// https://codepen.io/lollocll/pen/qPmLMr
// Thanks!

// Was updated by me for my needs :)

type Config = {
  phrases: string[]
  interval: number
  infinite: boolean
  doodleStyle: string
}
class TextScramble {
  private currIndex = 0
  private doodles = '!<>-_\\/[]{}—=+*^?#________'

  private config: Config

  private queue: {
    from: string
    to: string
    start: number
    end: number
    char?: string
  }[] = []

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private resolve!: () => void
  private frameRequest!: number
  private frame = 0

  constructor(private el: HTMLElement, config: Partial<Config> = {}) {
    this.config = {
      phrases: [this.el.innerText],
      infinite: false,
      interval: 2500,
      doodleStyle: '',
      ...config,
    }
  }
  setText(newText: string) {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise(resolve => (this.resolve = resolve as any))
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
  update = () => {
    let output = ''
    let complete = 0
    for (let i = 0, n = this.queue.length; i < n; i++) {
      // eslint-disable-next-line prefer-const
      let { from, to, start, end, char } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.getDoodle()
          this.queue[i].char = char
        }
        output += `<span class='${this.config.doodleStyle}'>${char}</span>`
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
  animate = () => {
    if (this.currIndex < this.config.phrases.length) {
      this.setText(this.config.phrases[this.currIndex]).then(() => {
        this.currIndex++
        if (this.config.infinite) this.currIndex %= this.config.phrases.length
        setTimeout(this.animate, this.config.interval)
      })
    } else {
      // reset animator till next call
      this.currIndex = 0
    }
  }
}

type DirectiveConfig = Partial<Config> & {
  delay: number
}
export const textScramble =
  ({ delay = 1000, ...config }: DirectiveConfig) =>
  (node: HTMLElement) => {
    const scramble = new TextScramble(node, config)
    setTimeout(scramble.animate, delay)
  }
