import React from 'react';
import PropTypes from 'prop-types';

//Components
import Spinner from '../Spinner';

//Api
import { getDayHeartRate } from '../../../api/lookups';

//Styles
import './heart-rate-view.css';

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

export default class HeartRateView extends React.PureComponent {
    state = {
        heartRate: null,
        loading: true,
    };
    render() {
        const { heartRate } = this.state;
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
        const heartRate = await getDayHeartRate();
        this.setState({ heartRate });
    }
}

HeartRateView.propTypes = {
    heartRate: PropTypes.string,
};

