import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { changeCurrency } from '../redux/reducers/currency'

const Header = () => {
  const [exchangeRate, setExchangeRate] = useState({})
  const info = useSelector((s) => s.basket)
  const total = info.reduce((acc, rec) => acc + rec.amount, 0)
  const totalPrice = info.reduce((acc, rec) => acc + rec.price * rec.amount, 0)
  const actualCurrency = useSelector((s) => s.currency)
  const dispatch = useDispatch()
  useEffect(() => {
    axios.get('https://api.exchangeratesapi.io/latest').then((it) => {
      setExchangeRate(it.data.rates)
    })
  }, [])

  return (
    <nav className="fixed z-10 h-36 w-full shadow flex items-center justify-around bg-black p-4 px-12">
      <div
        id="brand-name"
        className="flex flex-row font-semibold m-1 px-4 py-2 border rounded text-white border-white "
      >
        <Link to="/">Home</Link>
      </div>
      <div
        className="font-semibold flex m-1 px-4 py-2 border rounded text-white  border-white text-center flex-col"
        id="currency"
      >
        Currency: {actualCurrency.name}
        <div className="flex flex-row">
          <button
            type="button"
            className="font-semibold m-1 px-4 py-2 border rounded text-white border-white"
            onClick={() => {
              dispatch(changeCurrency('USD', exchangeRate.USD))
            }}
          >
            USD
          </button>
          <button
            type="button"
            className="font-semibold m-1 px-4 py-2 border rounded text-white border-white"
            onClick={() => {
              dispatch(changeCurrency('EUR', 1))
            }}
          >
            EUR
          </button>
          <button
            type="button"
            className="font-semibold m-1 px-4 py-2 border rounded text-white border-white"
            onClick={() => {
              dispatch(changeCurrency('CAD', exchangeRate.CAD))
            }}
          >
            CAD
          </button>
        </div>
      </div>

      <div
        id="basket"
        className="flex flex-none min-w-1/5 justify-center font-semibold m-1 px-4 py-2 border rounded text-white border-white"
      >
        <Link to="/basket">
          Cart: {total} items for {(totalPrice / actualCurrency.rate).toFixed(2)}{' '}
          {actualCurrency.name}
        </Link>
      </div>
    </nav>
  )
}

export default Header
