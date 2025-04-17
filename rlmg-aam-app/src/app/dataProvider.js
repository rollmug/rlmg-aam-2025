'use client'

import React, { createContext } from "react";

export const DataContext = createContext();

export function DataProvider({ data, children }) {
    return (
         <DataContext.Provider value={data}>{children}</DataContext.Provider>
    )
}