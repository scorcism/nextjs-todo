import { desc } from "drizzle-orm";
import { dbModule } from "../config/database";
import { todo } from "../schema/todo";

const addTodo = async (todoName: string, status: number) => {
  try {
    let res = await dbModule.db
      .insert(todo)
      .values({ todo: todoName, status: status });
    return { success: true, data: "TODO added" };
  } catch (error) {
    console.log("Interval server error: ", error);
    return { success: false, error: "Interval server error" };
  }
};

const todoList = async () => {
  try {
    let res = await dbModule.db.select().from(todo).orderBy(desc(todo.id));
    return { success: true, data: res };
  } catch (error) {
    console.log("Interval server error: ", error);
    return { success: false, error: "Interval server error" };
  }
};

export const homeService = { addTodo, todoList };
