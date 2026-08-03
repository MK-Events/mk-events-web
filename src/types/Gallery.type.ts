export interface GalleryImage {
  id: string;

  src: string;

  title: string;

  featured: boolean;

  eventSlug?: string;

  profile?: boolean;
}

export interface Asset {
  id: string;

  src: string;

  title: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface GalleryAssetsResponse {
  data: Asset[];
  pagination: Pagination;
}

export interface GetGalleryAssetsRequest {
  galleryId: string;
  page?: number;
  limit?: number;
}
