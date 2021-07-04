import React from "react";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("id_token"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };

// ###########################################################

function loginUser(dispatch, login, password,history, setIsLoading, setError, isLogin, companyName, contactNumber,nameValue ) {
  setError(false);
  setIsLoading(true);

  if (!isLogin) {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({  
        "name" : nameValue,
        "contact_number" : contactNumber,
        "email" : login,
        "password" : password,
        "company_name" : companyName
        
        })
  };
  fetch('http://65.0.124.110:8000/yprs/party/', requestOptions)
  .then(response => response.json())
  .then(response => {
    if(response.data && response.data.party_id){
      localStorage.setItem('party_id',  response.data.party_id)
      localStorage.setItem('partyName',  response.data.name)
      localStorage.setItem('contactNumber',  response.data.contact_number)
      localStorage.setItem('companyName',  response.data.company_name)
      localStorage.setItem('partyEmail',  response.data.email)
    }
  });
      


    setTimeout(() => {
     // localStorage.setItem('id_token', 1)
      setError(null)
      setIsLoading(false)
      dispatch({ type: 'LOGIN_SUCCESS' })

      history.push('/app/dashboard')
    }, 2000);
  } 
  else if (isLogin) {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({  
       
        "email" : login,
        "password" : password
        
        })
  };
  fetch('http://65.0.124.110:8000/yprs/login/', requestOptions)
  .then(response => response.json())
  .then(response => {
    if(response.data && response.data.party_id){
    localStorage.setItem('party_id',  response.data.party_id);
    localStorage.setItem('partyName',  response.data.name);
    localStorage.setItem('companyName',  response.data.company_name);
    localStorage.setItem('contactNumber',  response.data.contact_number);
    localStorage.setItem('partyEmail',  response.data.email);
    }
  });
      


    setTimeout(() => {
     // localStorage.setItem('id_token', 1)
      setError(null)
      setIsLoading(false)
      dispatch({ type: 'LOGIN_SUCCESS' })

      history.push('/app/dashboard')
    }, 2000);
  } 
  else {
    dispatch({ type: "LOGIN_FAILURE" });
    setError(true);
    setIsLoading(false);
  }
}

function signOut(dispatch, history) {
  localStorage.removeItem("id_token");
  localStorage.removeItem("party_id");
  localStorage.removeItem("partyName");
  localStorage.removeItem("partyEmail");
  localStorage.removeItem("contactNumber");
  localStorage.removeItem("companyName");

  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}


