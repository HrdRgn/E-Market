export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('basket')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state.basket)
    localStorage.setItem('basket', serializedState)
  } catch (err) {
    //
  }
}

export const loadState1 = () => {
  try {
    const serializedState = localStorage.getItem('currency')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

export const saveState1 = (state) => {
  try {
    const serializedState = JSON.stringify(state.currency)
    localStorage.setItem('currency', serializedState)
  } catch (err) {
    //
  }
}
