import React from "react";
import { useAuth } from "..";
import SearchBlock from "./Search/SearchBlock";
import RecommendBlock from "./Recommends/RecommendsBlock";

const SideBar = () => {
    const isAuthorized = useAuth();

    return (
        <aside className="h-full w-[290px] fixed top-0 py-7 px-5 ml-[1040px] border-l dark:border-slate-700">
            <SearchBlock />
            {isAuthorized && <RecommendBlock />}
        </aside>
    )
};

export default SideBar;