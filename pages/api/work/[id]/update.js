import { query as q } from "faunadb";
import { serverClient } from "../../../../utils/fauna-auth";

export default async (req, res) => {
  const {
    query: { id },
  } = req;

  const { workPlace, title, text, fromDate, toDate } = req.body;

  try {
    await serverClient.query(
      q.Update(q.Ref(q.Collection("mycvjob"), id), {
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
