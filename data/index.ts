import pushPullLegs from './pushPullLegs';
import pushPull from './pushPull';

export default [pushPull, pushPullLegs];

// get workout by index
pushPullLegs.workouts[0];
// in case this is too slow, each week could be an object with corresponding keys for each workout e.g. workouts.week1.legs1
