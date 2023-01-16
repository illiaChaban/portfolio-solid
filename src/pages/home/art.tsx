import { Accessor, onMount } from 'solid-js'
import { ProgressiveImage } from '../../components/progressive-img'
import { Ref, useAtom } from '../../hooks'
import { css, keyframes, styled } from '../../theme'
import { bindEventWithCleanup, media } from '../../utils'
import { default as imgs } from './images'

export const Art = (p: { contentRef: Ref<HTMLElement> }) => {
  const contentWidth$ = useOffsetWidth(p.contentRef)

  return (
    <Container>
      <BaseContainer
        class={css`
          overflow: hidden;
        `}
      >
        <ArtContainer style={`--content-width: ${contentWidth$()}px;`}>
          <BaseContainer>
            <Mountain alt="mountain" sources={imgs.mountain} />
            <BaseContainer>
              <Rv alt="hippie van" sources={imgs.rv} />
              <Squirell />
            </BaseContainer>
          </BaseContainer>
        </ArtContainer>
      </BaseContainer>
    </Container>
  )
}

const BaseContainer = styled('div')`
  width: 100%;
  height: 100%;
  position: relative;
`

const Container = styled(BaseContainer)`
  position: absolute;
  right: 0;
  opacity: 0.8;
`

const ArtContainer = styled('div')`
  --content-width: 100%; /* must be in pixels, will be updated with JS */
  --content-to-art-width-ratio: 0.95;
  --art-width: calc(var(--content-width) * var(--content-to-art-width-ratio));

  --mountain-width-to-height-ratio: calc(1058 / 433);
  --rv-width-to-height-ratio: calc(500 / 309);
  --mountain-height: calc(
    var(--art-width) / var(--mountain-width-to-height-ratio)
  );

  --rv-width: calc(var(--art-width) * 0.7);
  --rv-height: calc(var(--rv-width) / var(--rv-width-to-height-ratio));
  --rv-top: 28%;
  --rv-right: 9%;
  --rv-width-to-squirrel-height-ratio: 7;
  --squirrel-width: calc(var(--rv-width) / 5.25);
  --squirrel-height: calc(
    var(--rv-width) / var(--rv-width-to-squirrel-height-ratio)
  );

  position: absolute;
  top: 60px;
  right: 0px;
  width: var(--art-width);
  height: var(--mountain-height); /* mountain height */

  opacity: 0.8;
  -webkit-filter: hue-rotate(180deg);
  filter: hue-rotate(180deg);

  ${({ theme }) => media(theme.breakpoints.up(850))} {
    --content-to-art-width-ratio: 0.9;
    top: 80px;
  }

  ${({ theme }) => media(theme.breakpoints.up(961))} {
    --starting-top: 160px;
    --content-diff: calc(var(--content-width) - 960px);
    --ratio: calc((1320 - 960) / 120);
    top: calc(var(--starting-top) - var(--content-diff) / var(--ratio));

    /* cut off right side */
    right: calc(var(--art-width) * -0.1);
    --content-to-art-width-ratio: 0.8;
  }

  ${({ theme }) => media(theme.breakpoints.up(1320))} {
    top: 0px;
  }

  ${({ theme }) => media(theme.breakpoints.down(660))} {
    top: 0px;
  }
`

const Mountain = styled(ProgressiveImage)`
  position: absolute;
  width: 100%;
  right: 0px;
  opacity: 0.8;
`
const Rv = styled(ProgressiveImage)`
  position: absolute;
  width: var(--rv-width);
  top: var(--rv-top);
  right: var(--rv-right);
`

const Squirell = styled('div')`
  position: absolute;
  top: 28%;
  right: 48%;

  /* determines how long is squirrel's jump */
  width: var(--squirrel-width);
  height: var(--squirrel-height);
  /* bug occurs here if --squirrel-height is in percentage */
  background-size: calc(var(--squirrel-height) * 1.2);
  background-repeat: no-repeat;
  background-image: url(${imgs.SquirrelSvg});
  transform: scaleX(-1); /* "mirror" effect on squirrel */

  animation: ${keyframes`
    0% {
      background-position: left top;
    }

    15% {
      top: 29%;
    }

    30% {
      top: 32%;
    }

    75% {
      top: 46%;
      right: 55%;
      background-position-x: 100%;
    }

    100% {
      background-position: 100% bottom;
      top: 46%;
      right: 55%;
    }
  `} 1s steps(9) 2s forwards;
`

const useOffsetWidth = (ref: Ref<HTMLElement>): Accessor<number> => {
  const artWidth$ = useAtom(ref.current?.offsetWidth ?? 0)
  const update = () => artWidth$(ref.current?.offsetWidth ?? 0)

  bindEventWithCleanup(window, 'resize', update)
  onMount(update)
  return () => artWidth$()
}
