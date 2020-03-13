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
        var termsArr = terms.split(/.*["| ].*/) 
        let quotedRegex = /""
        let quotedTerms = searchTerms.match(quotedRegex)

    }
    useEffect(() => {
        selectedSources.map((source) => {
            const query = parseSearchTerms(searchTerms)
            const baseURL = googleSearchAPI + siteSearch + source.domain
            
        })
    }, [])
}