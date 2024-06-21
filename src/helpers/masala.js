export function calculateAverageStars(ratings) {

  if (!ratings || !ratings.length) {
    return null; // Handle no ratings case
  }

  const totalStars = ratings.reduce((acc, rating) => acc + rating, 0);
  const averageStarRating = totalStars / ratings.length;

  return averageStarRating;
}
// // Example usage:
// const starRatings = [5, 4, 3, 2, 5];
// const averageStars = calculateAverageStars(starRatings);
// console.log(averageStars); // Output: 3.8
