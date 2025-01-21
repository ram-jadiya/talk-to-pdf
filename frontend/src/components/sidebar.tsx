"use client";

import {
  AddIcon,
  DustbinIcon,
  LogoIcon,
  OptionIcon,
  PdfIcon,
  RenameIcon,
  UpgradeIcon,
} from "./ui/icons";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { DeletePdf } from "./ui/deleteModel";
import { RenameModal } from "./ui/renameModal";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getDocs } from "@/store/slices/docSlice";
import { usePostDocument } from "../hooks/use-postDoc";
import { Loader2 } from "lucide-react";
import { ChangeEvent } from "react";
import { selectUser } from "../store/slices/authSlice";

const Sidebar = () => {
  const docList = useSelector(getDocs);
  const user = useSelector(selectUser);
  const { mutate: uploadDoc, isPending } = usePostDocument();

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFile(event.target.files);
  };

  const handleFile = (files: FileList | null) => {
    if (files && files.length > 0) {
      const uploadedFile = files[0];
      uploadDoc(uploadedFile);
    }
  };

  return (
    <div className="h-screen flex flex-col max-w-[300px]">
      <Link to="/">
        <div className="bg-white/8 pl-5 pr-[130px] py-[23px] flex items-center gap-[10px] border-r border-b border-white/10">
          <div>
            <LogoIcon className="h-[34px] w-[34px]" />
          </div>
          <div className="font-medium text-2xl leading-[34px]">TalkToPDF</div>
        </div>
      </Link>
      <div className="p-5 border-r border-b border-white/10 relative">
        <input
          type="file"
          onChange={handleFileInputChange}
          className="absolute inset-0 opacity-0 z-10 cursor-pointer"
        />
        <Button variant={"ghost"} className="w-full font-normal leading-[26px]">
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            <AddIcon className="w-5 h-5" />
          )}
          Add new PDF
        </Button>
      </div>
      <div className="py-5 border-r border-white/10">
        {docList.map((it, idx) => {
          return (
            <div
              key={idx}
              className="flex justify-between w-full px-5 py-[13px]"
            >
              <Link to={`/chatWithPdf/${it.id}`}>
                <div className="flex gap-2.5 cursor-pointer ">
                  <PdfIcon /> <div className="truncate w-52">{it.title}</div>
                </div>
              </Link>
              <div className="relative">
                <DropdownMenu>
                  <DropdownMenuTrigger className="focus:outline-none">
                    <div className="px-1">
                      <OptionIcon />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-[#2B2B2B] p-5 rounded-[20px] space-y-5 text-grey absolute top-3 -left-2 z-10">
                    <DropdownMenuItem className="cursor-pointer  hover:outline-none">
                      <RenameModal id={it.id} title={it.title}>
                        <div className="flex gap-[10px] hover:text-white">
                          <RenameIcon className="h-5 w-5" />
                          <span>Rename</span>
                        </div>
                      </RenameModal>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer hover:outline-none hover:text-white">
                      <DeletePdf docId={it.id}>
                        <div className="flex gap-[10px]">
                          <DustbinIcon className="h-5 w-5" />
                          <span>Delete</span>
                        </div>
                      </DeletePdf>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex-1 p-5 border-r border-white/10 flex flex-col justify-end">
        {!user?.isPremium && (
          <div className="p-5 text-center border border-[#E88E271A]/10 rounded-[20px]">
            <div className="font-medium text-2xl leading-[34px]">
              Become Pro Access
            </div>
            <div className="text-grey leading-6 pt-[5px]">
              Try your experience using more features
            </div>
            <div className="pt-5">
              <Link to={"/pricing"}>
                <Button className="w-full leading-[26px]">
                  <UpgradeIcon className="w-5 h-5" /> UPGRADE PRO
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
