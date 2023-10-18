export const getTasksSchema = {
    "name": "getTasks",
    "description": "Only for listing (unfinished) tasks from Todoist",
    "parameters": {
        "type": "object",
        "properties": {}
    }
}

export const addTasksSchema = {
    "name": "addTasks",
    "description": "Add multiple tasks to Todoist",
    "parameters": {
        "type": "object",
        "properties": {
            "tasks": {
                "type": "array",
                "description": "List of tasks that needs to be added to the Todoist",
                "items": {
                    "type": "object",
                    "properties": {
                        "content": {
                            "type": "string",
                            "description": "Format: task detailed description"
                        },
                        "due_string": {
                            "type": "string",
                            "description": "Natural language date user mentions, defaults always to 'today' (examples: monday at 5 pm etc.) so user doesn't need to mention it"
                        }
                    }
                }
            }
        }
    }
}

export const finishTasksSchema = {
    "name": "closeTasks",
    "description": "Finish/Complete tasks in Todoist",
    "parameters": {
        "type": "object",
        "properties": {
            "tasks": {
                "type": "array",
                "description": "List of IDs of tasks that needs to be finished/completed",
                "items": {
                    "type": "number",
                }
            }
        }
    }
}

export const quickNotesSchema = {
    "name": "addQuickNote",
    "description": "Add quick note to the Notion",
    "parameters": {
        "type": "object",
        "properties": {
            "content": {
                "type": "string",
                "description": "Exact, to the word message from the user, that needs to be added to the Notion as a quick note"
            }
        }
    }
}