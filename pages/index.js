import React from 'react';
import Head from 'next/head';
import fetch from 'isomorphic-unfetch';

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
    </Head>

    <button onClick={addReporter}>Add new location</button>
    <br></br>
    <div className="locations">
      {reporters
        .filter(l => l.reporter)
        .map((location, index) => {
          console.log(location);
          const office = (
            <div className="location" key={index}>
              <h2>{location.reporter}</h2>
              <div className="months">
                {location.months.map(month => {
                  return (
                    <div className="month">
                      <h3>June</h3>
                      <div className="topic">
                        <h4>Recruitment</h4>
                        <ul>
                          <li>Cupcake cake pudding tootsie roll</li>
                          <li>
                            Pudding candy gingerbread. Bear claw candy candy
                            fruitcake carrot cake fruitcake.
                          </li>
                          <li>
                            Gummi bears croissant powder jelly beans tart sugar
                            plum pie bonbon. Candy marshmallow gummi bears cake
                            tart tart. Fruitcake chupa chups pastry biscuit
                            wafer danish biscuit topping macaroon.
                          </li>
                          <li>Cupcake cake pudding tootsie roll</li>
                          <li>
                            Pudding candy gingerbread. Bear claw candy candy
                            fruitcake carrot cake fruitcake.
                          </li>
                          <li>
                            Gummi bears croissant powder jelly beans tart sugar
                            plum pie bonbon. Candy marshmallow gummi bears cake
                            tart tart. Fruitcake chupa chups pastry biscuit
                            wafer danish biscuit topping macaroon.
                          </li>
                          <li>Cupcake cake pudding tootsie roll</li>
                          <li>
                            Pudding candy gingerbread. Bear claw candy candy
                            fruitcake carrot cake fruitcake.
                          </li>
                          <li>
                            Gummi bears croissant powder jelly beans tart sugar
                            plum pie bonbon. Candy marshmallow gummi bears cake
                            tart tart. Fruitcake chupa chups pastry biscuit
                            wafer danish biscuit topping macaroon.
                          </li>
                        </ul>
                      </div>
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
  const response = await fetch('http://localhost:3000/api/get/reporters');
  const reporters = await response.json();
  return { reporters };
};

export default Home;
