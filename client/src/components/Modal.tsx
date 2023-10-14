import React from "react";
import { MdOutlineClose } from "react-icons/md";

type ModalProps = {
    onClose: () => void,
    children: React.ReactNode
}

const Modal = ({ onClose, children }: ModalProps) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-[#0000007A] flex justify-center items-center">
            <div className="px-10 pt-5 pb-8 w-[600px] bg-white border rounded-2xl shadow-2xl">
                <div className="flex justify-end">
                    <button
                        className="mb-3 text-zinc-500"
                        aria-label="close"
                        onClick={onClose}
                    >
                        <MdOutlineClose size={36} />
                    </button>
                </div>

                {children}
            </div>
        </div>
    );
}

export default Modal;