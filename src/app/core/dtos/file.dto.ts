export interface FileDTO {
  path?: string;
  refId?: string;
  ref?: string;
  field?: string;
  files: Blob[];
}
