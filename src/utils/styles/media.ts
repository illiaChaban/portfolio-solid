export const media = (...args: string[]) => 
  `@media ${args.join(' and ')}`

export const desktopHover = '(hover: hover) and (pointer: fine)'