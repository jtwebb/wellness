import React from 'react';
import { connect } from 'react-redux';

export class BmrComponent extends React.PureComponent {
    render() {
        return (
            <div>BmrComponent</div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BmrComponent);
