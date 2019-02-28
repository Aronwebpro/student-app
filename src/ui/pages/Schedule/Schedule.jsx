import React from 'react';
import { connect } from 'react-redux';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/lt';

//AntD
import Message from 'antd/lib/message';

//Components
import AddButton from '../../components/AddButton';
import NewEventModal from '../../components/EventModal';

//Redux
import changeNewEventModalState from '../../../redux/actions/changeNewEventModalState';

//Styles
import './schedule.css';
import '../../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css';


//Big Calendar Localizer
const localizer = BigCalendar.momentLocalizer(moment);


const events = [{
    title: 'Pamoka',
    start: moment().toDate(),
    end: moment('2019-03-01').toDate(),
    allDay : false,
}];

class Schedule extends React.Component {
    render() {
        const { newEventModalVisible, closeNewEventModal } = this.props;
        return (
            <div className='schedule-page-container'>
                <div className="forum-header">
                    <div className="forum-title">
                        <h2>Tvarkaraštis</h2>
                    </div>
                </div>
                <div className='schedule-page-calendar-container'>
                    <BigCalendar
                        culture='lt'
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        messages={{
                            next: 'Pirmyn',
                            previous: 'Atagal',
                            today: 'Šiandiena',
                            month: 'Mėnesis',
                            week: 'Savaitė',
                            day: 'Diena',
                            agenda: 'Dienotvarkė'
                        }}
                        onSelectEvent={this.handleEventUpdate}
                    />
                </div>
                <AddButton
                    onClick={this.handleAdd}
                />
                <NewEventModal
                    visible={newEventModalVisible}
                    hideModal={closeNewEventModal}
                />
            </div>
        )
    }

    componentDidMount() {
        //Scroll Page to Top on Start
        if (window) {
            window.scrollTo(0, 0);
        }
    }

    handleAdd = () => {
        const { closeNewEventModal } = this.props;
        closeNewEventModal();
    };

    handleEventUpdate = (event, e) => {
        console.log(event);
    }
}

//Redux Map to Props Handlers
const mapStateToProps = (state) => {
    return {
        newEventModalVisible: state.newEventModal.visible,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        closeNewEventModal() {
            dispatch(changeNewEventModalState(false));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);