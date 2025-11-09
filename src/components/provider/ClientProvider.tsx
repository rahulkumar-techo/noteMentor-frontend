"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import Navbar from "@/components/navigations/Navbar";

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <Navbar />
      {children}
    </Provider>
  );
}
