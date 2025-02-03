import React, { useState } from 'react'
import '../css/Currency.css';
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import axios from 'axios';

let BASE_URL = "https://api.freecurrencyapi.com/v1/latest";
let API_KEY = "fca_live_IRIFqUsJr1Lo7tKBUwcI1nIN3pacNh88tt6jCduY";

function Currency() {
const [amount,setAmount] = useState(0);
const [fromCurrency,setFromCurrency] = useState('USD');
const [toCurrency,setToCurrency] = useState('TRY');
const [result, setResult] = useState(0);

const exchange = async () => {
  try {
    const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&base_currency=${fromCurrency}`);
    const result  = response.data.data[toCurrency];
    const calculatedResult = (amount * result).toFixed(2);
    setResult(calculatedResult);
  }
   catch (error) {
    console.error("Döviz çevirme hatası:", error);
    alert("Döviz çevirme işlemi sırasında bir hata oluştu.");
  }
}

  return (
    <div className='Currency-div'>
      <h1 className="currency-title">Döviz Kuru Hesaplama</h1>
      
      <div className="converter-container">
        <div className="input-group">
          <input 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number" 
            className='amount' 
            placeholder="0.00"
          />
          <select 
            onChange={(e) => setFromCurrency(e.target.value)} 
            className='from-currency-option'
          >
            <option>USD</option>
            <option>EUR</option> 
            <option>TRY</option>
          </select>
        </div>

        <FaRegArrowAltCircleRight />
        
        <div className="input-group">
          <input 
            value={result}
            readOnly
            type="number" 
            className='amount' 
            placeholder="0.00"
          />
          <select 
            onChange={(e)=>setToCurrency(e.target.value)} 
            className='to-from-currency-option'
          >
            <option>TRY</option>
            <option>USD</option> 
            <option>EUR</option>
          </select>
        </div>
      </div>

      <button onClick={exchange} className="convert-button">
        Çevir
      </button>
    </div>
  )
}

export default Currency
