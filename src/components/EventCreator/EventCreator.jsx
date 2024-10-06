
import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import './EventCreatorStyle.css';
export default function EventCreator() {


    const navigate = useNavigate();
    const [eventName, setEventName] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [location, setLocation] = useState('')
    const [requireApproval, setRequireApproval] = useState(false)
    const [selectedTheme, setSelectedTheme] = useState('minimal')
    const [selectedImage, setSelectedImage] = useState(null);




    const handleImageChange = (e) => {                   // Handle the image upload
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result); // Convert the file to base64
            };

            reader.readAsDataURL(file); // Reads the image as a DataURL (base64)
        }

    };


    const handleCreateEvent = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post("https://event-app-backend-qvjh.onrender.com/api/v1/event/createEvent",     // sending the request to backend for creating the new event
                { eventName, startDate, endDate, location, selectedImage });

            toast.success("Event created successfully");
            navigate("/events");
        } catch (error) {
            toast.error(error.response.data.message || "Event Creation failed");

        }



    }



    let todayDate = new Date().toLocaleDateString('en-us', { weekday: "long", month: "long", day: "numeric" });

    let dateArr = todayDate.split(" ")    // splitting todays on the basis of space between the words in the  date string
    let currentMonth = dateArr[1].substring(0, 3);      // getting current month
    let currentDate = dateArr[2];                   //  getting today's    date

    return (
        <div className="container" >

            {/*        =========================                     Header           ===========================================                              */}
            <header className="header" >
                <Link to="/events"  style={{ textDecoration: "none" }}>
                    <div className="headerIcon" >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="headerText" >Events</span>
                    </div>
                </Link>
                <div className="headerIcon" >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M19 6V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V6M8 6V4C8 3.44772 8.44772 3 9 3H15C15.5523 3 16 3.44772 16 4V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="headerText" >Calendars</span>
                </div>
                <div className="headerIcon" >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="headerText" >Explore</span>
                </div>
            </header>
            {/*                                                      Header  ends                                           */}







            <main className="mainStyle" >
                <form onSubmit={handleCreateEvent} className="formStyle" >
                    <div className="calendarSelector" >
                        <div className="calendarIcon" >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="10" fill="#FFA500" />
                                <path d="M12 6V12L16 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>



                        <div className="headSelectDiv">
                            <div className="suvHeadDiv">Create Under</div>
                            <div className="custom-select">
                                <select className="selectStyle" >
                                    <option>Personal Calendar</option>
                                </select>
                            </div>

                        </div>

                    </div>


                    <input
                        type="text"
                      
                        placeholder="Event Name"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        className="inputStyle"
                    />


                    <div className="dateTimeContainer" >
                        <div className="dateColumn" >
                            <div className="dateBox" >


                                <span className="dateMonth" >{currentMonth}</span>
                                <span className="dateNumber" >{currentDate}</span>
                            </div>
                        </div>
                        <div className="timeColumn" >
                            <div className="timeRow" >
                                <span className="timeLabel" >Start</span>
                                <input
                                    type="datetime-local"
                                  
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="dateTimeInput"
                                />
                            </div>
                            <div className="timeRow" >
                                <span className="timeLabel" >End</span>
                                <input
                                    type="datetime-local"
                                    
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="dateTimeInput"
                                />
                            </div>
                            <div className="timeZone" >GMT+05:30 Calcutta</div>
                            <div className="multiSession" >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Create Multi-Session Event
                            </div>
                        </div>
                    </div>
                    <div className="locationInput">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Add Event Location"
                            value={location}
                            
                            onChange={(e) => setLocation(e.target.value)}
                            className="locationInputField"
                        />
                    </div>
                    <div className="eventOptions" >
                        <h3 className="optionsTitle" >Event Options</h3>
                        <div className="optionRow" >
                            <span>Tickets</span>
                            <span className="optionValue" >Free</span>
                        </div>
                        <div className="optionRow" >
                            <span>Require Approval</span>
                            <label className="switch" >
                                <input
                                    type="checkbox"
                                    checked={requireApproval}
                                    onChange={(e) => setRequireApproval(e.target.checked)}
                                />
                                <span className="slider round" ></span>
                            </label>
                        </div>
                        <div className="optionRow" >
                            <span>Capacity</span>
                            <span className="optionValue" >Unlimited</span>
                        </div>
                        <div className="optionRow optionRowVisiblity" >
                            <span>Visibility</span>
                            <span className="optionValue" >Public</span>
                        </div>
                    </div>
                    <button type="submit" className="createButton" >Create Event</button>
                </form>



                <div className="preview" >


                    {/*      =================                                        image upload       ========================                                         */}
                    <div className="imageContainer" >
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                        <div className="previewContent" >
                            {selectedImage ? (
                                <img src={selectedImage} alt="Uploaded Preview" className="imageStyle" />
                            ) : (
                                <div className="placeholder" >
                                    <p className="textStyle" >YOU ARE INVITED</p>
                                </div>
                            )}
                        </div>


                    </div>
                    {/*          ==============================                 image upload    ends              ======================================              */}



                    <div className="themeSelector" >
                        <h4 className="themeTitle" >Theme</h4>
                        <div className="themeOptions" >
                            {['minimal', 'holiday', 'abstract', 'quantum'].map((theme) => (
                                <button
                                    key={theme}
                                    onClick={() => setSelectedTheme(theme)}
                                    className="" style={{
                                        ...styles.themeButton,
                                        ...(selectedTheme === theme ? styles.selectedTheme : {}),
                                    }}
                                >
                                    Title
                                </button>
                            ))}
                        </div>
                        <div className="colorSelector" >
                            <span className="colorLabel" >Color</span>
                            <select className="colorSelect" >
                                <option>Gray</option>
                            </select>
                        </div>
                        <div className="typefaceSelector" >
                            <span className="typefaceLabel" >Typeface</span>
                            <select className="typefaceSelect" >
                                <option>Default</option>
                            </select>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}




const styles = {

    themeButton: {
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: '#fff',
        cursor: 'pointer',
    },
    selectedTheme: {
        borderColor: '#1a73e8',
        boxShadow: '0 0 0 2px #1a73e8',
    },

}

