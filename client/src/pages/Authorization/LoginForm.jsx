import { observer } from 'mobx-react-lite'
import React, { useState, useContext } from 'react'
import { Context } from '../..'
import {
  Container,
  Row,
  Col,
  InputGroup,
  Form,
  Modal,
  Button,
} from 'react-bootstrap'
import styles from './LoginForm.module.css'
import Messege from '../../components/UI/MessagesFromSite/Message/Messege'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { store } = useContext(Context)
  const [validated, setValidated] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
      console.log('Валидация не удалась')
      setValidated(true)
    } else {
      store.login(email, password)
    }
  }
  return (
    <div>
      <Messege errors={store.errors}>Сообщение</Messege>
      <Container>
        <Row className="mb-3 mt-5">
          <Col>
            <p>Для продолжения авторизуйтесь.</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className={styles.wrapper__form}>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                  <Col>
                    <InputGroup className="mb-3">
                      <Form.Control
                        placeholder="Ваш почта"
                        aria-label="Ваш почта"
                        aria-describedby="basic-addon2"
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <Form.Control
                        placeholder="Ваш пороль"
                        aria-label="Ваш пороль"
                        aria-describedby="basic-addon2"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                        minLength={6}
                      />
                    </InputGroup>
                    <button className="mt-4">Авторизоваться</button>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default observer(LoginForm)
