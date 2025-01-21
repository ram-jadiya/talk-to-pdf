import { SearchInputIcon } from "./ui/icons";
import { IconInput } from "./ui/iconInput";
import { User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useState } from "react";
import { GetDocumentParams } from "@/types/doc";
import { useGetDocuments } from "@/hooks/use-getDocs";
import { useDebounce } from "@/hooks/use-debounce";
import { LogOutModal } from "./ui/logoutModal";
import { useSelector } from "react-redux";
import { selectUser } from "../store/slices/authSlice";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // 500ms debounce delay
  const user = useSelector(selectUser);

  const params: GetDocumentParams = {
    limit: 10,
    skip: 0,
    search: debouncedSearchTerm, // Assuming the search term is used to filter documents by title
  };

  const {} = useGetDocuments(params);

  return (
    <header className="bg-white/8 border-b border-white/10">
      <div className="px-5 py-[17px] flex justify-between items-center">
        <div>
          <IconInput
            className="w-[370px]"
            preIcon={true}
            Icon={SearchInputIcon}
            placeholder="Search your PDF"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative">
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none bg-gray-200/10 rounded-full p-2 h-10 w-10">
              {!user?.avatar ? (
                <User />
              ) : (
                <img
                  src={user.avatar}
                  alt="user"
                  className="rounded-full h-full w-full"
                />
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 rounded-[20px] absolute top-[40px] -right-5">
              <DropdownMenuItem className="cursor-pointer w-full">
                <LogOutModal>
                  <div className="w-full">Logout</div>
                </LogOutModal>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
