import { useParams } from "react-router-dom";
import { getDocs } from "@/store/slices/docSlice";
import { useSelector } from "react-redux";
import PdfSection from "./components/pdfSection";
import ChatSection from "./components/chatSection";

const ChatWithPdf = () => {
  const { pdfId } = useParams<{ pdfId: string }>();
  const docs = useSelector(getDocs);
  const doc = docs.find((it) => it.id === parseInt(pdfId!));

  if (!doc) return <div>Document not found</div>;
  return (
    <div className="flex h-full gap-[5px]">
      {/* pdf render section */}
      <PdfSection doc={doc} />
      {/* question answer section */}
      <ChatSection doc={doc} />
    </div>
  );
};

export default ChatWithPdf;
