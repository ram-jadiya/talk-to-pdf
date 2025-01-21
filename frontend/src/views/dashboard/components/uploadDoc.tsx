import { useState, DragEvent, ChangeEvent, FC } from "react";
import { BookIcon, UploadIcon } from "../../../components/ui/icons";
import { Button } from "../../../components/ui/button";
import { z } from "zod";
import { usePostDocument } from "../../../hooks/use-postDoc";
import { Loader2 } from "lucide-react";

// Define the Zod schema for file validation
const fileSchema = z.object({
  type: z.string().refine((val) => val === "application/pdf", {
    message: "Only PDF files are allowed.",
  }),
  size: z.number().max(5 * 1024 * 1024, {
    message: "File size exceeds 5 MB.",
  }),
});

const UploadDoc: FC = () => {
  const { mutate: uploadDoc, isPending } = usePostDocument();
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleDragOver = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (): void => setIsDragging(false);

  const handleDrop = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    setIsDragging(false);
    handleFile(event.dataTransfer.files);
  };

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFile(event.target.files);
  };

  const handleFile = (files: FileList | null) => {
    if (files && files.length > 0) {
      const uploadedFile = files[0];
      const validationResult = fileSchema.safeParse(uploadedFile);

      if (!validationResult.success) {
        setErrorMessage(validationResult.error.errors[0].message);
        return;
      }

      setFileName(uploadedFile.name);
      setErrorMessage(null);
      uploadDoc(uploadedFile);
    }
  };

  return (
    <>
      {/* Drag-and-Drop Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border rounded-[20px] border-dashed bg-white/5 text-center relative cursor-pointer ${
          isDragging ? "border-blue-500" : ""
        }`}
      >
        <input
          type="file"
          onChange={handleFileInputChange}
          className="absolute inset-0 opacity-0 z-10 cursor-pointer"
          accept=".pdf"
          disabled={isPending}
        />
        <div className="pt-[70px] flex justify-center">
          <BookIcon className="w-[60px] h-[60px]" />
        </div>
        <div className="pt-[30px] text-2xl leading-[34px]">
          {fileName
            ? fileName
            : isDragging
            ? "Drop the PDF here..."
            : "Click to upload, or drag PDF here"}
        </div>
        {errorMessage && <p className="mt-2 text-red-600">{errorMessage}</p>}
        <div className="pt-[30px] pb-[70px]">
          <Button className="w-[260px] text-normal">
            {isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              <UploadIcon className="w-5 h-5" />
            )}
            UPLOAD PDF
          </Button>
        </div>
      </div>
    </>
  );
};

export default UploadDoc;
