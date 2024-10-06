import React from 'react'
import { Clock, Users, MonitorSmartphone } from 'lucide-react'      // library for using icons 
import './EventCardStyle.css';



const EventCard = ({ event, isInvited, toggleInvite }) => {


    const givenDate = event.startDate;
    const givenDateArr = givenDate.split("T");  //splitting the given string from "T";



    let dateString = new Date(givenDateArr[0]).toLocaleDateString('en-us', { weekday: "long", month: "long", day: "numeric" });  //  foe 
    let dateArr = dateString.split(" ")
    let eventDay = dateArr[0].split(",")[0];          // getting event day
    let eventMonth = dateArr[1];                   // getting event month
    let eventDate = dateArr[2];                   // getting event date



    let givenTime = givenDateArr[1];
    let givenHour = +(givenTime[0] + givenTime[1])   // getting inputed hours
    let givenMinute = +(givenTime[3] + givenTime[4])   // getting inputed minutes
    let newformat = givenHour >= 12 ? 'PM' : 'AM';
    givenHour = givenHour % 12;
    givenHour = givenHour ? givenHour : 12;
    givenMinute = givenMinute < 10 ? '0' + givenMinute : givenMinute;
    let newFormattedTime = givenHour + ':' + givenMinute + ' ' + newformat;        //  new fomated time in AM/ PM format as we are getting input time in 24hrs..  format


    return (
        <div className="eventCard" >
            <div className="dateColumn" >

                <div className="dateStyle" >
                    {eventMonth} {eventDate}
                </div>
                <div className="dayStyle" >{eventDay}</div>
                <div className="circleDot" ></div>
                <div className="lineDiv"></div>
            </div>
            <div className="eventDetails" >
                <div className="timeStyle" >

                    {newFormattedTime}
                </div>
                <div class="titleDiv">
                    <h2 className="eventTitle" >{event.eventName}</h2>
                </div>

                <div className="organizer" >
                    <Users size={16} className="iconStyle" style={{ color: '#4a90e2' }} />
                    By {'OctoML'}
                </div>
                <span className="virtualTag" >
                    <MonitorSmartphone className="iconStyle" size={16} />
                    Virtual
                </span>
                <div className="eventMeta" >

                    <button
                        className="invitedButton inviteButton"

                    >
                        {isInvited ? 'Invited' : 'Invite'}
                    </button>
                    <span className="attendees" >
                        <div className="attendeeAvatars" >
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="" style={{ ...styles.attendeeAvatar, left: `${i * 15}px` }}>
                                    <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1728125058~exp=1728128658~hmac=0d29ef3f17f483fa4b2c1f0fbe4f1baf13d5fc130c5f7b13554397cc085708e2&w=826" alt="" class="avatarImage" />
                                </div>
                            ))}
                        </div>
                        <div className="countDiv">
                            +136
                        </div>

                    </span>
                </div>
            </div>
            <div className="thumbnailColumn" >
                <img src={event.selectedImage} alt="Event thumbnail" className="thumbnail" />
            </div>


        </div>
    )
}

const styles = {   // styles in react    also can be written in ovject format

    attendeeAvatar: {
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        backgroundColor: '#e0e0e0',
        border: '2px solid #fff',
        position: 'absolute',
    },

}
export default EventCard
