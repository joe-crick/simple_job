import React, { Component } from "react";
import { connect } from "react-redux";
import JobList from "./components/JobsList/JobsList";
import appConfig from "./app.config";

// Given this solution, you could probably just push the values from the main
// jobsList array into this array. However, this function creates an abstraction
// layer that would allow for a later refactoring.
/**
 * @description Return a slice of an array based on a fixed page size
 * @param {*} jobs
 * @param {*} base
 * @returns {Array<JobThumbnail>}
 */
export const getJobPage = (jobs, base) => jobs.slice(0, base + appConfig.pageSize);

/**
 * @description Determines whether or not this is an actual intersection by determining
 * how much of the target element is currently visible within the root's intersection ratio.
 * @param {IntersectionObserverEntry} entries
 */
export const isIntersection = entries => entries[0].intersectionRatio > 0;

export class App extends Component {
  state = {
    jobSetBegin: 0
  };

  // This is not an ideal implementation of infinite scrolling. Ideally, the
  // content should be updated through the scroll view, while not increasing
  // the number of DOM elements. As elements in the DOM increase, there
  // is an increase in memory on the client. This is of special concern for
  // mobile users.
  paginateJobs = entries => {
    if (isIntersection(entries)) {
      this.setState(state => ({ jobSetBegin: state.jobSetBegin + appConfig.pageSize }));
    }
  };

  render() {
    return (
      <div className="App">
        <JobList
          paginateJobs={this.paginateJobs}
          jobs={getJobPage(this.props.jobsList, this.state.jobSetBegin)}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ jobsList }) => ({ jobsList });

export default connect(mapStateToProps)(App);
