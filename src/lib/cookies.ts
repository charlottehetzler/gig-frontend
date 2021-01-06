import { useMemo } from "react";
import { Cookies, useCookies } from "react-cookie";

const SESSION_ID_KEY = "gig.sid";
const USER_ID_KEY = "user_id";

const cookies = new Cookies();
export const getAuthCookies = () => {
    return {
        sessionId: cookies.get(SESSION_ID_KEY),
        userId: cookies.get(USER_ID_KEY)
    };
}
export const clearAuthCookies = () => {
    cookies.remove(SESSION_ID_KEY);
    cookies.remove(USER_ID_KEY);
}

export function useAuthCookies() {
    const [ reactCookies, setCookie, removeCookie ] = useCookies([SESSION_ID_KEY, USER_ID_KEY]);

    const loggedIn = useMemo(() => {
        return !!reactCookies[SESSION_ID_KEY];
    }, [reactCookies]);

    const userId = useMemo(() => {
        const val = reactCookies[USER_ID_KEY];
        if(val) {
            return parseInt(val.toString());
        }
    }, [reactCookies]);

    const setAuthCookies = (orgId: number) => {
        setCookie(SESSION_ID_KEY, cookies.get(SESSION_ID_KEY));
        setCookie(USER_ID_KEY, orgId);
    }

    const clearAuthCookies = () => {
        removeCookie(SESSION_ID_KEY);
        removeCookie(USER_ID_KEY);
    }

    return {
        loggedIn,
        userId,
        setAuthCookies,
        clearAuthCookies
    }
}