"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import React, { useState } from "react";

type Todo = {
  todo: string;
  status: 0 | 1;
};

const page = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<string>("");

  const addToto = () => {
    setTodos((prevTodos) => [...prevTodos, { todo, status: 0 }]);
    setTodo('')
  };

  return (
    <div className="flex w-full h-full items-center justify-center flex-col gap-5">
      <div className="min-w-[50%] max-w-[50%] rounded p-2 bg-black/20 flex flex-col gap-3">
        {/* Title */}
        <h1 className="text-xl font-extrabold">Todos🍕</h1>

        {/* Input field */}
        <Input
          placeholder="Enter todo🎈"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />

        {/* Date picker and switch for todo status */}
        <div className="flex"></div>

        {/* Save button */}
        <Button variant="secondary" onClick={addToto}>
          Add Todo
        </Button>
        {/* List of todos */}
      </div>

      {todos.length > 0 && (
        <>
          <div className="min-w-[50%] max-w-[50%] rounded p-2 bg-black/20 flex flex-col gap-3">
            {/* Title */}
            <h1 className="text-xl font-extrabold">All Todos🖨️</h1>
            <div className="flex flex-col gap-3 w-[100%]">
              {todos.map((t: Todo, index: number) => (
                <div
                  key={index}
                  className="flex flex-row bg-white/10 rounded-sm items-center px-2 py-2 justify-between"
                >
                  <h3 className="text-md">{t.todo}</h3>
                  <Switch checked={t.status ? true : false}/>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default page;
