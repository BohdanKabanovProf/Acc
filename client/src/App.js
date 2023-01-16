import { observer } from 'mobx-react-lite'
import { useContext, useEffect } from 'react'
import { Context } from '.'
import LoginForm from './components/LoginForm'

function App() {
  const { store } = useContext(Context)
  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])

  return (
    <div className="App">
      <h1>
        {store.isAuth
          ? `Пользваотель авторизован ${store.user.email}`
          : 'Авторизуйтесь'}
      </h1>
      <LoginForm />
    </div>
  )
}

export default observer(App)
