import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useFeedBack } from "@/hooks/query-feedback/useFeedback";
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
                <div className="w-1/2">Map</div>
                <div className="flex w-1/2 flex-col gap-4">
                    <h1>Liên hệ</h1>
                    <Separator />
                    <h1>Gửi thắc mắc cho chúng tôi</h1>
                    <Separator />
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Tên của bạn"
                    />
                    <div className="flex justify-between">
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
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Noidung"
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
