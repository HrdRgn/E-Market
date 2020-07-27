import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addPosition } from '../redux/reducers/basket'

import Header from './header'
import Head from './head'
import { changeSort } from '../redux/reducers/currency'

const Home = () => {
  const [showOnPage, setShowOnPage] = useState(10)
  const [pageNumber, setPageNumber] = useState(0)
  const idBase = useSelector((s) => s.base)
  const dispatch = useDispatch()
  const actualCurrency = useSelector((s) => s.currency)
  useEffect(() => {
    setPageNumber(0)
  }, [showOnPage])
  switch (actualCurrency.sortType) {
    case '$ - $$$': {
      idBase.sort((a, b) => a.price - b.price)
      break
    }
    case '$$$ - $': {
      idBase.sort((a, b) => b.price - a.price)
      break
    }
    case 'A - Z': {
      idBase.sort((a, b) => a.title.localeCompare(b.title))
      break
    }
    case 'Z - A': {
      idBase.sort((a, b) => b.title.localeCompare(a.title))
      break
    }
    default: {
      break
    }
  }
  const Base = idBase.slice(showOnPage * pageNumber, (pageNumber + 1) * showOnPage)
  return (
    <div>
      <Header> </Header>
      <Head title="E-Market" />

      <div className="pt-40 flex max-w-6xl  mx-auto flex-col bg-white  rounded-lg shadow-lg p-3">
        <div className="justify-start flex flex-row items-start justify-between text-xl">
          <div
            className="font-semibold flex p-1 pt-4 justify-center text-black  flex-row"
            id="showOnPage"
          >
            <span className="font-semibold flex px-2"> Items on Page:</span>
            <select
              onChange={(e) => setShowOnPage(e.currentTarget.value)}
              defaultValue="10"
              className="font-semibold flex px-2 text-black border border-black rounded"
            >
              <option value="10" selected>
                10
              </option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
          <div className="flex flex-row  p-1">
            <div>
              <button
                className="font-semibold flex m-2 px-4 py-2"
                type="button"
                onClick={() => {
                  if (pageNumber > 0) {
                    setPageNumber(pageNumber - 1)
                  }
                }}
              >
                <svg width="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <polygon points="3.828 9 9.899 2.929 8.485 1.515 0 10 .707 10.707 8.485 18.485 9.899 17.071 3.828 11 20 11 20 9 3.828 9" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col items-center font-semibold">
              <div>Current Page</div>
              <div>
                {' '}
                {pageNumber} of {idBase.length / showOnPage - 1}
              </div>
            </div>
            <div>
              <button
                className="font-semibold flex m-2 px-4 py-2"
                type="button"
                onClick={() => {
                  if (pageNumber < idBase.length / showOnPage - 1) {
                    setPageNumber(pageNumber + 1)
                  }
                }}
              >
                <svg width="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <polygon points="16.172 9 10.101 2.929 11.515 1.515 20 10 19.293 10.707 11.515 18.485 10.101 17.071 16.172 11 0 11 0 9" />
                </svg>
              </button>
            </div>
          </div>
          <div className="font-semibold flex p-1 text-center flex-col" id="sort">
            Current Sort: {actualCurrency.sortType}
            <div className="flex flex-row justify-between">
              <button
                type="button"
                className="font-semibold  mx-2 p-1  border rounded border-black"
                onClick={() => {
                  dispatch(changeSort(`${actualCurrency.sortType}`, '$ - $$$'))
                }}
              >
                By Price
              </button>

              <button
                type="button"
                className="font-semibold mx-2 p-1 border rounded border-black"
                onClick={() => {
                  dispatch(changeSort(`${actualCurrency.sortType}`, 'A - Z'))
                }}
              >
                By Name
              </button>
            </div>
          </div>
        </div>
        <div className=" bg-gray-200 justify-center flex flex-wrap flex-col text-white font-normal rounded-lg border shadow-lg p-4 m-3">
          <div className="font-bold justify-center flex items-center text-2xl text-black ">
            Product List
          </div>
          {Base.map((item) => (
            <div key={item.id} id={item.id}>
              <div className="card flex flex-row items-center justify-around bg-gray-900 rounded-lg m-2 p-2">
                <div className="flex w-32 bg-orange-200 rounded-lg p-2 text-black text-center font-bold">
                  {item.title}
                </div>
                <div className="flex w-32 p-6 text-center">{item.description}</div>
                <div className="flex w-32 p-6 text-center">
                  {(item.price / actualCurrency.rate).toFixed(2)} {actualCurrency.name}
                </div>
                <div className="flex w-64 items-center justify-center">
                  <img alt={item.image} src={item.image} />
                </div>
                <div className="flex w-32 bg-gray-200 rounded-lg p-2 m-2">
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
                    <div className="font-bold text-black m-1"> Add Product </div>
                    <svg width="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M11 9V5H9v4H5v2h4v4h2v-4h4V9h-4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

Home.propTypes = {}

export default React.memo(Home)
