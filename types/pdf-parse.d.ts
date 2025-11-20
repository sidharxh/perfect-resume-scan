declare module "pdf-parse" {
  import { Buffer } from "buffer";

  export interface PDFParseResult {
    numpages?: number;
    numrender?: number;
    info?: any;
    metadata?: any;
    text?: string;
    version?: string;
  }

  function pdfParse(
    data: Buffer | Uint8Array | ArrayBuffer | string | { [key: string]: any }
  ): Promise<PDFParseResult>;

  export default pdfParse;
}
