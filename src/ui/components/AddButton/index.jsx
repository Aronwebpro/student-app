import React from 'react';
import PropTypes from 'prop-types';

//AntD
import Icon from 'antd/lib/icon';

//Styles
import './add-button.css';

export default class Index extends React.PureComponent {
    render() {
        const { onClick } = this.props;
        return (
            <div className="add-new-button-container" onClick={onClick}>
                <div

                    className='add-new-button'
                >
                    {/*<Icon*/}
                        {/*type="plus"*/}
                        {/*style={{fontSize: '26px', fontWeight: 'bold', color: '#fff'}}*/}

                    {/*/>*/}
                    <Icon
                        type="plus-circle"
                        style={{fontSize: '50px', color: '#fff'}}
                    />
                </div>
            </div>
        )
    }
}