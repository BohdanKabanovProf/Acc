import { observer } from 'mobx-react-lite'
import { useContext, useEffect } from 'react'
import { Context } from '.'
import LoginForm from './pages/Authorization/LoginForm'
import HomePage from './pages/HomePage/HomePage'

function App() {
  const { store } = useContext(Context)
  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])

  if (store.isLoading) {
    return <h1>Загрузка</h1>
  }

  if (!store.isAuth) {
    return <LoginForm />
  }

  return (
    <div className="App">
      <h1>{store.isAuth ? <HomePage /> : 'Авторизуйтесь'}</h1>
    </div>
  )
}

export default observer(App)
