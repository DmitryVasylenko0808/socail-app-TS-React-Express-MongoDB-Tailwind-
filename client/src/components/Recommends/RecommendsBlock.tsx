import React from "react";
import { useGetRecommendsQuery } from "../../redux/services/profilesApi";
import RecommendItem from "./RecommendItem";

const RecommendBlock = () => {
    const { data } = useGetRecommendsQuery(null);

    return (
        <div className="px-3 py-4 border rounded-2xl shadow-lg dark:bg-slate-900 dark:border-0">
            <h2 className="mb-2 text-xl font-bold dark:text-white">Who to follow</h2>
            <div>
                {data && data.map((item: any) => <RecommendItem { ...item } key={item._id} />)}
            </div>
        </div>
    );
}

export default RecommendBlock;