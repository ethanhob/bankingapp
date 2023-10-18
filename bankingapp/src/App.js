import './App.css';
import { AuthContext } from './authrequest';
import Accounts from './accounts';
import Transactions from './transactions';
import React from 'react';

export default function App() {
   
      return (
        <div>
          <h1>Here is a summary of your accounts</h1>
        <AuthContext.Provider value={{
          // again not sure how to create a global variable
          Authorisation: `Bearer up:yeah:k5W1oFj5K6mfLec2elEjbIlzL14BbrF4ROob1juOc1EkjMIQC9urB8Ojt7ceJx7ulIj4HxASETXsp53ciH3GdMpG5CRxLd8rQgNIptT1RWLkpy79fXk5njQbJEzOCu6O,`   
         }}
        >
          <Accounts />
          <Transactions />
        
        </AuthContext.Provider>
        </div>
      );
}
