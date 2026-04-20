import { create } from "zustand";
import { persist } from "zustand/middleware";
import { produce } from "immer";

interface Authentication {
  user: any | null;
  authenticationToken: string | null;
  refreshToken: string | null;
}

interface AuthenticationAction {
  actions: {
    setUser: (user: Authentication["user"]) => void;
    setAuthenticationToken: (
      authenticationToken: Authentication["authenticationToken"]
    ) => void;
    setRefreshToken: (refreshToken: Authentication["refreshToken"]) => void;
    logout: () => void;
  };
}

const initialState = {
  user: null,
  authenticationToken: null,
  refreshToken: null,
};

const useAuthenticationStore = create<Authentication & AuthenticationAction>()(
  persist(
    set => ({
      //States
      ...initialState,

      //Actions
      actions: {
        setUser: user =>
          set(state =>
            produce(state, draft => {
              draft.user = user;
            })
          ),
        setAuthenticationToken: authenticationToken =>
          set(state =>
            produce(state, draft => {
              draft.authenticationToken = authenticationToken;
            })
          ),
        setRefreshToken: refreshToken =>
          set(state =>
            produce(state, draft => {
              draft.refreshToken = refreshToken;
            })
          ),
        logout: () =>
          set(state =>
            produce(state, draft => {
              draft.refreshToken = null;
              draft.authenticationToken = null;
              draft.user = null;
            })
          ),
      },
    }),
    {
      name: "Authentication",
      partialize: state =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => !["actions"].includes(key))
        ),
    }
  )
);

export default useAuthenticationStore;
