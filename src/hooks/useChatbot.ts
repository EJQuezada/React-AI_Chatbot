import axios from "axios";
import { useState } from "react";

interface Message {
    text: string;
    sender: "user" |"bot";
}

const useChatbot = () => {
    const [messages, setMessages] = useState<Message[]>([]);

    const sendMessage = async (message: string) => {
        const newMessages: Message[] = [
            ...messages, 
            {text: message, sender: "user" },
        ];
        setMessages(newMessages);

        try {
            const response = await axios.post(
                "https://api.openai.com/v1/chat/completions",
                {
                    model: "gpt-4o-mini",
                    store: true,
                    messages: [
                        {
                        role: "user", 
                        content: message, 
                        }
                    ],
                },
                {
                    headers: {
                        Authorization: `Bearer [INSERT YOUR TOKEN HERE]
                        "Content-Type": "application/json",
                    },
                }
            );

            const botMessage = response.data.choices[0].message.content;
            setMessages([...newMessages, {text: botMessage, sender: "bot" }]);
        } catch (error) {
            console.error("Error fetching AI response:", error);
        }
    }; 

    return {messages, sendMessage };
};

export default useChatbot;
