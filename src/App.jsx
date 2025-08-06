import React, { useState, useEffect } from "react";
import Discovery from "./pages/Discovery";
import MyCollection from "./pages/MyCollection";
import { GiPokecog } from "react-icons/gi";
import { FaStar } from "react-icons/fa";

export default function App() {
  const [page, setPage] = useState("discovery");
  const [collectionCount, setCollectionCount] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("collection") || "[]").length;
    } catch {
      return 0;
    }
  });

  useEffect(() => {
    const handler = () => {
      setCollectionCount(
        JSON.parse(localStorage.getItem("collection") || "[]").length
      );
    };
    window.addEventListener("collectionUpdated", handler);
    return () => window.removeEventListener("collectionUpdated", handler);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6958c5] via-[#8c77e9] to-[#a089fa] flex flex-col">
      {/* Header */}
      <div className="w-full bg-white px-2 pb-6 pt-8 flex flex-col items-center shadow">
        {/* Title Row */}
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">🔥</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-wide">
            Pokemon Collection App
          </h1>
        </div>
        <p className="text-gray-700 text-sm font-medium mb-4 mt-1 text-center">
          Discover, collect, and organize your favorite Pokemon!
        </p>
        {/* Tabs */}
        <div className="flex gap-4 mt-2 mx-5">
          {/* Discover Tab */}
          <button
            onClick={() => setPage("discovery")}
            className={`flex items-center gap-2 px-6 py-2 rounded-full font-semibold text-base shadow transition-all duration-150
              ${
                page === "discovery"
                  ? "bg-[#6f62c1] text-white border-2 border-[#6f62c1] scale-105"
                  : "bg-white text-[#6f62c1] border-2 border-[#6f62c1] hover:bg-[#edeaff]"
              }
            `}
            style={{
              boxShadow:
                page === "discovery"
                  ? `0 2px 10px 0 #6f62c122`
                  : "0 1px 5px 0 #bdb6e533",
            }}
          >
            <GiPokecog className="text-lg" />
            Discover Pokemon
          </button>
          {/* My Collection Tab */}
          <button
            onClick={() => setPage("collection")}
            className={`flex items-center gap-2 px-6 py-2 rounded-full font-semibold text-base shadow transition-all duration-150
              ${
                page === "collection"
                  ? "bg-[#3765c9] text-white border-2 border-[#3765c9] scale-105"
                  : "bg-white text-[#3765c9] border-2 border-[#3765c9] hover:bg-[#e7f0ff]"
              }
            `}
            style={{
              boxShadow:
                page === "collection"
                  ? `0 2px 10px 0 #3765c955`
                  : "0 1px 5px 0 #7ba0e522",
            }}
          >
            <FaStar className="text-lg" />
            My Collection
            <span
              className={`ml-1 bg-white text-[#3765c9] font-bold rounded-full px-2 py-0.5 text-xs shadow border border-[#3765c9]`}
            >
              {collectionCount}
            </span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex justify-center items-start py-10 px-5">
        <div className="w-full max-w-6xl mx-auto">
          {page === "discovery" ? <Discovery /> : <MyCollection />}
        </div>
      </div>
    </div>
  );
}
