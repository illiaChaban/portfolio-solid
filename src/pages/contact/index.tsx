import { useBoundingRect } from '../../hooks'
import { tw } from '../../utils/tw'
import { Art } from './art'
import { ContactInfo } from './contact-info'

const Contact = () => {
  const contactInfoRect$ = useBoundingRect()

  return (
    <div class="flex flex-grow overflow-hidden">
      <Container>
        <div
          class={tw`
            flex flex-col justify-center items-center 
            text-text-primary pl-[25px] pr-0 max-sm_md:px-2`}
        >
          <ContactInfo ref={contactInfoRect$.track} />
        </div>
        <Art
          style={{
            width: `${contactInfoRect$()?.width ?? 0}px`,
            height: `${contactInfoRect$()?.height ?? 0}px`,
          }}
          // aligning for content padding
          class="my-0 mx-[25px] max-sm_md:hidden"
        />
      </Container>
    </div>
  )
}

const Container = tw('div')`
  flex justify-around flex-auto tags-body
`

export default Contact
