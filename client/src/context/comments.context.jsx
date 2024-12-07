import { createContext, useState, useEffect } from 'react'

const CommentContext = createContext()

const ComentProvider = ({ children }) => {
    const mainUrl = import.meta.env.VITE_FORO_API
    const [comments, setComments] = useState([])

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`${mainUrl}/comments`)
                if (!response.ok) {
                    throw new Error(`Failed to fetch comments: ${response.status} ${response.statusText}`)
                }
                const data = await response.json()
                console.log('Fetched comments:', data);
                setComments(data)
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        }

        fetchComments()
    }, [])

    return (
        <CommentContext.Provider value={{ comments, setComments }}>
            {children}
        </CommentContext.Provider>
    )
}

export { CommentContext, ComentProvider }