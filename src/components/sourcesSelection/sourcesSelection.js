import React,  { useState, useEffect } from 'react';
import Papa from 'papaparse';

const googleFavIconAPI = "https://www.google.com/s2/favicons?domain="
export default function SourcesSelection(props) {
    const [sources, setSources] = useState([]);
    
    useEffect(() => {
            async function getData() {
                const file = require('./source-list.csv')
                const response = await fetch(file)
                const reader = response.body.getReader()
                const result = await reader.read()
                const decoder = new TextDecoder('utf-8')
                const csv = decoder.decode(result.value)
                const results = Papa.parse(csv, { header: true })
                const data = results.data
                data.map(dat => (dat.faviconURL = googleFavIconAPI + dat.domain))
                setSources(results.data)
           }
           getData()
    }, [])         

    return (
        <div>
            {sources && sources.map(dat => <h1 key={dat.source}>{dat.source}</h1>)}
        </div>
    )
}