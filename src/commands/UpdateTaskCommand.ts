import { AbstractCommand } from "./AbstractCommand";
import { TaskList } from "../models/TaskList";
import { Task } from "../models/Task";

export class UpdateTaskCommand extends AbstractCommand {
  private oldTask: Task | undefined;

  constructor(
    private taskList: TaskList,
    private taskId: string,
    private updates: Partial<Task>
  ) {
    super();
  }

  execute(): void {
    // Спочатку отримуємо та зберігаємо поточний стан задачі
    const currentTask = this.taskList.getAllTasks().find(task => task.id === this.taskId);
    if (currentTask) {
      // Створюємо копію поточної задачі для збереження старого стану
      this.oldTask = { ...currentTask };
      // Оновлюємо задачу
      this.taskList.updateTask(this.taskId, this.updates);
    }
  }

  undo(): void {
    // Відновлюємо старий стан задачі
    if (this.oldTask) {
      this.taskList.updateTask(this.taskId, this.oldTask);
    }
  }
}
