import { Link, LinkProps } from "solid-app-router";
import { JSX } from "solid-js"
import { css } from 'solid-styled-components'
import { useAtom } from "../hooks/use-atom";
import { has } from "../utils/lodash";

const styles = css`
  --mouse-pos-x: 0px;
  --mouse-pos-y: 0px;
  --btn-color: var(--color-highlight);

  box-shadow: 0 0 10px var(--btn-color);
  text-decoration: none;
  color: var(--btn-color);
  background: transparent;
  font-weight: 100;

  padding: 8px 12px;
  border-radius: 5px;
  border: 1px solid var(--btn-color);
  
  font-family: 'Saira', Helvetica, Arial, sans-serif; 
  font-size: 1.5rem;

  display: inline-block;
  text-transform: uppercase;
  cursor: pointer;
  outline: none;

  &:focus {
    box-shadow: 0 0 20px 1px var(--color-highlight);
  }

  &:hover {
    color: var(--body-background-color);
    /* font-weight: 900;  */ /* changes btn width on firefox */
    background: orange;
    background: radial-gradient(circle at var(--mouse-pos-x) var(--mouse-pos-y), var(--btn-color) 50%,rgba(0,0,0,0) 100%);
  }
`

type ButtonProps = {
  children: JSX.Element, 
} & ({
  onClick: JSX.DOMAttributes<HTMLButtonElement>['onClick'],
} | {
  href: LinkProps['href'],
  onClick?: LinkProps['onClick'],
})
export const Button = (p: ButtonProps): JSX.Element => {

  type MousePosition = {x: number, y: number};
  const mousePosition$ = useAtom<MousePosition>({x: 0, y: 0})
  const trackMousePosition = (e: MouseEvent) => {
    mousePosition$({x: e.offsetX, y: e.offsetY});
  };

  const Component = has(p, 'href') 
    ? (props: LinkProps) => <Link {...props} />
    : (props: JSX.DOMAttributes<HTMLButtonElement>) => <button {...props} />

  return (
    <Component 
      class={styles}
      onMouseMove={trackMousePosition}
      
      onClick={p.onClick as any}
      href={(p as any).href}
      style={`
        --mouse-pos-x: ${mousePosition$().x}px; 
        --mouse-pos-y: ${mousePosition$().y}px;
      `}
    >
      {p.children}
    </Component>
  )
}


