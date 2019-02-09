import React from 'react';
import PropTypes from 'prop-types';

//AntD
import Spin from 'antd/lib/spin';

//Styles
import './page-spinner.css';

export default class PageSpinner extends React.PureComponent {
    render() {
        const { visible } = this.props;

        return visible ? (
            <div className='page-spinner-container'>
                <Spin size='large'/>
            </div>
        ) : (
            null
        )
    }
}

PageSpinner.propTypes = {
    visible: PropTypes.bool.isRequired,
};

PageSpinner.defaultProps = {
    visible: false,
};