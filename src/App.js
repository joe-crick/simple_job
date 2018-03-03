import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchJobs } from "./data/fetch-jobs";
import JobList from "./components/JobsList/JobsList";
import { getJobsList, setJobsList } from "./components/JobsList/jobs-list-actions";
import "./App.css";

const PAGE_SIZE = 25;

// Given this solution, you could probably just push the values from the main
// jobsList array into this array. However, this function creates an abstraction
// layer that would allow for a later refactoring.
/**
 * @description Return a slice of an array based on a fixed page size
 * @param {*} jobs
 * @param {*} base
 * @returns {Array<JobThumbnail>}
 */
export const getJobPage = (jobs, base) => jobs.slice(0, base + PAGE_SIZE);

/**
 * @description Determines whether or not this is an actual intersection by determining
 * how much of the target element is currently visible within the root's intersection ratio.
 * @param {IntersectionObserverEntry} entries
 */
export const isIntersection = entries => entries[0].intersectionRatio > 0;

class App extends Component {
  state = {
    jobsList: [],
    visibleJobs: [],
    jobSetBegin: 0
  };

  // This solution assumes that the data being returned is a manageable size,
  // and that it will be more efficient to receive all the data from one request
  // and paginate through that data, than making individual requests for sets of data.
  // componentDidMount = async () => {
  //   const jobList = await fetchJobs(215);
  //
  //   this.setState({
  //     jobsList: jobList,
  //     visibleJobs: getJobPage(jobList, 0)
  //   });
  // };

  componentDidMount() {
    this.props.getMatchingJobListings()
  }

  // This is not an ideal implementation of infinite scrolling. Ideally, the
  // content should be updated through the scroll view, while not increasing
  // the number of DOM elements. As elements in the DOM increase, there
  // is an increase in memory on the client. This is of special concern for
  // mobile users.
  paginateJobs = entries => {
    if (isIntersection(entries)) {
      const updateBegin = this.state.jobSetBegin + PAGE_SIZE;
      this.setState(state => ({
        jobSetBegin: updateBegin,
        visibleJobs: getJobPage(state.jobsList, updateBegin)
      }));
    }
  };

  render() {
    return (
      <div className="App">
        <JobList paginateJobs={this.paginateJobs} jobs={this.state.visibleJobs} />
      </div>
    );
  }
}

const matchDispatchToProps = dispatch => ({
  getMatchingJobListings(query) {
    dispatch(getJobsList(query));
  }
});

const mapStateToProps = ({ jobsList }) => ({ jobsList });

export default connect(mapStateToProps, matchDispatchToProps)(App);
