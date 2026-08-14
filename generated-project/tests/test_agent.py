import pytest
from asea.agent import EngineeringAgent


def test_agent_initialization() -> None:
    agent = EngineeringAgent(name="TestAgent")
    assert agent.name == "TestAgent"
    assert len(agent.tasks) == 0


def test_add_task() -> None:
    agent = EngineeringAgent()
    task = agent.add_task("T-1", "Test task creation")
    assert task.id == "T-1"
    assert task.status == "pending"
    assert len(agent.tasks) == 1


def test_execute_task() -> None:
    agent = EngineeringAgent()
    agent.add_task("T-1", "Run execution check")
    result = agent.execute_next_task()

    assert result is not None
    assert result.task_id == "T-1"
    assert result.success is True
    assert agent.tasks[0].status == "completed"


def test_execute_empty_queue() -> None:
    agent = EngineeringAgent()
    result = agent.execute_next_task()
    assert result is None

