import { lazy } from 'solid-js'
import { Heading, PageLink } from '../../components'
import { SpinnerSuspence } from '../../components/spinner-suspence'
import { ArtContainer, Container, Content, P } from '../about'

export default () => {
  return (
    <Container class="tags-body" id="skills">
      <Content class="w-[35%] max-sm_md:box-border max-sm_md:w-full max-sm_md:pt-0">
        <Heading>Skills</Heading>

        <div class="tags-div-end">
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
            with TypeScript and RxJS. Although I have had experience with myriad
            of different technologies SolidJS/React are my client side
            frameworks of choice. I also have a good amount of experience
            working with C#, .NET and Node with NestJS on the back-end.
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

const AsyncArt = lazy(() => import('./art'))
