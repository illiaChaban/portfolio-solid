import { ComponentProps } from 'solid-js'
import { tw } from '../utils/tw'
import styles from './blob-spinner.module.css'

export const BlobSpinner = (p: ComponentProps<typeof Container>) => {
  return (
    <Container {...p}>
      <BlobTop />
      <BlobBottom />
      <BlobLeft />
      <BlobMove />
    </Container>
  )
}

const centerAbsolute = tw`
  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
`
const Container = tw('div')`${centerAbsolute} size-[30px]`

const BlobBase = tw('div')`
  ${centerAbsolute}
  text-highlight
  border-2 border-solid border-curr
  size-2.5 rounded-circle
`

const BlobTop = tw(BlobBase)`${styles.blobTop}`
const BlobBottom = tw(BlobBase)`${styles.blobBottom}`
const BlobLeft = tw(BlobBase)`${styles.blobLeft}`
const BlobMove = tw(BlobBase)`bg-curr ${styles.blobMove}`
