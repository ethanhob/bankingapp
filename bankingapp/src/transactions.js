import { useContext, useState, useEffect } from "react";
import { AuthContext } from "./authrequest";
import axios from "axios";

const Transactions = ({ accountAPI, accountInfo }) => {
  const [transactionInfo, setTransactionInfo] = useState({
    name: "",
    amount: "",
    description: "",
  });

  // const [accountInfo, setAccountInfo] = useState({
  //   transactionName: "",
  //   transactionBalance: "",
  //   savingName: "",
  //   savingBalance: "",

  // })
  const auth = useContext(AuthContext);

  const transactionAccountInfo = ({ accountAPI, accountInfo }) => {
    axios.get("https://api.up.com.au/api/v1/transactions", auth).then((res) => {
      // console.log(res);
      setTransactionInfo({
        name: res.data.data[0].attributes.displayName,
        amount: `$${res.data.data[0].attributes.amount.value}`,
        description: res.data.data[0].attributes.description,
      });
    });
    // accountAPI();
    // its saying this isnt a function but Im not sure why as its the const declared for the api call?
  };
  const savingAccountInfo = ({ accountAPI, accountInfo }) => {
    axios.get("https://api.up.com.au/api/v1/transactions", auth).then((res) => {
      setTransactionInfo({
        name: res.data.data[1].attributes.displayName,
        amount: `$${res.data.data[1].attributes.amount.value}`,
        description: res.data.data[1].attributes.description,
      });
    });
    // accountAPI();
  };

  return (
    <div>
      <div>
        {console.log(accountAPI)};
        <button onClick={savingAccountInfo}>saving</button>
        <button onClick={transactionAccountInfo}>transaction</button>
        <h2>
          {transactionInfo.amount}: {accountInfo.transactionBalance}{" "}
        </h2>
        <h3>{transactionInfo.description}</h3>
      </div>
    </div>
  );
};

export default Transactions;
