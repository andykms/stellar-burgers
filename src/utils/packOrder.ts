import { TIngredient } from './types';

export function packOrder(
  ingredients: TIngredient[],
  bun: TIngredient
): string[] {
  const ingredientIds: string[] = ingredients.map(
    (ingredient: TIngredient) => ingredient._id
  );
  ingredientIds.push(bun._id);
  ingredientIds.push(bun._id);
  return ingredientIds;
}
