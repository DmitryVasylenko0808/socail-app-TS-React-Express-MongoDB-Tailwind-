import React, { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import {
    useDeletePostMutation,
    useLikePostMutation,
    useSavePostMutation
} from "../../redux/services/postsApi";
import { Link } from "react-router-dom";
import {
    MdBookmarkBorder,
    MdOutlineBookmark,
    MdOutlineFavorite,
    MdOutlineFavoriteBorder,
    MdOutlineModeComment
} from "react-icons/md";
import PostMenu from "./PostMenu";
import Modal from "../Modal";
import EditPostForm from "../Forms/EditPostForm";
import { Post as PostType } from "../../types";
import { formatDate } from "../../utils/formatDate";

type PostProps = PostType;

const Post = ({ _id, user, text, image, comments_count, likes_list, saves_list, createdAt }: PostProps) => {
    const path = "http://localhost:5000/static/avatars";
    const pathPosts = "http://localhost:5000/static/posts";

    let imageFile;
    if (!user.avatar_file) {
        imageFile = `${window.location.origin}/nullavatar.jpg`;
    } else {
        imageFile = `${path}/${user.avatar_file}`;
    }

    let date = formatDate(createdAt);

    const [isOpedEditPostForm, setIsOpenEditFormPost] = useState<boolean>(false);
    const authUser = useAppSelector(state => state.auth);

    const [deletePost, { isSuccess }] = useDeletePostMutation();
    const [likePost, { isSuccess: isLikeSuccess }] = useLikePostMutation();
    const [savePost, { isSuccess: isSaveSuccess }] = useSavePostMutation();

    const openEditFormHandle = () => {
        setIsOpenEditFormPost(true);
    };

    const closeEditFormHandle = () => {
        setIsOpenEditFormPost(false);
    };

    const deleteHandle = async () => {
        await deletePost(_id);
    }

    const likeHandle = async () => {
        await likePost(_id);
    }

    const saveHandle = async () => {
        await savePost(_id);
    }

    const isAuthor = authUser.login === user.login;
    const isLiked = !!likes_list.find(item => item.user === authUser.id);
    const isSaved = !!saves_list.find(item => item.user === authUser.id);

    return (
        <article className="py-4 flex gap-x-4">
            <div className="w-[50px]">
                <Link to={`/profile/${user.login}`}>
                    <img src={imageFile} alt={user.login} className="min-w-[50px] h-[50px] rounded-full object-cover" />
                </Link>
            </div>

            <div className="flex-auto">
                <div className="flex justify-between items-center">
                    <div className="mb-1 flex items-center gap-x-2">
                        <Link to={`/profile/${user.login}`} className="text-xl font-bold dark:text-white">{user.name}</Link>
                        <Link to={`/profile/${user.login}`} className="text-zinc-500">{`@${user.login}`}</Link>
                        <span className="text-zinc-500">{date}</span>
                    </div>
                    {isAuthor &&
                        <PostMenu
                            onEdit={openEditFormHandle}
                            onDelete={deleteHandle}
                        />
                    }
                </div>

                <div className="break-all">
                    <p className="mb-4 text-zinc-500">{text}</p>
                    {image &&
                        <div className="w-full flex justify-center">
                            <img src={`${pathPosts}/${image}`} alt={image} className="max-h-[420px] rounded-lg" />
                        </div>
                    }
                </div>

                <div className="p-4 flex justify-between text-zinc-500">
                    <Link to={`/post/${user._id}/${_id}`} className="w-[100px] flex items-center gap-x-2">
                        <MdOutlineModeComment size={26} />
                        {comments_count}
                    </Link>
                    <button onClick={likeHandle} disabled={isLiked} className="w-[100px] flex items-center gap-x-2">
                        {isLiked ? <MdOutlineFavorite size={26} /> : <MdOutlineFavoriteBorder size={26} />}
                        {likes_list.length}
                    </button>
                    <button onClick={saveHandle} disabled={isSaved} className="w-[100px] flex items-center gap-x-2">
                        {isSaved ? <MdOutlineBookmark size={26} /> : <MdBookmarkBorder size={26} />}
                        {saves_list.length}
                    </button>
                </div>
            </div>

            {isOpedEditPostForm &&
                <Modal onClose={closeEditFormHandle}>
                    <EditPostForm userId={authUser.id} postId={_id} />
                </Modal>
            }
        </article>
    );
}

export default Post;