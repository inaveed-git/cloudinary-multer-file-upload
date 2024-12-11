export interface Tbook {
    bookName: string;
    author: string;
    coverImage?: string;
    file?: string;
  }
  
  export interface Tcloudinary {
    resource_type?: "auto" | "image" | "video" | "raw"; // Optional with validation
    localPath: string;
    fileName: string;
    folder: string;
    format: string | undefined;
  }
  