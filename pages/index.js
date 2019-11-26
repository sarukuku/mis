import React from "react";
import Head from "next/head";
import fetch from "isomorphic-unfetch";

const addReporter = async () => {
  const reporterId = await fetch("/api/create/reporter", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ reporter: "New Location" })
  });
  return reporterId;
};

const addMonth = async reporterId => {
  const months = await fetch("/api/update/reporter", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      reporter: {
        _id: reporterId,
        months: [{ name: "January" }]
      }
    })
  });
};

const Home = ({ reporters }) => (
  <div>
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <button onClick={addReporter}>Add new location</button>
    <br></br>
    <ul>
      {reporters.map((reporter, index) => {
        return (
          <li key={index}>
            {JSON.stringify(reporter)}
            <button
              onClick={() => {
                addMonth(reporter._id);
              }}
            >
              Add new month
            </button>
          </li>
        );
      })}
    </ul>

    <style jsx>{``}</style>
  </div>
);

Home.getInitialProps = async () => {
  const response = await fetch("http://localhost:3000/api/get/reporters");
  const reporters = await response.json();
  return { reporters };
};

export default Home;
