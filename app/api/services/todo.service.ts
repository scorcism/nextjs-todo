import { desc, eq } from "drizzle-orm";
import { dbModule } from "../config/database";
import { todo } from "../schema/todo";

const addTodo = async (todoName: string, status: number) => {
  try {
    let res = await dbModule.db
      .insert(todo)
      .values({ todo: todoName, status: status })
      .returning();
    return { success: true, data: { id: res } };
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

const updateTodoStatus = async (status: number, id: number) => {
  try {
    let res = await dbModule.db
      .update(todo)
      .set({ status: status })
      .where(eq(todo.id, id));
    return { success: true, data: "TODO updated" };
  } catch (error) {
    console.log("Interval server error: ", error);
    return { success: false, error: "Interval server error" };
  }
};

const deleteTodo = async (id: number) => {
  try {
    let res = await dbModule.db.delete(todo).where(eq(todo.id, id));
    return { success: true, data: "TODO deleted" };
  } catch (error) {
    console.log("Interval server error: ", error);
    return { success: false, error: "Interval server error" };
  }
};

export const homeService = { addTodo, todoList, updateTodoStatus, deleteTodo };
