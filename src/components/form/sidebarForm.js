import React from 'react';
import { Button, Collapse } from 'reactstrap';
import FormComponent from './form';
import ExerciseForm from './exerciseForm';

import './sidebar-form.scss';

export default class SidebarFormComponent extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            currentInformationIsOpen: this.props.currentOpen === undefined ? true : this.props.currentOpen,
            goalInformationIsOpen: this.props.goalOpen === undefined ? true : this.props.goalOpen,
            exercisesInformationIsOpen: this.props.exerciseOpen === undefined ? true : this.props.exerciseOpen
        };
    }

    onExercisesInformationToggle = () => {
        this.setState({exercisesInformationIsOpen: !this.state.exercisesInformationIsOpen});
    };

    onCurrentInformationToggle = () => {
        this.setState({currentInformationIsOpen: !this.state.currentInformationIsOpen});
    };

    onGoalInformationToggle = () => {
        this.setState({goalInformationIsOpen: !this.state.goalInformationIsOpen});
    };

    renderExercises = () => {
        if (!this.props.showExercise) {
            return null;
        }

        return (
          <div>
              <Button className={`exercises-toggle`} key={10} block color={`primary`} onClick={this.onExercisesInformationToggle}>Weekly Exercise Schedule</Button>
              <Collapse key={11} isOpen={this.state.exercisesInformationIsOpen}>
                  <div className="sidebar-exercises">
                    <ExerciseForm/>
                  </div>
              </Collapse>
          </div>
        );
    };

    renderCurrent = () => {
        if (this.props.hideCurrent) {
            return null;
        }

        return (
            <div>
                <Button className={`current-toggle`} key={1} block color={`primary`} onClick={this.onCurrentInformationToggle}>Current Information</Button>
                <Collapse key={2} isOpen={this.state.currentInformationIsOpen}>
                    <FormComponent
                        key={`current`}
                        current
                        showTitle={false}
                        showage
                        showheight
                        showweight
                        showbodyFatPercentage
                        showgender
                        showactivityFactor
                        {...this.props.current}
                    />
                </Collapse>
            </div>
        );
    };

    renderGoals = () => {
        if (this.props.hideGoals) {
            return null;
        }

        return (
            <div>
                <Button className={`goal-toggle`} key={3} block color={`primary`} onClick={this.onGoalInformationToggle}>Goal Information</Button>
                <Collapse key={4} isOpen={this.state.goalInformationIsOpen}>
                    <FormComponent
                        key={`goal`}
                        goal
                        showTitle={false}
                        showidealWeight
                        showlowestCalorieIntake
                        {...this.props.goal}
                    />
                </Collapse>
            </div>
        );
    };

    render = () => {
        return (
            <div>
                {this.renderExercises()}
                {this.renderCurrent()}
                {this.renderGoals()}
            </div>
        );
    };
}
