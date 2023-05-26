import { query as q } from "faunadb";
import { serverClient } from "../../../utils/fauna-auth";

export default async (req, res) => {
  const { schoolName, occupation, text, fromDate, toDate } = req.body;

  try {
    await serverClient.query(
      q.Create(q.Collection("mycvdata"), {
        data: {
          schoolName,
          occupation,
          text,
          fromDate,
          toDate,
        },
      })
    );
    res.status(200).end();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
