import { Button } from '../../components'
import { css, styled, useTheme } from '../../theme'
import { media } from '../../utils'

export const Art = () => {
  const { breakpoints } = useTheme()
  return (
    <Wrapper>
      <Container>
        <ImgWrapper id="img"></ImgWrapper>
        <QuoteWrapper id="quote">
          <Quotation>
            <span></span>
          </Quotation>
          <Author></Author>
        </QuoteWrapper>
        <Button>More wisdom</Button>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled('div')`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
`

const Container = styled('div')`
  min-width: 400px;
  min-height: 400px;
  width: 400px;
  position: relative;
  bottom: 5%;

  ${({ theme }) => theme.breakpoints.down(780)} {
    min-width: auto;
    padding: 10px;
  }
`

const ImgWrapper = styled('div')`
  width: 100%;
  height: 400px;
  position: relative;

  &,
  & svg {
    opacity: 0.5;
    width: 100%;
    height: auto;
    position: absolute;
    bottom: 0;
  }

  ${({ theme }) => media(theme.breakpoints.down(780))} {
    height: 320px;
    & svg {
      max-height: 100%;
    }
  }
`

const QuoteWrapper = styled('div')`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: 'Inconsolata', sans-serif; /* 'Special Elite',  */
  font-size: 0.9rem;
  line-height: 1.2rem;
  /* color: var(--color-subtle); */
  position: relative;
  min-height: 4rem;
  padding: 15px 0;

  display: flex;
  flex-direction: column;
`

const Quotation = styled('div')`
  &::before,
  &::after {
    color: ${({ theme }) => theme.colors.text.subtle1};
  }
  &::before {
    content: '<<';
  }
  &::after {
    content: '>>';
  }
`

const Author = styled('div')`
  color: var(--color-highlight);
  opacity: 0.8;
`
