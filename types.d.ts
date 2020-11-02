type draftsExportType = [
  {
    languageGrammar: string;
    created_at: string;
    tags: string[];
    flagged: boolean;
    content: string;
    created_longitude: number;
    created_latitude: number;
    folder: number;
    accessed_at: string;
    modified_at: string;
    modified_latitude: number;
    modified_longitude: number;
    uuid: string;
  }
];

type roamChildrenType = {
  string: string;
  "create-email"?: string;
  uid?: string;
  "create-time"?: number;
  "edit-time"?: number;
  "edit-email"?: string;
};

type roamImportType = {
  title: string;
  children: roamChildrenType[];
  "create-email"?: string;
  uid?: string;
  "create-time"?: number;
  "edit-time"?: number;
  "edit-email"?: string;
};

declare module "drafts-export.json" {
  const value: draftsExportType;
  export default value;
}
