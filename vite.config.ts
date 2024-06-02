import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import solidPlugin from 'vite-plugin-solid'
import { homeIntroText } from './src/pages/home/home-intro-text'

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
  const uniqueChars = [...new Set(strings.join('').split(''))].join('')
  return uniqueChars.replaceAll(' ', '%20')

  // return _(strings, join(''), split(''), uniq, replaceAll(' ', '%20'))
}
