import { useContext } from 'solid-js'
import { Icon, ExternalLink } from '../../components'
import { PageTransitionContext } from '../../components/page-transition'
import { textScramble } from '../../directives'
import { RefSetter, use } from '../../hooks'
import { MediaLink } from './media-link'
import { tw } from '../../utils/tw'

export const ContactInfo = (p: { ref?: RefSetter<HTMLDivElement> }) => {
  return (
    <div class="tags-div py-[35px]" ref={use(p.ref)}>
      <IntroHeading />
      <div class="my-[30px]">
        <LinkWrapper>
          <ExternalLink href="mailto:illia.chaban.8@gmail.com" $color="text">
            <Icon name="envelope" class="relative top-0.5" />{' '}
            illia.chaban.8@gmail.com
          </ExternalLink>
        </LinkWrapper>
        <LinkWrapper>
          <ExternalLink
            href="https://docs.google.com/viewer?url=https://docs.google.com/document/d/1Q1eJ4p3lnqyGA5hYGV61Woh0eHEu0M6OcytNqIVpr0g/export?format=pdf"
            $color="text"
          >
            <Icon name="pdf" /> Resume
          </ExternalLink>
        </LinkWrapper>

        <LinkWrapper class="text-text-subtle2 opacity-85">
          <Icon name="mapMarker" /> Atlanta, GA
        </LinkWrapper>
      </div>
      <div class="flex justify-between w-full">
        <MediaLink
          href="https://www.linkedin.com/in/illia-chaban/"
          aria-label="my-linkedin"
        >
          <Icon name="linkedIn" />
        </MediaLink>
        <MediaLink href="https://github.com/illiaChaban" aria-label="my-github">
          <Icon name="github" />
        </MediaLink>
        <MediaLink
          href="https://codepen.io/illia_chaban/"
          aria-label="my-codepen"
        >
          <Icon name="codepen" />
        </MediaLink>
      </div>
    </div>
  )
}

const LinkWrapper = tw('h2')`my-[0.85em] text-2xl font-mono`

const IntroHeading = () => {
  const { maskTransitionEnabled$ } = useContext(PageTransitionContext)
  return (
    <h3
      ref={use(
        textScramble({
          delay: maskTransitionEnabled$() ? 1000 : 250,
          phrases,
          interval: 2000,
          doodleStyle: tw`text-highlight opacity-80`,
        }),
      )}
      class={tw`
        m-0 text-text-subtle1 uppercase
        text-[1.3rem] !text-xl font-thin font-mono
      `}
    >
      {phrases[0]}
    </h3>
  )
}
// eslint-disable-next-line quotes
const phrases = ['Hello friend,', "Let's build something great!"]
