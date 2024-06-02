import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import solidPlugin from 'vite-plugin-solid'
import { homeIntroText } from './src/pages/home/home-intro-text'
import { _, join, split, uniq, replaceAll } from '@illlia/ts-utils'

const injectHomeTitleChars = uniqueCharacters(...homeIntroText)
const injectTagsChars = uniqueCharacters('</h1></div></body>')

export default defineConfig({
  plugins: [
    createHtmlPlugin({
      template: 'index.html',
      inject: {
        data: {
          injectHomeTitleChars,
          injectTagsChars,
        },
      },
    }),
    solidPlugin(),
  ],
  build: {
    target: 'esnext',
  },
})

function uniqueCharacters(...strings: string[]): string {
  return _(strings, join(''), split(''), uniq, join(''), replaceAll(' ', '%20'))
}
