"use client";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { fromZodError } from "zod-validation-error";

import pageSchema from "@/app/helpers/validations/page.validation";
import axiosInstance from "@/lib/axiosInstance";
import TodoList from "./components/TodoList";
import { Todo, newTodo } from "@/app/helpers/types";
import Form from "./components/Form";

const page = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<string>("");

  const addTodoToDB = async (todo: newTodo) => {
    try {
      let res = await axiosInstance.post("/home", {
        todo: todo.todo,
        status: todo.status,
      });
      if (res.status == 201) {
        toast.success("New todo added");
        setTodo("");
        getTodosDB();
      } else {
        toast.error("Internal server error");
      }
    } catch (error) {
      toast.error("Internal server error");
    }
  };

  const addTodo = () => {
    // Validate the todo
    const newTodo: newTodo = { todo, status: 0 };
    const parse = pageSchema.todoSchema.safeParse({ todo, status: 0 });
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
        setTodos(res.data?.data);
      } else {
        toast.error("Internal server error");
      }
    } catch (error) {
      toast.error("Internal server error");
    }
  };

  useEffect(() => {
    getTodosDB();
  }, []);

  // Update todo
  const updateTodo = async (status: number, id: number) => {
    try {
      let res = await axiosInstance.put("/home", { status, id });
      if (res.status == 200) {
        toast.success("Todo updated");
        getTodosDB();
      } else {
        toast.error("Internal server error");
      }
    } catch (error) {
      toast.error("Internal server error");
    }
  };

  // Delete todo
  const deleteTodo = async (id: number) => {
    try {
      let res = await axiosInstance.delete(`/home?id=${id}`);
      if (res.status == 200) {
        toast.success("Todo deleted");
        getTodosDB();
      } else {
        toast.error("Internal server error");
      }
    } catch (error) {
      toast.error("Internal server error");
    }
  };

  return (
    <div className="flex w-full h-full items-center flex-col gap-5 overflow-scroll">
      <div className="rounded p-2 bg-black/20 flex flex-col gap-3 mt-[10%] w-[100%] md:w-[50%]">

        <Form todo={todo} setTodo={setTodo} addTodo={addTodo} />
        <TodoList
          todos={todos}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />

      </div>
    </div>
  );
};

export default page;
