import { useNavigate } from 'solid-app-router'
import { Button } from '../components/button'
import { textScramble } from '../directives/text-scramble'
import { use } from '../utils/get-use-directives'
import { breakpoints } from '../utils/styles/breakpoints'
import { cx, makeStyles } from '../utils/styles'
import { Transition } from 'solid-transition-group'

const styles = makeStyles({
  homeText: {
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
    [breakpoints.down('md')]: {
      marginLeft: 0,
    },
    [breakpoints.down(480)]: {
      fontSize: '1.6rem',
    }
  },
  textContainer: {
    marginLeft: '5%',
    [breakpoints.down(660)]: {
      marginTop: '70px',
    }
  },
  subtle: {
    fontSize: '1rem',
    color: 'var(--color-subtle)',
    fontFamily: '"Inconsolata", monospace',
    fontWeight: 100,
    margin: 0,
    letterSpacing: '-1px',
    [breakpoints.down(480)]: {
      fontSize: '0.9rem',
    }
  },
  btnContainer: {
    marginTop: '20px',
    marginBottom: '45px',
  }
})


const Home = () => {
 
  const navigate = useNavigate()

  return (
    <div class={cx(styles.homeText, 'padding-15 body-tags')}>
      <div class={cx(styles.textContainer, "div-tags")}>
        <h2 
          ref={use(textScramble)}
          class={styles.subtle} 
        >Full Stack | TS | Angular | React Native | C# | .Net</h2>
        
        <div className={styles.btnContainer}>
          <Button 
            onClick={() => navigate("about")}
          >More About Me</Button>
        </div>

      </div>
    </div>
    // <Art />
  )
}

export default Home