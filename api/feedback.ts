// api
import axios from '.';

// types
import { FeedbackType } from 'tools/constants/feedback';

interface FeedbackBody {
  type: FeedbackType;
  description: string;
}

export const leaveFeedback = (data: FeedbackBody) =>
  axios
    .post('/api/v3/feedback', data)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));
