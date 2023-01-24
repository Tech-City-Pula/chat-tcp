import { FC } from "react";

interface QuestionInpuProps {
  prompt: string;
  promptError: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  generateResponse: () => Promise<void>;
  response: string;
}

export const QuestionInput: FC<QuestionInpuProps> = ({
  prompt,
  promptError,
  handleChange,
  generateResponse,
  response,
}) => {
  return (
    <>
      <div className="flex flex-col h-full w-full items-center">
        <input
          className="w-[50%] h-[30px] bg-slate-300 text-black px-2"
          type="text"
          value={prompt}
          onChange={handleChange}
          placeholder="ask away"
        />
      </div>
      {promptError && <div className="text-red-400">Prompt me bastard</div>}
      <button
        onClick={generateResponse}
        className="text-white border border-white px-10 py-1 rounded-xl "
      >
        Ask
      </button>
      <p className="text-white">RESPONSE</p>
      {response.length > 0 && (
        <div className="border border-white p-4 max-w-[60%]">
          <p className="text-white">{response}</p>
        </div>
      )}
    </>
  );
};
