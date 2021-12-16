import { isProduction } from "../constants/env"

export const devId = (id: string) => (node: Element) => {
  if (isProduction) return;
  node.setAttribute('data-test-id', id)
} 