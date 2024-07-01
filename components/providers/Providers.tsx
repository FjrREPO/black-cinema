"use client";

import { SessionProvider } from "next-auth/react";
import React, { ReactNode, useState } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { SpotifyProvider } from "./SpotifyProviders";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface Props {
    children: ReactNode;
}

const Providers = (props: Props) => {
    const [client] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 60 * 1000,
                    },
                },
            })
    );
    return (
        <SessionProvider>
            <QueryClientProvider client={client}>
                <SpotifyProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem
                        disableTransitionOnChange
                    >
                        {props.children}
                    </ThemeProvider>
                </SpotifyProvider>
            </QueryClientProvider>
        </SessionProvider>
    )
};

export default Providers;
