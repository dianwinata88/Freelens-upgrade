// Helper for tests that render outside of @testing-library/react.
//
// React 19 removed `ReactDOM.render`/`unmountComponentAtNode` in favor of
// `createRoot`, while the React 17 alias project resolves `react-dom` to
// react-dom@17 which has no `react-dom/client` entry. Use whichever API
// the resolved renderer provides.

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ReactDOM = require('react-dom')

let createRoot: ((container: Element | DocumentFragment) => any) | undefined
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  createRoot = require('react-dom/client').createRoot
} catch {
  createRoot = undefined
}

export interface DomRoot {
  render(element: any): void
  unmount(): void
}

export function createDomRoot(container: Element | DocumentFragment): DomRoot {
  if (createRoot) {
    return createRoot(container)
  }

  return {
    render: (element: any) => ReactDOM.render(element, container),
    unmount: () => ReactDOM.unmountComponentAtNode(container),
  }
}
