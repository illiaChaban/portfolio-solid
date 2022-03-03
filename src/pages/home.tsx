import { Button } from '../components/button'
import { textScramble } from '../directives/text-scramble'
import { use } from '../hooks/use-directives'
import { css, makeStyles, useTheme } from '../theme'
import { cx, media } from '../utils/styles'

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
  const { sharedStyles } = useTheme()
  const styles = useStyles()
  return (
    <div class={cx(styles.homeText(), 'padding-15', sharedStyles.tags.body)}>
      <div class={cx(styles.textContainer(), sharedStyles.tags.div)}>
        {/* TODO: add PageTransitionContext & useTransitioning -> no delay on first load */}
        <h2 ref={use(textScramble({ delay: 1000 }))} class={styles.subtle()}>
          Full Stack | TS | Angular | React Native | C# | .Net
        </h2>
        <div class={styles.btnContainer()}>
          <Button href="/about">More About Me</Button>
        </div>
      </div>
    </div>
    // <Art />
  )
}

export default Home
