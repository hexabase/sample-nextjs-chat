"use client";
import React, { useEffect, useState } from 'react';
import { Button, Flex, Heading, Input, } from "@chakra-ui/react";
import { HexabaseClient } from '@/../hexabase-js/dist';
const client = new HexabaseClient();

type FormType = {
  email: string,
  password: string
  errorMessage: string,
}

type Props = {
	success: (token: string) => void
}

export default function Login(params: Props) {
  const [form, setForm] = useState<FormType>({
    email: '',
    password: '',
    errorMessage: '',
  });

	const login = async (e: React.SyntheticEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const bol = await client.login({email: form.email, password: form.password});
		if (bol) {
			params.success(client.tokenHxb);
		} else {
			setForm({...form, errorMessage: 'ログインに失敗しました。'});
		}
	};

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({...form, [e.target.id]: e.target.value});
  }

  return (
    <div className="w-full max-w-2xl bg-white md:rounded-lg md:shadow-md p-4 md:p-10 my-10">
			<Flex height="100vh" alignItems="center" justifyContent="center">
				<Flex direction="column" background="gray.100" padding={12} rounded={6}>
				<Heading mb={6}>Log in</Heading>
					<form onSubmit={login}>
						<Input type="email" placeholder="メールアドレス" variant="filled" value={form.email} onChange={change} />
						<Input type="password" placeholder="パスワード" variant="filled" value={form.password} onChange={change} />
						{form.errorMessage && <p>{form.errorMessage}</p>}
						<Button mb={6} colorScheme="teal" onClick={login}>Log in</Button>
					</form>
				</Flex>
			</Flex>
    </div>
  )
}
