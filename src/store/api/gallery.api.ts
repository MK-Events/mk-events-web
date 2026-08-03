// store/api/gallery.api.ts
import type { Asset, GalleryAssetsResponse, GetGalleryAssetsRequest } from '@mk/types';

import { baseApi } from './base.api';

export const galleryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAsset: builder.query<Asset, string>({
      query: (id) => `/gallery/assets/${id}`,

      providesTags: (_result, _error, id) => [
        {
          type: 'Asset',
          id,
        },
      ],
    }),

    getAssetsByIds: builder.query<Asset[], string[]>({
      query: (ids) => ({
        url: 'gallery/assets/batch',
        method: 'POST',
        body: {
          ids,
        },
      }),

      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'Asset' as const,
                id,
              })),
              { type: 'Asset', id: 'LIST' },
            ]
          : [{ type: 'Asset', id: 'LIST' }],
    }),

    getGalleryAssets: builder.query<GalleryAssetsResponse, GetGalleryAssetsRequest>({
      query: ({ galleryId, page = 1, limit = 24 }) => ({
        url: `/gallery/${galleryId}/assets`,
        params: {
          page,
          limit,
        },
      }),

      providesTags: (result, error, { galleryId }) => [
        { type: 'Gallery', id: galleryId },
        { type: 'GalleryAssets', id: galleryId },
      ],
    }),
  }),
});

export const { useGetAssetQuery, useGetAssetsByIdsQuery, useGetGalleryAssetsQuery } = galleryApi;
