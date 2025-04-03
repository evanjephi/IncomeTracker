declare module 'expo-print' {
  export interface PrintOptions {
    html: string;
    width?: number;
    height?: number;
    base64?: boolean;
  }

  export interface PrintResult {
    uri: string;
    base64?: string;
  }

  export function printAsync(options: PrintOptions): Promise<void>;
  export function printToFileAsync(options: PrintOptions): Promise<PrintResult>;
}
