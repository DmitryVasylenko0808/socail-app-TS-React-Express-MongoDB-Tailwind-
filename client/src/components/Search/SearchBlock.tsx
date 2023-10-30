import React, { useState } from "react";
import { useSearchUsersQuery } from "../../redux/services/profilesApi";
import TextField from "../TextField";
import SearchResults from "./SearchResults";

const SearchBlock = () => {
    const [name, setName] = useState<string>("");

    const { data, isSuccess } = useSearchUsersQuery(name, { skip: name === "" });

    const searchHandle = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setTimeout(() => setName(e.target.value), 1000);
    };

    return (
        <div className="relative text-zinc-500">
            <TextField 
                id="name" 
                placeholder="Search..." 
                onChange={searchHandle}
            />
            {isSuccess && <SearchResults results={data} />}
        </div>
    );
}

export default SearchBlock;