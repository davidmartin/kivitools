"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { account } from "@/lib/appwrite-client";
import { Models, OAuthProvider } from "appwrite";

interface AuthContextType {
    user: Models.User<Models.Preferences> | null;
    loading: boolean;
    login: () => void; // We'll use OAuth or redirect to login page
    loginWithGoogle: () => void;
    loginWithDiscord: () => void;
    logout: () => Promise<void>;
    checkSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
    const [loading, setLoading] = useState(true);

    const checkSession = async () => {
        try {
            const session = await account.get();
            setUser(session);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkSession();
    }, []);

    const login = () => {
        // For now, we can just redirect to the login page
        window.location.href = "/login";
    };

    const loginWithGoogle = () => {
        try {
            account.createOAuth2Session(
                OAuthProvider.Google,
                `${window.location.origin}/`, // success (redirect to home)
                `${window.location.origin}/login` // failure (redirect back to login)
            );
        } catch (error) {
            console.error("Google login failed", error);
        }
    };

    const loginWithDiscord = () => {
        try {
            account.createOAuth2Session(
                OAuthProvider.Discord,
                `${window.location.origin}/`, // success (redirect to home)
                `${window.location.origin}/login` // failure (redirect back to login)
            );
        } catch (error) {
            console.error("Discord login failed", error);
        }
    };

    const logout = async () => {
        try {
            await account.deleteSession("current");
            setUser(null);
            window.location.href = "/";
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, loginWithGoogle, loginWithDiscord, logout, checkSession }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
