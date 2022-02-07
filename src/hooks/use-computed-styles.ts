import { pipeWith } from "pipe-ts";
import { Accessor, createSignal, onMount } from "solid-js";
import { bindEventWithCleanup } from "../utils/events";
import { debounce } from "../utils/lodash";
import { withActions } from "../utils/with-actions";
import { Ref } from "./use-ref";

export const useComputedStyles = (element: Ref<Element>): Accessor<CSSStyleDeclaration | undefined> => {

  const styles$ = withActions(
    createSignal<CSSStyleDeclaration>(),
    (set) => ({update: () => pipeWith(element.current, getComputedStyle, set)})
  )

  bindEventWithCleanup(window, 'resize', debounce(100, styles$.update))
  onMount(styles$.update)

  return () => styles$()
}