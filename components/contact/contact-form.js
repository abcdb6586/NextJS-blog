import { useState, useEffect } from 'react';
import classes from './contact-form.module.css';
import Notification from '../ui/notification';

async function sendContactData(contactDetails) {
  // fetch這邊的作用初始位置跟pages同一層
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(contactDetails),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || '發生錯誤');
  }
}

function ContactForm() {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredName, setEnteredName] = useState('');
  const [enteredMessage, setEnteredMessage] = useState('');
  const [requestStatus, setRequestStatus] = useState(); //'pending','success','error'
  const [requestError, setRequestError] = useState();

  useEffect(() => {
    if (requestStatus === 'success' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [requestStatus]);

  async function sendMessageHandler(event) {
    event.preventDefault();

    setRequestStatus('pending');
    try {
      await sendContactData({
        email: enteredEmail,
        name: enteredName,
        message: enteredMessage,
      });
      setRequestStatus('success');
      setEnteredEmail('');
      setEnteredName('');
      setEnteredMessage('');
    } catch (error) {
      setRequestStatus('error');
      setRequestError(error.message);
    }
  }

  let notification;
  if (requestStatus === 'pending') {
    notification = {
      status: 'pending',
      title: '傳送訊息中',
      message: '正在傳送您的訊息',
    };
  }
  if (requestStatus === 'success') {
    notification = {
      status: 'success',
      title: '成功傳送訊息',
      message: '已成功傳送訊息',
    };
  }
  if (requestStatus === 'error') {
    notification = {
      status: 'error',
      title: '傳送失敗',
      message: requestError,
    };
  }

  return (
    <section className={classes.contact}>
      <h1>留言給我吧!</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">你的Email</label>
            <input
              type="email"
              id="email"
              required
              value={enteredEmail}
              onChange={(event) => setEnteredEmail(event.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">你的名字</label>
            <input
              type="text"
              id="name"
              required
              value={enteredName}
              onChange={(event) => setEnteredName(event.target.value)}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">你的留言</label>
          <textarea
            id="message"
            rows="5"
            required
            value={enteredMessage}
            onChange={(event) => setEnteredMessage(event.target.value)}
          ></textarea>
        </div>

        <div className={classes.actions}>
          <button>傳送留言</button>
        </div>
      </form>
      {notification && <Notification notification={notification} />}
    </section>
  );
}

export default ContactForm;
