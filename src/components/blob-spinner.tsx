import { keyframes, styled } from '../theme'

export const BlobSpinner = (p: { class?: string }) => {
  return (
    <Container class={p.class}>
      <BlobTop />
      <BlobBottom />
      <BlobLeft />
      <BlobMove />
    </Container>
  )
}

const Container = styled('div')`
  --spinner-color: ${({ theme }) => theme.colors.primary};
  position: absolute;
  width: 30px;
  height: 30px;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`

const BlobBase = styled('div')`
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  border: 2px solid var(--spinner-color);
  width: 10px;
  height: 10px;
  border-radius: 50%;
`

const blobTop = keyframes`
  50% {
    top: 0;
    left: 50%;
  }
  75%, 100% {
    top: 50%;
    left: 0;
  }
`
const BlobTop = styled(BlobBase)`
  top: 0;
  -webkit-animation: ${blobTop} 1s infinite ease-in;
  animation: ${blobTop} 1s infinite ease-in;
`

const blobBottom = keyframes`
  25%, 50%, 75% {
    top: 50%;
    left: 100%;
  }
  100% {
    top: 0;
    left: 50%;
  }
`
const BlobBottom = styled(BlobBase)`
  top: 100%;
  -webkit-animation: ${blobBottom} 1s infinite ease-in;
  animation: ${blobBottom} 1s infinite ease-in;
`

const blobLeft = keyframes`
  25% {
    top: 50%;
    left: 0;
  }
  50%, 100% {
    top: 100%;
    left: 50%;
  }
`
const BlobLeft = styled(BlobBase)`
  left: 0;
  -webkit-animation: ${blobLeft} 1s infinite ease-in;
  animation: ${blobLeft} 1s infinite ease-in;
`

const blobMove = keyframes`
  0%, 100% {
    top: 0;
    left: 50%;
  }
  25% {
    top: 50%;
    left: 100%;
  }
  50% {
    top: 100%;
    left: 50%;
  }
  75% {
    top: 50%;
    left: 0;
  }
`
const BlobMove = styled(BlobBase)`
  background: var(--spinner-color);
  top: 0;
  -webkit-animation: ${blobMove} 1s infinite ease-in;
  animation: ${blobMove} 1s infinite ease-in;
`
