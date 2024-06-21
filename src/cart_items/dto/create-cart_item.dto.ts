export class CreateCartItemDto {
  readonly cartId: number;
  readonly productId: number;
  readonly quantity: number;
  readonly totalPrice: number;
}
