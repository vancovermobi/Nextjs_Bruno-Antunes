import { useRef, useState } from 'react';

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<any>(null);

  async function onHandleClickLogin(e:any) {
      e.preventDefault();
    //   console.log(emailRef.current?.value , passwordRef.current?.value);
    const resp = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: emailRef.current?.value,
            password: passwordRef.current?.value
        })
    });
    const json = await resp.json();
    console.log("Login: ", json);
    setMessage(json);
  };
  return (
    <div>
      <h2>Login_Page</h2>
      <form>
        <input type="text" placeholder="email" ref={emailRef} />
        <input type="password" placeholder="password" ref={passwordRef} />

        <button onClick={(e) => onHandleClickLogin(e)}>Login</button>
      </form>
      { JSON.stringify(message) }<br></br>
    </div>
  );
}
