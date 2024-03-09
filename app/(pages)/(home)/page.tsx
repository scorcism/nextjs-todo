"use client";
import React, { useEffect, useState } from "react";

import { toast } from "sonner";
import { fromZodError } from "zod-validation-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

import pageSchema from "@/app/helpers/validations/page.validation";
import axiosInstance from "@/lib/axiosInstance";

type Todo = {
  todo: string;
  status: 0 | 1;
};

const page = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<string>("");

  const addTodoToDB = async (todo: Todo) => {
    try {
      let res = await axiosInstance.post("/home", {
        todo: todo.todo,
        status: todo.status,
      });
      if (res.status == 201) {
        toast.success("New todo added");
        setTodo('')
      } else {
        toast.error("Internal server error");
      }
    } catch (error) {
      toast.error("Internal server error");
    }
  };

  const addToto = () => {
    // Validate the todo
    const newTodo: Todo = { todo, status: 0 };
    const parse = pageSchema.todoSchema.safeParse(newTodo);
    if (parse.success) {
      addTodoToDB(newTodo);
    } else {
      const validationError = fromZodError(parse.error).details;
      toast.error(validationError[0]?.message);
    }
  };

  // Get todo list

  const getTodosDB = async () => {
    try {
      let res = await axiosInstance.get("/home");
      if (res.status == 200) {
        setTodos(res.data?.data)
      } else {
        toast.error("Internal server error");
      }
    } catch (error) {
      toast.error("Internal server error");
    }
  };

  useEffect(()=> {
    getTodosDB()
  },[])

  return (
    <div className="flex w-full h-full items-center justify-center flex-col gap-5 overflow-scroll">
      <div className="min-w-[50%] max-w-[50%] rounded p-2 bg-black/20 flex flex-col gap-3 my-10">
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
          <div className="min-w-[50%] max-w-[50vw] rounded p-2 bg-black/20 flex flex-col gap-3">
            {/* Title */}
            <h1 className="text-xl font-extrabold">All Todos🖨️</h1>
            <div className="flex flex-col gap-3 max-w-[100%]">
              {todos.map((t: Todo, index: number) => (
                <div
                  key={index}
                  className="flex flex-row bg-white/10 rounded-sm items-center px-2 py-2 justify-between max-w-[100%] h-min"
                >
                  <h3 className="text-md text-wrap">{t.todo}</h3>
                  <Switch checked={t.status ? true : false} />
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
