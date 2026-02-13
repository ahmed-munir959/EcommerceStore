import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

// User type definition
interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    role: string;
}

// AuthContext type definition
interface AuthContextType {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (user: User, accessToken: string) => void;
    logout: () => Promise<void>;
    isTokenValid: () => boolean;
}

// Create context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to decode JWT and check expiration
const isTokenExpired = (token: string): boolean => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        // Check if token has expired (exp is in seconds, Date.now() is in milliseconds)
        return payload.exp * 1000 < Date.now();
    } catch (error) {
        // If decoding fails, consider token invalid
        return true;
    }
};

// AuthProvider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Load auth state from sessionStorage on mount
    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        const storedToken = sessionStorage.getItem('accessToken');

        if (storedUser && storedToken) {
            try {
                const parsedUser = JSON.parse(storedUser);

                // Check if token is still valid
                if (!isTokenExpired(storedToken)) {
                    setUser(parsedUser);
                    setAccessToken(storedToken);
                } else {
                    // Token expired, clear storage
                    sessionStorage.removeItem('user');
                    sessionStorage.removeItem('accessToken');
                }
            } catch (error) {
                // If parsing fails, clear storage
                sessionStorage.removeItem('user');
                sessionStorage.removeItem('accessToken');
            }
        }

        setLoading(false);
    }, []);

    // Periodic check to detect token tampering in sessionStorage
    useEffect(() => {
        // Only run this check if user is authenticated
        if (!user || !accessToken) return;

        const checkTokenIntegrity = () => {
            const storedToken = sessionStorage.getItem('accessToken');

            // If sessionStorage token doesn't match context token, user tampered with it
            if (storedToken !== accessToken) {
                console.warn('Token tampering detected! Logging out...');
                // Force logout immediately
                logout();
                // Redirect to login page
                window.location.href = '/login';
            }
        };

        // Check immediately
        checkTokenIntegrity();

        // Set up interval to check every 2 seconds
        const intervalId = setInterval(checkTokenIntegrity, 2000);

        // Cleanup interval on unmount or when auth state changes
        return () => clearInterval(intervalId);
    }, [user, accessToken]); // Re-run when user or accessToken changes

    // Login function - stores user and token in state and sessionStorage
    const login = (userData: User, token: string) => {
        setUser(userData);
        setAccessToken(token);
        sessionStorage.setItem('user', JSON.stringify(userData));
        sessionStorage.setItem('accessToken', token);
    };

    // Logout function - clears state, sessionStorage, and calls backend to clear cookie
    const logout = async () => {
        try {
            // Call backend logout to clear refreshToken cookie
            await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include', // Include cookies
            });
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Clear local state regardless of API call success
            setUser(null);
            setAccessToken(null);
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('accessToken');
        }
    };

    // Check if current token is valid (exists and not expired)
    const isTokenValid = (): boolean => {
        if (!accessToken) return false;
        return !isTokenExpired(accessToken);
    };

    const value: AuthContextType = {
        user,
        accessToken,
        isAuthenticated: !!user && !!accessToken,
        loading,
        login,
        logout,
        isTokenValid,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use AuthContext
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
