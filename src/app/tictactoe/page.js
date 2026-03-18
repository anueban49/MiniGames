"use client";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const Board = ({ children }) => {
  return (
    <div className=" w-66 h-66 grid grid-cols-3 grid-rows-3 p-2 border-2 border-gray-800 g-2 rounded-xl ">
      {children}
    </div>
  );
};
//no bot automation, done anyways
const conditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//function to play with bot =>

export default function tictactoe() {
  const [cell, setCell] = useState(["", "", "", "", "", "", "", "", ""]);
  const [turn, setTurn] = useState("X");
  const [winner, setWinner] = useState();
  const [draw, setDraw] = useState(false);
  const [winnerFound, setWinnerFound] = useState(false);
  const [userRole, setUserRole] = useState("x");

  const handleClick = (index) => {
    const newCell = [...cell];

    if (newCell[index] !== "") return;

    newCell[index] = turn;
    setCell(newCell);
    setTurn(turn === "X" ? "O" : "X");
  };
  function PlayWithBot() {
    const role = "user" ? "bot" : "user";
  }

  useEffect(() => {
    const checkWinner = () => {
      for (const condition of conditions) {
        if (condition.every((item) => cell[item] === "X")) {
          setWinner("X");
          setWinnerFound(true);
          break;
        }
        if (condition.every((item) => cell[item] === "O")) {
          setWinnerFound(true);
          setWinner("O");
          break;
        }
      }
    };

    if (cell.every((c) => c !== "")) {
      setDraw(true);
    }

    checkWinner();
  }, [cell]);

  return (
    <div className="w-full h-full flex flex-col items-center ">
      <h1 className="text-3xl font-bold p-10">Tic-Tac-Toe</h1>
      {draw && <p>Refresh the page to replay again</p>}
      <Board>
        {cell.map((cell, index) => (
          <div
            key={index}
            className={`bg-gray-500 w-20 h-20 flex items-center justify-center text-white text-5xl font-bold rounded-sm ${cell !== "" && "bg-gray-800"} ease-in-out duration-300`}
            onClick={() => {
              handleClick(index);
            }}
          >
            {cell}
          </div>
        ))}
      </Board>
      <p className="text-2xl font-medium ease-in-out duration-300">
        {draw ? (
          <>Draw!</>
        ) : (
          <> {winnerFound ? <>{winner} won</> : <>{turn}'s turn</>}</>
        )}
      </p>
    </div>
  );
}
