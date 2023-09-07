import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReactElement, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import type { Message } from "@/components/Chat/ChatMessages";
import { MutationContext } from "@/contexts";
import { useUpdateDataMutation } from "@/hooks/useUpdateDataMutation";
import { passOpenAiChatModel } from "@/lib/langchain";
import { runChatMemory } from "@/lib/langchain/memory/chat_memory";
import { runChain, runChat, runChatllm, postMessage } from "@/pages/api";
// import { useAuth } from "@/hooks/useAuth";
// import { passOpenAiModel, passPromptTemplate } from "@/lib/langchain";
// import type { Database } from "@/lib/supabase";
// import {
//   TABLE_NAME,
//   addSupabaseData,
//   fetchDatabase,
// } from "@/lib/supabase/functions";
// import { dummyChat } from "@/utils/dummyMessages";

type FormValues = {
  message: string;
};

type ChatFormProps = {
  children: ReactElement;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
};

export const ChatForm = (props: ChatFormProps) => {
  const { children, messages, setMessages } = props;
  // const { session, profileFromGithub } = useAuth();
  // const [messageText, setMessageText] = useState<Database[]>([]);

  const methods = useForm<FormValues>({
    mode: "onChange",
    defaultValues: { message: "" },
  });
  const {
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = methods;

  const sendMessage = useUpdateDataMutation();
  // const values = watch();

  const onSubmitForm = (data: FormValues) => {
    if (!data.message.trim().length) {
      return;
    }
    setMessages((old) => [...old, { role: "user", content: data.message }]);
    // ユーザーInputのDB登録
    // addSupabaseData({ message: data.message, ...profileFromGithub });
    reset();
    // 非同期処理
    sendMessage.mutate(
      { message: data.message, history: messages },
      {
        onSuccess: (res) => {
          setMessages((old) => [...old, { role: "assistant", content: res }]);
          // TODO responceのDB登録
          // addSupabaseData({
          //   message: res,
          //   nickName: "ai",
          //   avatarUrl: "",
          // });
        },
      }
    );
  };

  // TODO supabaseのrealtime eventを利用してDBを更新する
  // const fetchRealtimeData = () => {
  //   try {
  //     supabase
  //       .channel("table_postgres_changes")
  //       .on(
  //         "postgres_changes",
  //         {
  //           event: "*",
  //           schema: "public",
  //           table: TABLE_NAME,
  //         },
  //         (payload) => {
  //           if (payload.eventType === "INSERT") {
  //             console.log("payload: ", payload);
  //             const { createdAt, id, message, avatarUrl, nickName } =
  //               payload.new;
  //             setMessageText((messageText) => [
  //               ...messageText,
  //               { createdAt, id, message, avatarUrl, nickName },
  //             ]);
  //           }
  //         }
  //       )
  //       .subscribe();
  //
  //     return () => supabase.channel("table_postgres_changes").unsubscribe();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // TODO 初回のDB取得はuseEffectで行う
  // useEffect(() => {
  //   (async () => {
  //     const allMessage = await fetchDatabase();
  //     setMessageText(allMessage as Database[]);
  //   })();
  //   fetchRealtimeData();
  // }, []);

  return (
    <MutationContext.Provider value={sendMessage}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmitForm)}>{children}</form>
      </FormProvider>
    </MutationContext.Provider>
  );
};
