import { query as q } from "faunadb";
import { serverClient } from "../../../utils/fauna-auth";

export default async (req, res) => {
  try {
    const work = await serverClient.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection("mycvjob"))),
        q.Lambda("doc", q.Get(q.Var("doc")))
      )
    );
    res.status(200).json(work.data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
