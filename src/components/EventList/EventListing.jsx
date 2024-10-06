import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import EventCard from '../EventCard/EventCard.jsx';
import './EventListStyle.css';
import toast from "react-hot-toast";
import axios from "axios";



export default function EventListing() {

    const [eventsArr, setEventsArr] = useState([])   //   mainintaining state for eventsArr


    async function getEvents() {
        try {
            const response = await axios.get("https://event-app-backend-qvjh.onrender.com/api/v1/event/getAllEvents");  // getting list of all events from backend using MongoDB database
            const eventres = response.data.allEvents;
            setEventsArr(eventres);             // updating the eventsArr

        } catch (error) {
            toast.error(error.response.data.error || "Failed to fetch events");
        }
    }

    useEffect(() => {
        getEvents();
    }, [])

    const [activeTab, setActiveTab] = useState('upcoming')
    const [isInvited, setIsInvited] = useState(true)

    const toggleInvite = () => {
        setIsInvited(!isInvited)
    }

    return (
        <>
            <Link to="/" className="" style={{ textDecoration: "none", color: "black" }}>
                <div className="linkDiv">Looking to create more exciting events!</div>
            </Link>
            <div className="listContainer" >
                <header className="listHeader" >
                    <h1 className="titleStyle" >Events</h1>
                    <div className="tabsStyle" >
                        <button
                            className="" style={{ ...styles.tabButton, ...(activeTab === 'upcoming' ? styles.activeTab : {}) }}
                            onClick={() => setActiveTab('upcoming')}
                        >
                            Upcoming
                        </button>
                        <button
                            className="" style={{ ...styles.tabButton, ...(activeTab === 'past' ? styles.activeTab : {}) }}
                            onClick={() => setActiveTab('past')}
                        >
                            Past
                        </button>
                    </div>
                </header>
                <div className="eventList" >

                    {eventsArr.map((item, index) => (

                        <EventCard event={item} isInvited={isInvited} toggleInvite={toggleInvite} key={index} />

                    ))}
                </div>
            </div>
        </>

    )
}

const styles = {

    tabButton: {
        border: 'none',
        background: 'white',
        padding: '8px 16px',
        borderRadius: '10px',          
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#666',
    },
    activeTab: {
        backgroundColor: '#e0e0e0',
        color: '#333',
    },


}

