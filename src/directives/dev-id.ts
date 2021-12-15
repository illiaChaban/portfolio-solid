export const devId = (id: string) => (node: Element) => {
  // TODO show only in dev environment
  node.setAttribute('data-test-id', id)
} 