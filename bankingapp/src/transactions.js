import { useContext, useState, useEffect } from "react";
import { AuthContext } from "./authrequest";
import axios from "axios";

const Transactions = ({ accountAPI }) => {
  const [transactionInfo, setTransactionInfo] = useState({
    name: "",
    amount: "",
    description: "",
  });

  const [accountInfo, setAccountInfo] = useState({
    transactionName: "",
    transactionBalance: "",
    savingName: "",
    savingBalance: "",
  });
  const auth = useContext(AuthContext);

  const transactionAccountInfo = () => {
    axios.get("https://api.up.com.au/api/v1/transactions", auth).then((res) => {
      // console.log(res);
      setTransactionInfo({
        name: res.data.data[0].attributes.displayName,
        amount: res.data.data[0].attributes.amount.value,
        description: res.data.data[0].attributes.description,

      });
      // JSON.stringify(transactionInfo);
      console.log(transactionInfo);
      
    });
    // accountAPI();
  
    // axios.get("https://api.up.com.au/api/v1/accounts", auth).then((res) => {
    //   // console.log(res);
    //   setAccountInfo({
    //     transactionName: res.data.data[0].attributes.displayName,
    //     transactionBalance: res.data.data[0].attributes.balance.value,
    //     savingName: res.data.data[1].attributes.displayName,
    //     savingBalance: res.data.data[1].attributes.balance.value,
    //   });
    // });
    console.log(accountInfo);
    // its saying this isnt a function but Im not sure why as its the const declared for the api call?
  };
  const savingAccountInfo = ({ accountAPI, accountInfo }) => {
    axios.get("https://api.up.com.au/api/v1/transactions", auth).then((res) => {
      setTransactionInfo({
        name: res.data.data[1].attributes.displayName,
        amount: res.data.data[1].attributes.amount.value,
        description: res.data.data[1].attributes.description,
      });
    });
    // accountAPI(); so what i need is to is get the value of the totals in each account and display them. 
    // I maybe need to use the eval function once i push each value into an array with the initial value being the total
    // 
  };

   const num1 = parseInt(JSON.stringify(transactionInfo.amount))
   console.log(num1);
   const num2 = parseInt(JSON.stringify(accountInfo.transactionBalance))
   console.log(num2);
   
   const sum = num1 + num2

  

  return (
    <div className="transaction">
      <div className="transactionButtons">
        {/* {console.log(accountAPI)}; */}
        <button onClick={savingAccountInfo} className="buttons">saving</button>
        <button onClick={transactionAccountInfo} className="buttons">transaction</button>
      </div>
      <div className="transactionInfo">
        <h2 className={`transactionRunningValue ${transactionInfo.amount ? "positive" : "negative"}`}>
         Value: {transactionInfo.amount}: {accountInfo.transactionBalance} {sum}
        </h2>
        <h2>
         Value: {transactionInfo.amount}: {accountInfo.transactionBalance} {sum}
        </h2>
        <h3>Description: {transactionInfo.description}</h3>
      </div>
    </div>
  );
};

export default Transactions;
