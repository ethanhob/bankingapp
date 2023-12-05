import './App.css';
import { AuthContext } from './authrequest';
import Accounts from './accounts';
import Transactions from './transactions';
import React from 'react';
import { useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';

export default function App() {
  const [accountInfo, setAccountInfo] = useState({
    transactionName: '',
    transactionBalance: '',
    savingName: '',
    savingBalance: '',
  });
  const apiKey=process.env.REACT_APP_API_KEY;
  const auth = useContext(AuthContext);

  // saw this online but dont know if its what i need here.
  // what i am trying to do is to pass this function into the transaction component in order to get the transaction 
  // balance and savings balance so I can have a running total of balances for each account that adds or subtracts individual transacations
    const accountAPI = () => {
      axios.get('https://api.up.com.au/api/v1/accounts', auth).then((res) => {
        console.log(res);
        setAccountInfo({
          transactionName: res.data.data[0].attributes.displayName, 
          transactionBalance: res.data.data[0].attributes.balance.value,
          savingName: res.data.data[1].attributes.displayName, 
          savingBalance: res.data.data[1].attributes.balance.value,    
        })
        })
    };

      return (
        <div className="App">
    <h1 className="text-9xl font-bold underline">
            Here is a Summary of your accounts</h1>
        <AuthContext.Provider value={
           {
            headers: {
            Authorization: `Bearer ${apiKey}`
           }
          }}
        >
          <Accounts accountAPI={accountAPI}/>
          <Transactions accountAPI={accountAPI} accountInfo={accountInfo} />
        
        </AuthContext.Provider>
        </div>
      );
}
