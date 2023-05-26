import { useState } from "react";
import Router from "next/router";
import { useForm } from "react-hook-form";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

const EditForm = ({ workPlace, id }) => {
  const [errorMessage, setErrorMessage] = useState("");
  //   const [toDate, setToDate] = useState(null);
  //   const [fromDate, setFromDate] = useState(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    workPlace: {
      ...workPlace,
      workPlace: workPlace.workPlace,
    },
  });

  const onSubmit = handleSubmit(async (formData) => {
    if (errorMessage) setErrorMessage("");

    try {
      const res = await fetch(`/api/work/${id}/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (res.status === 200) {
        Router.push("/");
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  });

  return (
    <>
      <h1>Edit Work</h1>

      <form onSubmit={onSubmit}>
        <div>
          <label>Work Place</label>
          <input
            type="text"
            placeholder="e.g. John"
            {...register("workPlace", {
              required: "Work Place is required",
            })}
          />
          {errors.workPlace && (
            <span role="alert" className="error">
              {errors.workPlace.message}
            </span>
          )}
        </div>

        <div>
          <label>Title</label>
          <input
            type="text"
            placeholder=" "
            {...register("title", { required: "title is required" })}
          />
          {errors.title && (
            <span role="alert" className="error">
              {errors.title.message}
            </span>
          )}
        </div>

        <div>
          <label>Text</label>
          <input type="text" placeholder=" " {...register("text")} />
          {errors.text && (
            <span role="alert" className="error">
              {errors.text.message}
            </span>
          )}
        </div>
        {/* <div>
          <label>From Date</label>
          <DatePicker
            selected={fromDate}
            {...register("fromDate")}
            onChange={(date) => setFromDate(date)}
            placeholderText=" "
            dateFormat="yyyy-MM-dd"
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />
          {errors.fromDate && (
            <span role="alert" className="error">
              {errors.fromDate.message}
            </span>
          )}
        </div>

        <div>
          <label>To Date</label>
          <DatePicker
            selected={toDate}
            {...register("toDate")}
            onChange={(date) => setToDate(date)}
            placeholderText=" "
            dateFormat="yyyy-MM-dd"
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />
          {errors.toDate && (
            <span role="alert" className="error">
              {errors.toDate.message}
            </span>
          )}
        </div> */}
        <div>
          <label>From Date</label>
          <input
            type="date"
            placeholder=" "
            {...register("fromDate", { required: "From Date is required" })}
          />
          {errors.fromDate && (
            <span role="alert" className="error">
              {errors.fromDate.message}
            </span>
          )}
        </div>

        <div>
          <label>To Date</label>
          <input
            type="date"
            placeholder=" "
            {...register("toDate", { required: "To Date is required" })}
          />
          {errors.toDate && (
            <span role="alert" className="error">
              {errors.toDate.message}
            </span>
          )}
        </div>

        <div className="submit">
          <button type="submit" className="submitButton">
            Update
          </button>
        </div>
      </form>

      {errorMessage && (
        <p role="alert" className="errorMessage">
          {errorMessage}
        </p>
      )}

      <style jsx>{`
        form {
          background-color: #eee;
          border-radius: 4px;
          padding: 2rem;
        }
        label {
          font-size: 0.9rem;
          font-weight: 600;
        }
        input {
          width: 100%;
          border: 1px solid #ccc;
          border-radius: 4px;
          padding: 0.75rem;
          margin: 0.25rem 0 1rem;
        }
        .submit {
          margin-top: 1rem;
          text-align: right;
        }
        .submitButton {
          background-color: #0070f3;
          border: none;
          border-radius: 4px;
          color: #fff;
          font-size: 1rem;
          padding: 0.5rem 1rem;
          cursor: pointer;
        }
        .error,
        .errorMessage {
          color: #d32f2f;
        }
        .error {
          display: block;
          margin-bottom: 1rem;
        }
      `}</style>
    </>
  );
};

export default EditForm;
