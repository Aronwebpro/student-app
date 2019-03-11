import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import store from '../../../redux/store';

//Components
import Spinner from '../Spinner';

//Api
import { getDayHeartRate } from '../../../api/lookups';

//Styles
import './heart-rate-view.css';
import setHeartRate from '../../../redux/actions/setHeartRate';


const styles = {
    dayNameText: {
        fontSize: 25,
        textAlign: 'center'
    },
    monthDayText: {
        fontSize: 25,
        textAlign: 'center',
        marginTop: '10px',
    },
    dayNumberText: {
        fontSize: 65,
        textAlign: 'center'
    }
};

class HeartRateView extends React.PureComponent {
    state = {
        heartRate: null,
        loading: true,
    };

    render() {
        const { heartRate } = this.props;
        return (
            <div className='heart-rate-view-container'>
                <div className='section-header'>
                    <h2>
                        Dienos Širdies Ritmas
                    </h2>
                </div>
                {heartRate === null ? (
                    <div className='heart-rate-view-spinner-container'>
                        <Spinner size={'small'}/>
                    </div>
                ) : (
                    <div>
                        {heartRate ? (
                            <h2 style={styles.monthDayText}>
                                {`${heartRate} bpm`}
                            </h2>
                        ) : (
                            <p>
                                Širdies ritmas neįvestas
                            </p>
                        )}
                    </div>
                )}
            </div>
        )
    }

    async componentDidMount() {
        const { heartRate, setHeartRate } = this.props;
        if (!heartRate) {
            const heartRate = await getDayHeartRate();
            setHeartRate(heartRate);
            this.setState({ heartRate });
        } else {
            this.setState({ heartRate });
        }
    }
}

//Redux
const mapStateToProps = (state) => {
    return {
        heartRate: state.heartRate.heartRate,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setHeartRate(heartRate) {
            dispatch(setHeartRate(heartRate));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HeartRateView)
HeartRateView.propTypes = {
    heartRate: PropTypes.string,
};

