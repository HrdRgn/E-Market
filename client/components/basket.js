import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addPosition, removePosition } from '../redux/reducers/basket'
import Header from './header'
import Head from './head'
import historyS from '../redux/history'

const Basket = () => {
  const info = useSelector((s) => s.basket)
  const total = info.reduce((acc, rec) => acc + rec.price * rec.amount, 0)
  const dispatch = useDispatch()
  const actualCurrency = useSelector((s) => s.currency)

  const toggled = total > 0
  switch (actualCurrency.sortType) {
    case '$ - $$$': {
      info.sort((a, b) => a.price - b.price)
      break
    }
    case '$$$ - $': {
      info.sort((a, b) => b.price - a.price)
      break
    }
    case 'A - Z': {
      info.sort((a, b) => a.title.localeCompare(b.title))
      break
    }
    case 'Z - A': {
      info.sort((a, b) => b.title.localeCompare(a.title))
      break
    }
    default: {
      break
    }
  }
  const showinfo = info
  return (
    <div>
      <Header> </Header>
      <Head title="E-Market" />
      {toggled && (
        <div className=" pt-40 flex max-w-6xl items-center flex-wrap  mx-auto flex-col bg-white  rounded-lg shadow-lg p-3">
          <div className="bg-gray-200 justify-center flex flex-wrap flex-col text-white font-normal rounded-lg border shadow-lg p-4 m-3">
            <div className="font-bold justify-center flex items-center text-2xl text-black m-2">
              Cart
            </div>
            {showinfo.map((item) => (
              <div key={item.title} id={item.title}>
                <div className="card flex flex-row items-center justify-around bg-gray-900 rounded-lg m-2 p-2">
                  <div className="flex w-8"> {info.indexOf(item) + 1}</div>
                  <div className="flex w-32 bg-orange-200 rounded-lg p-2 text-black text-center font-bold">
                    {item.title}
                  </div>
                  <div className="flex w-32 p-6 text-center">{item.description}</div>
                  <div className="flex w-32 p-6">
                    {(item.price / actualCurrency.rate).toFixed(2)} {actualCurrency.name}
                  </div>
                  <div className="flex w-64 items-center justify-center">
                    <img alt={item.image} src={item.image} />
                  </div>
                  <div className="flex w-32"> {item.amount} pc(s) </div>
                  <div className="flex flex-col text-black bg-gray-200 rounded-lg p-2">
                    <button
                      className="bg-blue flex flex-row items-center"
                      type="button"
                      id="addproduct"
                      onClick={() =>
                        dispatch(
                          addPosition(
                            `${item.title}`,
                            `${item.description}`,
                            `${item.price}`,
                            `${item.image}`
                          )
                        )
                      }
                    >
                      <div className="font-bold m-1"> Add Product </div>
                      <svg width="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M11 9V5H9v4H5v2h4v4h2v-4h4V9h-4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20z" />
                      </svg>
                    </button>
                    <button
                      className="bg-blue flex flex-row items-center"
                      type="button"
                      id="addproduct"
                      onClick={() =>
                        dispatch(
                          removePosition(
                            `${item.title}`,
                            `${item.description}`,
                            `${item.price}`,
                            `${item.image}`,
                            `${item.amount}`
                          )
                        )
                      }
                    >
                      <div className="font-bold m-1"> Remove Product </div>
                      <svg width="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm5-11H5v2h10V9z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flew-wrap text-2xl font-bold justify-end">
            Total: {(total / actualCurrency.rate).toFixed(2)} {actualCurrency.name}
            {JSON.stringify(historyS)}
          </div>
        </div>
      )}
      {!toggled && (
        <div className="pt-40 flex max-w-6xl items-center flex-wrap font-bold justify-center flex items-center text-2xl mx-auto flex-col bg-white  rounded-lg shadow-lg p-4">
          Cart is Empty
        </div>
      )}
    </div>
  )
}

Basket.propTypes = {}

export default React.memo(Basket)
