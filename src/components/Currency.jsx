import React, { useState, useEffect } from 'react'
import '../css/Currency.css';
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import axios from 'axios';

// Ortam değişkenlerinden API bilgilerini al
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

function Currency() {
const [amount,setAmount] = useState(0);
const [fromCurrency,setFromCurrency] = useState('USD');
const [toCurrency,setToCurrency] = useState('TRY');
const [result, setResult] = useState(0);
const [error, setError] = useState('');

// HTTPS kontrolü
useEffect(() => {
  if (window.location.protocol === 'http:' && !window.location.hostname.includes('localhost')) {
    console.warn('Güvenli olmayan bağlantı kullanıyorsunuz. HTTPS kullanmanız önerilir.');
  }
}, []);

const validateAmount = (value) => {
  // Geçerli bir sayı mı ve pozitif mi kontrol et
  if (isNaN(value) || value < 0) {
    setError('Lütfen geçerli bir miktar girin');
    return false;
  }
  setError('');
  return true;
};

const handleAmountChange = (e) => {
  const value = e.target.value;
  setAmount(value);
  validateAmount(value);
};

const exchange = async () => {
  // Input doğrulaması
  if (!validateAmount(amount)) {
    return;
  }
  
  if (amount <= 0) {
    setError('Miktar sıfırdan büyük olmalıdır');
    return;
  }

  try {
    setError('');
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        apikey: API_KEY,
        base_currency: fromCurrency
      }
    });
    
    if (response.data && response.data.data) {
      const result = response.data.data[toCurrency];
      const calculatedResult = (amount * result).toFixed(2);
      setResult(calculatedResult);
    } else {
      throw new Error('API yanıtı beklenen formatta değil');
    }
  }
   catch (error) {
    console.error("Döviz çevirme hatası:", error);
    setError('Döviz çevirme işlemi sırasında bir hata oluştu');
  }
}

  return (
    <div className='Currency-div'>
      <h1 className="currency-title">Döviz Kuru Hesaplama</h1>
      
      <div className="converter-container">
        <div className="input-group">
          <input 
            value={amount}
            onChange={handleAmountChange}
            type="number" 
            className='amount' 
            placeholder="0.00"
          />
          <select 
            onChange={(e) => setFromCurrency(e.target.value)} 
            className='from-currency-option'
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option> 
            <option value="TRY">TRY</option>
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
            <option value="TRY">TRY</option>
            <option value="USD">USD</option> 
            <option value="EUR">EUR</option>
          </select>
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}

      <button onClick={exchange} className="convert-button">
        Çevir
      </button>
    </div>
  )
}

export default Currency
