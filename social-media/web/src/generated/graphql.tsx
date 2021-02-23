import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  user?: Maybe<User>;
  tweets: Array<Tweet>;
  getTweet?: Maybe<Tweet>;
};


export type QueryUserArgs = {
  username: Scalars['String'];
};


export type QueryGetTweetArgs = {
  id: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  username: Scalars['String'];
  tweets: Array<Tweet>;
};

export type Tweet = {
  __typename?: 'Tweet';
  id: Scalars['ID'];
  text: Scalars['String'];
  creator: User;
  replies: Array<Reply>;
  createdAt: Scalars['DateTime'];
};

export type Reply = {
  __typename?: 'Reply';
  id: Scalars['String'];
  text: Scalars['String'];
  parent: Tweet;
  creator: User;
  createdAt: Scalars['DateTime'];
};


export type Mutation = {
  __typename?: 'Mutation';
  login: UserResponse;
  register: UserResponse;
  logout: Scalars['Boolean'];
  tweet: Tweet;
  reply: Reply;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationTweetArgs = {
  text: Scalars['String'];
};


export type MutationReplyArgs = {
  text: Scalars['String'];
  tweetId: Scalars['ID'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  user?: Maybe<User>;
  errors?: Maybe<Array<FieldError>>;
};

export type FieldError = {
  __typename?: 'FieldError';
  email?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type RegisterInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type RegularTweetFragment = (
  { __typename?: 'Tweet' }
  & Pick<Tweet, 'id' | 'text'>
  & { creator: (
    { __typename?: 'User' }
    & RegularUserFragment
  ) }
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username'>
);

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & RegularUserFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'username' | 'password'>
    )>> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & RegularUserFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'email' | 'username' | 'password'>
    )>> }
  ) }
);

export type ReplyMutationVariables = Exact<{
  tweetId: Scalars['ID'];
  text: Scalars['String'];
}>;


export type ReplyMutation = (
  { __typename?: 'Mutation' }
  & { reply: (
    { __typename?: 'Reply' }
    & Pick<Reply, 'id' | 'text'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'username'>
    ) }
  ) }
);

export type TweetMutationVariables = Exact<{
  text: Scalars['String'];
}>;


export type TweetMutation = (
  { __typename?: 'Mutation' }
  & { tweet: (
    { __typename?: 'Tweet' }
    & RegularTweetFragment
  ) }
);

export type GetTweetQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetTweetQuery = (
  { __typename?: 'Query' }
  & { getTweet?: Maybe<(
    { __typename?: 'Tweet' }
    & Pick<Tweet, 'text'>
    & { creator: (
      { __typename?: 'User' }
      & RegularUserFragment
    ), replies: Array<(
      { __typename?: 'Reply' }
      & Pick<Reply, 'id' | 'text'>
      & { creator: (
        { __typename?: 'User' }
        & Pick<User, 'username'>
      ) }
    )> }
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type TweetsQueryVariables = Exact<{ [key: string]: never; }>;


export type TweetsQuery = (
  { __typename?: 'Query' }
  & { tweets: Array<(
    { __typename?: 'Tweet' }
    & RegularTweetFragment
  )> }
);

export type UserQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
    & { tweets: Array<(
      { __typename?: 'Tweet' }
      & Pick<Tweet, 'id' | 'text' | 'createdAt'>
    )> }
  )> }
);

