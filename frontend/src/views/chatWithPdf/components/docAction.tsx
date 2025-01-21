import { DeletePdf } from "@/components/ui/deleteModel";
import { DeleteIcon, RenameIcon } from "@/components/ui/icons";
import { RenameModal } from "@/components/ui/renameModal";
import { Document } from "@/types/doc";

type Props = {
  doc: Document;
};

const DocumentAction = ({ doc }: Props) => {
  return (
    <div className="flex justify-between py-5 border-b border-white/10">
      <div className="text-2xl leading-[34px]">Let’s Talk </div>
      <div className="flex gap-[15px]">
        <RenameModal id={doc.id} title={doc.title}>
          <RenameIcon className="h-5 w-5" />
        </RenameModal>
        <DeletePdf docId={doc.id}>
          <DeleteIcon className="h-5 w-5" />
        </DeletePdf>
      </div>
    </div>
  );
};

export default DocumentAction;
