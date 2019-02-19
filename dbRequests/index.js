export const getItems = async () => db.all(`SELECT * FROM Item`);

export const getItem = async id =>
  db.get(`
SELECT * FROM Item
WHERE id = ${id}
`);

export const incrementNumberOfStarsForComment = id =>
  db.run(
    `UPDATE Comment SET numberOfStars = numberOfStars + 1 WHERE id = ${id}`
  );

export const getTopCommentsForItem = async (itemId, numberOfTopComments) =>
  db.all(`
SELECT * FROM Comment
WHERE itemId = ${itemId}
ORDER BY numberOfStars DESC
LIMIT ${numberOfTopComments}
`);

export const addStarToComment = async id => {
  await db.run(
    `UPDATE Comment SET numberOfStars = numberOfStars + 1 WHERE id = ${id}`
  );
  return db.get(`SELECT * FROM Comment WHERE id = ${id}`);
};
