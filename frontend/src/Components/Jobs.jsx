import React from "react";
import Navbar from "./Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";

const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

function Jobs() {
  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto mt-5 ">
        <div className="flex gap-5">
          <div className="w-[20%]">
            <FilterCard />
          </div>
          <div>
            {jobsArray.length == 0 ? (
              <span>Job Not Found</span>
            ) : (
              <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
                <div className="grid grid-cols-3 gap-4">
                  {jobsArray.map((job, index) => (
                    <div>
                      <Job key={index} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jobs;
