"use client";
import { useState } from "react";

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
  console.log(nanoid())
  console.log(todos.status);
  return (
    <>
      <main className="w-full h-full flex items-center justify-center">
        <Card className="w-full max-w-sm p-5">
          <CardTitle>To-Do List</CardTitle>
          <div className="gap-2 grid grid-cols-3 text-4xl cursor-pointer ">
            <Button className="px-4 py-2 w-full hover:bg-gray-500">All</Button>
            <Button
              onClick={() =>
                todos.filter((todos) => todos.status === STATUS.INCOMPLETE)
              }
              className="px-4 py-2 w-full hover:bg-gray-500"
            >
              Incomplete
            </Button>
            <Button
              onClick={() =>
                todos.filter((todos) => todos.status === STATUS.COMPLETE)
              }
              className="px-4 py-2 w-full hover:bg-gray-500"
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
                setValue('');
              }}
            >
              Add
            </Button>
          </div>

          <CardContent className="flex flex-col gap-2">
            {todos.filter(
              (todo) => 
                todo.status === STATUS.INCOMPLETE ||
                todo.status === STATUS.COMPLETE
              )
              .map((todo, i) => (
              <div
              key={todo.id}
                className="w-80 grid grid-cols-10 grid-rows-1 items-center "
              >
                <Checkbox
                  onClick={() => {
                    const updatedTodos = todos.map((item) => {
                      if (item.id !== todo.id) return item;
                      return { ...item, status: item.status === STATUS.COMPLETE ? STATUS.INCOMPLETE : STATUS.COMPLETE };
                    });
                    setTodos(updatedTodos)
                  }}
                  checked={todos.status === STATUS.COMPLETE}
                  className="col-span-1"
                />
                <span className="col-span-6">{todos.text}</span>
                <Button
                  className="col-span-3"
                  onClick={() => {
                    setTodos(todos.filter((_, index) => index !== i));
                  }}
                >
                  Delete
                </Button>
                
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
    </>
  );
}
