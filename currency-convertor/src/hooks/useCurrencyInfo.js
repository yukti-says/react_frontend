import { useEffect, useState }
    from "react";

function useCurrencyInfo(currency) {
    const [data, setData] = useState({});
    //* this hook will return a data and we will call an api
    //* when someone will use this hook then-> so using useEffect isse automatically our hook call ho jayega
    //! mostly api calls se jo values aati h wo string format me hoti h so we need to change them into json
    useEffect(() => {
        
        fetch(`https://api.exchangerate.host/latest?base=${currency}`)
          .then((res) => res.json())
          .then((res) => setData(res[currency]));
    }, [currency])
    //* we will not be able to set the data since it is custom hook thus we will sent the data to the user 
    console.log(data);
    
    return (data)

}
    
// in 2nd then we took the variable to be saved even

export default useCurrencyInfo;