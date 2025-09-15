import React, { useState } from 'react'
import Input from './components/input'
import useCurrencyInfo from './hooks/useCurrencyInfo'

const App = () => {
  //? kud ka hook 
  const [amount, setAmount] = useState(0);
  const [fromValue, setFromValue] = useState("usd")
  const [toValue, setToValue] = useState("inr")
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(fromValue)

 const options = Object.keys(currencyInfo || {});

  const swap = () => {
    setFromValue(toValue)
    setToValue(fromValue)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }
  
 
  const convert = () => {
    setConvertedAmount(amount * currencyInfo[toValue]);
  }


  
  return (
    <div
      className="bg-slate-900 w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('')`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <Input
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setAmount(currency)}
                setCurrency={fromValue}
                onAmountChange={amount=>setAmount(amount)}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <Input
                label="To"
                
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setToValue(currency)}
                setCurrency={toValue}
                amountDisable
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
            >
              Convert { fromValue.toUpperCase()} To {toValue.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;