import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { Chat } from '@/components/chat';
import { DEFAULT_MODEL_NAME, models } from '@/lib/ai/models';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;
  //const chat = await getChatById({ id });

//   if (!chat) {
//     notFound();
//   }

  notFound();

  return (
    <>
      <Chat
        id={chatId}
        initialMessages={[]}
        isReadonly={false}
      />
    </>
  );
}
