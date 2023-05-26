// import { useRouter } from "next/router";
// import useSWR from "swr";
// import Layout from "../../../components/layout";
// import EditForm from "../../../components/edit-form";

// const fetcher = (url) => fetch(url).then((r) => r.json());

// const Update = () => {
//   const router = useRouter();
//   const { id } = router.query;

//   const { data, error } = useSWR(`/api/work/${id}`, fetcher);

//   if (error) return <div>failed to load</div>;

//   return (
//     <Layout>
//       {data ? <EditForm workPlace={data} id={id} /> : <div>loading...</div>}
//     </Layout>
//   );
// };

// export default Update;
import { useRouter } from "next/router";
import useSWR from "swr";
import Layout from "../../../components/layout";
import EditForm from "../../../components/edit-form";

const fetcher = (url) => fetch(url).then((r) => r.json());

const Update = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(`/api/work/${id}`, fetcher);

  if (error) return <div>Failed to load</div>;

  return (
    <Layout>
      {data ? (
        <EditForm data={data} id={id} apiEndpoint="work" />
      ) : (
        <div>Loading...</div>
      )}
    </Layout>
  );
};

export default Update;
