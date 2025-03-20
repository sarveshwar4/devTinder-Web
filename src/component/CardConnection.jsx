import React from "react";

const CardConnection = ({ userRequest }) => {
  const { firstName, lastName, about, photoUrl, skills } = userRequest.fromUserId;

  return (
    <div className="flex items-center justify-between mb-6 p-6 border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white bg-opacity-90 backdrop-blur-sm">
      {/* Left Section: User Info */}
      <div className="flex items-center gap-6">
        {/* User Image */}
        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200">
          <img
            src={photoUrl}
            alt={`${firstName} ${lastName}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* User Details */}
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold text-gray-800">
            {firstName} {lastName}
          </h1>
          <p className="text-gray-600 mt-1">{about}</p>
          {skills && (
            <div className="mt-2 flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Section: Buttons */}
      <div className="flex gap-4">
        <button className="px-6 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors duration-300">
          Ignore
        </button>
        <button className="px-6 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors duration-300">
          Interested
        </button>
      </div>
    </div>
  );
};

export default CardConnection;