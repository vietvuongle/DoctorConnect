import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import "prosemirror-view/style/prosemirror.css";
import { useEffect, useRef } from "react";
import { FaBold, FaItalic, FaUnderline, FaListUl, FaListOl, FaAlignLeft, FaAlignCenter, FaAlignRight } from "react-icons/fa";

const TiptapEditor = ({ value, onChange }) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Underline,
            TextAlign.configure({ types: ["heading", "paragraph"] }),
        ],
        content: value || "",
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    const editorRef = useRef(null);

    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value || "");
        }
    }, [value, editor]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Enter") {
                if (event.shiftKey) {
                    event.preventDefault();
                    editor.commands.enter(); // Shift+Enter: Soft line break
                } else {
                    event.preventDefault();
                    // editor.commands.splitBlock(); // Enter: New paragraph
                }
            }
        };

        const editorElement = editorRef.current;
        if (editorElement) {
            editorElement.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            if (editorElement) {
                editorElement.removeEventListener("keydown", handleKeyDown);
            }
        };
    }, [editor]);

    if (!editor) {
        return <div>Error: Editor failed to initialize.</div>;
    }

    return (
        <div className="font-calibri">
            <div className="flex flex-wrap gap-1 mb-3 border-b border-gray-200 bg-gray-100 p-2 shadow-sm">
                <div className="flex gap-1">
                    <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`p-2 rounded ${editor.isActive("bold") ? "bg-blue-500 text-white" : "bg-white"} border hover:bg-blue-100`} title="Bold">
                        <FaBold />
                    </button>
                    <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-2 rounded ${editor.isActive("italic") ? "bg-blue-500 text-white" : "bg-white"} border hover:bg-blue-100`} title="Italic">
                        <FaItalic />
                    </button>
                    <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={`p-2 rounded ${editor.isActive("underline") ? "bg-blue-500 text-white" : "bg-white"} border hover:bg-blue-100`} title="Underline">
                        <FaUnderline />
                    </button>
                </div>
                <div className="flex gap-1">
                    <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`p-2 rounded ${editor.isActive("bulletList") ? "bg-blue-500 text-white" : "bg-white"} border hover:bg-blue-100`} title="Bullet List">
                        <FaListUl />
                    </button>
                    <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`p-2 rounded ${editor.isActive("orderedList") ? "bg-blue-500 text-white" : "bg-white"} border hover:bg-blue-100`} title="Numbered List">
                        <FaListOl />
                    </button>
                </div>
                <div className="flex gap-1">
                    <button type="button" onClick={() => editor.chain().focus().setParagraph().run()} className={`px-3 py-1 rounded ${editor.isActive("paragraph") ? "bg-blue-500 text-white" : "bg-white"} border hover:bg-blue-100`} title="Paragraph">
                        P
                    </button>
                    <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`px-3 py-1 rounded ${editor.isActive("heading", { level: 1 }) ? "bg-blue-500 text-white" : "bg-white"} border hover:bg-blue-100`} title="Heading 1">
                        H1
                    </button>
                    <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`px-3 py-1 rounded ${editor.isActive("heading", { level: 2 }) ? "bg-blue-500 text-white" : "bg-white"} border hover:bg-blue-100`} title="Heading 2">
                        H2
                    </button>
                    <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={`px-3 py-1 rounded ${editor.isActive("heading", { level: 3 }) ? "bg-blue-500 text-white" : "bg-white"} border hover:bg-blue-100`} title="Heading 3">
                        H3
                    </button>
                </div>
                <div className="flex gap-1">
                    <button type="button" onClick={() => editor.chain().focus().setTextAlign("left").run()} className={`p-2 rounded ${editor.isActive({ textAlign: "left" }) ? "bg-blue-500 text-white" : "bg-white"} border hover:bg-blue-100`} title="Align Left">
                        <FaAlignLeft />
                    </button>
                    <button type="button" onClick={() => editor.chain().focus().setTextAlign("center").run()} className={`p-2 rounded ${editor.isActive({ textAlign: "center" }) ? "bg-blue-500 text-white" : "bg-white"} border hover:bg-blue-100`} title="Align Center">
                        <FaAlignCenter />
                    </button>
                    <button type="button" onClick={() => editor.chain().focus().setTextAlign("right").run()} className={`p-2 rounded ${editor.isActive({ textAlign: "right" }) ? "bg-blue-500 text-white" : "bg-white"} border hover:bg-blue-100`} title="Align Right">
                        <FaAlignRight />
                    </button>
                </div>
            </div>
            <div className="border rounded p-4 min-h-[200px] shadow-sm w-full border-gray-300 bg-white px-4 py-2 text-gray-700 focus-within:border-blue-500 focus-within:outline-none focus-within:ring-1 focus-within:ring-blue-500 transition duration-200">
                <EditorContent editor={editor} ref={editorRef} />
            </div>
            <style>
                {`
                    .font-calibri {
                        font-family: 'Calibri', 'Arial', sans-serif;
                    }
                    .ProseMirror {
                        font-family: 'Calibri', 'Arial', sans-serif !important;
                        font-size: 11pt;
                        line-height: 1.15;
                        color: #2E2E2E;
                    }
                    .ProseMirror p {
                        margin: 0 0 4pt 0;
                    }
                    .ProseMirror h1 {
                        font-size: 26pt;
                        font-weight: bold;
                        margin: 22pt 0 12pt 0;
                        line-height: 1.1;
                        color: #2E2E2E;
                    }
                    .ProseMirror h2 {
                        font-size: 20pt;
                        font-weight: bold;
                        margin: 18pt 0 10pt 0;
                        line-height: 1.1;
                        color: #2E2E2E;
                    }
                    .ProseMirror h3 {
                        font-size: 16pt;
                        font-weight: bold;
                        margin: 14pt 0 8pt 0;
                        line-height: 1.1;
                        color: #2E2E2E;
                    }
                    .ProseMirror ul,
                    .ProseMirror ol {
                        padding-left: 36pt;
                        margin: 11pt 0;
                    }
                    .ProseMirror ul li,
                    .ProseMirror ol li {
                        margin-bottom: 6pt;
                        line-height: 1.15;
                    }
                    .ProseMirror ul {
                        list-style-type: disc;
                    }
                    .ProseMirror ol {
                        list-style-type: decimal;
                    }
                    .ProseMirror:focus {
                        outline: none;
                    }
                `}
            </style>
        </div>
    );
};

export default TiptapEditor;
