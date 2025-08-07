import { AbstractCommand } from "./AbstractCommand";
import { TaskList } from "../models/TaskList";
import { Task } from "../models/Task";

export class CompleteTaskCommand extends AbstractCommand {
  private previousState: boolean | undefined;

  constructor(
    private taskList: TaskList,
    private taskId: string,
    private completed: boolean = true
  ) {
    super();
  }

  execute(): void {
    // Спочатку отримуємо поточний стан задачі
    const currentTask = this.taskList.getAllTasks().find(task => task.id === this.taskId);
    if (currentTask) {
      // Зберігаємо попередній стан completed
      this.previousState = currentTask.completed;
      // Змінюємо статус задачі
      this.taskList.completeTask(this.taskId, this.completed);
    }
  }

  undo(): void {
    // Відновлюємо попередній стан completed
    if (this.previousState !== undefined) {
      this.taskList.completeTask(this.taskId, this.previousState);
    }
  }
}
