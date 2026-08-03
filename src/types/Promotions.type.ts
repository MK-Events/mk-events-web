export type DiscountType = 'Percentage' | 'FixedAmount';

export interface PromoCode {
  id: string;
  eventId: string;

  code: string;

  discountType: DiscountType;
  value: number;

  maxUses: number;
  usedCount: number;

  minimumOrderAmount?: number;
  maximumDiscount?: number;

  startsAt?: Date;
  expiresAt?: Date;
}
