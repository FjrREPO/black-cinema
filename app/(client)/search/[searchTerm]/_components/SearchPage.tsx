'use client'

import FavoriteCard from "@/app/(client)/favorites/_components/FavoriteCard";
import { getMoviesType } from "@/app/api/movie/route";
import { getPaymentsType } from "@/app/api/payment/route";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { Bot } from "lucide-react";
import React, { useState, useMemo, useEffect, useCallback } from "react";

interface Message {
    type: string;
    text: string;
}

const Chat = ({ params, user }: { params: { searchTerm: string }, user: any }) => {
    const movies = useQuery<getMoviesType>({
        queryKey: ["movies"],
        queryFn: () =>
            fetch(
                '/api/movie'
            ).then((res) => res.json()),
    })

    const payment = useQuery<getPaymentsType>({
        queryKey: ["payment"],
        queryFn: () =>
            fetch(
                '/api/payment'
            ).then((res) => res.json()),
    })

    const removePercent20 = (input: string) => {
        return input.replace(/%20/g, ' ');
    }

    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue] = useState(removePercent20(params.searchTerm));
    const [isTyping, setIsTyping] = useState(false);

    const sendMessage = useCallback(async () => {
        if (inputValue.trim() === "") return;

        const newMessage = { type: "user", text: inputValue };
        setMessages(messages => [...messages, newMessage]);
        setIsTyping(true);

        try {
            const response = await fetch('/api/ai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: `satu paragraf deskripsi tentang film ${removePercent20(params.searchTerm)} dalam bahasa indonesia` })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setMessages(messages => [...messages, { type: "ai", text: data.response }]);
        } catch (error) {
            throw error
        } finally {
            setIsTyping(false);
        }
    }, [inputValue, params.searchTerm, removePercent20]);

    useEffect(() => {
        sendMessage();
    }, []);
    const filteredMovies = useMemo(() => {
        if (!movies?.data) return [];

        const searchTerms = removePercent20(params.searchTerm).toLowerCase().split(/\s+/);
        return movies.data.filter((movie) => {
            const movieTitle = movie.title?.toLowerCase().split(/\s+/);
            const movieGenres = movie.genres?.map((genre) => genre.toLowerCase());
            const combinedMovieData = [...movieTitle, ...movieGenres];
            return searchTerms.every((searchTerm) => combinedMovieData.includes(searchTerm));
        });
    }, [movies.data, params.searchTerm]);

    return (
        <>
            <Navbar user={user} payment={payment} />
            <div className="px-20 py-5 pt-[100px]">
                <Card className="w-full dark:border-white">
                    <CardContent className="flex flex-row gap-2 p-5">
                        <div className="flex flex-col gap-5">
                            <CardTitle className="capitalize">Search : {inputValue}</CardTitle>
                            <div className="flex flex-row w-full gap-3">
                                <Bot className="flex relative w-8 h-8 animate-bounce" />
                                {isTyping ?
                                    (
                                        <div className="flex items-start mb-2 ">
                                            <Label className="animate-pulse text-md">Typing...</Label>
                                        </div>
                                    )
                                    :
                                    <CardDescription className="w-fit relative line-clamp-[10] text-sm">
                                        {messages.length > 0 && (
                                            <>
                                                {messages[messages.length - 1].text}
                                            </>
                                        )}
                                    </CardDescription>
                                }
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <div className="grid grid-cols-3 gap-5 py-5 w-full h-full">
                    {filteredMovies?.map((movie, index) => {
                        return (
                            <FavoriteCard key={index} movie={movie} user={user} />
                        )
                    })}
                </div>
            </div>
        </>
    );
};

export default Chat;
