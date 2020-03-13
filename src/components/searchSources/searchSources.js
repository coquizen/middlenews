import React, { useState } from 'react';

export default function SearchSources ({searchArticles}) {
    const [input, setInput] = useState()

    const handleSubmit = (e) => {
        e.preventDefault()
        searchArticles(input)
        setInput('')
    }
    return (
        <div>
        <form onSubmit={handleSubmit}>
        <label>
        Search:
            <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            />
        </label>
        </form>
        </div>
    )
}