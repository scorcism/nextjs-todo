import { newTodo } from "@/app/helpers/types";
import { todoSchemas } from "@/app/helpers/validations/page.validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axiosInstance from "@/lib/axiosInstance";
import React, { useState } from "react";
import { toast } from "sonner";
import { fromZodError } from "zod-validation-error";

const Form = () => {
  const [todo, setTodo] = useState<string>("");

  const addTodoToDB = async (todo: newTodo) => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      let res = await axiosInstance.post(
        "/todo",
        {
          todo: todo.todo,
          status: todo.status,
        },
        {
          headers: headers,
        }
      );
      if (res.status == 201) {
        toast.success("New todo added");
        setTodo("");
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
    const parse = todoSchemas.todoSchema.safeParse({ todo, status: 0 });
    if (parse.success) {
      addTodoToDB(newTodo);
    } else {
      const validationError = fromZodError(parse.error).details;
      toast.error(validationError[0]?.message);
    }
  };

  return (
    <div className="w-[100%] rounded p-2 bg-black/20 flex flex-col gap-3 my-10 ">
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
      <Button variant="secondary" onClick={addTodo}>
        Add Todo
      </Button>
      {/* List of todos */}
    </div>
  );
};

export default Form;
