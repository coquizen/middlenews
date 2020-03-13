import React,  { useState, useEffect } from 'react';
import Papa from 'papaparse';

const googleFavIconAPI = "https://www.google.com/s2/favicons?domain="

export default function SourcesSelection({ selectedSources, setSelectedSources }) {
    const [sources, setSources] = useState([])

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
                data.forEach((dat, idx) => {
                    dat.idx = idx
                    dat.faviconUL = googleFavIconAPI + dat.domain
                    dat.isSelected = false
                    dat.rssURL = getRSSURL(dat.domain)
                })
                setSources(results.data)
            }
           getData()
    }, [])
    
    const getRSSURL = async (sourceDomain) => {
                const html = await fetch(sourceDomain, {
                    headers: {
                        'content-type': 'text/html'
                    },
                    mode: 'no-cors'
                })
        const doc = await new DOMParser().parseFromString(html, 'text/html')
                console.log(doc)
    }


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
            <div key={selectSource.idx}>{selectSource.source}</div>
        ))}

        </div>
    )
}