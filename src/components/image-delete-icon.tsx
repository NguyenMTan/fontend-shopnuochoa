import { Button } from "@/components/ui/button";
import { BiSolidTrashAlt } from "react-icons/bi";
interface ImageDeleteIconProps {
    id: string;
    image: {
        image_id: string;
        image_url: string;
    };
    onDelete?: (productId: string, imageId: string) => void;
}
const ImageDeleteIcon = ({ id, image, onDelete }: ImageDeleteIconProps) => {
    return (
        <div className="relative inline-block">
            <img
                src={image.image_url}
                alt={"Image"}
                width={100}
                height={100}
                className="rounded-lg object-cover h-[100px]"
            />
            <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute right-1 top-1"
                aria-label="Delete image"
                onClick={() => onDelete?.(id, image.image_id)}
            >
                <BiSolidTrashAlt />
            </Button>
        </div>
    );
};

export default ImageDeleteIcon;
