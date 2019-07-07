import * as React from 'react';

//AntD
import Icon from 'antd/lib/icon';

//Styles
import './add-button.css';

interface Props {
    onClick: () => void,
}

export default class AddButton extends React.PureComponent <Props, {}>{
    render() {
        const { onClick } = this.props;
        return (
            <div className="add-new-button-container" onClick={onClick}>
                <div className='add-new-button'>
                    <Icon
                        type="plus-circle"
                        style={{ fontSize: '50px', color: '#fff' }}
                    />
                </div>
            </div>
        );
    }
}
