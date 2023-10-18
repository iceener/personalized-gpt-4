import {BaseMessageChunk, SystemMessage} from "langchain/schema";
import {ChatOpenAI} from "langchain/chat_models/openai";
import {Document} from "langchain/document";
import {ITask} from "./tools/todoist.dt.ts";

// rephrase the response
export const rephrase = async (response: string, query: string) => {
    const model = new ChatOpenAI({
        modelName: "gpt-3.5-turbo",
        temperature: 1,
    });
    // invoke the model
    const { content } = await model.call([
        // basic rephrase prompt
        new SystemMessage(`
            Answer the question ultra-briefly & short using casual, human-friendly tone: 
            ###${query}###
            and act as if you just performed this action for the user and confirming this fact to the user, using the following response: 
            ###${JSON.stringify(response)}###
        `),
    ])

    return content;
}

// get the system prompt
export const systemPrompt = ({ context, tasks }: { context: any, tasks: ITask[] }) => {
    return `
        Use facts and context to answer the questions and perform the actions. If you don't know the answer, say "don't know".
        Actions may be enriched with additional information from the context.
        Fact: Today is ${currentDate()} and user's name is Adam.
        Context: ###${context.map((c: [Document, number]) => c[0].pageContent).join('### ###')}###
        Current tasks: ###${tasks.map((task: ITask) => task.content + ' (ID: ' + task.id + ')').join(', ')}###
    `
}

// parse the function call
export const parseFunctionCall = (result: BaseMessageChunk): { name: string, args: any } | null => {
    if (result?.additional_kwargs?.function_call === undefined) {
        return null;
    }
    return {
        name: result.additional_kwargs.function_call.name,
        args: JSON.parse(result.additional_kwargs.function_call.arguments),
    }
}

// simple date formatter
export const currentDate = () => {
    let date = new Date();

    let weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let weekday = weekdays[date.getDay()];

    let month = (date.getMonth() + 1).toString().padStart(2, '0'); // months are 0-based in JS
    let day = date.getDate().toString().padStart(2, '0');
    let year = date.getFullYear();

    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');

    return `${weekday}, ${month}/${day}/${year} ${hours}:${minutes}`;
}