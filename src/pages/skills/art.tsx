import { default as WordCloud } from 'tag-canvas'
import { getCssVariable } from '../../utils'
import { JSX, onMount } from 'solid-js'
import { tw } from '../../utils/tw'

export default () => {
  const canvasId = 'skills-canvas'
  const listId = 'skills-cloud'
  onMount(async () => {
    const cloudOptions = useSkillsCloudOptions()
    // Reference: https://www.goat1000.com/tagcanvas-options.php
    // https://www.goat1000.com/tagcanvas-install.php
    WordCloud.Start(canvasId, listId, cloudOptions)
  })

  return (
    <Container>
      <canvas width="500" height="500" id={canvasId}>
        <ul id={listId}>
          <ListLink
            size={2}
            href="https://en.wikipedia.org/wiki/React_(web_framework)"
          >
            React
          </ListLink>
          <ListLink
            size={2}
            href="https://en.wikipedia.org/wiki/Angular_(web_framework)"
          >
            Angular
          </ListLink>
          <ListLink
            size={3}
            href="https://en.wikipedia.org/wiki/Reactive_programming"
          >
            RxJS
          </ListLink>
          <ListLink size={3} href="https://en.wikipedia.org/wiki/TypeScript">
            TypeScript
          </ListLink>
          <ListLink
            size={2}
            href="https://en.wikipedia.org/wiki/Sass_(stylesheet_language)"
          >
            SASS
          </ListLink>
          <ListLink
            size={3}
            href="https://en.wikipedia.org/wiki/C_Sharp_(programming_language)"
          >
            C#
          </ListLink>
          <ListLink
            size={2}
            href="https://en.wikipedia.org/wiki/.NET_Framework"
          >
            .NET
          </ListLink>

          <ListLink size={1} href="https://en.wikipedia.org/wiki/Node.js">
            Node.js
          </ListLink>
          <ListLink size={2} href="https://en.wikipedia.org/wiki/Git">
            Git
          </ListLink>
          <ListLink href="https://en.wikipedia.org/wiki/Bootstrap_(front-end_framework)">
            Bootstrap
          </ListLink>
          <ListLink size={1} href="https://en.wikipedia.org/wiki/JQuery">
            jQuery
          </ListLink>
          <ListLink href="http://mongoosejs.com/">MongoDB</ListLink>
          <ListLink href="https://en.wikipedia.org/wiki/PostgreSQL">
            PostgreSQL
          </ListLink>
          <ListLink href="https://en.wikipedia.org/wiki/Database">
            SQL/NoSQL
          </ListLink>
          <ListLink href="https://en.wikipedia.org/wiki/React_Native">
            React Native
          </ListLink>
          <ListLink href="https://en.wikipedia.org/wiki/D3.js">D3.js</ListLink>
          <ListLink href="https://en.wikipedia.org/wiki/GraphQL">
            GraphQL
          </ListLink>
          <ListLink href="https://en.wikipedia.org/wiki/Express.js">
            Express.js
          </ListLink>
          <ListLink href="https://en.wikipedia.org/wiki/Amazon_Web_Services">
            AWS
          </ListLink>
        </ul>
      </canvas>
    </Container>
  )
}

const Container = tw('div')`
  size-full
  flex justify-center items-center
  pointer-events-none desktopHover:pointer-events-auto
  [&_canvas]:w-[90%] [&_canvas]:max-w-[650px] [&_canvas]:h-auto
`

// Needs to be a hook to get css variable
const useSkillsCloudOptions = () => ({
  textColour: getCssVariable('--tw-colors-highlight'),

  maxSpeed: 0.04,
  freezeActive: true,
  shuffleTags: true,
  shape: 'sphere',
  zoom: 0.9,
  noSelect: true,

  textFont: 'Courier',

  pinchZoom: false,
  freezeDecel: true,
  fadeIn: 1500,
  initial: [0.3, -0.1],
  depth: 0.8,

  weight: true,
  wheelZoom: false,
})

type Size = 0 | 1 | 2 | 3
const ListLink = (p: { href: string; size?: Size; children: JSX.Element }) => {
  const fontSizes = [tw`text-base`, tw`text-lg`, tw`text-xl`, tw`text-2xl`]
  return (
    <li>
      <a
        href={p.href}
        class={fontSizes[p.size ?? 0]}
        target="_blank"
        rel="noopener"
      >
        {p.children}
      </a>
    </li>
  )
}
