import { NextRequest, NextResponse } from 'next/server';
import Groq from "groq-sdk";
const groq = new Groq({
    apiKey: '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',
});

async function main(query: any) {
    const chatCompletion = await getGroqChatCompletion(query);
    console.log(chatCompletion.choices[0].message.content);
    return chatCompletion.choices[0].message.content;
}
async function getGroqChatCompletion(query: any) {
    return groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: query,
            },
        ],
        model: "llama3-8b-8192",
    });
}


export async function POST(req: NextRequest) {
    try {
        const { message } = await req.json();
        console.log('Message Received:', message);


        const content = await main(message);
        console.log('Content Value:', { content });

        return new NextResponse(JSON.stringify({ response: content }));
    } catch (error) {
        console.error('Error handling request:', error);
        return new NextResponse(JSON.stringify({ error: 'An error occurred while processing the request.' }));
    }
}

