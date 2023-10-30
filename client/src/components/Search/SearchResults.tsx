import React from "react";
import SearchItem from "./SearchItem";

type SearchResultsProps = {
    results: any[];
}

const SearchResults = ({ results }: SearchResultsProps) => {
    return (
        <div className="w-full max-h-[300px] px-2 border dark:border-slate-700 absolute top-10 z-10 bg-white dark:bg-slate-900 overflow-auto">
            {results.map(item => <SearchItem { ...item } key={item._id} />)}
        </div> 
    )
}

export default SearchResults;