export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
}
    `;
export const RegularTweetFragmentDoc = gql`
    fragment RegularTweet on Tweet {
  id
  text
  creator {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    user {
      ...RegularUser
    }
    errors {
      username
      password
    }
  }
}
    ${RegularUserFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($input: RegisterInput!) {
  register(input: $input) {
    user {
      ...RegularUser
    }
    errors {
      email
      username
      password
    }
  }
}
    ${RegularUserFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const ReplyDocument = gql`
    mutation Reply($tweetId: ID!, $text: String!) {
  reply(tweetId: $tweetId, text: $text) {
    id
    text
    creator {
      username
    }
  }
}
    `;
export type ReplyMutationFn = Apollo.MutationFunction<ReplyMutation, ReplyMutationVariables>;

/**
 * __useReplyMutation__
 *
 * To run a mutation, you first call `useReplyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReplyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [replyMutation, { data, loading, error }] = useReplyMutation({
 *   variables: {
 *      tweetId: // value for 'tweetId'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useReplyMutation(baseOptions?: Apollo.MutationHookOptions<ReplyMutation, ReplyMutationVariables>) {
        return Apollo.useMutation<ReplyMutation, ReplyMutationVariables>(ReplyDocument, baseOptions);
      }
export type ReplyMutationHookResult = ReturnType<typeof useReplyMutation>;
export type ReplyMutationResult = Apollo.MutationResult<ReplyMutation>;
export type ReplyMutationOptions = Apollo.BaseMutationOptions<ReplyMutation, ReplyMutationVariables>;
export const TweetDocument = gql`
    mutation Tweet($text: String!) {
  tweet(text: $text) {
    ...RegularTweet
  }
}
    ${RegularTweetFragmentDoc}`;
export type TweetMutationFn = Apollo.MutationFunction<TweetMutation, TweetMutationVariables>;

/**
 * __useTweetMutation__
 *
 * To run a mutation, you first call `useTweetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTweetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [tweetMutation, { data, loading, error }] = useTweetMutation({
 *   variables: {
 *      text: // value for 'text'
 *   },
 * });
 */
export function useTweetMutation(baseOptions?: Apollo.MutationHookOptions<TweetMutation, TweetMutationVariables>) {
        return Apollo.useMutation<TweetMutation, TweetMutationVariables>(TweetDocument, baseOptions);
      }
export type TweetMutationHookResult = ReturnType<typeof useTweetMutation>;
export type TweetMutationResult = Apollo.MutationResult<TweetMutation>;
export type TweetMutationOptions = Apollo.BaseMutationOptions<TweetMutation, TweetMutationVariables>;
export const GetTweetDocument = gql`
    query GetTweet($id: ID!) {
  getTweet(id: $id) {
    text
    creator {
      ...RegularUser
    }
    replies {
      id
      text
      creator {
        username
      }
    }
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useGetTweetQuery__
 *
 * To run a query within a React component, call `useGetTweetQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTweetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTweetQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTweetQuery(baseOptions: Apollo.QueryHookOptions<GetTweetQuery, GetTweetQueryVariables>) {
        return Apollo.useQuery<GetTweetQuery, GetTweetQueryVariables>(GetTweetDocument, baseOptions);
      }
export function useGetTweetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTweetQuery, GetTweetQueryVariables>) {
          return Apollo.useLazyQuery<GetTweetQuery, GetTweetQueryVariables>(GetTweetDocument, baseOptions);
        }
export type GetTweetQueryHookResult = ReturnType<typeof useGetTweetQuery>;
export type GetTweetLazyQueryHookResult = ReturnType<typeof useGetTweetLazyQuery>;
export type GetTweetQueryResult = Apollo.QueryResult<GetTweetQuery, GetTweetQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const TweetsDocument = gql`
    query Tweets {
  tweets {
    ...RegularTweet
  }
}
    ${RegularTweetFragmentDoc}`;

/**
 * __useTweetsQuery__
 *
 * To run a query within a React component, call `useTweetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTweetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTweetsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTweetsQuery(baseOptions?: Apollo.QueryHookOptions<TweetsQuery, TweetsQueryVariables>) {
        return Apollo.useQuery<TweetsQuery, TweetsQueryVariables>(TweetsDocument, baseOptions);
      }
export function useTweetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TweetsQuery, TweetsQueryVariables>) {
          return Apollo.useLazyQuery<TweetsQuery, TweetsQueryVariables>(TweetsDocument, baseOptions);
        }
export type TweetsQueryHookResult = ReturnType<typeof useTweetsQuery>;
export type TweetsLazyQueryHookResult = ReturnType<typeof useTweetsLazyQuery>;
export type TweetsQueryResult = Apollo.QueryResult<TweetsQuery, TweetsQueryVariables>;
export const UserDocument = gql`
    query User($username: String!) {
  user(username: $username) {
    id
    username
    tweets {
      id
      text
      createdAt
    }
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;