import { TrashIcon } from "@radix-ui/react-icons";
import { FaPencilAlt } from "react-icons/fa";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Link } from "react-router-dom";
import { IoOptions } from "react-icons/io5";
import { MdDelete, MdEdit } from "react-icons/md";

interface ActionProps {
    link_update?: string;
    setModalDelete: any;
    setModalUpdate?: any;
    _id: string;
    name: string;
}

function Actions({
    link_update,
    setModalDelete,
    setModalUpdate,
    _id,
    name,
}: ActionProps) {
    const handleDelete = () => {
        setModalDelete(true, { _id, name: name });
    };

    const handleUpdate = () => {
        setModalUpdate(true, _id);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    className="bg-black text-white"
                    variant="outline"
                    size="sm"
                >
                    <IoOptions />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black">
                {link_update && (
                    <Link to={link_update}>
                        <DropdownMenuItem className="text-white">
                            <MdEdit className="mr-2 h-4 w-4" />
                            <span>Cập nhật</span>
                        </DropdownMenuItem>
                    </Link>
                )}
                {setModalUpdate && (
                    <DropdownMenuItem
                        className="text-white"
                        onClick={handleUpdate}
                    >
                        <MdEdit className="mr-2 h-4 w-4" />
                        <span>Cập nhật</span>
                    </DropdownMenuItem>
                )}
                <DropdownMenuItem className="text-white" onClick={handleDelete}>
                    <MdDelete className="mr-2 h-4 w-4" />
                    <span>Xóa</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default Actions;
