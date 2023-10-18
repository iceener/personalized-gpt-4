// THIS METHOD IS NOT USED IN THE DEMO. Its purpose is to show how to use the make.com to add a quick note to the Notion
// Scenario IS NOT INCLUDED HERE
export const addQuickNote = async (content: string) => {
    const response = await fetch("https://hook.eu1.make.com/WEBHOOK_ID", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(content)
    });
    const { data } = await response.json() as { data: string };
    return data;
}