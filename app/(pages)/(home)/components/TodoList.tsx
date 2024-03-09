import { Todo } from "@/app/helpers/types";
import { Switch } from "@/components/ui/switch";
import { BadgeX } from "lucide-react";
import React from "react";

type Props = {
  todos: any;
  deleteTodo: any;
  updateTodo: any;
};

const TodoList = ({ todos, deleteTodo, updateTodo }: Props) => {
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
