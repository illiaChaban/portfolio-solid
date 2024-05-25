/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { splitProps } from 'solid-js'
import { JSX } from 'solid-js/jsx-runtime'
import { Dynamic } from 'solid-js/web'

type Falsy = false | null | undefined | 0 | ''

type CssMergeFn = (maybeClasses: (string | Falsy)[]) => string

const simpleJoinClasses: CssMergeFn = classes =>
  classes.filter(Boolean).join(' ')

/**
 * 
 * @ settings.json for autocomplete & lint for TW extension
 * 
 *     "tailwindCSS.classAttributes": [
        "class",
        "className",
        "ngClass",
    ],
    "tailwindCSS.experimental.classRegex": [
        "tw`([^`]*)", // tw`...`
        // "tw\\.[^`]+`([^`]*)`", // tw.xxx<xxx>`...`
        // "tw\\(.*?\\).*?`([^`]*)" // tw(Component)<xxx>`...`
        // "tw\\(.*?\\).*?`([^`]*)" // tw(Component)<xxx>`...`
        "tw\\(.*?\\)(?:<.*?>)?`([^`]*)`" // tw(Component)<xxx>`...`
    ]
 */

const createCssStyled = (cssMergeFunction: CssMergeFn = simpleJoinClasses) =>
  ((
    classesOrComponent:
      | keyof JSX.IntrinsicElements
      | ((p: {}) => JSX.Element)
      | TemplateStringsArray,
    ...args: any[]
  ) => {
    if (isTemplateStringArr(classesOrComponent)) {
      return cssMergeFunction(
        classesOrComponent.flatMap((style, i) => [
          templateToOneLine(style),
          args[i] ?? '',
        ]),
      )
    }

    const Component = classesOrComponent

    return (classes: TemplateStringsArray, ...args: TagArg<any>[]) => {
      const preprocessedValues = classes.flatMap((str, i) => [
        templateToOneLine(str),
        i === classes.length - 1
          ? (props: any) => props.class
          : preprocessArg(args[i]),
      ])

      const Styled: StyledComponent<any> = props => {
        const [, p2] = splitProps(props, ['class', 'as'])

        const final = () =>
          cssMergeFunction(
            preprocessedValues.map(v =>
              typeof v === 'function' ? v(props) : v,
            ),
          )

        const component = () => props.as ?? Component

        const otherProps = () => {
          const Component = component()
          if (typeof Component === 'function') return p2
          // avoid propagating $<key> to html elements
          const keys = Object.keys(p2).filter(k => !k.startsWith('$'))
          // should i use split props here? Is there a performance optimization opportunity?
          return pick(p2, keys)
        }

        return (
          <Dynamic component={component()} class={final()} {...otherProps()} />
        )
      }
      return Styled
    }
  }) as StyleFn

const isTemplateStringArr = (v: any): v is TemplateStringsArray =>
  !!v.raw && Array.isArray(v)

const preprocessArg = (
  arg: TagArg<any>,
): string | ((props: any) => string | Falsy) =>
  typeof arg === 'string'
    ? templateToOneLine(arg)
    : typeof arg === 'function'
      ? (props: any) => {
          const v = arg(props)
          return v && templateToOneLine(v)
        }
      : !!arg === false
        ? ''
        : (() => {
            throw `Unsupported type: ${typeof arg}`
          })()

// const templateToClasses = (templateStr: string): string[] => {
//   return templateStr.split(" ").filter((s) => s.length && s !== "\n");
// };
const templateToOneLine = (templateStr: string): string => {
  return (
    templateStr
      .split('\n')
      // FYI this ignores spaced in between classes and trims only outside spaces
      // trimming inside spaces may not be worth it performace wise VS how common it is
      .map(s => s.trim())
      // .map((key: string) => {
      //   return key.trim().replace(/^\s+|\s+$/gm, "");
      // })
      .filter(s => s?.length)
      .join(' ')
  )
}

const pick = <R extends Record<string, unknown>, P extends keyof R>(
  obj: R,
  keys: P[],
): Pick<R, P> => {
  const picked = {} as any
  keys.forEach(k => (picked[k] = obj[k]))
  return picked
}

type TagArg<P> = string | Falsy | ((props: P) => string | Falsy)

type InternalProps = {
  as?: keyof JSX.IntrinsicElements | ((p: {}) => JSX.Element)
}

type TagFn<BaseProps extends {}> = <ExtraProps extends {} = {}>(
  classes: TemplateStringsArray,
  ...args: TagArg<ExtraProps>[]
) => StyledComponent<BaseProps, ExtraProps>

type StyledComponent<BaseProps extends {}, ExtraProps extends {} = {}> = (
  // TODO: support conditional props based on "as" internal prop.
  // i.e. "as" component function accepts certtain props that become "BaseProps"
  props: BaseProps & ExtraProps & InternalProps,
) => JSX.Element

export type StyleFn = {
  <K extends keyof JSX.IntrinsicElements>(
    component: K,
  ): TagFn<JSX.IntrinsicElements[K]>
  <P extends { class?: string }>(component: (p: P) => JSX.Element): TagFn<P>
  // return css class, use for autocomplete purposes
  (
    styles: TemplateStringsArray,
    ...args: (string | number | false | null | undefined)[]
  ): string
}

export const tw = createCssStyled()
