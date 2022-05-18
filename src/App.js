import React, { useEffect } from 'react';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Mail from './Mail';
import EmailList from './EmailList';
import SendMail from './SendMail';
import { useDispatch, useSelector } from 'react-redux';
import { selectSendMessageIsOpen } from "./features/mailSlice";
import Login from './Login';
import { login, selectUser } from "./features/userSlice"
import { auth } from './firebase';

function App() {
  const sendMessageIsOpen = useSelector(selectSendMessageIsOpen); // using redux we are accessing the mail slice from the data layer(state) that is accessible from any component inside of our app. This unique functionality is possible because of Redux.
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => { // keeps user signed in even after hard reload
    auth.onAuthStateChanged(user => {
      if (user) {
        dispatch(login({ // identifying user data that comes back from google
          displayName: user.displayName,
          email: user.email,
          photoUrl: user.photoURL,
        }))
      }
    })
  }, [])

  return (
    <BrowserRouter>
      {!user ? (
        <Login />
      ) : (
        <div className="App">
          <Header />
          <div className="App__body">
            <Sidebar />
            <Routes>
              <Route path="/mail" element={<Mail />} />
              <Route exact path="/" element={<EmailList />} />
            </Routes>
          </div>
          {sendMessageIsOpen && <SendMail />}
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
