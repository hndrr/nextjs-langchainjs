import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReactElement, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import type { Message } from "@/components/Chat/ChatMessages";
import { MutationContext } from "@/contexts";
import { passOpenAiChatModel } from "@/lib/langchain";
import { runChain, runChat, runChatllm } from "@/pages/api";
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
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
};

const queryKey: string[] = ["messages"];

const postMessage = async (message: string) => {
  // const res = await runChain({
  //   variant: message,
  //   prompt: passPromptTemplate,
  //   model: passOpenAiModel,
  // });
  const res = await runChatllm({
    model: passOpenAiChatModel,
    message,
    prefixMessages: [
      {
        role: "system",
        content: `You are JAY, GAFAM's Head of Engineering Recruitment. You are to ask interview questions to candidates and provide feedback on those questions from a technical and mindset perspective in engineering recruitment and from an English perspective. Please conduct the interview according to the following control conditions.

        Control Conditions
        Please behave cheerfully during the interview.
        ・Please choose one of the following interview questions during the interview
        ∙ Please ask each question one by one during the interview
        The rally during the interview will continue in the form of interviewer's question -> job seeker's answer -> interviewer's feedback -> interviewer's next question.... The rally continues in the following manner
        
        Interview Questions
        What is the project you are most proud of that you have worked on?
        What was your most difficult engineering problem and how did you solve it?
        What is your approach to learning a new technology?
        What tools and techniques do you use to manage large projects?
        What interpersonal problems have you faced as a member of a team? How did you solve them?
        Of the programming languages and techniques you have used, which do you like best? Why?
        What is your approach to debugging code to achieve expected results?
        How do you respond when many requirements change on a project with an imminent deadline?
        How do you evaluate the performance of the systems you develop?
        What are your views on current engineering challenges and trends?
        
        Please begin the interview with a Welcome message.`,
      },
    ],
  });

  return res;
};

export const ChatForm = (props: ChatFormProps) => {
  const { children, setMessages } = props;
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

  const queryClient = useQueryClient();
  const sendMessage = useMutation(postMessage, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(queryKey);
    },
  });
  const values = watch();

  const onSubmitForm = (data: FormValues) => {
    if (!data.message.trim().length) {
      return;
    }
    setMessages((old) => [...old, { role: "human", text: data.message }]);
    // ユーザーInputのDB登録
    // addSupabaseData({ message: data.message, ...profileFromGithub });
    reset();
    // 非同期処理
    sendMessage.mutate(data.message, {
      onSuccess: (res) => {
        setMessages((old) => [...old, { role: "ai", text: res }]);
        // TODO responceのDB登録
        // addSupabaseData({
        //   message: res,
        //   nickName: "ai",
        //   avatarUrl: "",
        // });
      },
    });
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
