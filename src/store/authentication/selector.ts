import useAuthenticationStore from './useAuthenticationStore';

export const useGetAuthenticationToken = () => useAuthenticationStore((state) => state.authenticationToken);
export const useGetUser = () => useAuthenticationStore((state) => state.user || {});

export const useGetAuthenticationActions = () => useAuthenticationStore((state) => state.actions);

export const useGetRefreshToken = () => useAuthenticationStore((state) => state.refreshToken);

export const useLogout = () => useAuthenticationStore((state) => state.actions.logout);
