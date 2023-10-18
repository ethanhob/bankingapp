import { useContext, useState, useEffect } from "react";
import { AuthContext } from "./authrequest";
import axios from "axios";

function Transactions() {
  const [transactionInfo, setTransactionInfo] = useState({
    name: "",
    amount: "",
    description: "",
  });
  const [giftSelect, setGiftSelect] = useState(false);
  // the plan is to have buttons that trigger different API calls for each account that i know that i have made. 
  const auth = useContext(AuthContext);
  // i know this isnt best practice but it works
  // also I have no idea how to store this as an environment variable.
  const token =
    "up:yeah:k5W1oFj5K6mfLec2elEjbIlzL14BbrF4ROob1juOc1EkjMIQC9urB8Ojt7ceJx7ulIj4HxASETXsp53ciH3GdMpG5CRxLd8rQgNIptT1RWLkpy79fXk5njQbJEzOCu6O";
  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    axios
      .get("https://api.up.com.au/api/v1/transactions", header)
      .then((res) => {
        console.log(res);
        setTransactionInfo({
          name: res.data.data[0].attributes.displayName,
          amount: `$${res.data.data[0].attributes.amount.value}`,
          description: res.data.data[0].attributes.description,
        });
      });
  },[])

  // This is my first attempt at calling in the second api call by altering the index of the data array (work in progress)
 const fetchAccount2Info= () => { 
  axios
  .get("https://api.up.com.au/api/v1/transactions", header)
  .then((res) => {
    console.log(res);
    setTransactionInfo({
      name: res.data.data[1].attributes.displayName,
      amount: `$${res.data.data[1].attributes.amount.value}`,
      description: res.data.data[1].attributes.description,
    });
  });

 }
 

  return (
    <div>
      <div>
        {/* this likely needs to be wrapped in a ternary setting the state of a variable to true and then if true render the properties of the object in the second fetch */}
        <button onClick={()=> fetchAccount2Info}>gifts</button>
        <h2>{transactionInfo.amount} </h2>
        <h3>{transactionInfo.description}</h3>
      </div>
    </div>
  );
}

export default Transactions;
