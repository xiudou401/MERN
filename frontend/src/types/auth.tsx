export interface User {
  _id?: string;
  email: string;
  token: string;
}

export const AUTH_ACTIONS = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
} as const;

export type AuthAction =
  | { type: typeof AUTH_ACTIONS.LOGIN; payload: User }
  | { type: typeof AUTH_ACTIONS.LOGOUT; payload: null };
