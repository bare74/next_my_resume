import Link from "next/link";

const DataRow = ({
  id,
  schoolName,
  workPlace,
  title,
  occupation,
  text,
  fromDate,
  toDate,
  loading,
  isLinkVisible,
}) => {
  const gridTemplateColumnsValue = isLinkVisible
    ? "1fr 1fr 1fr 1fr 1fr"
    : "1fr 1fr 1fr 1fr 1fr";

  return (
    <div className="dataRow">
      <p className={loading ? "loading" : ""}>
        {isLinkVisible ? (
          <Link href={`/school/${id}`}>
            <a>{schoolName}</a>
          </Link>
        ) : (
          <span>{schoolName}</span>
        )}
        {isLinkVisible ? (
          <Link href={`/work/${id}`}>
            <a>{workPlace}</a>
          </Link>
        ) : (
          <span>{workPlace}</span>
        )}
      </p>
      <p className={`num ${loading ? "loading" : ""}`}>{occupation}</p>
      <p className={`num ${loading ? "loading" : ""}`}>{title}</p>
      {isLinkVisible ? (
        <p className={`num ${loading ? "loading" : ""}`}>{text}</p>
      ) : (
        <></>
      )}
      <p className={`num ${loading ? "loading" : ""}`}>{fromDate}</p>
      <p className={`num ${loading ? "loading" : ""}`}>{toDate}</p>

      <style jsx>{`
        .dataRow {
          display: grid;
          grid-auto-flow: column;
          grid-template-columns: ${gridTemplateColumnsValue};
          padding: 0 32px;
          border-top: 1px solid #eaeaea;
        }

        @keyframes Loading {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .loading {
          animation: Loading 2s ease infinite;
          background: linear-gradient(270deg, #d1d1d1, #eaeaea);
          background-size: 200% 200%;
          height: 16px;
          width: 80%;
        }
        .num {
          font-family: Roboto, "Open Sans";
        }
      `}</style>
    </div>
  );
};

export default DataRow;

// import Link from "next/link";

// const DataRow = ({
//   id,
//   schoolName,
//   occupation,
//   text,
//   fromDate,
//   toDate,
//   loading,
// }) => {
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const formattedDate = date.toLocaleDateString("no-NO", {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//     });
//     return formattedDate;
//   };

//   const formattedFromDate = formatDate(fromDate);
//   const formattedToDate = formatDate(toDate);

//   return (
//     <div className="dataRow">
//       <p className={loading ? "loading" : ""}>
//         <Link href={`/school/${id}`}>
//           <a>{schoolName}</a>
//         </Link>
//       </p>
//       <p className={`num ${loading ? "loading" : ""}`}>{occupation}</p>
//       <p className={`num ${loading ? "loading" : ""}`}>{text}</p>
//       <p className={`num ${loading ? "loading" : ""}`}>{formattedFromDate}</p>
//       <p className={`num ${loading ? "loading" : ""}`}>{formattedToDate}</p>

//       <style jsx>{`
//         .dataRow {
//           display: grid;
//           grid-auto-flow: column;
//           grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
//           padding: 0 32px;
//           border-top: 1px solid #eaeaea;
//         }

//         @keyframes Loading {
//           0% {
//             background-position: 0% 50%;
//           }
//           50% {
//             background-position: 100% 50%;
//           }
//           100% {
//             background-position: 0% 50%;
//           }
//         }
//         .loading {
//           animation: Loading 2s ease infinite;
//           background: linear-gradient(270deg, #d1d1d1, #eaeaea);
//           background-size: 200% 200%;
//           height: 16px;
//           width: 80%;
//         }
//         .num {
//           font-family: Roboto, "Open Sans";
//         }
//       `}</style>
//     </div>
//   );
// };

// export default DataRow;
