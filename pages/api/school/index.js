import { query as q } from "faunadb";
import { serverClient } from "../../../utils/fauna-auth";

export default async (req, res) => {
  try {
    const school = await serverClient.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection("mycvdata"))),
        q.Lambda("doc", q.Get(q.Var("doc")))
      )
    );
    res.status(200).json(school.data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
