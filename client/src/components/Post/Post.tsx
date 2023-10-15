import React, { useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import PostAvatarBlock from "./PostAvatarBlock";
import PostHeader from "./PostHeader";
import PostBody from "./PostBody";
import PostFooter from "./PostFooter";
import PostMenu from "./PostMenu";
import { Post as PostType } from "../../types";
import { useAppSelector } from "../../redux/hooks";
import { useDeletePostMutation } from "../../redux/slices/postsApi";
import Modal from "../Modal";
import EditPostForm from "../EditPostForm";

type PostProps = PostType;

const Post = ({ _id, user, text, image, comments_count, likes_list, saves_list, createdAt, updatedAt }: PostProps) => {
    const [isOpedEditPostForm, setIsOpenEditFormPost] = useState<boolean>(false);
    const authUser = useAppSelector(state => state.auth);

    const [deletePost, { isSuccess }] = useDeletePostMutation();

    const openEditFormHandle = () => {
        setIsOpenEditFormPost(true);
    };

    const closeEditFormHandle = () => {
        setIsOpenEditFormPost(false);
    };

    const deleteHandle = async () => {
        await deletePost(_id)
            .unwrap()
            .catch(err => { console.log(err) });
    }

    return (
        <article className="py-4 flex gap-x-4">
            <PostAvatarBlock login={user.login} imageFile={user.avatar_file} />

            <div className="flex-auto">
                <PostHeader 
                    name={user.name} 
                    login={user.login} 
                    postDate={createdAt} 
                    postUpdatedDate={updatedAt} 
                />
                <PostBody text={text} imageFile={image} />
                <PostFooter 
                    comments_count={comments_count} 
                    likes={likes_list} 
                    saves={saves_list} 
                />
            </div>

            {authUser.login === user.login && 
                <PostMenu 
                    onEdit={openEditFormHandle} 
                    onDelete={deleteHandle} 
                />
            }

            {isOpedEditPostForm &&
                <Modal onClose={closeEditFormHandle}>
                    <EditPostForm userId={authUser.id} postId={_id} />
                </Modal>}
        </article>
    );
}

export default Post;