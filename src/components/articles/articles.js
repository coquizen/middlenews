import React, { useEffect } from 'react';

export default function Articles ({ searchTerms, selectedSources }) {
    const googleSearchAPI = "https://google.com/search?"
    const siteSearch = "as_sitesearch="
    const asQuoted = "as_epq="
    const asOrQuoted = "as_oq="
    const notQuoted = "as_eq="
    const numRequest = "num="
    const timePeriod = "as_qdr=" //d - last 24 hours
                                 //w - previous seven days
                                 //m - previous month
                                 //y - previous year
                                 //m# - where # is number of months
    const parseSearchTerms = (terms) => {
        var termsArr = terms.split(" ")
        var exactTerm = []
        var looseTerm = []

        termsArr.map((term) => {
            if (term[0] === "\"") {
                exactTerm.push(term)
            } else {
                looseTerm.push(term)
            }
        })
        const query = asQuoted + exactTerm.join(`+`) + `&` + asOrQuoted + looseTerm.join(`+`)
        return query
    }

    useEffect(() => {
        (selectedSources && searchTerms) && selectedSources.map((source) => {
            const terms = parseSearchTerms(searchTerms)
            const baseURL = googleSearchAPI + siteSearch + source.domain
            queryArticle()
        })
    }, [searchTerms, selectedSources])

    const queryArticle = async (url) => {
        const html = await fetch(url, {
            headers: {
                'content-type': 'text/html'
            },
            mode: 'no-cors'
        })
    }

    return(
        <div>
            <h1>True</h1>
        </div>
    )
}