import { databases, ID } from "./appwrite";
import { Query } from "node-appwrite";
import OpenAI from "openai";

// Re-use the DeepSeek client configuration
const deepseek = new OpenAI({
    baseURL: "https://api.deepseek.com",
    apiKey: process.env.DEEPSEEK_API_KEY,
});

// Configuration
const DATABASE_ID = process.env.APPWRITE_DATABASE_ID || "";
const CUSTOM_TOOLS_COLLECTION_ID = process.env.APPWRITE_CUSTOM_TOOLS_COLLECTION_ID || "custom_tools";

export interface ToolInput {
    id: string;
    name: string; // variable name in prompt, e.g. "topic"
    label: string; // Display label, e.g. "What is the topic?"
    type: "text" | "textarea" | "number" | "select";
    placeholder?: string;
    options?: { label: string; value: string }[]; // For select type
    required: boolean;
}

export interface CustomTool {
    $id?: string;
    userId: string;
    name: string;
    description: string;
    icon: string;
    inputs: string; // JSON stringified ToolInput[]
    promptTemplate: string;
    systemPrompt?: string;
    createdAt?: string;
}

export interface CreateToolParams {
    userId: string;
    name: string;
    description: string;
    icon: string;
    inputs: ToolInput[];
    promptTemplate: string;
    systemPrompt?: string;
}

/**
 * Create a new custom tool
 */
export async function createCustomTool(params: CreateToolParams): Promise<CustomTool> {
    if (!DATABASE_ID) throw new Error("Database ID not configured");

    const tool = await databases.createDocument(
        DATABASE_ID,
        CUSTOM_TOOLS_COLLECTION_ID,
        ID.unique(),
        {
            userId: params.userId,
            name: params.name,
            description: params.description,
            icon: params.icon,
            inputs: JSON.stringify(params.inputs),
            promptTemplate: params.promptTemplate,
            systemPrompt: params.systemPrompt,
            createdAt: new Date().toISOString(),
        }
    );

    return tool as unknown as CustomTool;
}

/**
 * Get all tools for a user
 */
export async function getUserTools(userId: string): Promise<CustomTool[]> {
    if (!DATABASE_ID) throw new Error("Database ID not configured");

    const response = await databases.listDocuments(
        DATABASE_ID,
        CUSTOM_TOOLS_COLLECTION_ID,
        [Query.equal("userId", userId), Query.orderDesc("createdAt")]
    );

    return response.documents as unknown as CustomTool[];
}

/**
 * Get a specific tool by ID
 */
export async function getToolById(toolId: string): Promise<CustomTool> {
    if (!DATABASE_ID) throw new Error("Database ID not configured");

    const tool = await databases.getDocument(
        DATABASE_ID,
        CUSTOM_TOOLS_COLLECTION_ID,
        toolId
    );

    return tool as unknown as CustomTool;
}

/**
 * Delete a tool
 */
export async function deleteTool(toolId: string): Promise<void> {
    if (!DATABASE_ID) throw new Error("Database ID not configured");

    await databases.deleteDocument(
        DATABASE_ID,
        CUSTOM_TOOLS_COLLECTION_ID,
        toolId
    );
}

/**
 * Run a custom tool
 */
export async function runCustomTool(
    toolId: string,
    userInputs: Record<string, any>
): Promise<string> {
    // 1. Fetch the tool
    const tool = await getToolById(toolId);
    const inputsDef: ToolInput[] = JSON.parse(tool.inputs);

    // 2. Validate inputs
    for (const input of inputsDef) {
        if (input.required && !userInputs[input.name]) {
            throw new Error(`Missing required input: ${input.label}`);
        }
    }

    // 3. Interpolate Prompt
    let prompt = tool.promptTemplate;
    for (const [key, value] of Object.entries(userInputs)) {
        // Simple replacement: {{key}} -> value
        // Using a regex to replace all occurrences
        const regex = new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, "g");
        prompt = prompt.replace(regex, String(value));
    }

    // 4. Call DeepSeek
    try {
        const messages: any[] = [];

        if (tool.systemPrompt) {
            messages.push({ role: "system", content: tool.systemPrompt });
        } else {
            // Default system prompt if none provided
            messages.push({
                role: "system",
                content: "You are a helpful AI assistant. Follow the user's instructions precisely."
            });
        }

        messages.push({ role: "user", content: prompt });

        const completion = await deepseek.chat.completions.create({
            messages,
            model: "deepseek-chat",
            temperature: 0.7,
            max_tokens: 1000,
        });

        const result = completion.choices[0]?.message?.content?.trim();

        if (!result) {
            throw new Error("No response generated from AI");
        }

        return result;

    } catch (error) {
        console.error("Error running custom tool:", error);
        throw new Error(
            error instanceof Error ? error.message : "Failed to run tool"
        );
    }
}
