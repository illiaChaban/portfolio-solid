import { Heading, Link } from '../../components'
import { Button } from '../../components/button'
import { textScramble } from '../../directives'
import { use } from '../../hooks'
import { useTheme } from '../../theme'
import { cx } from '../../utils'
import { log } from '../../utils/log'

const About = () => {
  const { sharedStyles } = useTheme()
  return (
    <div
      class={cx('flex flex-1 main-container', sharedStyles.tags.body)}
      id="about"
    >
      <div class="content">
        <Heading class={sharedStyles.tags.h1}>About</Heading>
        <div class="div-tags-end">
          <p>
            <span class="c-subtle-text">2016</span> - moved to Atlanta, GA from
            Kyiv, Ukraine
          </p>
          <p>
            <span class="c-subtle-text">2018 Jan</span> - fell in love with
            coding at DigitalCrafts software development bootcamp
          </p>
          <p>
            <span class="c-subtle-text">2018 Jul</span> - landed my first tech
            job with Capgemini
          </p>
          <p>
            <span class="c-subtle-text">2019 Mar</span> - left Capgemini and
            made this cool portfolio
          </p>
          <p>
            <span class="c-subtle-text">2019 Oct</span> - joined the Insiten
            team
          </p>
          <p>
            <span class="c-subtle-text">2020 Jul</span> - we launched
            <a
              href="https://tacklebox.app/"
              target="_blank"
              rel="noopener"
              class="hover-underline"
              aria-label="TackleBox"
            >
              TackleBox
            </a>
            !
          </p>
          <p>
            <span class="c-subtle-text">2021 Jul</span> - after a great run with
            Insiten, I joined forces with Motorefi
          </p>
          <p>
            <span class="c-subtle-text">2021 Nov</span> - Motorefi became
            Caribou and we successefully completed the rebrand in 30 days!
          </p>

          <p>
            I feel grateful for being in the industry that most of all values
            skills, ideas and hard work, encourages change and rewards passion.
            I want to be a part of the team where I can learn and grow. I want
            to be challenged and hope to make a real impact.
          </p>
          <p>
            When I’m not coding you can find me playing soccer, bouldering at
            Stone Summit or taking a nap. I love naps.
          </p>
        </div>
      </div>
      <div class="art">
        <div class="art-container">
          <div id="img"></div>
          <div id="quote">
            <div class="quotation">
              <span></span>
            </div>
            <div class="author"></div>
          </div>
          <button class="btn">More wisdom</button>
        </div>
      </div>
    </div>
  )
}

export default About
