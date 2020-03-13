import React, { useState } from 'react';
import './app.css';

import { SourcesSelection } from '../sourcesSelection';
import { SearchSources } from '../searchSources';

export default function App(props) {
  const [selectedSources, setSelectedSources] = useState([])
  const [searchTerms, setSearchTerms] = useState([]);

  return (
    <div className="App">
      <SearchSources setSearchTerms={setSearchTerms}/>
      <SourcesSelection selectedSources={selectedSources} setSelectedSources={setSelectedSources} />
      <Articles selectedSources={selectedSources} searchTerms={searchTerms} />
    </div>
  );
}