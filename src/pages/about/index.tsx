import { Heading, ExternalLink } from '../../components'
import { css, styled, useTheme } from '../../theme'
import { cx, media } from '../../utils'
import { Art } from './art'

const Content = styled('div')`
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

const P = styled('p')`
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

const Container = styled('div')`
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

const Subtle = styled('span')`
  color: ${({ theme }) => theme.colors.text.subtle2};
`

const About = () => {
  const { sharedStyles } = useTheme()
  return (
    <Container class={cx(sharedStyles.tags.body)} id="about">
      <Content>
        <Heading class={sharedStyles.tags.h1}>About</Heading>
        <div
          class={cx(
            sharedStyles.tags.divEnd,
            css`
              padding-bottom: 25px;
            `,
          )}
        >
          <P>
            <Subtle>2016</Subtle> - moved to Atlanta, GA from Kyiv, Ukraine
          </P>
          <P>
            <Subtle>2018 Jan</Subtle> - fell in love with coding at
            DigitalCrafts software development bootcamp
          </P>
          <P>
            <Subtle>2018 Jul</Subtle> - landed my first tech job with Capgemini
          </P>
          <P>
            <Subtle>2019 Mar</Subtle> - left Capgemini and made this cool
            portfolio
          </P>
          <P>
            <Subtle>2019 Oct</Subtle> - joined the Insiten team
          </P>
          <P>
            <Subtle>2020 Jul</Subtle> - we launched{' '}
            <ExternalLink href="https://tacklebox.app/">TackleBox</ExternalLink>
            !
          </P>
          <P>
            <Subtle>2021 Jul</Subtle> - after a great run with Insiten, I joined
            forces with Motorefi
          </P>
          <P>
            <Subtle>2021 Nov</Subtle> - Motorefi became Caribou and we
            successefully completed all-company rebrand in 30 days!
          </P>

          <P>
            I feel grateful for being in the industry that most of all values
            skills, ideas and hard work, encourages change and rewards passion.
            I want to be a part of the team where I can learn and grow. I want
            to be challenged and hope to make a real impact.
          </P>
          <P>
            When I’m not coding you can find me playing soccer, bouldering at
            Stone Summit or taking a nap. I love naps.
          </P>
        </div>
      </Content>
      <Art />
    </Container>
  )
}

export default About
