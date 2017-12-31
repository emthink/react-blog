import { push, replace } from 'react-router-redux'

export const pushRoute = (payload) => {
  return push(payload)
}

export const replaceRoute = (payload) => {
  return replace(payload)
}
