export class CreateProgramDto {
  title: string;
  description?: string;
  languagePrimary: string;
  languagesAvailable: string[];
  assets?: {
    language: string;
    variant: 'PORTRAIT' | 'LANDSCAPE' | 'SQUARE' | 'BANNER';
    assetType: 'POSTER';
    url: string;
  }[];
}
