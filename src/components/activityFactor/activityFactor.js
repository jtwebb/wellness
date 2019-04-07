import React from 'react';
import { Button, Card, Collapse, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';

import './activityFactor.scss';

export default class ActivityFactorComponent extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            definitionIsOpen: false
        };
    }

    toggleDefinition = () => {
        this.setState({definitionIsOpen: !this.state.definitionIsOpen});
    };

    render() {
        return (
            <div className={`activity-factor-definitions`}>
                <Button className={`definitions-button`} color={`primary`} block onClick={this.toggleDefinition}>
                    Activity Definitions
                </Button>
                <Collapse className={`definitions`} isOpen={this.state.definitionIsOpen}>
                    <Card>
                        <div>
                            <ListGroup flush>
                                <ListGroupItem>
                                    <ListGroupItemHeading>Sedentary</ListGroupItemHeading>
                                    <ListGroupItemText>Desk job and little to no exercise</ListGroupItemText>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <ListGroupItemHeading>Lightly Active</ListGroupItemHeading>
                                    <ListGroupItemText>Light exercise/sports 1–3 days/week</ListGroupItemText>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <ListGroupItemHeading>Moderately Active</ListGroupItemHeading>
                                    <ListGroupItemText>Moderate exercise/sports 3–5 days/week</ListGroupItemText>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <ListGroupItemHeading>Very Active</ListGroupItemHeading>
                                    <ListGroupItemText>Hard exercise/sports 6–7 days/week</ListGroupItemText>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <ListGroupItemHeading>Extremely Active</ListGroupItemHeading>
                                    <ListGroupItemText>Hard daily exercise/sports and physical job or training</ListGroupItemText>
                                </ListGroupItem>
                            </ListGroup>
                        </div>
                    </Card>
                </Collapse>
            </div>
        );
    }
}
