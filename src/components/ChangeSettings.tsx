import { FC } from "react";

interface ChangeSettingProps {
  changeTemperature: (event: React.ChangeEvent<HTMLInputElement>) => void;
  temperature: number;
  handleTokenChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ChangeSetting: FC<ChangeSettingProps> = ({
  changeTemperature,
  handleTokenChange,
  temperature,
}) => {
  return (
    <>
      <div className="flex flex-row gap-2 items-center">
        <p className="text-white">Temperature :</p>
        <input
          type="range"
          id="volume"
          step="0.01"
          name="volume"
          min="0"
          max="0.99"
          onChange={changeTemperature}
          value={temperature}
        />
        <label className="text-white">{temperature}</label>
      </div>
      <div className="flex flex-row justify-center gap-3 items-center w-full">
        <p className="text-white">Maximum amount of words :</p>
        <input
          type="number"
          className="w-[100px]"
          max="2048"
          min="1"
          onChange={handleTokenChange}
        />
        <p className="text-white"> &#40; max 2048 &#41;</p>
      </div>
    </>
  );
};
