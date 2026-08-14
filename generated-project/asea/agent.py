import time
from typing import List, Optional
from pydantic import BaseModel, Field


class Task(BaseModel):
    id: str
    description: str
    status: str = "pending"


class TaskResult(BaseModel):
    task_id: str
    success: bool
    output: str
    execution_time: float


class EngineeringAgent:
    """Autonomous agent that processes engineering tasks sequentially."""

    def __init__(self, name: str = "ASEA-Core") -> None:
        self.name = name
        self.tasks: List[Task] = []

    def add_task(self, task_id: str, description: str) -> Task:
        task = Task(id=task_id, description=description)
        self.tasks.append(task)
        return task

    def execute_next_task(self) -> Optional[TaskResult]:
        pending_tasks = [t for t in self.tasks if t.status == "pending"]
        if not pending_tasks:
            return None

        task = pending_tasks[0]
        task.status = "in_progress"
        start_time = time.time()

        # Perform autonomous task processing simulation
        output = f"Autonomous execution of: {task.description}"
        task.status = "completed"

        elapsed = round(time.time() - start_time, 4)
        return TaskResult(
            task_id=task.id,
            success=True,
            output=output,
            execution_time=elapsed,
        )

