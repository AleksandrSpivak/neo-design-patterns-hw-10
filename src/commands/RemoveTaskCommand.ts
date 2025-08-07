import { AbstractCommand } from "./AbstractCommand";
import { TaskList } from "../models/TaskList";
import { Task } from "../models/Task";

export class RemoveTaskCommand extends AbstractCommand {
  private removedTask: Task | undefined;

  constructor(private taskList: TaskList, private taskId: string) {
    super();
  }

  execute(): void {
    // Зберігаємо видалену задачу для можливості відновлення
    this.removedTask = this.taskList.removeTask(this.taskId);
  }

  undo(): void {
    // Відновлюємо задачу, якщо вона була видалена
    if (this.removedTask) {
      this.taskList.addTask(this.removedTask);
    }
  }
}
