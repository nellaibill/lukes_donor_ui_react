<SearchBar
value={searched}
onChange={(searchVal) => requestSearch(searchVal)}
onCancelSearch={() => cancelSearch()}
/>