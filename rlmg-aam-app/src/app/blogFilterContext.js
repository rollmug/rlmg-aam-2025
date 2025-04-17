'use client'

import React, { useState, createContext } from "react";

export const BlogFilterContext = createContext();
export const BlogTopicContext = createContext();

export function BlogFilterProvider({ children }) {
    const [filter, setFilter] = useState(null);
    return (
        <BlogFilterContext.Provider value={{ filter, setFilter }}>
            {children}
        </BlogFilterContext.Provider>
    )
}

export function BlogTopicProvider({ data, children }) {
    // const [topic, SetTopic] = useState(null);
    return (
        <BlogTopicContext.Provider value={data}>
            {children}
        </BlogTopicContext.Provider>
    )
}