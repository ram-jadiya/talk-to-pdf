import { userPaths } from './auth.swagger';
import { paymentPaths } from './payment.swagger';
import { documentPaths } from './document.swagger';
import { queryPaths } from './query.swagger';

export const paths = {
  ...userPaths,
  ...paymentPaths,
  ...documentPaths,
  ...queryPaths,
};
