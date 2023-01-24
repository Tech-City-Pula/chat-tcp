import { FC } from "react";

export type TModel = {
  [key: string]: string;
};

interface ChatGptModelsProps {
  models: TModel[] | null;
  selectedModel: string;
  setSelectedModel: React.Dispatch<React.SetStateAction<string>>;
}

export const ChatGptModels: FC<ChatGptModelsProps> = ({
  models,
  selectedModel,
  setSelectedModel,
}) => {
  return (
    <>
      <div className="grid grid-cols-3 grid-flow-row gap-4">
        {models?.map((model) => (
          <button
            className={`border text-white uppercase border-white rounded-[15px] px-2 py-1 ${
              selectedModel === model.id && "bg-red-300"
            }`}
            key={model.id}
            onClick={() => setSelectedModel(model.id)}
          >
            {model.id}
          </button>
        ))}
      </div>
    </>
  );
};
