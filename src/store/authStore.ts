import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User, AuthSession } from '@/types'
import * as authApi from '@/api/auth'

interface AuthStore {
    /* ─── STATE ─── */
    user: User | null
    session: AuthSession
    isLoading: boolean
    error: string | null

    /* ─── ACTIONS ─── */
    setUser: (user: User | null) => void
    setLoading: (loading: boolean) => void
    setError: (error: string | null) => void
    clearError: () => void

    /* ─── AUTH OPERATIONS ─── */
    signUp: (email: string, password: string, fullName: string) => Promise<void>
    login: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
    resetPassword: (email: string) => Promise<void>
    updatePassword: (token: string, newPassword: string) => Promise<void>
    updateProfile: (updates: Partial<{ full_name: string; avatar_url: string }>) => Promise<void>
    getCurrentUser: () => Promise<void>
    isAuthenticated: () => boolean
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            /* ─── INITIAL STATE ─── */
            user: null,
            session: {
                user: null,
                isLoading: true,
                error: null,
            },
            isLoading: true,
            error: null,

            /* ─── STATE SETTERS ─── */
            setUser: (user) => {
                set({ user })
                set((state) => ({
                    session: {
                        ...state.session,
                        user,
                    },
                }))
            },

            setLoading: (loading) => {
                set({ isLoading: loading })
                set((state) => ({
                    session: {
                        ...state.session,
                        isLoading: loading,
                    },
                }))
            },

            setError: (error) => {
                set({ error })
                set((state) => ({
                    session: {
                        ...state.session,
                        error,
                    },
                }))
            },

            clearError: () => {
                set({ error: null })
                set((state) => ({
                    session: {
                        ...state.session,
                        error: null,
                    },
                }))
            },

            /* ─── SIGN UP ─── */
            signUp: async (email, password, fullName) => {
                try {
                    get().setLoading(true)
                    get().clearError()

                    const result = await authApi.signUp({
                        email,
                        password,
                        fullName,
                    })

                    if (result) {
                        get().setUser(result.user)
                        // Note: Email confirmation required before full login
                        console.log(result.message)
                    }
                } catch (error) {
                    const message = error instanceof Error ? error.message : 'Signup failed'
                    get().setError(message)
                    throw error
                } finally {
                    get().setLoading(false)
                }
            },

            /* ─── LOGIN ─── */
            login: async (email, password) => {
                try {
                    get().setLoading(true)
                    get().clearError()

                    const user = await authApi.login({ email, password })
                    get().setUser(user)
                } catch (error) {
                    const message = error instanceof Error ? error.message : 'Login failed'
                    get().setError(message)
                    throw error
                } finally {
                    get().setLoading(false)
                }
            },

            /* ─── LOGOUT ─── */
            logout: async () => {
                try {
                    get().setLoading(true)
                    get().clearError()

                    await authApi.logout()
                    get().setUser(null)
                } catch (error) {
                    const message = error instanceof Error ? error.message : 'Logout failed'
                    get().setError(message)
                    throw error
                } finally {
                    get().setLoading(false)
                }
            },

            /* ─── RESET PASSWORD ─── */
            resetPassword: async (email) => {
                try {
                    get().setLoading(true)
                    get().clearError()

                    await authApi.resetPassword(email)
                    // Success message handled by component
                } catch (error) {
                    const message = error instanceof Error ? error.message : 'Password reset failed'
                    get().setError(message)
                    throw error
                } finally {
                    get().setLoading(false)
                }
            },

            /* ─── UPDATE PASSWORD ─── */
            updatePassword: async (token, newPassword) => {
                try {
                    get().setLoading(true)
                    get().clearError()

                    await authApi.updatePassword(token, newPassword)
                    // Success handled by component
                } catch (error) {
                    const message = error instanceof Error ? error.message : 'Password update failed'
                    get().setError(message)
                    throw error
                } finally {
                    get().setLoading(false)
                }
            },

            /* ─── UPDATE PROFILE ─── */
            updateProfile: async (updates) => {
                try {
                    const state = get()
                    if (!state.user) {
                        throw new Error('No authenticated user')
                    }

                    get().setLoading(true)
                    get().clearError()

                    const updatedUser = await authApi.updateUserProfile(state.user.id, updates)
                    get().setUser(updatedUser)
                } catch (error) {
                    const message = error instanceof Error ? error.message : 'Profile update failed'
                    get().setError(message)
                    throw error
                } finally {
                    get().setLoading(false)
                }
            },

            /* ─── GET CURRENT USER ─── */
            getCurrentUser: async () => {
                try {
                    get().setLoading(true)
                    get().clearError()

                    const user = await authApi.getCurrentUser()
                    get().setUser(user)
                } catch (error) {
                    const message = error instanceof Error ? error.message : 'Failed to get current user'
                    get().setError(message)
                    get().setUser(null)
                } finally {
                    get().setLoading(false)
                }
            },

            /* ─── CHECK AUTHENTICATION ─── */
            isAuthenticated: () => {
                return get().user !== null
            },
        }),
        {
            name: 'auth-store',
            partialize: (state) => ({
                user: state.user,
                // Don't persist loading/error state
            }),
        }
    )
)

/* ─── HELPER HOOKS ─── */

/**
 * Hook to get only user data
 */
export const useUser = () => useAuthStore((state) => state.user)

/**
 * Hook to get only loading state
 */
export const useAuthLoading = () => useAuthStore((state) => state.isLoading)

/**
 * Hook to get only error
 */
export const useAuthError = () => useAuthStore((state) => state.error)

/**
 * Hook to check if authenticated
 */
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated())

/**
 * Hook for all auth actions
 */
export const useAuthActions = () =>
    useAuthStore((state) => ({
        signUp: state.signUp,
        login: state.login,
        logout: state.logout,
        resetPassword: state.resetPassword,
        updatePassword: state.updatePassword,
        updateProfile: state.updateProfile,
        getCurrentUser: state.getCurrentUser,
        setError: state.setError,
        clearError: state.clearError,
    }))