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

const Container = tw.div`absolute center size-[30px]`

const BlobBase = tw.div`
  absolute center
  text-highlight
  border-2 border-solid border-curr
  size-2.5 rounded-circle
`

const BlobTop = tw(BlobBase)`${styles.blobTop}`
const BlobBottom = tw(BlobBase)`${styles.blobBottom}`
const BlobLeft = tw(BlobBase)`${styles.blobLeft}`
const BlobMove = tw(BlobBase)`bg-curr ${styles.blobMove}`
