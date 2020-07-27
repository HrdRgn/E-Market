

const ADD = 'ADD'
const REMOVE = 'REMOVE'


const initialState = []


export default (state = initialState, action) => {
  const searchObj = state.find((it) => it.title === action.title)

  switch (action.type) {
    case ADD: {
      if (searchObj === undefined) {
        return [
          ...state,
          {
            title: action.title,
            price: action.price,
            description: action.description,
            image: action.image,
            amount: 1
          }
        ]
      }
      const currentAmount = state[state.indexOf(searchObj)].amount
      return state.map((item) => {
        if (item.title === action.title) {
          return {
            ...item,
            amount: currentAmount + 1
          }
        }
        return item
      })
    }
    case REMOVE: {
      const currentAmount = state[state.indexOf(searchObj)].amount
      if (action.amount === '1') {
        return state.filter((item) => item.title !== action.title)
      }
      return state.map((item) => {
        if (item.title === action.title) {
          return {
            ...item,
            amount: currentAmount - 1
          }
        }
        return { ...item }
      })
    }
    default:
      return state
  }
}




export function addPosition(title, description, price, image) {
  return { type: ADD, title, description, price, image }
}
export function removePosition(title, description, price, image, amount) {
  return { type: REMOVE, title, description, price, image, amount }
}
