import React from 'react';
import { connect } from 'react-redux';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/lt';

//Api
import { getAllEvents } from '../../../api/lookups';

//AntD
import Message from 'antd/lib/message';

//Components
import AddButton from '../../components/AddButton';
import EventModal from '../../components/EventModal';

//Redux
import changeNewEventModalState from '../../../redux/actions/changeNewEventModalState';

//Styles
import './schedule.css';
import '../../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css';


//Big Calendar Localizer
const localizer = BigCalendar.momentLocalizer(moment);


class Schedule extends React.Component {
    state = {
        events: [],
        event: null,
        isUpdate: false,
    };

    render() {
        const { events, event } = this.state;
        const { eventModalVisible } = this.props;
        return (
            <div className='schedule-page-container'>
                <div className="forum-header">
                    <div className="forum-title">
                        <h2>Tvarkaraštis</h2>
                    </div>
                </div>
                <div className='schedule-page-calendar-container'>
                    {events.length > 0 && (
                        <BigCalendar
                            culture='lt'
                            localizer={localizer}
                            events={events}
                            startAccessor="start"
                            endAccessor="end"
                            messages={{
                                next: '>',
                                previous: '<',
                                today: 'Dabar',
                                month: 'Mėnesis',
                                week: 'Savaitė',
                                day: 'Diena',
                                agenda: 'Mėn. Listas'
                            }}
                            onSelectEvent={this.handleEventUpdate}
                            eventPropGetter={this.handleEventsStyles}
                        />
                    )}
                </div>
                <AddButton
                    onClick={this.handleAdd}
                />
                {eventModalVisible && (
                    <EventModal
                        visible={eventModalVisible}
                        hideModal={this.closeEventModal}
                        event={event}
                        updateScreen={this.fetchEvents}
                    />
                )}
            </div>
        )
    }

    async componentDidMount() {
        //Scroll Page to Top on Start
        if (window) {
            window.scrollTo(0, 0);
        }
        const events = await this.fetchEvents();
        this.setState({ events });
    }

    handleEventsStyles = (event, start, end, isSelected) => {
        const { color }  = event;
        const style = {
            backgroundColor: color || "rgb(97, 218, 251)",
            color: '#fff',
            borderRadius: "5px",
            border: "none",
            fontSize: '0.8em',
        };
        return {
            style,
        }
    };

    fetchEvents = async () => {
        return await getAllEvents();
    };

    handleAdd = () => {
        const { openNewEventModal } = this.props;
        openNewEventModal();
    };

    closeEventModal = () => {
        const { closeNewEventModal } = this.props;
        const { event } = this.state;
        if (event) {
            this.setState({ event: null }, closeNewEventModal);
        } else {
            closeNewEventModal();
        }
    };

    handleEventUpdate = (event, e) => {
        const { openNewEventModal } = this.props;
        this.setState({ event, update: true }, openNewEventModal);
    }
}

//Redux Map to Props Handlers
const mapStateToProps = (state) => {
    return {
        eventModalVisible: state.newEventModal.visible,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        closeNewEventModal() {
            dispatch(changeNewEventModalState(false));
        },
        openNewEventModal() {
            dispatch(changeNewEventModalState(true));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);