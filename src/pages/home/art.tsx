import { Accessor, onMount } from 'solid-js'
import { ProgressiveImage } from '../../components/progressive-img'
import { Ref, useAtom } from '../../hooks'
import { bindEventWithCleanup } from '../../utils'
import { default as imgs } from './images'
import { tw } from '../../utils/tw'
import styles from './art.module.css'

export const Art = (p: { contentRef: Ref<HTMLElement> }) => {
  const contentWidth$ = useOffsetWidth(p.contentRef)

  return (
    <Container>
      <BaseContainer class="overflow-hidden">
        <div
          class={styles.artContainer}
          style={`--content-width: ${contentWidth$()}px;`}
        >
          <BaseContainer>
            <Mountain alt="mountain" sources={imgs.mountain} />
            <BaseContainer>
              <Rv alt="hippie van" sources={imgs.rv} />
              <div
                class={styles.squirell}
                style={{
                  'background-image': `url(${imgs.SquirrelSvg})`,
                }}
              />
            </BaseContainer>
          </BaseContainer>
        </div>
      </BaseContainer>
    </Container>
  )
}

const BaseContainer = tw('div')`relative size-full`

const Container = tw('div')`size-full absolute right-0 opacity-80`

const Mountain = tw(ProgressiveImage)`absolute right-0 w-full opaicity-80`

const Rv = tw(ProgressiveImage)`
  absolute 
  w-[--rv-width] top-[--rv-top] right-[--rv-right]
`

const useOffsetWidth = (ref: Ref<HTMLElement>): Accessor<number> => {
  const artWidth$ = useAtom(ref.current?.offsetWidth ?? 0)
  const update = () => artWidth$(ref.current?.offsetWidth ?? 0)

  bindEventWithCleanup(window, 'resize', update)
  onMount(update)
  return () => artWidth$()
}
