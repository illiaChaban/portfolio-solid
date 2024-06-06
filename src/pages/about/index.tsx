import { Heading, PageLink } from '../../components'
import { tw } from '../../utils/tw'
import { Art } from './art'

export default () => {
  return (
    <Container class="tags-body" id="about">
      <Content>
        <Heading>About</Heading>
        <div class="tags-div-end">
          <P>
            <Subtle>2016</Subtle> - moved to Atlanta, GA from Kyiv, Ukraine
          </P>
          <P>
            <Subtle>2018 Jan</Subtle> - fell in love with coding at
            DigitalCrafts
          </P>
          <P>
            <Subtle>2018 Jul</Subtle> - landed my first tech job with Capgemini
          </P>
          <P>
            <Subtle>2019 Oct</Subtle> - joined the Insiten team
          </P>
          <P>
            <Subtle>2021 Jul</Subtle> - after a great run with Insiten and a ton
            of projects (<PageLink page="projects">AMP</PageLink>,{' '}
            <PageLink page="projects">Tacklebox</PageLink> etc.) I joined forces
            with Motorefi
          </P>
          <P>
            <Subtle>2021 Nov</Subtle> - Motorefi became{' '}
            <PageLink page="projects">Caribou</PageLink> and we successefully
            completed all-company rebrand in 30 days!
          </P>

          <P>
            I feel grateful for being in the industry that most of all values
            skills, ideas and hard work, encourages change and rewards passion.
            I want to be a part of the team where I can learn and grow. I want
            to be challenged and hope to make a real impact.{' '}
            <PageLink page="skills">
              Here is what I bring to the table.
            </PageLink>
          </P>
          <P>
            When I’m not coding you can find me playing soccer, bouldering at
            Stone Summit or taking a nap. I love naps.
          </P>
        </div>
      </Content>
      <ArtContainer>
        <Art />
      </ArtContainer>
    </Container>
  )
}

export const Content = tw.div`
  flex flex-col justify-center
  p-[15px]
  pl-[5%]
  min-w-[250px]
  w-2/5
  max-sm_md:box-border
  max-sm_md:w-full
  max-sm_md:pt-0
`
export const P = tw.p`
  my-[18px] first:mt-2 last:mb-2
  text-base leading-tight
`

export const Container = tw.div`
  relative 
  flex justify-between flex-auto 
  max-sm_md:flex-col
`

export const ArtContainer = tw.div`
  flex flex-grow justify-center items-center relative min-h-[200px]
`

const Subtle = tw.span`text-text-subtle2`
