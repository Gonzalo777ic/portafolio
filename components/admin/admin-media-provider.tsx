"use client";

import { createContext, useContext, type ReactNode } from "react";

const AdminMediaContext = createContext({ cloudinaryReady: false });

export function AdminMediaProvider({
  cloudinaryReady,
  children,
}: {
  cloudinaryReady: boolean;
  children: ReactNode;
}) {
  return (
    <AdminMediaContext.Provider value={{ cloudinaryReady }}>
      {children}
    </AdminMediaContext.Provider>
  );
}

export function useAdminMedia() {
  return useContext(AdminMediaContext);
}
