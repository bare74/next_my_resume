import { query as q } from "faunadb";
import { serverClient } from "../../../utils/fauna-auth";

export default async (req, res) => {
  const { workPlace, title, text, fromDate, toDate } = req.body;

  try {
    await serverClient.query(
      q.Create(q.Collection("mycvjob"), {
        data: {
          workPlace,
          title,
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
