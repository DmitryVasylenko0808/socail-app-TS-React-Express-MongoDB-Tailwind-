import React from "react";

type CommentsBlockProps = {
    countComments: number,
    children: React.ReactNode
}

const CommentsBlock = ({ countComments, children }: CommentsBlockProps) => {
    return (
        <div className="">
            <h2 className="mb-2 dark:text-white">
                <span className="font-bold">{countComments}</span> Comments
            </h2>
            {children}
        </div>
    )
};

export default CommentsBlock;