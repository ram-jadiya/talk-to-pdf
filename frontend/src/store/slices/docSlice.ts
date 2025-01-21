import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Document, Documents } from "@/types/doc";
import { RootState } from "..";

interface DocumentState {
  documents: Documents;
}

const initialState: DocumentState = {
  documents: [],
};

const docSlice = createSlice({
  name: "document",
  initialState,
  reducers: {
    setDocs: (state, action: PayloadAction<{ documents: Documents }>) => {
      state.documents = action.payload.documents;
    },
    renameDoc: (
      state,
      action: PayloadAction<{ id: number; title: string }>
    ) => {
      const { id, title } = action.payload;
      const document = state.documents.find((doc) => doc.id === id);
      if (document) {
        document.title = title;
      }
    },
    removeDoc: (state, action: PayloadAction<{ id: number }>) => {
      state.documents = state.documents.filter(
        (doc) => doc.id !== action.payload.id
      );
    },
    addDoc: (state, action: PayloadAction<{ document: Document }>) => {
      state.documents.unshift(action.payload.document);
    },
  },
});

export const authSliceName = docSlice.name;
export const { setDocs, renameDoc, removeDoc, addDoc } = docSlice.actions;
export default docSlice.reducer;

export const getDocs = (state: RootState) => state.document.documents;
