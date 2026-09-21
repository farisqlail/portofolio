import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import LinkExtension from "@tiptap/extension-link";
import ImageExtension from "@tiptap/extension-image";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  FileCode,
  Minus,
  Link2,
  Unlink,
  Image as ImageIcon,
  Undo,
  Redo,
  RemoveFormatting,
  Eye,
  Code2,
} from "lucide-react";

interface WysiwygEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export default function WysiwygEditor({
  value,
  onChange,
  placeholder = "Write your article content here...",
}: WysiwygEditorProps) {
  const [mode, setMode] = useState<"visual" | "source">("visual");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
      }),
      Underline,
      LinkExtension.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
        HTMLAttributes: {
          class: "text-[#FF5500] underline decoration-dashed hover:text-[#ff7733]",
        },
      }),
      ImageExtension.configure({
        HTMLAttributes: {
          class: "rounded-xl border border-dashed border-white/20 my-4 max-w-full shadow-lg",
        },
      }),
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[380px] p-5 focus:outline-none text-zinc-200 prose prose-invert max-w-none text-sm sm:text-base leading-relaxed prose-headings:font-bold prose-headings:text-white prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:border-b prose-h2:border-dashed prose-h2:border-white/10 prose-h2:pb-2 prose-h2:mt-6 prose-h3:text-lg sm:prose-h3:text-xl prose-h3:mt-4 prose-p:text-zinc-300 prose-p:leading-relaxed prose-code:font-mono prose-code:text-[#A3E635] prose-code:bg-white/[0.05] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-dashed prose-pre:border-white/20 prose-pre:rounded-xl prose-blockquote:border-l-2 prose-blockquote:border-[#FF5500] prose-blockquote:text-zinc-400 prose-blockquote:italic",
      },
    },
  });

  // Keep editor content in sync when value changes externally (e.g. edit mode initial load)
  useEffect(() => {
    if (!editor) return;
    const currentHtml = editor.getHTML();
    if (value && (editor.getText().trim() === "" || currentHtml === "<p></p>")) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!mounted || !editor) {
    return (
      <div className="w-full min-h-[420px] rounded-xl border border-dashed border-white/15 bg-black/60 p-6 flex flex-col items-center justify-center font-mono text-xs text-zinc-500">
        <span className="h-2 w-2 bg-[#FF5500] animate-pulse rounded-full mb-2"></span>
        <span>INITIALIZING_WYSIWYG_ENGINE...</span>
      </div>
    );
  }

  const handleSetLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter destination URL:", previousUrl);

    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const handleInsertImage = () => {
    const url = window.prompt("Enter image URL (or paste Supabase bucket URL):");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const handleSwitchToVisual = () => {
    if (editor) {
      editor.commands.setContent(value);
    }
    setMode("visual");
  };

  // Metrics
  const charCount = editor.storage.characterCount
    ? editor.storage.characterCount.characters()
    : editor.getText().length;
  const wordCount = editor.getText().trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="relative rounded-xl border border-dashed border-white/20 bg-[#09090e] shadow-2xl overflow-hidden focus-within:border-[#FF5500]/60 transition-colors">
      {/* Blueprint Corner Accents */}
      <span className="absolute top-1 left-1 font-mono text-[9px] text-zinc-600 select-none font-bold pointer-events-none">
        +
      </span>
      <span className="absolute top-1 right-1 font-mono text-[9px] text-zinc-600 select-none font-bold pointer-events-none">
        +
      </span>
      <span className="absolute bottom-1 left-1 font-mono text-[9px] text-zinc-600 select-none font-bold pointer-events-none">
        +
      </span>
      <span className="absolute bottom-1 right-1 font-mono text-[9px] text-zinc-600 select-none font-bold pointer-events-none">
        +
      </span>

      {/* Editor Header & Control Bar */}
      <div className="border-b border-dashed border-white/15 bg-black/60 p-2.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-zinc-400 px-2 py-0.5 rounded border border-dashed border-white/15 bg-black/40">
            <span className="h-1.5 w-1.5 bg-[#A3E635] rounded-none"></span>
            <span>WYSIWYG // VISUAL_ENGINE</span>
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-1 font-mono text-[10px]">
          <button
            type="button"
            onClick={handleSwitchToVisual}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded transition-colors cursor-pointer ${
              mode === "visual"
                ? "bg-[#FF5500] text-black font-bold shadow-sm"
                : "text-zinc-400 hover:text-white border border-dashed border-white/15"
            }`}
          >
            <Eye size={12} />
            <span>VISUAL (WYSIWYG)</span>
          </button>
          <button
            type="button"
            onClick={() => setMode("source")}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded transition-colors cursor-pointer ${
              mode === "source"
                ? "bg-[#FF5500] text-black font-bold shadow-sm"
                : "text-zinc-400 hover:text-white border border-dashed border-white/15"
            }`}
          >
            <Code2 size={12} />
            <span>RAW (HTML/MARKDOWN)</span>
          </button>
        </div>
      </div>

      {/* WYSIWYG Formatting Toolbar */}
      {mode === "visual" && (
        <div className="border-b border-dashed border-white/15 bg-zinc-950/90 p-2 flex flex-wrap items-center gap-1 backdrop-blur-md">
          {/* Headings */}
          <div className="flex items-center gap-0.5 border-r border-dashed border-white/15 pr-1.5 mr-1">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                editor.isActive("heading", { level: 2 })
                  ? "bg-[#FF5500] text-black"
                  : "text-zinc-400 hover:text-white hover:bg-white/10"
              }`}
              title="Heading 2"
            >
              <Heading2 size={14} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                editor.isActive("heading", { level: 3 })
                  ? "bg-[#FF5500] text-black"
                  : "text-zinc-400 hover:text-white hover:bg-white/10"
              }`}
              title="Heading 3"
            >
              <Heading3 size={14} />
            </button>
          </div>

          {/* Text Styling */}
          <div className="flex items-center gap-0.5 border-r border-dashed border-white/15 pr-1.5 mr-1">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                editor.isActive("bold")
                  ? "bg-[#FF5500] text-black"
                  : "text-zinc-400 hover:text-white hover:bg-white/10"
              }`}
              title="Bold (Ctrl+B)"
            >
              <Bold size={14} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                editor.isActive("italic")
                  ? "bg-[#FF5500] text-black"
                  : "text-zinc-400 hover:text-white hover:bg-white/10"
              }`}
              title="Italic (Ctrl+I)"
            >
              <Italic size={14} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                editor.isActive("underline")
                  ? "bg-[#FF5500] text-black"
                  : "text-zinc-400 hover:text-white hover:bg-white/10"
              }`}
              title="Underline (Ctrl+U)"
            >
              <UnderlineIcon size={14} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                editor.isActive("strike")
                  ? "bg-[#FF5500] text-black"
                  : "text-zinc-400 hover:text-white hover:bg-white/10"
              }`}
              title="Strikethrough"
            >
              <Strikethrough size={14} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleCode().run()}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                editor.isActive("code")
                  ? "bg-[#A3E635] text-black font-bold"
                  : "text-zinc-400 hover:text-white hover:bg-white/10"
              }`}
              title="Inline Code"
            >
              <Code size={14} />
            </button>
          </div>

          {/* Lists & Quotes */}
          <div className="flex items-center gap-0.5 border-r border-dashed border-white/15 pr-1.5 mr-1">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                editor.isActive("bulletList")
                  ? "bg-[#FF5500] text-black"
                  : "text-zinc-400 hover:text-white hover:bg-white/10"
              }`}
              title="Bullet List"
            >
              <List size={14} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                editor.isActive("orderedList")
                  ? "bg-[#FF5500] text-black"
                  : "text-zinc-400 hover:text-white hover:bg-white/10"
              }`}
              title="Numbered List"
            >
              <ListOrdered size={14} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                editor.isActive("blockquote")
                  ? "bg-[#FF5500] text-black"
                  : "text-zinc-400 hover:text-white hover:bg-white/10"
              }`}
              title="Quote"
            >
              <Quote size={14} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                editor.isActive("codeBlock")
                  ? "bg-[#A3E635] text-black font-bold"
                  : "text-zinc-400 hover:text-white hover:bg-white/10"
              }`}
              title="Code Block"
            >
              <FileCode size={14} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
              className="p-1.5 rounded transition-colors cursor-pointer text-zinc-400 hover:text-white hover:bg-white/10"
              title="Horizontal Divider"
            >
              <Minus size={14} />
            </button>
          </div>

          {/* Links & Media */}
          <div className="flex items-center gap-0.5 border-r border-dashed border-white/15 pr-1.5 mr-1">
            <button
              type="button"
              onClick={handleSetLink}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                editor.isActive("link")
                  ? "bg-[#FF5500] text-black"
                  : "text-zinc-400 hover:text-white hover:bg-white/10"
              }`}
              title="Insert / Edit Link"
            >
              <Link2 size={14} />
            </button>
            {editor.isActive("link") && (
              <button
                type="button"
                onClick={() => editor.chain().focus().unsetLink().run()}
                className="p-1.5 rounded transition-colors cursor-pointer text-zinc-400 hover:text-white hover:bg-white/10"
                title="Remove Link"
              >
                <Unlink size={14} />
              </button>
            )}
            <button
              type="button"
              onClick={handleInsertImage}
              className="p-1.5 rounded transition-colors cursor-pointer text-zinc-400 hover:text-white hover:bg-white/10"
              title="Insert Image"
            >
              <ImageIcon size={14} />
            </button>
          </div>

          {/* Undo / Redo / Clear */}
          <div className="flex items-center gap-0.5">
            <button
              type="button"
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
              className="p-1.5 rounded transition-colors cursor-pointer text-zinc-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
              title="Undo (Ctrl+Z)"
            >
              <Undo size={14} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
              className="p-1.5 rounded transition-colors cursor-pointer text-zinc-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
              title="Redo (Ctrl+Y)"
            >
              <Redo size={14} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
              className="p-1.5 rounded transition-colors cursor-pointer text-zinc-400 hover:text-white hover:bg-white/10"
              title="Clear Formatting"
            >
              <RemoveFormatting size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Editor Body */}
      {mode === "visual" ? (
        <div className="cursor-text min-h-[380px] bg-[#0c0c12]/50">
          <EditorContent editor={editor} />
        </div>
      ) : (
        <div className="p-3 bg-black/70">
          <textarea
            rows={18}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full rounded-lg border border-dashed border-white/15 bg-[#09090e] p-4 font-mono text-xs leading-relaxed text-zinc-200 placeholder-zinc-600 focus:border-[#FF5500] focus:outline-none"
          />
        </div>
      )}

      {/* Footer Metrics */}
      <div className="border-t border-dashed border-white/15 bg-black/60 px-4 py-2 flex items-center justify-between font-mono text-[10px] text-zinc-500">
        <div className="flex items-center gap-3">
          <span>
            WORDS: <strong className="text-zinc-300">{wordCount}</strong>
          </span>
          <span>·</span>
          <span>
            CHARS: <strong className="text-zinc-300">{charCount}</strong>
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-zinc-600">
          <span className="h-1.5 w-1.5 bg-[#FF5500]"></span>
          <span>STYLED WITH STITCH BLUEPRINT</span>
        </div>
      </div>
    </div>
  );
}
