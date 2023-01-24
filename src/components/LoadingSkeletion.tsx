export const LoadingSkeleton = () => {
  return (
    <>
      <div className="border border-blue-300 shadow w-[300px] h-[35px] rounded-full flex flex-col justify-center">
        <div className="animate-pulse flex justify-center">
          <div className="bg-slate-700 w-[80%] h-3"></div>
        </div>
      </div>
    </>
  );
};
