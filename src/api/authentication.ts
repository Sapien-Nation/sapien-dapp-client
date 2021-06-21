import { authInstance } from '.';

export const changePassword = async ({
  password,
  token,
}: {
  password: string;
  token: string;
}) => {
  try {
    await authInstance.post('/api/v3/user/reset-password', {
      password,
      token,
    });
  } catch ({ response }) {
    return Promise.reject(response.data.message);
  }
};

export const forgot = async (email: string) => {
  try {
    await authInstance.post('/api/v3/user/forgot-password', {
      email,
    });
  } catch ({ response }) {
    return Promise.reject(response.data.message);
  }
};

export const logout = async (body: { email: string }) => {
  try {
    await authInstance.post('/api/v3/auth/logout', body);
  } catch ({ response }) {
    return Promise.reject(response.data.message);
  }
};

export const login = async (body: {
  email: string;
  password: string;
  redirect: string;
  client: string;
}): Promise<{ token: string; torus: string }> => {
  try {
    const { data } = await authInstance.post('/api/v3/auth/login', body);
    return { torus: data.torus, token: data.token };
  } catch ({ response }) {
    return Promise.reject(response.data.message);
  }
};

export const register = async (body: {
  email: string;
  password: string;
  redirect: string;
  client: string;
}): Promise<{ token: string; torus: string }> => {
  try {
    const { data } = await authInstance.post('/api/v3/auth/signup', body);
    return { torus: data.torus, token: data.token };
  } catch ({ response }) {
    return Promise.reject(response.data.message);
  }
};

export const verifyUser = async (token: string) => {
  try {
    await authInstance.post('/api/v3/user/verify-user-email', { token });
  } catch ({ response }) {
    return Promise.reject(response.data.message);
  }
};
