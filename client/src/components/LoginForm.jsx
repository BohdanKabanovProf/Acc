import { observer } from 'mobx-react-lite'
import React, { useState, useContext } from 'react'
import { Context } from '..'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { store } = useContext(Context)

  return (
    <div>
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="text"
        placeholder="Почта"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="text"
        placeholder="Пороль"
      />
      <button onClick={() => store.login(email, password)}>Логин</button>
    </div>
  )
}

export default observer(LoginForm)
