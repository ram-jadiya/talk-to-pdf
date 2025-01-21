import { Document } from "@/types/doc";

type Props = {
  doc: Document;
};

const PdfSection = ({ doc }: Props) => {
  return (
    <div className="w-[50%] p-5 bg- white/10 h-full">
      <div className="flex justify-between">
        <div className="text-2xl leading-[34px]">{doc.title}</div>
        <div className="leading-[26px] flex gap-[5px]">
          <div className="h-[26px] w-[31px] bg-white/5 rounded-md text-center">
            Pages
          </div>
          <div>:</div>
          <div>{doc.pages}</div>
        </div>
      </div>
      <div className="pt-5 w-full">
        <iframe
          className="h-[calc(100vh-181px)] w-full overflow-hidden"
          src={doc.pdfS3Key + "#toolbar=0"}
        />
      </div>
    </div>
  );
};

export default PdfSection;
