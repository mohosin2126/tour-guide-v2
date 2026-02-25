import SubscribeForm from "./subscribe-form";

export default function Subscribe() {
  return (
    <div className="relative 4 bottom-4 mx-auto w-10/12 rounded-lg bg-amber-600 p-3 sm:p-10">
      <div className="flex flex-col items-center justify-between gap-10 lg:flex-row">
        <div className="z-10 flex-1">
          <h1 className="text-[2.5rem] font-bold text-white">
            Subscribe for latest update about Travelling
          </h1>
        </div>
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <img src="/subscribe.png" className="h-52 w-52" alt="" />
        </div>
        <div className="z-10 w-full flex-1">
          <SubscribeForm className="justify-end" />
        </div>
      </div>
    </div>
  );
}
