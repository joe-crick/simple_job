import { jobData } from "./job-test-data";

export const fetchJobs = amount =>
  new Promise(resolve => setTimeout(() => resolve(jobData(amount)), 200));
