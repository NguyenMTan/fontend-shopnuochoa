import { useEditor, EditorContent } from "@tiptap/react";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import { Color } from "@tiptap/extension-color";
import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import TextStyle from "@tiptap/extension-text-style";
import Paragraph from "@tiptap/extension-paragraph";
import Highlight from "@tiptap/extension-highlight";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Link from "@tiptap/extension-link";
import Subscript from "@tiptap/extension-subscript";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import { Button } from "@/components/ui/button";
import { BoldIcon, Italic as ItalicIcon, UnderlineIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import FontFamily from "@tiptap/extension-font-family";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import TextAlign from "@tiptap/extension-text-align";
import {
    FaAlignCenter,
    FaAlignJustify,
    FaAlignLeft,
    FaAlignRight,
    FaBold,
    FaHighlighter,
    FaLink,
} from "react-icons/fa6";

interface TiptapProps {
    value: string;
    onChange: (value: string) => void;
}

const Tiptap = (props: TiptapProps) => {
    const editor = useEditor({
        extensions: [
            Bold,
            Italic,
            Document,
            Text,
            Paragraph,
            Highlight.configure({ multicolor: true }),
            Link,
            Strike,
            Subscript,
            Underline,
            TextStyle,
            Color,
            FontFamily,
            Heading.configure({
                HTMLAttributes: {
                    class: "text-3xl font-bold",
                    levels: [1],
                },
            }),
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
        ],
        content: props.value,
        editorProps: {
            attributes: {
                class: "h-[500px] border-0 focus:outline-none",
            },
        },
        onUpdate: ({ editor }) => {
            props.onChange(editor.getHTML());
        },
    });

    const setLink = useCallback(() => {
        const previousUrl = editor?.getAttributes("link").href;
        const url = window.prompt("URL", previousUrl);

        // cancelled
        if (url === null) {
            return;
        }

        // empty
        if (url === "") {
            editor?.chain().focus().extendMarkRange("link").unsetLink().run();

            return;
        }

        // update link
        editor
            ?.chain()
            .focus()
            .extendMarkRange("link")
            .setLink({ href: url })
            .run();
    }, [editor]);

    useEffect(() => {
        if (editor && editor.getHTML() !== props.value) {
            editor.commands.setContent(props.value);
        }
    }, [props.value]);

    if (!editor) {
        return null;
    }
    return (
        <>
            <div className="control-group">
                <div className="flex gap-2 ">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">Kiểu chữ</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuItem
                                onClick={() =>
                                    editor
                                        .chain()
                                        .focus()
                                        .setFontFamily("Inter")
                                        .run()
                                }
                                className={
                                    editor.isActive("textStyle", {
                                        fontFamily: "Inter",
                                    })
                                        ? "is-active"
                                        : ""
                                }
                                data-test-id="inter"
                            >
                                Inter
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() =>
                                    editor
                                        .chain()
                                        .focus()
                                        .setFontFamily(
                                            "Comic Sans MS, Comic Sans"
                                        )
                                        .run()
                                }
                                className={
                                    editor.isActive("textStyle", {
                                        fontFamily: "Comic Sans MS, Comic Sans",
                                    })
                                        ? "is-active"
                                        : ""
                                }
                                data-test-id="comic-sans"
                            >
                                Comic Sans
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() =>
                                    editor
                                        .chain()
                                        .focus()
                                        .setFontFamily("monospace")
                                        .run()
                                }
                                className={
                                    editor.isActive("textStyle", {
                                        fontFamily: "monospace",
                                    })
                                        ? "is-active"
                                        : ""
                                }
                                data-test-id="monospace"
                            >
                                Monospace
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() =>
                                    editor
                                        .chain()
                                        .focus()
                                        .unsetFontFamily()
                                        .run()
                                }
                                data-test-id="unsetFontFamily"
                            >
                                Mặc định
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">Màu</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuItem
                                onClick={() =>
                                    editor
                                        .chain()
                                        .focus()
                                        .setColor("#ff0")
                                        .run()
                                }
                                className={
                                    editor.isActive("textStyle", {
                                        color: "#ff0",
                                    })
                                        ? "is-active"
                                        : ""
                                }
                                data-testid="setPurple"
                            >
                                <p>Vàng</p>
                                <DropdownMenuShortcut>
                                    <div className="bg-[#ff0] w-5 h-5 rounded-full"></div>
                                </DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() =>
                                    editor
                                        .chain()
                                        .focus()
                                        .setColor("#f00")
                                        .run()
                                }
                                className={
                                    editor.isActive("textStyle", {
                                        color: "#f00",
                                    })
                                        ? "is-active"
                                        : ""
                                }
                                data-testid="setPurple"
                            >
                                <p>Đỏ</p>
                                <DropdownMenuShortcut>
                                    <div className="bg-[#f00] w-5 h-5 rounded-full"></div>
                                </DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() =>
                                    editor
                                        .chain()
                                        .focus()
                                        .setColor("#00f")
                                        .run()
                                }
                                className={
                                    editor.isActive("textStyle", {
                                        color: "#00f",
                                    })
                                        ? "is-active"
                                        : ""
                                }
                                data-testid="setPurple"
                            >
                                <p>Xanh dương</p>
                                <DropdownMenuShortcut>
                                    <div className="bg-[#00f] w-5 h-5 rounded-full"></div>
                                </DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() =>
                                    editor
                                        .chain()
                                        .focus()
                                        .setColor("#0f0")
                                        .run()
                                }
                                className={
                                    editor.isActive("textStyle", {
                                        color: "#0f0",
                                    })
                                        ? "is-active"
                                        : ""
                                }
                                data-testid="setPurple"
                            >
                                <p>Xanh lá</p>
                                <DropdownMenuShortcut>
                                    <div className="bg-[#0f0] w-5 h-5 rounded-full"></div>
                                </DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() =>
                                    editor
                                        .chain()
                                        .focus()
                                        .setColor("#f0f")
                                        .run()
                                }
                                className={
                                    editor.isActive("textStyle", {
                                        color: "#f0f",
                                    })
                                        ? "is-active"
                                        : ""
                                }
                                data-testid="setPurple"
                            >
                                <p>Tím</p>
                                <DropdownMenuShortcut>
                                    <div className="bg-[#f0f] w-5 h-5 rounded-full"></div>
                                </DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() =>
                                    editor
                                        .chain()
                                        .focus()
                                        .setColor("#0ff")
                                        .run()
                                }
                                className={
                                    editor.isActive("textStyle", {
                                        color: "#0ff",
                                    })
                                        ? "is-active"
                                        : ""
                                }
                                data-testid="setPurple"
                            >
                                <p>Lam</p>
                                <DropdownMenuShortcut>
                                    <div className="bg-[#0ff] w-5 h-5 rounded-full"></div>
                                </DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() =>
                                    editor
                                        .chain()
                                        .focus()
                                        .setColor("#000")
                                        .run()
                                }
                                className={
                                    editor.isActive("textStyle", {
                                        color: "#000",
                                    })
                                        ? "is-active"
                                        : ""
                                }
                                data-testid="setPurple"
                            >
                                <p>Đen</p>
                                <DropdownMenuShortcut>
                                    <div className="bg-[#000] w-5 h-5 rounded-full"></div>
                                </DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <button
                        type="button"
                        onClick={() =>
                            editor.chain().focus().setTextAlign("left").run()
                        }
                        className={`${
                            editor.isActive({ textAlign: "left" })
                                ? "is-active"
                                : ""
                        } h-9 w-10 flex justify-center items-center border rounded-[6px]`}
                    >
                        <FaAlignLeft size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() =>
                            editor.chain().focus().setTextAlign("center").run()
                        }
                        className={`${
                            editor.isActive({ textAlign: "center" })
                                ? "is-active"
                                : ""
                        } h-9 w-10 flex justify-center items-center border rounded-[6px]`}
                    >
                        <FaAlignCenter size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() =>
                            editor.chain().focus().setTextAlign("right").run()
                        }
                        className={`${
                            editor.isActive({ textAlign: "right" })
                                ? "is-active"
                                : ""
                        } h-9 w-10 flex justify-center items-center border rounded-[6px]`}
                    >
                        <FaAlignRight size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() =>
                            editor.chain().focus().setTextAlign("justify").run()
                        }
                        className={`${
                            editor.isActive({ textAlign: "justify" })
                                ? "is-active"
                                : ""
                        } h-9 w-10 flex justify-center items-center border rounded-[6px]`}
                    >
                        <FaAlignJustify size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() =>
                            editor.chain().focus().toggleBold().run()
                        }
                        className={`${
                            editor.isActive("bold") ? "is-active" : ""
                        } h-9 w-10 flex justify-center items-center border rounded-[6px]`}
                    >
                        <FaBold size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() =>
                            editor.chain().focus().toggleItalic().run()
                        }
                        className={`${
                            editor.isActive("italic") ? "is-active" : ""
                        } h-9 w-10 flex justify-center items-center border rounded-[6px]`}
                    >
                        <ItalicIcon size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() =>
                            editor.chain().focus().toggleUnderline().run()
                        }
                        className={`${
                            editor.isActive("underline") ? "is-active" : ""
                        } h-9 w-10 flex justify-center items-center border rounded-[6px]`}
                    >
                        <UnderlineIcon size={16} />
                    </button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                <FaHighlighter size={16} />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuItem
                                onClick={() =>
                                    editor
                                        .chain()
                                        .focus()
                                        .toggleHighlight({ color: "#ff0" })
                                        .run()
                                }
                                className={
                                    editor.isActive("highlight", {
                                        color: "#ff0",
                                    })
                                        ? "is-active"
                                        : ""
                                }
                            >
                                <p>Vàng</p>
                                <DropdownMenuShortcut>
                                    <div className="bg-[#ff0] w-5 h-5 rounded-full"></div>
                                </DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() =>
                                    editor
                                        .chain()
                                        .focus()
                                        .toggleHighlight({ color: "#f00" })
                                        .run()
                                }
                                className={
                                    editor.isActive("highlight", {
                                        color: "#f00",
                                    })
                                        ? "is-active"
                                        : ""
                                }
                            >
                                <p>Đỏ</p>
                                <DropdownMenuShortcut>
                                    <div className="bg-[#f00] w-5 h-5 rounded-full"></div>
                                </DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() =>
                                    editor
                                        .chain()
                                        .focus()
                                        .toggleHighlight({ color: "#00f" })
                                        .run()
                                }
                                className={
                                    editor.isActive("highlight", {
                                        color: "#00f",
                                    })
                                        ? "is-active"
                                        : ""
                                }
                            >
                                <p>Xanh dương</p>
                                <DropdownMenuShortcut>
                                    <div className="bg-[#00f] w-5 h-5 rounded-full"></div>
                                </DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() =>
                                    editor
                                        .chain()
                                        .focus()
                                        .toggleHighlight({ color: "#0f0" })
                                        .run()
                                }
                                className={
                                    editor.isActive("highlight", {
                                        color: "#0f0",
                                    })
                                        ? "is-active"
                                        : ""
                                }
                            >
                                <p>Xanh lá</p>
                                <DropdownMenuShortcut>
                                    <div className="bg-[#0f0] w-5 h-5 rounded-full"></div>
                                </DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() =>
                                    editor
                                        .chain()
                                        .focus()
                                        .toggleHighlight({ color: "#f0f" })
                                        .run()
                                }
                                className={
                                    editor.isActive("highlight", {
                                        color: "#f0f",
                                    })
                                        ? "is-active"
                                        : ""
                                }
                            >
                                <p>Tím</p>
                                <DropdownMenuShortcut>
                                    <div className="bg-[#f0f] w-5 h-5 rounded-full"></div>
                                </DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() =>
                                    editor
                                        .chain()
                                        .focus()
                                        .toggleHighlight({ color: "#0ff" })
                                        .run()
                                }
                                className={
                                    editor.isActive("highlight", {
                                        color: "#0ff",
                                    })
                                        ? "is-active"
                                        : ""
                                }
                            >
                                <p>Lam</p>
                                <DropdownMenuShortcut>
                                    <div className="bg-[#0ff] w-5 h-5 rounded-full"></div>
                                </DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() =>
                                    editor
                                        .chain()
                                        .focus()
                                        .toggleHighlight({ color: "#000" })
                                        .run()
                                }
                                className={
                                    editor.isActive("highlight", {
                                        color: "#000",
                                    })
                                        ? "is-active"
                                        : ""
                                }
                            >
                                <p>Đen</p>
                                <DropdownMenuShortcut>
                                    <div className="bg-[#000] w-5 h-5 rounded-full"></div>
                                </DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() =>
                                    editor
                                        .chain()
                                        .focus()
                                        .unsetHighlight()
                                        .run()
                                }
                                disabled={!editor.isActive("highlight")}
                            >
                                <p>Không dùng</p>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <button
                        type="button"
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .toggleHeading({ level: 1 })
                                .run()
                        }
                        className={`${
                            editor.isActive("heading", { level: 1 })
                                ? "is-active"
                                : ""
                        } h-9 w-20 flex justify-center items-center border rounded-[6px]`}
                    >
                        <p className="font-medium">Heading</p>
                    </button>
                </div>
            </div>
            <ScrollArea className="h-[600px] border p-4">
                <EditorContent editor={editor} />
            </ScrollArea>
        </>
    );
};

export default Tiptap;
