import React from "react";

function Features() {
  return (
    <div className="flex gap-10 justify-center items-center flex-wrap mt-20">
      <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center w-56">
        <div className="flex w-full justify-between items-center mb-4">
          <span className="text-gray-500 text-sm font-medium">Bu ay</span>
          <span className="w-3 h-3 rounded-full bg-amber-300 inline-block"></span>
        </div>
        <div className="text-4xl font-bold text-gray-800 mb-2">4</div>
        <div className="text-gray-600 text-base">Gelen istekler</div>
      </div>
      <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center w-56">
        <div className="flex w-full justify-between items-center mb-4">
          <span className="text-gray-500 text-sm font-medium">Bu ay</span>
          <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
        </div>
        <div className="text-4xl font-bold text-gray-800 mb-2">7</div>
        <div className="text-gray-600 text-base">Onaylanan</div>
      </div>
      <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center w-56">
        <div className="flex w-full justify-between items-center mb-4">
          <span className="text-gray-500 text-sm font-medium">Bu ay</span>
          <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
        </div>
        <div className="text-4xl font-bold text-gray-800 mb-2">7</div>
        <div className="text-gray-600 text-base">Reddedilen</div>
      </div>
    </div>
  );
}

export default Features;
