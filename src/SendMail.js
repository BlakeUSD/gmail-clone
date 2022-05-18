import React from 'react'
import "./SendMail.css"
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material'
import { useForm } from "react-hook-form"
import { useDispatch } from 'react-redux';
import { closeSendMessage } from "./features/mailSlice" // is the function defined in the mailSlice.js that I am using to close the SendMail component whenever the CloseIcon is clicked
import { db } from './firebase';
import firebase from 'firebase/compat/app';

function SendMail() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const dispatch = useDispatch(); // is the Redux keyword that allows access to the data layer

  const onSubmit = (formData) => {
    // console.log(formData)
    db.collection('emails').add({ // accessing the firestore database
      to: formData.to, // using the key : value pairs I am assigning the value of the fields to the value that they have in the form when submitted
      subject: formData.subject,
      message: formData.message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(), // uses the firebase server time stamp as the one true source, this compensates for users in different time zones 
    });

    dispatch(closeSendMessage()); // using redux, when the form is submitted the form will close
  };


  return (
    <div className='sendMail'>
      <div className="sendMail__header">
        <h3>New Message</h3>
        <CloseIcon onClick={() => dispatch(closeSendMessage())} className='sendMail__close'
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder='To'
          {...register("to", { required: true })}
        />
        <p className='sendMail__error'>{errors.to && "This field is required"}</p>
        <input
          type="text"
          placeholder='Subject'
          {...register("subject", { required: true })}
        />
        <p className='sendMail__error'>{errors.subject && "Subject is required"}</p>
        <input
          className='sendMail__message'
          type="text"
          placeholder='Message...'
          {...register("message", { required: true })}
        />
        <p className='sendMail__error'>{errors.message && "Message is required"}</p>

        <div className="sendMail__options">
          <Button
            className='sendMail__send'
            variant='contained'
            color='primary'
            type='submit'
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SendMail