import { ExternalLink, PageLink } from '../../components'
import { Art } from './art'

const Skills = () => {
  return (
    <div class="flex flex-1 main-container body-tags" id="skills">
      <div class="content">
        <h1 class="h1-tags">Skills</h1>
        <div class="div-tags-end">
          <p>
            I am an all-around web developer with good knowledge of front-end
            and back-end techniques.
          </p>
          <p>
            I take pride in what I do and I love to write elegant and clean
            code.
          </p>
          <p>
            My main area of expertise is all things JavaScript. I love working
            with TypeScript and RxJS. Angular/React are my frameworks of choice
            for the client side. I also have a good amount of experience working
            with C# with .Net and Node with Express.js on the back-end.
          </p>
          <p>
            For more details you can visit my{' '}
            <ExternalLink href="https://www.linkedin.com/in/illia-chaban/">
              LinkedIn
            </ExternalLink>{' '}
            profile or just{' '}
            <PageLink page="contact" id="contact-me2">
              contact me
            </PageLink>
            .
          </p>
        </div>
      </div>
      <Art />
    </div>
  )
}

export default Skills
