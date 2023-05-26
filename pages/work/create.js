import { useState } from "react";
import Router from "next/router";
import { useForm } from "react-hook-form";
import Layout from "../../components/layout";

const Create = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (formData) => {
    if (errorMessage) setErrorMessage("");

    try {
      const res = await fetch("/api/work/create", {
        method: "POST",
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
    <Layout>
      <h1>Create Work</h1>

      <form onSubmit={onSubmit}>
        <div>
          <label>Work Place</label>
          <input
            type="text"
            placeholder=" "
            {...register("workPlace", {
              required: "workPlace is required",
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

        <div>
          <label>From Date</label>
          <input type="text" placeholder=" " {...register("fromDate")} />
          {errors.fromDate && (
            <span role="alert" className="error">
              {errors.fromDate.message}
            </span>
          )}
        </div>
        <div>
          <label>To Date</label>
          <input type="text" placeholder=" " {...register("toDate")} />
          {errors.toDate && (
            <span role="alert" className="error">
              {errors.toDate.message}
            </span>
          )}
        </div>

        <div className="submit">
          <button type="submit" className="submitButton">
            Create
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
    </Layout>
  );
};

export default Create;
