// api
import axios from '.';

// types
import { FeedbackType } from 'tools/constants/feedback';

interface FeedbackBody {
  type: FeedbackType;
  message: string;
}

export const leaveFeedback = (data: FeedbackBody) =>
  axios
    .post('/core-api/feedback', data)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));
