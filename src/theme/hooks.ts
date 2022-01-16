import { Accessor } from "solid-js";
import { useTheme as useThemeBase, styled as styledBase } from 'solid-styled-components'
import { useMediaQuery } from "../hooks/use-media-query";
import { Breakpoint } from "./breakpoints";
import { Theme } from "./theme";

export const useTheme: () => Theme = useThemeBase as any

export const useBreakpoint = (
  breakpoint: Breakpoint, 
  direction: 'up' | 'down' = 'up',
): Accessor<boolean> => useMediaQuery(
  useTheme().breakpoints[direction](breakpoint)
)

// export const styled = 

 