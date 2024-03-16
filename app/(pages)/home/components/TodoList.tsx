"use client";
import { Todo } from "@/app/helpers/types";
import { Switch } from "@/components/ui/switch";
import axiosInstance from "@/lib/axiosInstance";
import { BadgeX } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Get todo list
  const getTodosDB = async () => {
    try {
      let res = await axiosInstance.get("/todo");
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
      let res = await axiosInstance.put("/todo", { status, id });
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
    <>
      {todos && todos.length > 0 && (
        <>
          <div className="min-w-[100%] max-w-[100%] rounded p-2 bg-black/20 flex flex-col gap-3">
            {/* Title */}
            <h1 className="text-xl font-extrabold">All Todos🖨️</h1>
            <div className="flex flex-col gap-3 max-w-[100%] ">
              {todos.map((t: Todo, index: number) => (
                <div
                  key={index}
                  className="flex flex-row bg-white/10 rounded-sm items-center px-2 py-2 justify-between max-w-[100%] h-min relative"
                >
                  <BadgeX
                    className="absolute top-[-12px] left-[-10px] cursor-pointer"
                    color="#ff0000"
                    size="17"
                    onClick={() => {
                      deleteTodo(t.id);
                    }}
                  />
                  <h3 className="text-md text-wrap">{t.todo}</h3>
                  <Switch
                    checked={t.status ? true : false}
                    onClick={() => {
                      updateTodo(!t.status ? 1 : 0, t.id);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TodoList;
