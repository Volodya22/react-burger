import { ApiResponse, BurgerIngredient, IngredientsRequestResult, Order, OrderRequest, AuthResponse, GetUserResponse, LoginData, UserFullData, ResetPasswordData, OrderResponse } from "../models";
import { AccessTokenKey, RefreshTokenKey } from "../services/auth/reducer";

const ApiUrl: string = "https://norma.nomoreparties.space/api/";

const checkResponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const refreshToken = () => {
  return fetch(`${ApiUrl}auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem(RefreshTokenKey),
    }),
  })
  .then(checkResponse)
  .then((refreshData) => {
    if (!refreshData.success) {
      return Promise.reject(refreshData);
    }

    localStorage.setItem(RefreshTokenKey, refreshData.refreshToken);
    localStorage.setItem(AccessTokenKey, refreshData.accessToken);

    return refreshData;
  });
};

async function fetchWithRefresh<T>(url: string, options: RequestInit): Promise<T> {
  try {
    const res = await fetch(`${ApiUrl}${url}`, options);
    return await checkResponse(res);
  } catch (err: any) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();
      const headers = options?.headers ? new Headers(options.headers) : new Headers();
    
      if (!headers.has("Authorization")) {
          headers.set("Authorization", refreshData.accessToken);
      }

      options.headers = headers;

      const res = await fetch(url, options);

      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

function checkSuccess(res: ApiResponse) {
  if (res && res.success) {
    return res;
  }

  return Promise.reject(`Ошибка: ${res} не имеет статус success`);
}

function request<T>(url: string, options: RequestInit | undefined = undefined): Promise<T> {
  return fetch(`${ApiUrl}${url}`, options)
    .then(checkResponse)
    .then(checkSuccess)
    .then(res => {
      return res as T;
    });
}

export const getIngredientsData = async (): Promise<BurgerIngredient[]> => {
  const result = await request<IngredientsRequestResult>('ingredients')
  return result.data
}

export const createNewOrder = async (orderRequest: OrderRequest): Promise<Order> => {
  return await fetchWithRefresh<Order>('orders', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      "Authorization": localStorage.getItem(AccessTokenKey)!
    },
    body: JSON.stringify(orderRequest)
  })
}

export const resetPassword = async (email: string): Promise<ApiResponse> => {
  return await request<ApiResponse>(`password-reset`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  })
}

export const resetPasswordFinish = async (data: ResetPasswordData): Promise<ApiResponse> => {
  return await request<ApiResponse>(`password-reset/reset`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
}

export const register = async (data: UserFullData): Promise<AuthResponse> => {
  return await request<AuthResponse>(`auth/register`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
}

export const login = async (data: LoginData): Promise<AuthResponse> => {
  return await request<AuthResponse>(`auth/login`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
}

export const logout = async (token: string): Promise<ApiResponse> => {
  return await request<ApiResponse>(`auth/logout`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token })
  })
}

export const getUser = async (): Promise<GetUserResponse> => {
  return await fetchWithRefresh<GetUserResponse>('auth/user', {
    method: "GET",
    headers: {
      "Authorization": localStorage.getItem(AccessTokenKey)!
    }
  })
}

export const updateUser = async (data: UserFullData): Promise<GetUserResponse> => {
  return await fetchWithRefresh<GetUserResponse>('auth/user', {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      "Authorization": localStorage.getItem(AccessTokenKey)!
    },
    body: JSON.stringify(data)
  })
}

export const getOrder = async (number: string): Promise<OrderResponse> => {
  return await fetchWithRefresh<OrderResponse>(`orders/${number}`, {
    method: "GET",
    headers: {
      "Authorization": localStorage.getItem(AccessTokenKey)!
    }
  })
}
