export type PexelsPhotoType = {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  alt: string | null;
};

export interface PexelsSearchResponse {
  data: {
    photos: PexelsPhotoType[];
    total_results: number;
    page: number;
    per_page: number;
  };
}
