import React from 'react';
import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import './index.scss';

const addReporter = async () => {
  const reporterId = await fetch('/api/create/reporter', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ reporter: 'New Location' })
  });
  return reporterId;
};

const addMonth = async reporterId => {
  const months = await fetch('/api/update/reporter', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      reporter: {
        _id: reporterId,
        months: [{ name: 'January' }]
      }
    })
  });
};

const Home = ({ reporters }) => (
  <div>
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="stylesheet" href="index.css" />
    </Head>

    <button onClick={addReporter}>Add new location</button>
    <br></br>
    <div className="locations">
      {reporters
        .filter(l => l.reporter)
        .map((location, index) => {
          const office = (
            <div className="location" key={index}>
              <h2>{location.reporter}</h2>
              <div className="months">
                {location.months.map(month => {
                  return (
                    <div className="month" key={month.name}>
                      <h3>{month.name}</h3>
                      {month.topics.map(topic => {
                        return (
                          <div className="topic" key={topic}>
                            <h4>{topic.name}</h4>
                            <ul>
                              {topic.notes.map(note => {
                                return <li key={note}>{note}</li>;
                              })}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
                <button
                  onClick={() => {
                    addMonth(location._id);
                  }}
                >
                  Add new month
                </button>
              </div>
            </div>
          );
          return office;
        })}
    </div>
    <style jsx>{``}</style>
  </div>
);

Home.getInitialProps = async () => {
  const response = await fetch(`http://localhost:3000/api/get/reporters`);
  const reporters = await response.json();
  return { reporters };
};

export default Home;
