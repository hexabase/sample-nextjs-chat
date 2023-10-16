"use client";
import React, { useEffect, useState } from 'react';
import { Button, Flex, Heading, Input, } from "@chakra-ui/react";
import { HexabaseClient, Item } from '@/../hexabase-js/dist';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const client = new HexabaseClient();

type Props = {
	client: HexabaseClient
}

export default function Chat(params: Props) {
	const router = useRouter();
	const [rooms, setRooms] = useState<Item[]>([]);

	useEffect(() => {
		getRooms();
	}, []);

	const getRooms = async () => {
		const rooms = await client.query(process.env.NEXT_PUBLIC_PROJECT_ID!)
			.from(process.env.NEXT_PUBLIC_DATASTORE_CHAT_ID!)
			.select('*');
		setRooms(rooms);
	}

	const logout = async () => {
		localStorage.removeItem('token');
		try {
			await client.logout();
		} catch (e) {
			client.tokenHxb = '';
			// debugger;
		}
		router.refresh();
	};

  return (
		<div className="w-full max-w-2xl bg-white md:rounded-lg md:shadow-md p-4 md:p-10 my-10">
			<Flex height="100vh" alignItems="center" justifyContent="center">
				<Flex direction="column" background="gray.100" padding={12} rounded={6}>
					<Heading mb={6}>All rooms</Heading>
					<span onClick={logout}>ログアウト</span>
					<div className="grid grid-flow-row auto-rows-max">
						{rooms.map((room, i) => {
							return (
								<div key={i}>
									<Link href={`/${room.id}`}>
										{room.get<string>('name')}
									</Link>
								</div>
							)
						})}
					</div>
				</Flex>
			</Flex>
    </div>
  )
}
