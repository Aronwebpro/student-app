import React from 'react';
import PropTypes from 'prop-types';

//AntD
import Icon from 'antd/lib/icon';

//Styles
import './add-button.css';

export default class AddButton extends React.PureComponent {
    render() {
        const { onClick } = this.props;
        return (
            <div className="add-new-button-container" onClick={onClick}>
                <div

                    className='add-new-button'
                >
                    <Icon
                        type="plus-circle"
                        style={{fontSize: '50px', color: '#fff'}}
                    />
                </div>
            </div>
        )
    }
}

AddButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};