import React,  { useState, useEffect } from 'react';
import Papa from 'papaparse';

const googleFavIconAPI = "https://www.google.com/s2/favicons?domain="

export default function SourcesSelection(props) {
    const [sources, setSources] = useState([]);
    const [selectedSources, setSelectedSources] = useState([]);
    
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

    const submitSelection = () => {
        var tmpSelectedSources = sources.filter((source) => {
            return source.isSelected === true
        })
        setSelectedSources(tmpSelectedSources)
    }

    return (
        <div>
        <li>
            {sources && sources.map(dat => (
                <ul key={dat.idx}>
                    <p>{dat.source}</p>
                    <p>Selected: {dat.isSelected.toString()}</p>
                    <button onClick={() => toggleSelected(dat.idx)}>Select</button>
                </ul>))
            }
        </li>
        <button onClick={() => submitSelection()}>Submit</button>
        {selectedSources && selectedSources.map((selectSource) => (
            <div>{selectSource.source}</div>
        ))}
        </div>
    )
}