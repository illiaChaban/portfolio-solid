import { For, JSXElement, Show } from 'solid-js'
import { Icon } from '../../components'
import { FC } from '../../types'
import { MediaLink } from './media-link'
import { Project } from './project'
import { tw } from '../../utils/tw'

// TODO: mention recent projects at caribou (elk, metabase, new forms approach)
// TODO: mention AMP (+ udpate tacklebox links to Microsoft)
export default () => {
  return (
    <Container>
      <Title>On the job:</Title>
      <Row>
        <Project
          front={
            <>
              <Heading>
                Caribou <Icon name="building" />
              </Heading>
              <List
                items={[
                  'Built & maintained user and error tracking systems',
                  'Launched multiple A/B tests',
                  'Researched & architected new forms solution',
                  'Replatformed auto refinancing flow.',
                  'Delivered a new marketing website with integrated CMS system within a tight deadline',
                ]}
              />
            </>
          }
          back={
            <>
              <p>
                <Subtitle>Technologies:</Subtitle>
                Typescript, Next.js, React, GraphQL, Hasura, Node.js, Ruby, Ruby
                on Rails, Rollbar, Segment, Contentful, LaunchDarkly, Metabase,
                Elastic
              </p>
              <LinksContainer>
                <MediaLink
                  href="https://www.caribou.com/"
                  icon="globe"
                  label="Marketing"
                />
                <MediaLink
                  href="https://new.apply.caribou.com/"
                  icon="globe"
                  label="Auto refinancing"
                />
              </LinksContainer>
            </>
          }
        />
        <Project
          front={
            <>
              <Heading at={'Insiten'}>Autowash</Heading>
              <p>
                Car wash mobile app and admin page. Created custom svg
                animations, worked on location services, integrated Stripe
                payment services and user tracking, and more...
              </p>
            </>
          }
          back={
            <>
              <p>
                <Subtitle>Implemented:</Subtitle>
                Location proximity, authentication, in-app purchases, vouchers,
                family plan, fleet plan, share with a friend, permissions based
                admin page, user tracking, in-app games
              </p>
              <p>
                <Subtitle>Technologies:</Subtitle>
                Typescript, React, React Native, Nest.js, Typeorm, Stripe,
                Auth0, Salesforce
              </p>
              <LinksContainer>
                <MediaLink
                  href="https://apps.apple.com/us/app/autowash-car-wash/id1556443611"
                  label="App store"
                  icon="appStore"
                />
                <MediaLink
                  href="https://play.google.com/store/apps/details?id=com.autowashco.autowash&hl=en_US&gl=US"
                  label="Google Play"
                  icon="googlePlay"
                />
              </LinksContainer>
            </>
          }
        />
        <Project
          front={
            <>
              <Heading at={'Insiten'}>Tacklebox</Heading>
              <p>
                State of the art web app that allows you to link Excel docs to
                PowerPoint presentations and track any changes. Powerful
                insights, real-time collaboration, change history & undo
                functionality.
              </p>
            </>
          }
          back={
            <>
              <p>
                <Subtitle>Implemented:</Subtitle>
                PowerPoint add-in, project level permissions, in-app chat with
                mentions, real-time change tracking, dashboards & undo
                functionality
              </p>
              <p>
                <Subtitle>Technologies:</Subtitle>
                Typescript, Angular, Rxjs, C#, .Net, WebSockets, PostgreSQL
              </p>
              <LinksContainer>
                <MediaLink
                  href="https://tacklebox.app/"
                  label="Website"
                  icon="globe"
                />
              </LinksContainer>
            </>
          }
        />
        <Project
          front={
            <>
              <Heading>
                Capgemini <Icon name="building" />
              </Heading>
              <p>
                Delivered a major project for one of the biggest insurance
                companies in the US. Transformed existing website to match new
                designs, improve download speeds and help the company perform
                A-B testing to test marketing assumptions
              </p>
            </>
          }
          back={
            <>
              <p>
                <Subtitle>Technologies:</Subtitle>
                Moovweb, Node.js, HTML, SASS, jQuery, Cheerio.js, Bootstrap
              </p>
            </>
          }
        />
      </Row>
      <Title>Personal Projects:</Title>
      <Row>
        <Project
          front={
            <>
              <Heading>
                Planted <Icon name="plant" />
              </Heading>
              <p>
                A mobile app that helps keep your plants thriving. Raspberry Pi
                collects data from a variety of sensors and sends it to the
                server. Our React Native app visulizes the data.
              </p>
            </>
          }
          back={
            <>
              <p>
                <Subtitle>Technologies:</Subtitle>
                React Native, React, Redux, D3, Node, Bcrypt.js, GraphQL,
                PostgreSQL, JS, Heroku, Python
              </p>
              <p>
                <Subtitle>Hardware:</Subtitle>
                Raspberry Pi 3 model B, Arduino Uno, OSEPP Humidity and
                Temperature Sensor - HUMI-01, Generic photo resistor
              </p>
              <LinksContainer>
                <MediaLink
                  label="code"
                  href="https://github.com/PlantedDC"
                  icon="github"
                />
                <MediaLink
                  label="demo"
                  href="https://www.youtube.com/watch?v=lKG6Cvn-An0"
                  icon="youtube"
                />
              </LinksContainer>
            </>
          }
        />
        <Project
          front={
            <>
              <Heading>
                BrainstormMe <Icon name="palette" />
              </Heading>
              <p>
                An online real-time whiteboard for collaborative brainstorming
                with in-app conference call functionality (Twillio).
              </p>
            </>
          }
          back={
            <>
              <p>
                <Subtitle>Implemented:</Subtitle>
                Real-time drawing; Conference call with Twillio [Demo]; Undo;
                Pen drawing; Polygon creation; Multiple pen colors and sizes;
              </p>
              <p>
                <Subtitle>Technologies:</Subtitle>
                Socket.io, Twilio API, D3, Node, PostgreSQL, Express, JS, HTML,
                CSS, Heroku
              </p>
              <LinksContainer>
                <MediaLink
                  href="https://brain-me.herokuapp.com/"
                  label="website"
                  icon="globe"
                />

                <MediaLink
                  label="code"
                  icon="github"
                  href="https://github.com/illiaChaban/BrainstormMe"
                />

                <MediaLink
                  label="demo"
                  href="https://www.youtube.com/watch?v=flQ2z83v04A"
                  icon="youtube"
                />
              </LinksContainer>
            </>
          }
        />
        <Project
          front={
            <>
              <Heading>
                Griddle <Icon name="lightbulb" />
              </Heading>
              <p>
                A web application that encourages people to thoughtfully
                consider and develop their ideas before posting them on social
                media. A unified dashboard of text, images, and videos.
              </p>
            </>
          }
          back={
            <>
              <p>
                <Subtitle>Implemented:</Subtitle>
                Drag & drop; Speech recognition; Card filtering; Database
                storage via Firebase; Responsive design;
              </p>
              <p>
                <Subtitle>Technologies:</Subtitle>
                Firebase, Draggable JS, Materialize CSS, jQuery, Annyang Speech
                recognition, Codebird (Twitter API), Facebook JS SDK
              </p>
              <LinksContainer>
                <MediaLink
                  href="https://griddle-ec3d9.firebaseapp.com/"
                  label="website"
                  icon="globe"
                />
                <MediaLink
                  label="code"
                  href="https://github.com/illiaChaban/griddle"
                  icon="github"
                />
              </LinksContainer>
            </>
          }
        />
        <Project
          front={
            <>
              <Heading>
                Catalyst <Icon name="runner" />
              </Heading>
              <p>
                A social network for people that are lacking that extra push to
                achieve their goals.
              </p>
              <p>
                Post your goals. Your friends choose a punishment for you in
                case you don’t follow through. Do the work or get punished!
              </p>
            </>
          }
          back={
            <>
              <p>
                <Subtitle>Implemented:</Subtitle>
                Goal creation; Adding a friend; User is able to see the feed of
                his friends' "check-ins"; Log in / Register; Mobile design;
              </p>
              <p>
                <Subtitle>Technologies:</Subtitle>
                Amazon EC2, React, Redux, PostgreSQL, Node.js, Express.js, JS,
                CSS, HTML, Bcrypt.js
              </p>
              <LinksContainer>
                <MediaLink
                  href="http://ec2-18-204-21-178.compute-1.amazonaws.com/"
                  label="website"
                  icon="globe"
                />
                <MediaLink
                  label="code"
                  href="https://github.com/illiaChaban/Catalyst"
                  icon="github"
                />
                <MediaLink
                  label="demo"
                  href="https://www.youtube.com/watch?v=hNMJl7z7fHQ&t=0s"
                  icon="youtube"
                />
              </LinksContainer>
            </>
          }
        />
      </Row>
    </Container>
  )
}

const Container = tw('div')`
  p-5 flex-auto flex justify-evenly items-center flex-wrap
`

const Title = tw('h2')`m-0 w-full text-center`

// TODO: text-sm?
const Ul = tw('ul')`
  pl-[15px] flex flex-col gap-1
`

const List: FC<{ items: string[] }> = p => (
  <Ul>
    <For each={p.items}>{text => <li>{text}</li>}</For>
  </Ul>
)

const Row = tw('div')`flex justify-evenly items-center flex-wrap flex-auto`

const Heading = (p: { at?: string; children: JSXElement }) => (
  <h2 class="text-center mt-1 text-[1.3rem] leading-[1.4rem]">
    {p.children}
    {<Show when={p.at}>{<At>@{p.at}</At>}</Show>}
  </h2>
)

const At = tw('span')`block text-[0.6em] text-text-subtle2`

const Subtitle = (p: { children: string }) => (
  <>
    <span class="font-black underline">{p.children}</span>
    <br />
  </>
)

const LinksContainer = tw('div')`flex text-[2rem] justify-evenly`
