import { Button } from '../components/button'
import { textScramble } from '../directives/text-scramble'
import { use } from '../hooks/use-directives'
// import { breakpoints } from '../utils/styles/breakpoints'
import { cx, media } from '../utils/styles'
import { css, makeStyles, styled } from '../theme'
import { useIsRouting } from 'solid-app-router'
import { log } from '../utils'

const useStyles = makeStyles()({
  homeText: ({ breakpoints, colors }) =>
    css({
      color: colors.text.primary,
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
      },
    }),
  textContainer: ({ breakpoints }) =>
    css({
      marginLeft: '5%',
      [media(breakpoints.down(660))]: {
        marginTop: '70px',
      },
    }),
  subtle: ({ breakpoints, colors }) =>
    css({
      fontSize: '1rem',
      color: colors.text.subtle1,
      fontFamily: '"Inconsolata", monospace',
      fontWeight: 100,
      margin: 0,
      letterSpacing: '-1px',
      [media(breakpoints.down(480))]: {
        fontSize: '0.9rem',
      },
    }),
  btnContainer: css({
    marginTop: '20px',
    marginBottom: '45px',
  }),
})

const Home = () => {
  const styles = useStyles()
  return (
    <div class={cx(styles.homeText(), 'padding-15 body-tags')}>
      <div class={cx(styles.textContainer(), 'div-tags')}>
        {/* TODO: add PageTransitionContext & useTransitioning -> no delay on first load */}
        <h2 ref={use([textScramble, 1000])} class={styles.subtle()}>
          Full Stack | TS | Angular | React Native | C# | .Net
        </h2>
        <div class={styles.btnContainer()}>
          <Button href="about">More About Me</Button>
        </div>
      </div>
    </div>
    // <Art />
  )
}

export default Home
