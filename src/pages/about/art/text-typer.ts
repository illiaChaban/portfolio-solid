import { css, keyframes } from '../../../theme'
import { scope } from '../../../utils'

export class TextTyper {
  private cursorBlinkerTimeoutId: number | undefined
  private waitCharacters = '.?!'
  private stopAnimation = false
  private currPromiseChain = Promise.resolve()

  constructor(
    private container: HTMLElement,
    private minTypingTime = 30,
    private randomTypingTime = 175,
  ) {}

  public type(text: string) {
    this.addCursor()
    for (const char of text) {
      this.typeLetter(char)
      if (this.waitCharacters.includes(char)) this.wait(1000)
      if (char === ',') this.wait(300)
    }
    return this
  }

  public remove(num: number) {
    for (let i = 0; i < num; i++) {
      this.removeLetter()
    }
    return this
  }

  public wait(time: number) {
    this.chain(
      () =>
        new Promise(resolve => {
          setTimeout(resolve, time)
        }),
    )
    return this
  }

  private typeLetter(char: string) {
    this.chain(
      () =>
        new Promise(resolve => {
          setTimeout(() => {
            this.container.innerText += char
            this.stopCursorBlinking()
            resolve()
          }, this.getRandomTimeout())
        }),
    )
    return this
  }

  private getRandomTimeout() {
    // simulates real person's typing
    return Math.random() * this.randomTypingTime + this.minTypingTime
  }

  private stopCursorBlinking() {
    this.container.classList.add(styles.typing)
    clearTimeout(this.cursorBlinkerTimeoutId)
    this.cursorBlinkerTimeoutId = setTimeout(() => {
      this.container.classList.remove(styles.typing)
    }, 200)
  }

  private removeLetter() {
    this.chain(
      () =>
        new Promise(resolve => {
          setTimeout(() => {
            const currText = this.container.innerText
            this.container.innerText = currText.slice(0, currText.length - 1)
            this.stopCursorBlinking()
            resolve()
          }, this.getRandomTimeout() / 2.5)
          // removing characters is usually much faster than typing
        }),
    )
    return this
  }

  public chain(callback: () => Promise<void> | void, cancelable = true) {
    this.currPromiseChain = this.currPromiseChain.then(() => {
      if (cancelable && this.stopAnimation) return
      return callback()
    })
    return this
  }

  public clear() {
    this.chain(() => {
      this.container.innerText = ''
    })
    return this
  }
  public stop() {
    this.stopAnimation = true
    this.chain(() => {
      this.stopAnimation = false
    }, false)
    return this
  }
  public clearNow() {
    this.stop().clear()
    return this
  }

  public addCursor() {
    this.chain(() => this.container.classList.add(styles.cursor))
    return this
  }

  public removeCursor() {
    this.chain(() => this.container.classList.remove(styles.cursor))
    return this
  }
}

const styles = scope(() => {
  const blinkTextCursor = keyframes`
    0%, 25%, 80%, 100% {
      opacity: 1;
    }
    30%, 75% {
      opacity: 0;
    }
  `
  const typing = css``

  return {
    cursor: css`
      &::after {
        content: '|';
        color: var(--color-main);
        font-family: Helvetica, sans-serif;
        opacity: 1;
        -webkit-animation: ${blinkTextCursor} 1s infinite;
        animation: ${blinkTextCursor} 1s infinite;
      }
      &.${typing}::after {
        animation: none;
      }
    `,
    typing,
  }
})
