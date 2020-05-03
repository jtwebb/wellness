import React from 'react';
import { Collapse, Nav, Navbar, NavbarToggler, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

export default class HeaderComponent extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    }

    toggle = () => {
        this.setState({isOpen: !this.state.isOpen});
    };

    render() {
        return (
            <Navbar className={`app-header`} color={`dark`} dark expand={`md`}>
                <NavbarToggler onClick={this.toggle}/>
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink exact to={`/`} className={`nav-link`} activeClassName={`active`}>Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink exact to={`/calculators`} className={`nav-link`} activeClassName={`active`}>Calculators</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink exact to={`/activity`} className={`nav-link`} activeClassName={`active`}>Activities</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to={`/profile`} className={`nav-link`} activeClassName={`active`}>Profile</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to={`/disclaimer`} className={`nav-link`} activeClassName={`active`}>Disclaimer</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}
