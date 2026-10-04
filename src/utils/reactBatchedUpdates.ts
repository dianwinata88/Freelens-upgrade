import * as ReactDOM from 'react-dom'

// React 18+ batches all updates automatically and react-dom@19 no longer
// guarantees `unstable_batchedUpdates`, so don't require it. Keep using it
// when the resolved renderer still provides it (e.g. the React 17/18 jest
// alias projects), otherwise fall back to a no-op like upstream react-redux v9.
export const unstable_batchedUpdates: <T>(callback: () => T) => T =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (ReactDOM as any).unstable_batchedUpdates ?? ((callback: any) => callback())
