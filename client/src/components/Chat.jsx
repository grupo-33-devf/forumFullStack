
import ConnectionManager from './ConnectionManager';
import ConnectionState from './ConnectionState';
import Event from './Event';
import Form from './Form';

import { socket } from '../utils/socket'
import { useState, useEffect } from 'react';


const Chat = () => {

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [events, setEvents] = useState([]);


  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true)

    }

    const onDisconnect = () => {
      setIsConnected(false);
      setEvents([]);
    }

    const onEvent = (data) => {
      console.log(data);
      setEvents(prev => [...prev, data]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('server-message', onEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('server-message', onEvent);
    };

  }, [])


  return (
    <>
      <aside className='bg-indigo-300 rounded-md m-4 p-4 text-black flex flex-col '>
        <h1>Chat</h1>
        <ConnectionState isConnected={isConnected} />
        <Form isConnected={isConnected} />
        <Event events={events} />
        <ConnectionManager isConnected={isConnected} />
      </aside>

    </>
  )
}

export default Chat