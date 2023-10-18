import { ChatOpenAI } from "langchain/chat_models/openai";
import {HumanMessage, SystemMessage} from "langchain/schema";
import {parseFunctionCall, rephrase, systemPrompt} from "./helpers.ts";
import {addTasks, closeTasks, getTasks, updateTasks} from "./tools/todoist.ts";
import {addTasksSchema, finishTasksSchema, getTasksSchema, quickNotesSchema} from "./tools/schema.ts";
import {getVectorStore} from "./memories/store.ts";
import {addQuickNote} from "./tools/notion.ts";

// Initialize the model and schema bindings for Function Calling
const model = new ChatOpenAI({modelName: "gpt-4-0613"})
      .bind({functions: [getTasksSchema, addTasksSchema, finishTasksSchema]}); // removed:  quickNotesSchema

// Define the tools for the functions
const tools: any = {getTasks, addTasks, closeTasks, updateTasks} // removed: addQuickNote

// Main action
export const act = async (query: string) => {
    // initialize the vector store and get the context and tasks
    const vectorStore = await getVectorStore();
    // get the context and tasks
    const [context, tasks] = await Promise.all([
        vectorStore.similaritySearchWithScore(query, 3),
        getTasks()
    ]);
    // invoke the model
    const conversation = await model.invoke([
        new SystemMessage(systemPrompt({ context, tasks })),
        new HumanMessage(query),
    ]);
    // parse the function call
    const action = parseFunctionCall(conversation);

    // if there is a function call, invoke the function
    if (action) {
        const response = await tools[action.name](action.args);
        return await rephrase(response, query);
    }

    // otherwise, return the response
    return conversation.content;
}



