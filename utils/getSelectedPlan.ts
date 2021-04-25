import { Route } from '@react-navigation/native';
import plans from '../data';

export default function ({
  params,
}: Route<
  'PlanDetails',
  {
    planId: string;
  }
>) {
  return plans.find(plan => params.planId === plan.id);
}
