import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// It is used to define our endpoints and allow to create the API slice
export const authApi = createApi({
    // The unique key that defines where the Redux store will store our cache.
    reducerPath: 'authApi',

    // The base query to request data.
    // RTK Query ships with fetchBaseQuery, which is a lightweight fetch wrapper that automatically handles request headers and response parsing in a manner similar to common libraries like axios.
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/',
    }),

    // The set of operations that we want to perform against the server.
    endpoints: (builder) => ({

        userLoginRTQ: builder.mutation({
            query: (payload) => {
                return {
                    url: `api/user/login/`,
                    method: 'POST',
                    // body: JSON.stringify(payload),
                    body: payload,

                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            }
        }),

        createNewUserAccount: builder.mutation({
            query: (payload) => {
                return {
                    url: `api/user/register/`,
                    method: 'POST',
                    body: payload,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            }
        }),
        getUserProfile: builder.query({
            query: (payload) => {
                return {
                    url: `api/user/profile/`,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${payload}`
                    }
                }
            }
        }

        )
    }),


})

// Export hooks for usage in functional components, which are auto-generated based on the defined endpoints
export const { useUserLoginRTQMutation, useCreateNewUserAccountMutation, useGetUserProfileQuery } = authApi