import React, { useState } from 'react';

export default function SearchSources ({ setSearchTerms }) {
    const [input, setInput] = useState()

    const handleSubmit = (e) => {
        e.preventDefault()
        setSearchTerms(input)
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