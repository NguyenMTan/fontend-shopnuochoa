import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useFeedBack } from "@/hooks/query-feedback/useFeedBack";
import useToastMessage from "@/hooks/useToastMessage";
import { useState } from "react";

function ContactPage() {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const mutation = useFeedBack();
    const { toastLoading } = useToastMessage();

    function handleFeedBack() {
        toastLoading("Vui lòng đợi");
        mutation.mutate({ name, email, phone_number: phoneNumber, message });
    }

    return (
        <div className="container w-full p-8">
            <div className="mx-12 flex gap-8">
                <div className="w-1/2 mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-4">
                        Dịch Vụ Của Chúng Tôi
                    </h2>
                    <p className="text-center text-lg mx-auto w-[80%] mb-10 text-gray-500">
                        Khám phá các dịch vụ đặc biệt mà chúng tôi mang đến cho
                        những tín đồ yêu nước hoa!
                    </p>

                    <div className="flex flex-wrap gap-[2%]">
                        <div className="w-[49%] mb-3 p-6 bg-black rounded-lg shadow-md">
                            <h2 className="text-xl font-bold text-white mb-2">
                                Giao Hàng Nhanh
                            </h2>
                            <p className="text-gray-300">
                                Chúng tôi cam kết giao hàng trong vòng 2-3 ngày
                                làm việc trên toàn quốc.
                            </p>
                        </div>
                        <div className="w-[49%] mb-3 p-6 bg-black rounded-lg shadow-md">
                            <h2 className="text-xl font-bold text-white mb-2">
                                Đổi Trả Dễ Dàng
                            </h2>
                            <p className="text-gray-300">
                                Khách hàng có thể đổi trả trong vòng 7 ngày với
                                điều kiện sản phẩm còn nguyên vẹn.
                            </p>
                        </div>
                        <div className="w-[49%] p-6 bg-black rounded-lg shadow-md">
                            <h2 className="text-xl font-bold text-white mb-2">
                                Cam Kết Chính Hãng
                            </h2>
                            <p className="text-gray-300">
                                Sản phẩm nước hoa được mua trực tiếp tại các
                                store ở nước ngoài,làm việc trực tiếp với các
                                hãng,cam kết Authentic 100%.
                            </p>
                        </div>
                        <div className="w-[49%] p-6 bg-black rounded-lg shadow-md">
                            <h2 className="text-xl font-bold text-white mb-2">
                                Chính sách bảo mật
                            </h2>
                            <p className="text-gray-300">
                                Chúng tôi đảm bảo rằng mọi thông tin thu nhập sẽ
                                được lưu giữ an toàn.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex w-1/2 flex-col">
                    <h2 className="text-4xl font-bold text-center mb-4">
                        Liên hệ Kewtie
                    </h2>
                    <h3 className="text-center text-lg mx-auto w-[80%] mb-[68px] text-gray-500">
                        Gửi thắc mắc cho chúng tôi
                    </h3>
                    <Input
                        className="mb-4"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Tên của bạn"
                    />
                    <div className="flex mb-4 gap-2 justify-between">
                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                        <Input
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Số điện thoại của bạn"
                        />
                    </div>
                    <Textarea
                        className="mb-4 h-[192px]"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Nội dung bạn muốn gửi cho Kewtie"
                    />
                    <Button type="button" onClick={handleFeedBack}>
                        Gửi
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ContactPage;
