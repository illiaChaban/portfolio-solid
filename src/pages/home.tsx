import { Button } from '../components/button'
import { textScramble } from '../directives/text-scramble'
import { use } from '../hooks/use-directives'
// import { breakpoints } from '../utils/styles/breakpoints'
import { cx, media } from '../utils/styles'
import { makeStyles } from '../theme'
import { css } from 'solid-styled-components'

const useStyles = makeStyles()({
  homeText: ({breakpoints}) => css({
    color: 'var(--color-main)',
    fontSize: '2rem',
    fontFamily: '"Special Elite", cursive',
    fontWeight: 900,
    minHeight: '400px',
    position: 'relative',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    [media(breakpoints.down('md'))]: {
      marginLeft: 0,
    },
    [media(breakpoints.down(480))]: {
      fontSize: '1.6rem',
    }
  }),
  textContainer: ({breakpoints}) => css({
    marginLeft: '5%',
    [media(breakpoints.down(660))]: {
      marginTop: '70px',
    }
  }),
  subtle: ({breakpoints}) => css({
    fontSize: '1rem',
    color: 'var(--color-subtle)',
    fontFamily: '"Inconsolata", monospace',
    fontWeight: 100,
    margin: 0,
    letterSpacing: '-1px',
    [media(breakpoints.down(480))]: {
      fontSize: '0.9rem',
    }
  }),
  btnContainer: css({
    marginTop: '20px',
    marginBottom: '45px',
  })
})


const Home = () => {
  const styles = useStyles()
  return (
    <div class={cx(styles.homeText(), 'padding-15 body-tags')}>
      <div class={cx(styles.textContainer(), "div-tags")}>
        <h2 
          ref={use(textScramble)}
          class={styles.subtle()} 
        >Full Stack | TS | Angular | React Native | C# | .Net</h2>
        
        <div className={styles.btnContainer()}>
          <Button href="about">
            More About Me
          </Button>
        </div>

      </div>
    </div>
    // <Art />
  )
}

export default Home