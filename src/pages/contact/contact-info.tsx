import { useContext } from 'solid-js'
import {
  ExternalLink,
  IconCodepen,
  IconEnvelope,
  IconGithub,
  IconLinkedIn,
  IconMapMarker,
  IconPdf,
} from '../../components'
import { PageTransitionContext } from '../../components/page-transition'
import { textScramble } from '../../directives'
import { RefSetter, use } from '../../hooks'
import { MediaLink } from './media-link'
import { tw } from '../../utils/tw'

export const ContactInfo = (p: { ref?: RefSetter<HTMLDivElement> }) => {
  return (
    <div class="tags-div py-[35px]" ref={use(p.ref)}>
      <IntroHeading />
      <div class="my-[30px] flex flex-col gap-7 items-start">
        <ContactHeading
          as={ExternalLink}
          href="mailto:illia.chaban.8@gmail.com"
          $color="text"
        >
          <IconEnvelope /> illia.chaban.8@gmail.com
        </ContactHeading>
        <ContactHeading
          as={ExternalLink}
          href="https://docs.google.com/viewer?url=https://docs.google.com/document/d/1Q1eJ4p3lnqyGA5hYGV61Woh0eHEu0M6OcytNqIVpr0g/export?format=pdf"
          $color="text"
        >
          <IconPdf /> Resume
        </ContactHeading>

        <ContactHeading class="text-text-subtle2 opacity-85">
          <IconMapMarker /> Atlanta, GA
        </ContactHeading>
      </div>
      <div class="flex justify-between w-full">
        <MediaLink
          href="https://www.linkedin.com/in/illia-chaban/"
          aria-label="my-linkedin"
        >
          <IconLinkedIn />
        </MediaLink>
        <MediaLink href="https://github.com/illiaChaban" aria-label="my-github">
          <IconGithub />
        </MediaLink>
        <MediaLink
          href="https://codepen.io/illia_chaban/"
          aria-label="my-codepen"
        >
          <IconCodepen />
        </MediaLink>
      </div>
    </div>
  )
}

const ContactHeading = tw.h3`text-[1.5em] sm:text-[1.6em] 
font-mono font-bold m-0 [&>svg]:align-text-top`

const IntroHeading = () => {
  const { maskTransitionEnabled$ } = useContext(PageTransitionContext)
  const longestPhrase = phrases.reduce((a, b) => (a.length > b.length ? a : b))

  return (
    <>
      <Title
        ref={use(
          textScramble({
            delay: maskTransitionEnabled$() ? 1000 : 250,
            phrases,
            interval: 2000,
            doodleStyle: tw`text-highlight opacity-80`,
          }),
        )}
      >
        {phrases[0]}
      </Title>
      {/* add invisible title to avoid layout shift on mobile on title update */}
      <Title class="invisible h-0">{longestPhrase}</Title>
    </>
  )
}
const Title = tw.h3`
m-0 text-text-subtle1 uppercase
font-normal font-mono text-2xl
`
// eslint-disable-next-line quotes
const phrases = ['Hello friend,', "Let's build something great!"]
