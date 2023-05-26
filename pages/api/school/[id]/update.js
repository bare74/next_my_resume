import { query as q } from "faunadb";
import { serverClient } from "../../../../utils/fauna-auth";

export default async (req, res) => {
  const {
    query: { id },
  } = req;

  const { schoolName, occupation, text, fromDate, toDate } = req.body;

  try {
    await serverClient.query(
      q.Update(q.Ref(q.Collection("mycvdata"), id), {
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
