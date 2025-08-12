import { IFileHandler } from "../IFileHandler";

export class JsonFileHandler implements IFileHandler {
  constructor(public readonly fileHierarchy: Record<string, string>) {}

  readonly ResolveInkFilename = (filename: string): string => {
    // Normalize the requested filename to use forward slashes
    const normalizedFilename = filename.replace(/\\/g, '/');
    
    // Check both normalized and original forms
    const keys = Object.keys(this.fileHierarchy);
    for (const key of keys) {
      const normalizedKey = key.replace(/\\/g, '/');
      if (normalizedKey === normalizedFilename || key === filename) {
        return key; // Return the original key as stored
      }
    }
    
    throw new Error(
      `Cannot locate ${filename}. Are you trying a relative import ? This is not yet implemented.`
    );
  };

  readonly LoadInkFileContents = (filename: string): string => {
    // Use the same normalization logic as ResolveInkFilename
    const normalizedFilename = filename.replace(/\\/g, '/');
    const keys = Object.keys(this.fileHierarchy);
    
    for (const key of keys) {
      const normalizedKey = key.replace(/\\/g, '/');
      if (normalizedKey === normalizedFilename || key === filename) {
        return this.fileHierarchy[key];
      }
    }
    
    throw new Error(`Cannot open ${filename}.`);
  };
}
