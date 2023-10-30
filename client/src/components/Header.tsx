import React from "react";
import { useLocation, useNavigate } from "react-router";
import { formatPathname } from "../utils/formatPathname";
import { MdArrowBack } from "react-icons/md";

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const exclude = ["profile", "followers", "followings"];
    const pathname = formatPathname(location.pathname, exclude);

    const goBackHandle = () => navigate(-1);

    return (
        <div className="py-5 px-10 bg-white border-b sticky top-0 z-10 flex items-center gap-x-5 dark:bg-slate-950 dark:border-slate-700 dark:text-white">
            <button onClick={goBackHandle} aria-label="goBack">
                <MdArrowBack size={26} />
            </button>
            <h2 className="pb-1 text-xl font-bold">{pathname}</h2>
        </div>
    )
};

export default Header;