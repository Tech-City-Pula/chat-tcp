import { ChangeSetting } from "@/components/ChangeSettings";
import { ChatGptModels, TModel } from "@/components/ChatGptModels";
import { LoadingSkeleton } from "@/components/LoadingSkeletion";
import { QuestionInput } from "@/components/QuestionAndResponse";
import { axiosInstance } from "@/utils/axiosInstance";
import Head from "next/head";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [promptError, setPromptError] = useState(false);
  const [response, setResponse] = useState("");
  const [models, setModels] = useState<TModel[] | null>(null);
  const [selectedModel, setSelectedModel] = useState("text-davinci-002");
  const [temperature, setTemperature] = useState(0);
  const [tokens, setTokens] = useState(10);
  const [loading, setLoading] = useState(true);

  let loadingSkeleton = Array(66).fill(0);

  useEffect(() => {
    if (models) {
      setTimeout(() => {
        setLoading(false);
      }, 30);
    }
  }, [models]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
  };

  const handleTokenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTokens(Number(event.target.value));
  };

  const generateResponse = async () => {
    if (!prompt) {
      setPromptError(true);
      return;
    }

    const response = await axiosInstance.post("/completion", {
      prompt,
      temperature,
      max_tokens: tokens,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      model: selectedModel,
    });

    setResponse(response.data.choices[0].text);
  };

  useEffect(() => {
    const timer = setTimeout(() => promptError && setPromptError(false), 3000);

    return () => clearTimeout(timer);
  }, [promptError]);

  useEffect(() => {
    const fetchModels = async () => {
      const response = await axiosInstance.get("/models", {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CHAT_GPT_KEY}`,
        },
      });
      setModels(response.data.data);
    };

    fetchModels();
  }, []);

  const changeTemperature = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTemperature(event.target.valueAsNumber);
  };

  return (
    <>
      <Head>
        <title>Chat GPT project</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="flex flex-col items-center justify-center h-full p-[35px] gap-5 ">
        <p className="uppercase text-white">Ask Chat GPT</p>
        <QuestionInput
          prompt={prompt}
          promptError={promptError}
          handleChange={handleChange}
          generateResponse={generateResponse}
          response={response}
        />
        <ChangeSetting
          temperature={temperature}
          handleTokenChange={handleTokenChange}
          changeTemperature={changeTemperature}
        />

        {loading ? (
          <div className="grid grid-cols-3 grid-flow-row gap-4">
            {loadingSkeleton.map((index: number) => (
              <LoadingSkeleton key={index} />
            ))}
          </div>
        ) : (
          <ChatGptModels
            models={models}
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel}
          />
        )}
      </main>
    </>
  );
}
