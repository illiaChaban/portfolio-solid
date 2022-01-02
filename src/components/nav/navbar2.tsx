import { css, styled } from "solid-styled-components"
import { breakpoints } from "../../utils/styles"
import { NavIcon } from "./nav-icon"

export const Navbar2 = () => {

  return (
    <MenuContainer>
      <div class={css`
        /* width: 100%;
        height: 95%;
        background: black;
        border-top-left-radius: 16px;
        border-top-right-radius: 16px; */
        height: 100%;
        display: flex;
        justify-content: space-between;
        width: 100%;
        max-width: 270px;
      `}>
        {[
          NavIcon.Home,
          NavIcon.About,
          NavIcon.Skills,
          NavIcon.Projects,
          NavIcon.Contact,
        ].map((Icon, i) => <Icon />)}
      </div>
    </MenuContainer>
  )

}

const MenuContainer = styled('div')({

  '--navbar-highlight': 'var(--color-highlight)',
  // background: '#181818', /* #2f2f2f */

  background: '#18181852',
  // color: 'var(--color-subtle)',
  color: 'var(--color-highlight)',
  backdropFilter: 'blur(3px)',
  // color: 'black',
  width: 'var(--menu-offset)',
  height: '100%',
  position: 'fixed',
  top: 0,
  zIndex: 3,

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  // background: 'var(--color-highlight)',

  [breakpoints.down('md')]: {
    width: '100%',
    height: 'var(--menu-offset)',
    minHeight: 0,
    bottom: 0,
    top: 'auto',

    borderRight: 'none',
    borderTopRightRadius: '16px',
    borderTopLeftRadius: '16px',

    boxShadow: '0px -2px var(--navbar-highlight)',
    // boxShadow: '0px -1px 15px var(--color-highlight)',
    overflow: 'hidden',

    // padding: '0 8px',
    // boxSizing: 'border-box',
  }
})