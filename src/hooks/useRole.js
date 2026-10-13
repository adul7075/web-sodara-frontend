import { useAuth } from '@/hooks/auth'

export const useRole = () => {
    const { user } = useAuth()
    
    const hasRole = (role) => {
        return user?.role === role
    }

    const isAdmin = () => hasRole('admin')
    const isUser = () => hasRole('user')

    return {
        hasRole,
        isAdmin,
        isUser,
        role: user?.role
    }
}