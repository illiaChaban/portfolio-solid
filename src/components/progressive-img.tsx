import { JSX, onMount, splitProps } from 'solid-js'
import { useAtom, useRef } from '../hooks'
import { OmitSafe } from '../types'
import { Load } from '../utils'

type SmallPngImgSrc = string
type MappedSrc = string
const loadedImagesMap: Record<SmallPngImgSrc, MappedSrc> = {}

type Sources = {
  png: { sm: string; md: string; lg: string }
  // safari has only partial support for webp
  webp: { sm: string; lg: string }
}
export const ProgressiveImage = (
  p: {
    sources: Sources
  } & OmitSafe<JSX.IntrinsicElements['img'], 'src'>,
) => {
  const [p1, p2] = splitProps(p, ['sources'])
  const ref = useRef<HTMLImageElement>()

  const betterQualitySrc$ = useAtom<string>(loadedImagesMap[p1.sources.png.sm])

  !betterQualitySrc$() &&
    onMount(async () => {
      // load better quality image
      const loadedSrc = await getImgCurrSrc(ref.current)
      const newSrc = webpIsSupported(loadedSrc)
        ? p.sources.webp.lg
        : p.sources.png[window.innerWidth > 650 ? 'lg' : 'md']

      await Load.image(newSrc)
      loadedImagesMap[p1.sources.png.sm] = newSrc
      betterQualitySrc$(newSrc)
    })

  return () =>
    betterQualitySrc$() ? (
      <img {...p2} src={betterQualitySrc$()} />
    ) : (
      <picture>
        <source srcset={p1.sources.webp.sm} type="image/webp" />
        <img {...p2} src={p1.sources.png.sm} ref={ref} />
      </picture>
    )
}

const getImgCurrSrc = (img: HTMLImageElement): Promise<string> | string => {
  return img.complete
    ? img.currentSrc
    : new Promise(resolve => {
        img.onload = () => resolve(img.currentSrc)
      })
}

const webpIsSupported = (currentImageSrc: string) => {
  const l = currentImageSrc.length
  const last4extension = currentImageSrc.slice(l - 4, l)
  return last4extension === 'webp'
}
