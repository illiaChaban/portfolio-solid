import { lazy } from 'solid-js'
import {
  CachedComponent,
  ExternalLink,
  Heading,
  PageLink,
} from '../../components'
import { SpinnerSuspence } from '../../components/spinner-suspence'
import { css, useTheme } from '../../theme'
import { cx, media } from '../../utils'
import { ArtContainer, Container, Content, P } from '../about'

export default () => {
  const { sharedStyles, breakpoints } = useTheme()
  return (
    <Container class={cx(sharedStyles.tags.body)} id="skills">
      <Content
        class={css`
          width: 35%;
          ${media(breakpoints.down(780))} {
            box-sizing: border-box;
            width: 100%;
            padding-top: 0;
          }
        `}
      >
        <Heading>Skills</Heading>

        <div class={sharedStyles.tags.divEnd}>
          <P>
            I am an all-around web developer with good knowledge of front-end
            and back-end techniques.
          </P>
          <P>
            I take pride in what I do and I love to write elegant and clean
            code.
          </P>
          <P>
            My main area of expertise is all things JavaScript. I enjoy working
            with TypeScript and RxJS. SolidJS/React are my client side
            frameworks of choice, although I have had experience with myriad of
            different technologies. I also have good amount of experience
            working with C# with .NET and Node with NestJS on the back-end.
          </P>
          <P>
            You can learn about some of my projects{' '}
            <PageLink page="projects" id="contact-me2">
              here
            </PageLink>
            .
          </P>
        </div>
      </Content>
      <ArtContainer>
        <SpinnerSuspence>
          <AsyncArt />
        </SpinnerSuspence>
      </ArtContainer>
    </Container>
  )
}

const AsyncArt = lazy(async () => {
  return import('./art')
  const { default: Art } = await import('./art')
  return {
    default: () => {
      return <CachedComponent key="skills-cloud" Component={Art as any} />
    },
  }
})
