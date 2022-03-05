// TODO: mention recent projects at caribou (elk, metabase, new forms approach)

import { JSXElement, Show } from 'solid-js'
import { Icon } from '../../components'
import { css, styled, useTheme, withClass } from '../../theme'
import { MediaLink } from './media-link'
import { Project } from './project'

// TODO: mention AMP (+ udpate tacklebox links to Microsoft)
export default () => {
  const { sharedStyles } = useTheme()
  return (
    <Container class={'flex-1'}>
      <Title>On the job:</Title>
      <Row>
        <Project
          front={
            <>
              <Heading>
                Caribou <Icon name="building" />
              </Heading>
              <p>
                Complex auto refinancing platform that helps you navigate
                through different lenders to find the best quotes.
              </p>
              <Ul>
                <li>
                  Delivered one of the more complex pages on the consumer flow.
                </li>
                <li>
                  Completed company websites rebrand within a 30-day deadline
                </li>
              </Ul>
            </>
          }
          back={
            <>
              <p>
                <Subtitle>Details:</Subtitle>
                Integrated content platform with advanced user and error
                tracking. Using GraphQL to navigate a complex system of
                microservices
              </p>
              <p>
                <Subtitle>Technologies:</Subtitle>
                Typescript, React, GraphQL, Hasura, Next.js, Node.js, Rollbar,
                Segment, Contentful
              </p>
              <LinksContainer>
                <MediaLink
                  href="https://www.gocaribou.com/"
                  icon="globe"
                  label="website"
                />
              </LinksContainer>
            </>
          }
        />
      </Row>
    </Container>
  )
}

const Container = withClass('flex-1')(styled('div')`
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  padding: 20px;
  display: flex;
`)

const Title = styled('h2')`
  margin: 0;
  width: 100%;
  text-align: center;
`

const Ul = styled('ul')`
  padding-left: 15px;
  font-size: 0.8rem;
  line-height: 1.3rem;
`

const Row = withClass('flex-1')(styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
`)

const Heading = (p: { at?: string; children: JSXElement }) => (
  <h2
    class={css`
      text-align: center;
      margin-top: 0;
    `}
  >
    {p.children}
    {<Show when={p.at}>{<At>@{p.at}</At>}</Show>}
  </h2>
)

const At = styled('span')`
  color: ${({ theme }) => theme.colors.text.subtle1};
  font-size: 0.6em;
  display: block;
`

const Subtitle = (p: { children: string }) => (
  <>
    <span
      class={css`
        font-weight: 900;
        text-decoration: underline;
      `}
    >
      {p.children}
    </span>
    <br />
  </>
)

const LinksContainer = styled('div')`
  display: flex;
  justify-content: space-evenly;
  font-size: 2rem;
`
