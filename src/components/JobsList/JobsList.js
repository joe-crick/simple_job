import React, { Component } from "react";
import JobThumbnail from "../JobThumbnail/JobThumbnail";
import { setJobToView } from "./jobs-list-actions";
import { connect } from "react-redux";

const BOTTOM_THRESHOLD = 5;

/**
 * @description Given a starting number returns a class name
 * based on the relationship of the starting number with the length
 * @param {number} index
 * @param {number} length
 * @returns {String}
 */
export function isSentinel(index, length) {
  let className = "";
  if (index === length - BOTTOM_THRESHOLD) className = "sentinel";
  return className;
}

/**
 * @description Given an array of jobsList, returns their length. If the input value is
 * falsy, returns zero.
 * @param {?Array<JobThumbnail>} jobThumbnails
 */
export function jobCount(jobThumbnails) {
  return jobThumbnails ? jobThumbnails.length : 0;
}

export class JobList extends Component {
  state = {
    observer: {}
  };

  componentDidMount = () => {
    this.setState({
      observer: new IntersectionObserver(this.props.paginateJobs)
    });
  };

  // Placing the Intersection observer in JobsList, so that it updates
  // observing the sentinel after the contents of the JobThumbnail List have rendered.
  componentDidUpdate = () => {
    const { observer } = this.state;
    const sentinel = document.querySelector(".sentinel");
    if (sentinel) observer.observe(sentinel);
  };

  viewJobDetails = event => {
    event.preventDefault();
    this.props.selectJob(event.target.dataset.id);
    this.props.history.push("/job-details");
  };

  render = () => {
    const { jobs } = this.props;

    return (
      <section className="Jobs">
        {jobs ? (
          jobs.map((job, index) => (
            <JobThumbnail
              sentinelMarker={isSentinel(index, jobCount(jobs))}
              key={job.id}
              companyName={job.companyName}
              companyLogo={job.companyLogo}
              description={job.description}
              datePosted={job.datePosted}
              jobId={job.id}
              viewJobDetails={this.viewJobDetails}
            />
          ))
        ) : (
          <div className="no-jobs">No jobs found</div>
        )}
      </section>
    );
  };
}

const mapStateToProps = ({ jobsList }) => ({ jobsList });

const mapDispatchToProps = dispatch => ({
  selectJob: id => dispatch(setJobToView(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(JobList);
