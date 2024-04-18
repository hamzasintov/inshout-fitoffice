"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider, createTheme } from "@mui/material";

import { Provider } from "react-redux";
import { store } from "./store";

const inter = Inter({ subsets: ["latin"] });

const theme = createTheme({
  palette: {
    primary: {
      main: "#2C3680",
    },
    secondary: {
      main: "#2C3680",
    },
  },
  typography: {
    fontFamily: ["KontoraThin", "Bolt", "Lulo"].join(","),
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <html lang="en">
            <body className={inter.className}>{children}</body>
          </html>
        </LocalizationProvider>
      </ThemeProvider>
    </Provider>
  );
}
