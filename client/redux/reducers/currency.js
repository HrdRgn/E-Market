const CHANGE_CURRENCY = 'CHANGE_CURRENCY'
const CHANGE_SORT = 'CHANGE_SORT'

const initialState = {
  name: 'EUR',
  rate: 1,
  sortType: 'A - Z'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CURRENCY: {
      return {
        ...state,
        name: action.name,
        rate: action.rate
      }
    }
    case CHANGE_SORT: {
      if (action.prevSort === action.sortType) {
        switch (action.sortType) {
          case 'A - Z': {
            return {
              ...state,
              sortType: 'Z - A'
            }
          }
          case '$ - $$$': {
            return {
              ...state,
              sortType: '$$$ - $'
            }
          }
          default:
            return state
        }
      }
      return {
        ...state,
        sortType: action.sortType
      }
    }
    default:
      return state
  }
}

export function changeCurrency(name, rate) {
  return { type: CHANGE_CURRENCY, name, rate }
}
export function changeSort(prevSort, sortType) {
  return { type: CHANGE_SORT, prevSort, sortType }
}
