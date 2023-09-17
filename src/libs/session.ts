import { create } from "zustand";
import { persist } from "zustand/middleware";
import jwt from "jsonwebtoken";
import { JwtUser } from "./jwt";
import { api } from "./api";

interface SessionState {
  /**
   * The currently logged in user, or `null` if there is none.
   */
  user: JwtUser | null;
  /**
   * The user's JWT. You probably never need to access it.
   */
  jwt: string | null;
  /**
   * A function to log a user in through their JWT
   *
   * @param token The JWT to use to log the user in
   */
  login: (token: string) => void;
  /**
   * A function to log a user out
   */
  logout: () => void;
}

/**
 * A global hook to handle session data. You can extend
 * it with any data you need globally. Out of the box
 * it manages user session.
 */
export const useSession = create<SessionState>()(
  persist(
    (set, get) => ({
      user: null,
      jwt: null,
      login: (token) => {
        set({ jwt: token, user: jwt.decode(token) as JwtUser });

        document.cookie = `jwt=${token};path=/`;
      },
      logout: () => {
        set({ jwt: null, user: null });
        document.cookie = `jwt=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT`;
      },
    }),
    {
      name: "dojoAuth",
      partialize: (state) => ({
        jwt: state.jwt,
        user: state.user
      }),
    }
  )
);