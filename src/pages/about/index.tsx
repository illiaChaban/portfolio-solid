import { Heading, PageLink } from '../../components'
import { styled, useTheme } from '../../theme'
import { cx, media } from '../../utils'
import { Art } from './art'

export default () => {
  const { sharedStyles } = useTheme()

  return (
    <Container class={cx(sharedStyles.tags.body)} id="about">
      <Content>
        <Heading>About</Heading>
        <div class={sharedStyles.tags.divEnd}>
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
          <P></P>
        </div>
      </Content>
      <ArtContainer>
        <Art />
      </ArtContainer>
    </Container>
  )
}

export const Content = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 15px;
  padding-left: 5%;
  min-width: 250px;
  width: 40%;

  ${({ theme }) => media(theme.breakpoints.down(780))} {
    box-sizing: border-box;
    width: 100%;
    padding-top: 0;
  }
`

export const P = styled('p')`
  margin: 18px 0;
  font-size: 0.9rem;
  line-height: 1.1rem;
  &:first-child {
    margin-top: 8px;
  }
  &:last-child {
    margin-bottom: 8px;
  }
`

export const Container = styled('div')`
  display: flex;
  justify-content: space-between;
  position: relative;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
  ${({ theme }) => media(theme.breakpoints.down(780))} {
    flex-direction: column;
  }
`

export const ArtContainer = styled('div')`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  position: relative;
`

const Subtle = styled('span')`
  color: ${({ theme }) => theme.colors.text.subtle2};
`
