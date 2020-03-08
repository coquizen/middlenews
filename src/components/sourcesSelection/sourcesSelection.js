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
                data.map((dat, idx) => {
                    dat.idx = idx
                    dat.faviconUL = googleFavIconAPI + dat.domain
                    dat.isSelected = false
                })
                setSources(results.data)
            }
           getData()
    }, [])         

    const toggleSelected = (idx) => {
        var selectedSources = Array.from(sources)
        selectedSources[idx].isSelected ? selectedSources[idx].isSelected = false : selectedSources[idx].isSelected = true
        setSources(selectedSources)
    }

    return (
        <div>
            {sources && sources.map(dat => (
                <div key={dat.idx}>
                    <p>{dat.source}</p>
                    <p >Selected: {dat.isSelected.toString()}</p>
                    <button onClick={() => toggleSelected(dat.idx)}>Select</button>
                </div>))
            }
        </div>
    )
}