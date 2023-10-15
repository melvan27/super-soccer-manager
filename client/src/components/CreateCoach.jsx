import React, { useState } from "react";
import axios from "axios";

const CreateCoach = () => {
  const [formData, setFormData] = useState({
    // General Information
    firstName: '',
    lastName: '',
    age: '',
    placeOfBirth: '',
    dateOfBirth: '',

    // Mentality and Position
    coachingMentality: '',
    preferredPosition: '',

    // Attributes
    attacking: 10,
    defending: 10,
    scouting: 10,
    training: 10,
    tactics: 10,
    persuasion: 10,
  });

  const [activeTab, setActiveTab] = useState(1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      // Step 1: Fetch the user based on the user ID from the HTTP-only cookie
      const userResponse = await axios.get('http://localhost:8000/api/user', { withCredentials: true });
      console.log(userResponse);

      // Step 2: Create the coach
      const coachResponse = await axios.post('http://localhost:8000/api/coaches/create', formData, { withCredentials: true });
      console.log(coachResponse);

      // Step 3: Retrieve the ID of the newly created coach
      const newCoachId = coachResponse.data._id;
      console.log(newCoachId);

      // Step 4: Update the coach by adding the coach ID to the user's coaches array
      const userId = userResponse.data._id;
      console.log(userId);

      // Send a request to update the user
      await axios.patch("http://localhost:8000/api/user/addCoach", { newCoachId }, { withCredentials: true });

      console.log('Coach created and associated with the user');
    } catch (err) {
      console.error(err);
    }
  };

  const nextTab = () => {
    setActiveTab(activeTab + 1);
  };

  const prevTab = () => {
    setActiveTab(activeTab - 1);
  };

  return (
    <div className="py-20 px-16">
      <h2>Welcome to the Soccer Management Game!</h2>
      <p>
        It looks like you don't have a coach yet. Let's get started by
        creating your coach.
      </p>
      <div className="flex justify-center items-center">
        <div className="p-4 card flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
          <ul className="steps">
            <li
              className={`step ${activeTab === 1 ? 'step-primary' : ''}`}
              onClick={() => setActiveTab(1)}
            >
              General Information
            </li>
            <li
              className={`step ${activeTab === 2 ? 'step-primary' : ''}`}
              onClick={() => setActiveTab(2)}
            >
              Mentality and Position
            </li>
            <li
              className={`step ${activeTab === 3 ? 'step-primary' : ''}`}
              onClick={() => setActiveTab(3)}
            >
              Attributes
            </li>
          </ul>
          {activeTab === 1 && (
            <div className="mt-4">
              {/* General Information Form */}
              <form>
                {/* General Information Fields */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">First Name</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    className="input input-bordered"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                  <label className="label">
                    <span className="label-text">Last Name</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    className="input input-bordered"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                  <label className="label">
                    <span className="label-text">Age</span>
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    placeholder="Age"
                    className="input input-bordered"
                    value={formData.age}
                    onChange={handleInputChange}
                  />
                  <label className="label">
                    <span className="label-text">Place of Birth</span>
                  </label>
                  <input
                    type="text"
                    id="placeOfBirth"
                    name="placeOfBirth"
                    placeholder="Place of Birth"
                    className="input input-bordered"
                    value={formData.placeOfBirth}
                    onChange={handleInputChange}
                  />
                  <label className="label">
                    <span className="label-text">Date of Birth</span>
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    placeholder="Date of Birth"
                    className="input input-bordered"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                  />
                </div>
              </form>
            </div>
          )}
          {activeTab === 2 && (
            <div className="mt-4">
              {/* Mentality and Position Form */}
              <form>
                {/* Mentality and Position Fields */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Coaching Mentality</span>
                  </label>
                  <select
                    type="text"
                    id="coachingMentality"
                    name="coachingMentality"
                    className="select select-bordered w-full max-w-xs"
                    value={formData.coachingMentality}
                    onChange={handleInputChange}
                  >
                    <option value="">Select an option</option>
                    <option value="very attacking">Very Attacking</option>
                    <option value="attacking">Attacking</option>
                    <option value="balanced">Balanced</option>
                    <option value="defensive">Defensive</option>
                    <option value="very defensive">Very Defensive</option>
                  </select>
                  <label className="label">
                    <span className="label-text">Preferred Position</span>
                  </label>
                  <select
                    id="preferredPosition"
                    name="preferredPosition"
                    className="select select-bordered w-full max-w-xs"
                    value={formData.preferredPosition}
                    onChange={handleInputChange}
                  >
                    <option value="">Select an option</option>
                    <option value="manager">Manager</option>
                    <option value="assistant manager">Assistant Manager</option>
                    <option value="training manager">Training Manager</option>
                    <option value="head scout">Head Scout</option>
                  </select>
                </div>
              </form>
            </div>
          )}
          {activeTab === 3 && (
            <div className="mt-4">
              {/* Attributes Form */}
              <form>
                {/* Attribute Fields */}
                <div className="form-control">
                  <label className="label">
                    <div>
                      <span className="label-text">Attacking</span>
                      <a className="lg:tooltip" data-tip="Your attacking attribute affects how effective your attacking tactics are. It also gives a training boost to your players' attacking stats.">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </a>
                    </div>
                    <div className="stat-value text-primary">{formData.attacking}</div>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    id="attacking"
                    name="attacking"
                    className="range range-sm range-primary"
                    value={formData.attacking}
                    onChange={handleInputChange}
                  />
                  <label className="label">
                    <div>
                      <span className="label-text">Defending</span>
                      <a className="lg:tooltip" data-tip="Your defending attribute affects how effective your defensive tactics are. It also gives a training boost to your players' defending stats.">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </a>
                    </div>
                    <div className="stat-value text-primary">{formData.defending}</div>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    id="defending"
                    name="defending"
                    className="range range-sm range-primary"
                    value={formData.defending}
                    onChange={handleInputChange}
                  />
                  <label className="label">
                    <div>
                      <span className="label-text">Scouting</span>
                      <a className="lg:tooltip" data-tip="Your scouting attribute affects how effective your scouting is. Better scouting will give you a better evaluation of a player.">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </a>
                    </div>
                    <div className="stat-value text-primary">{formData.scouting}</div>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    id="scouting"
                    name="scouting"
                    className="range range-sm range-primary"
                    value={formData.scouting}
                    onChange={handleInputChange}
                  />
                  <label className="label">
                    <div>
                      <span className="label-text">Training</span>
                      <a className="lg:tooltip" data-tip="Your training attribute affects how effective your training is. Better training will give your players a bigger training boost.">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </a>
                    </div>
                    <div className="stat-value text-primary">{formData.training}</div>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    id="training"
                    name="training"
                    className="range range-sm range-primary"
                    value={formData.training}
                    onChange={handleInputChange}
                  />
                  <label className="label">
                    <div>
                      <span className="label-text">Tactics</span>
                      <a className="lg:tooltip" data-tip="Your tactics attribute affects how effective your tactics are. Better tactics will give your players a bigger boost in matches.">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </a>
                    </div>
                    <div className="stat-value text-primary">{formData.tactics}</div>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    id="tactics"
                    name="tactics"
                    className="range range-sm range-primary"
                    value={formData.tactics}
                    onChange={handleInputChange}
                  />
                  <label className="label">
                    <div>
                      <span className="label-text">Persuasion</span>
                      <a className="lg:tooltip" data-tip="Your persuasion attribute affects how effective your persuasion is. Better persuasion will give you a better chance of convincing a player to join your club.">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </a>
                    </div>
                    <div className="stat-value text-primary">{formData.persuasion}</div>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    id="persuasion"
                    name="persuasion"
                    className="range range-sm range-primary"
                    value={formData.persuasion}
                    onChange={handleInputChange}
                  />
                </div>
              </form>
            </div>
          )}
          <div className="mt-4 flex justify-between">
            {activeTab > 1 && (
              <button className="btn btn-primary" onClick={prevTab}>
                Previous
              </button>
            )}
            {activeTab < 3 ? (
              <button className={`btn btn-primary ${activeTab === 1 ? 'ml-auto' : ''}`} onClick={nextTab}>
                Next
              </button>
            ) : (
              <button className="btn btn-primary" onClick={handleSubmit}>
                Create Coach
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCoach;
