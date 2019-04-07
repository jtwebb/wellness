import React from 'react';
import { connect } from 'react-redux';

export class HomeComponent extends React.PureComponent {
    render() {
        return (
            <div>HomeComponent</div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
