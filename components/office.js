import React from 'react';
import Month from "./month";

const  Office = (props) => {

    const { location } = props;

    return (
        <div className="location" >

            <h2>{location.reporter}</h2>

            <div className="months">
                {location.months.map(month => {
                    return (
                        <Month month={month} />
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
    )
};

export default Office;
