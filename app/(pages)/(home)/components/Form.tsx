import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

type Props = {
  todo: any;
  setTodo: any;
  addTodo: any;
};

const Form = ({ todo, setTodo, addTodo }: Props) => {
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
