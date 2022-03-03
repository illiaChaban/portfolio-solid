import { ExternalLink, Heading, PageLink } from '../../components'
import { css, useTheme } from '../../theme'
import { cx, media } from '../../utils'
import { ArtContainer, Container, Content, P } from '../about'
import { Art } from './art'

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
            My main area of expertise is all things JavaScript. I love working
            with TypeScript and RxJS. Angular/React are my frameworks of choice
            for the client side. I also have a good amount of experience working
            with C# with .Net and Node with Express.js on the back-end.
          </P>
          <P>
            For more details you can visit my{' '}
            <ExternalLink href="https://www.linkedin.com/in/illia-chaban/">
              LinkedIn
            </ExternalLink>{' '}
            profile or just{' '}
            <PageLink page="contact" id="contact-me2">
              contact me
            </PageLink>
            .
          </P>
        </div>
      </Content>
      <ArtContainer>
        <Art />
      </ArtContainer>
    </Container>
  )
}
