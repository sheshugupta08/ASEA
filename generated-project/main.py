from asea.agent import EngineeringAgent


def main() -> None:
    print("=== Starting ASEA Demo Project ===")
    agent = EngineeringAgent(name="Autonomous-Eng-01")

    agent.add_task("TASK-001", "Analyze codebase dependencies")
    agent.add_task("TASK-002", "Generate automated test suites")
    agent.add_task("TASK-003", "Verify system execution compliance")

    print(f"Agent '{agent.name}' initialized with {len(agent.tasks)} tasks.\n")

    while True:
        result = agent.execute_next_task()
        if result is None:
            break
        print(f"[SUCCESS] {result.task_id}: {result.output} ({result.execution_time}s)")

    print("\nAll autonomous engineering tasks completed.")


if __name__ == "__main__":
    main()

