"use client";
import { Item } from '@/../hexabase-js/dist';
import ItemHistory from '@/../hexabase-js/dist/lib/packages/itemHistory';
import React, { useEffect, useState } from 'react';
import client from '../hexabase';
import { Button, Flex, Heading, List,
  ListItem,
} from "@chakra-ui/react";

type Props = {
	params: {
		id: string,
	},
}

export default function Room(props: Props) {
	const { id } = props.params;
	const [room, setRoom] = useState<Item | undefined>(undefined);
	const [messages, setMessages] = useState<ItemHistory[]>([]);
	const [comment, setComment] = useState<string>('');

  useEffect(() => {
		getRoom();
  }, []);

	const getRoom = async () => {
		await initHexabase();
		const project = await client.currentWorkspace?.project(process.env.NEXT_PUBLIC_PROJECT_ID!);
		const datastore = await project?.datastore(process.env.NEXT_PUBLIC_DATASTORE_CHAT_ID!);
		const room = await datastore?.item(id);
		if (!room) return;
		setRoom(room);
		setHistory(room);
		subscribe(room);
	};

	const setHistory = async (room: Item) => {
		const histories = await room?.histories();
		setMessages((histories || []).filter((history) => history.comment !== '' && history.comment !== '__refresh__'));
	}

	const subscribe = (room: Item) => {
		room?.subscribe('update', async (history) => {
			setHistory(room);
		});
	}

	const initHexabase = async () => {
		const token = localStorage.getItem('token');
		if (!token) return;
		await client.setToken(token);
		await client.setWorkspace(process.env.NEXT_PUBLIC_WORKSPACE_ID!);
	};

	const submit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();
		const history = room!.comment();
		history.set('comment', comment);
		await history.save();
		setComment('');
	};

	const remove = async (history: ItemHistory) => {
		await history.delete();
		const deleteMessage = room!.comment();
		deleteMessage.set('comment', '__refresh__');
		await deleteMessage.save();
	}

  return (
		<div className="w-full max-w-2xl bg-white md:rounded-lg md:shadow-md p-4 md:p-10 my-10">
			<Flex height="100vh" alignItems="center" justifyContent="center">
				<Flex direction="column" background="gray.100" padding={12} rounded={6}>
					<Heading mb={6}>{room?.get<string>('name')}</Heading>
					<List spacing={3}>
						{messages.map((message, i) => {
							return (
								<ListItem key={i}>
									{message.comment} by {message.user?.userName}
									{message.user?.userName === client.currentUser?.userName && <Button onClick={() => remove(message)}>削除</Button>}
								</ListItem>
							)
						})}
					</List>
					<form onSubmit={submit}>
						<input type="text" id="comment" value={comment} onChange={e => setComment(e.target.value)} />
						<button type="submit">送信</button>
					</form>
				</Flex>
			</Flex>
		</div>
  )
}
