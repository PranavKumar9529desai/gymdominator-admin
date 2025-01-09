import { Session } from "next-auth";

export const IsSales = (session: Session | null) => {
  return session?.role === "sales";
};
