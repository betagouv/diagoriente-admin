import { Job } from 'requests';

const getRankAverage = (jobs: Job[]): number => {

  const initialValue = 0;

  const sum = jobs.reduce((accumulator: number, currentValue: Job): number => accumulator + currentValue.jobRank, initialValue);

  return sum / jobs.length;
};
export default getRankAverage;
