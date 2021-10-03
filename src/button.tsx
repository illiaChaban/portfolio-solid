import { JSX, splitProps } from "solid-js"
import { cx, makeStyles } from "./utils/styles"

const styles = makeStyles({
  btn: {
    minHeight: '40px',
    minWidth: '70px',
    background: 'blue',
    color: 'white',
    '&:hover': {
      background: 'green'
    },
  },
  disabled: {
    background: 'gray'
  }
})


export const Button = (props: {
  children: JSX.Element, 
  onClick?: JSX.DOMAttributes<HTMLButtonElement>['onClick'],
  disabled?: boolean
}): JSX.Element => {

  const [p, otherProps] = splitProps(props, ['children', 'disabled'])
  return (
    <button 
      className={cx(
        styles.btn, 
        {[styles.disabled]: p.disabled}
      )} 
      {...otherProps}
    >
      {p.disabled ? 'DISABLED' : p.children}
    </button>
  )
}