"use client";
import { useState } from "react";
import { useEffect } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Checkbox } from "@/components/ui/checkbox";
import { nanoid } from "nanoid";

const STATUS = {
  COMPLETE: "Complete",
  INCOMPLETE: "Incomplete",
};

export default function todoApp() {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const saved = localStorage.getItem("Saved");
    if (saved) {
      setTodos(JSON.parse(saved));
    }
    return;
  }, []);

  useEffect(() => {
    localStorage.setItem("Saved", JSON.stringify(todos));
    return;
  }, [todos]);

  const TodoItem = ({ prop }) => {
    return (
      <div className="flex gap-2 items-center justify-between w-full p-2">
        <div className="flex gap-2">
          <div className="flex items-center justify-center">
            <Checkbox
              checked={prop.status === STATUS.COMPLETE}
              onCheckedChange={() => {
                setTodos((prevTodos) =>
                  prevTodos.map((item) => {
                    if (item.id === prop.id) {
                      return {
                        ...item,
                        status:
                          item.status === STATUS.COMPLETE
                            ? STATUS.INCOMPLETE
                            : STATUS.COMPLETE,
                      };
                    }
                    return item;
                  }),
                );
              }}
            />
          </div>
          <p
            className={`${prop.status === STATUS.COMPLETE ? "line-through text-gray-500" : ""}`}
          >
            {prop.text}
          </p>
        </div>
        <Button
          className="self-end"
          variant="destructive"
          onClick={() => {
            setTodos((todos) => todos.filter((t) => t.id !== prop.id));
          }}
        >
          Delete
        </Button>
      </div>
    );
  };
  const ShowAll = () => {
    return (
      <>
        {todos.map((t) => (
          <TodoItem prop={t} key={t.id} />
        ))}
      </>
    );
  };

  const ShowIncomplete = () => {
    return (
      <>
        {todos
          .filter((t) => t.status === STATUS.INCOMPLETE)
          .map((t) => (
            <TodoItem prop={t} key={t.id} />
          ))}
      </>
    );
  };

  const ShowCompleted = () => {
    return (
      <>
        {todos
          .filter((t) => t.status === STATUS.COMPLETE)
          .map((t) => (
            <TodoItem prop={t} key={t.id} />
          ))}
      </>
    );
  };

  function RenderComponent({ filter }) {
    switch (filter) {
      case "All":
        return <ShowAll />;
      case "Incomplete":
        return <ShowIncomplete />;
      case "Completed":
        return <ShowCompleted />;
      default:
        return <ShowAll />;
    }
  }

  return (
    <>
      <main className="w-full h-full flex items-center justify-center p-10">
        <div className="w-full h-full flex justify-center">
          <Card className="w-full max-w-sm p-5 h-fit">
            <CardTitle>To-Do List</CardTitle>
            <div className="gap-2 grid grid-cols-3 text-4xl cursor-pointer ">
              <Button
                className={`px-4 py-2 w-full hover:bg-gray-500 hover:text-white ease-in-out duration-300 bg-gray-200 text-black ${filter === "All" && "bg-gray-800 text-white"} `}
                onClick={() => {
                  setFilter("All");
                }}
              >
                All
              </Button>
              <Button
                onClick={() => {
                  setFilter("Incomplete");
                }}
                className={`px-4 py-2 w-full hover:bg-gray-500 hover:text-white ease-in-out duration-300 bg-gray-200 text-black ${filter === "Incomplete" && "bg-gray-800 text-white"} `}
              >
                Incomplete
              </Button>
              <Button
                onClick={() => {
                  setFilter("Completed");
                }}
                className={`px-4 py-2 w-full hover:bg-gray-500 hover:text-white ease-in-out duration-300 bg-gray-200 text-black ${filter === "Complete" && "bg-gray-800 text-white"} `}
              >
                Completed
              </Button>
            </div>
            <div className="flex justify-between gap-3">
              <Input
                className="width-80"
                type="text"
                placeholder="Add new task"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              ></Input>

              <Button
                onClick={() => {
                  setTodos([
                    ...todos,
                    { id: nanoid(), text: value, status: STATUS.INCOMPLETE },
                  ]);
                  setValue("");
                }}
              >
                Add
              </Button>
            </div>

            <CardContent className="flex flex-col gap-2 p-0">
              {todos.length === 0 ? (
                <>No items to show</>
              ) : (
                <RenderComponent filter={filter} />
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
