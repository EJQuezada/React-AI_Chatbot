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
                        Authorization: `Bearer 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`,
                        //AIzaSyBD7EWIEMziL_oZggHp84ZQV58rb5RvRL0
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