import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { RiShoppingBag4Fill } from "react-icons/ri";

function ThanksPage() {
    return (
        <div className="p-8 flex items-center flex-col gap-2">
            <RiShoppingBag4Fill className="h-52 w-52" />
            <p>
                Đơn hàng của bạn đã được đặt thành công, vui lòng kiểm tra lại
                gmail để biết thêm chi tiết.
            </p>
            <p>Cảm ơn bạn đã ủng hộ Kewtie.</p>
            <Link to={"/"}>
                <Button className="hover:bg-yellow-300 hover:text-black active:bg-yellow-500">
                    Quay lại trang chủ
                </Button>
            </Link>
        </div>
    );
}

export default ThanksPage;
