"use client";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { ReactNode } from "react";
import StoreProvider from "./store-provider";
import SnackbarProvider from "./snackbar.provider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <StoreProvider>
        <AppRouterCacheProvider>
          <SnackbarProvider>{children}</SnackbarProvider>
        </AppRouterCacheProvider>
      </StoreProvider>
    </>
  );
}
