"use client";
import { createContext, useContext, useState } from "react";

export type UserRole = 'STUDENT' | 'STAFF' | 'ADMIN';

interface RoleContextProps {
  role: UserRole;
  setRole: (role: UserRole) => void;
}

const RoleContext = createContext<RoleContextProps | undefined>(undefined);


export const useUserRole = () => {
  const context = useContext(RoleContext);
  if (!context) throw new Error("useUserRole must be used within a RoleProvider");
  return context;
};


export const RoleProvider: React.FC<{ children: React.ReactNode; initialRole?: UserRole }> = ({
  children,
  initialRole = 'STAFF',
}) => {
  // Seeded from the server session (see lib/session.ts) so client UI state
  // agrees with the role that already gated the route.
  const [role, setRole] = useState<UserRole>(initialRole);

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}
