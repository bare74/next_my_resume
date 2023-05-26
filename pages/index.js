import Link from "next/link";
import useSWR from "swr";
import Layout from "../components/layout";
import DataRow from "../components/data-row";
import { useState } from "react";

const fetcher = (url) => fetch(url).then((r) => r.json());

const Home = () => {
  const { data: schoolData, error: schoolError } = useSWR(
    "/api/school",
    fetcher
  );
  const { data: workData, error: workError } = useSWR("/api/work", fetcher);

  if (schoolError || workError) {
    return <div>failed to load</div>;
  }

  const [isLinkVisible, setIsLinkVisible] = useState(true);

  const handleToggleLink = () => {
    setIsLinkVisible(!isLinkVisible);
  };

  return (
    <Layout>
      <h1>MY RESUME</h1>
      <div>
        {isLinkVisible && (
          <Link href="/school/create">
            <a className="createNew">Create New School</a>
          </Link>
        )}

        <button onClick={handleToggleLink}>
          {isLinkVisible ? "Hide Link" : "Show Link"}
        </button>
      </div>
      <div className="table">
        <div className="headerRow">
          <h4>School name</h4>
          <h4>Occupation</h4>
          {isLinkVisible ? <h4>Text</h4> : <></>}
          <h4>From date</h4>
          <h4>To date</h4>
        </div>
        {schoolData ? (
          schoolData.map((d) => (
            <DataRow
              key={d.ref["@ref"].id}
              id={d.ref["@ref"].id}
              schoolName={d.data.schoolName}
              occupation={d.data.occupation}
              text={d.data.text}
              fromDate={new Date(d.data.fromDate).toLocaleDateString("nb-NO")}
              toDate={new Date(d.data.toDate).toLocaleDateString("nb-NO")}
              isLinkVisible={isLinkVisible}
            />
          ))
        ) : (
          <>
            <DataRow loading />
            <DataRow loading />
            <DataRow loading />
          </>
        )}
      </div>
      {isLinkVisible && (
        <Link href="/work/create">
          <a className="createNew">Create New Work</a>
        </Link>
      )}
      <div className="table">
        <div className="headerRow">
          <h4>Work Place</h4>
          <h4>Title</h4>
          {isLinkVisible ? <h4>Text</h4> : <></>}
          <h4>From date</h4>
          <h4>To date</h4>
        </div>
        {workData ? (
          workData.map((d) => (
            <DataRow
              key={d.ref["@ref"].id}
              id={d.ref["@ref"].id}
              workPlace={d.data.workPlace}
              title={d.data.title}
              text={d.data.text}
              fromDate={new Date(d.data.fromDate).toLocaleDateString("nb-NO")}
              toDate={new Date(d.data.toDate).toLocaleDateString("nb-NO")}
              isLinkVisible={isLinkVisible}
            />
          ))
        ) : (
          <>
            <DataRow loading />
            <DataRow loading />
            <DataRow loading />
          </>
        )}
      </div>

      <style jsx>{`
        h2 {
          font-size: 16px;
          font-weight: 600;
          margin: 0;
          padding: 0 32px;
        }
        h4 {
          color: #555;
          font-size: 12px;
          font-weight: 400;
          text-transform: uppercase;
        }
        .createNew {
          display: inline-block;
          background-color: #0070f3;
          border-radius: 3px;
          color: #fff;
          padding: 0.5rem 1rem;
          margin-bottom: 1rem;
        }

        .createNew:hover {
          text-decoration: none;
        }

        .table {
          border: 1px solid #eaeaea;
          border-radius: 4px;
          min-width: 512px;
          padding-top: 24px;
        }

        .headerRow {
          display: grid;
          grid-auto-flow: column;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          padding: 0 32px;
        }
      `}</style>
    </Layout>
  );
};

export default Home;
