import React from 'react';
import Topic from "./topic";

const Month = ({ month }) => {

    return (
        <div className="month" >
            <h3>{month.name}</h3>

            {month.topics.map(topic =>  <Topic key={topic} topic={topic} />)}

        </div>
    );
};

export default Month;
