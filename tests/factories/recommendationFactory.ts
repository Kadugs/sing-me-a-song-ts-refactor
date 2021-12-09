import faker from "faker";
import connection from "../../src/database";
import Recommendation from "../../src/protocols/Recommendation";

export async function createRecommendation(
  score: number = 0
): Promise<Recommendation> {
  const youtubeLink = `https://www.youtube.com/watch?v=${faker.random.alphaNumeric(
    11
  )}`;
  const result = await connection.query(
    `
    INSERT INTO recommendations
    (id, name, "youtubeLink", score)
    VALUES
    ($1, $2, $3)
    RETURNING *
  `,
    [faker.name.findName(), youtubeLink, score]
  );
  return result.rows[0];
}
