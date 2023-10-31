import { useContext, useState, useEffect } from 'react';
import { AuthContext } from './authrequest';
import axios from 'axios';

function Accounts() {
const [accountInfo, setAccountInfo] = useState({
      // name: "",
      // balance: "",

    });
    const auth = useContext(AuthContext);
    const token = "up:yeah:k5W1oFj5K6mfLec2elEjbIlzL14BbrF4ROob1juOc1EkjMIQC9urB8Ojt7ceJx7ulIj4HxASETXsp53ciH3GdMpG5CRxLd8rQgNIptT1RWLkpy79fXk5njQbJEzOCu6O"
    const header = {
        headers: {
          Authorization: `Bearer ${token}`
        }
    }

    useEffect(() => {
      axios.get('https://api.up.com.au/api/v1/accounts', auth).then((res) => {
    // console.log(res);
    setAccountInfo({
      transactionName: res.data.data[0].attributes.displayName, 
      transactionBalance: res.data.data[0].attributes.balance.value,
      savingName: res.data.data[1].attributes.displayName, 
      savingBalance: res.data.data[1].attributes.balance.value,    
    })
    })
    },[auth])
  return (
    <div>
     <h2>{accountInfo.transactionName} : ${accountInfo.transactionBalance} </h2>
     <h2>{accountInfo.savingName} : ${accountInfo.savingBalance}</h2>
    </div>
  )
}

export default Accounts
