import React, { useRef, useCallback, useState, useEffect }  from 'react'
import { useHistory } from 'react-router-dom'
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Container } from './styles'
import api from '../../services/api'

interface EventsData {
  id: string;
  nomeevento: string;
  local: string;
  diasemana: string;
  horario: string;
  like: number;
  dislike: number
}

const Dashboard: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const [events, setEvents] = useState<EventsData[]>([])

  useEffect(() => {
    api.get('/events').then(response => {
      setEvents(response.data)
    })
  }, [])

  const handleSubmit = useCallback(async (data: EventsData) => {

    formRef.current?.reset()
    await api.post('events', data)

    api.get('/events').then(response => {
      setEvents(response.data)
    })

  }, []);

  return (
    <>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input type='text' name='nomeevento' placeholder='Nome do Evento' />
        <Input type='text' name='local' placeholder='Local do Evento' />
        <Input type='text' name='diasemana' placeholder='Dia da Semana' />
        <Input type='text' name="horario" placeholder="Horário" />
        <Button type="submit">Cadastrar</Button>
      </Form>

    {events && (

        <ul>
          {events.map((dados, index) => (
            <Container>
            <>
              <li key={index.toString()}>
                <span>Nome: {dados.nomeevento}</span>
                <span>Local: {dados.local}</span>
                <span>Dia Semana: {dados.diasemana}</span>
                <span>Horario: {dados.horario}</span>
                <span>Like: {dados.like}</span>
                <span>Dislike: {dados.dislike}</span>

              </li>
            <Button onClick={(async () => {
              await api.delete(`/events/${dados.id}`)
              api.get('/events').then(response =>{
                setEvents(response.data)
              })
            })}>Excluir</Button>
            <Button onClick={(async () => {
              await api.post(`/events/like/${dados.id}`)
              api.get('/events').then(response =>{
                setEvents(response.data)
              })
            })}>Like</Button>
            <Button onClick={(async () => {
              await api.post(`/events/dislike/${dados.id}`)
              api.get('/events').then(response =>{
                setEvents(response.data)
              })
            })}>Dislike</Button>
            </>
            </Container>
          ))}
        </ul>

    )}
    </>
  )
}

export default Dashboard



