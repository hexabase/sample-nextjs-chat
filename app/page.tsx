"use client";
import React, { useEffect, useState } from 'react';
import Login from './components/login';
import Chat from './components/chat';
import client from './hexabase';

export default function Home() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) init(token);
  }, []);

  const success = async (token: string) => {
    localStorage.setItem('token', token);
    await init(token);
  };

  const init = async (token: string) => {
    await client.setToken(token);
    await client.setWorkspace(process.env.NEXT_PUBLIC_WORKSPACE_ID!);
    setLoggedIn(true);
  }

  return (
    <>
      { loggedIn ?
        <Chat client={client} />
      : <Login success={success} />}
    </>
  )
}
