export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigInt: { input: any; output: any; }
  DateTime: { input: any; output: any; }
};

export type Achievement = {
  __typename?: 'Achievement';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['BigInt']['output'];
  platform: Platform;
  platformId: Scalars['ID']['output'];
  records: Array<AchievementRecord>;
  title: Scalars['String']['output'];
};

export type AchievementRecord = {
  __typename?: 'AchievementRecord';
  achievedAt: Scalars['DateTime']['output'];
  achievement: Achievement;
  achievementId: Scalars['BigInt']['output'];
  id: Scalars['BigInt']['output'];
  user: User;
  userId: Scalars['ID']['output'];
};

export type Follow = {
  __typename?: 'Follow';
  createdAt: Scalars['DateTime']['output'];
  follower: User;
  followerId: Scalars['ID']['output'];
  following: User;
  followingId: Scalars['ID']['output'];
  id: Scalars['BigInt']['output'];
};

export type Platform = {
  __typename?: 'Platform';
  achievements: Array<Achievement>;
  description: Scalars['String']['output'];
  icon: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type Profile = {
  __typename?: 'Profile';
  avatarUrl?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  preferredServer?: Maybe<Scalars['String']['output']>;
  user: User;
  userId: Scalars['ID']['output'];
};

export type Query = {
  __typename?: 'Query';
  achievement?: Maybe<Achievement>;
  achievementRecords: Array<AchievementRecord>;
  achievements: Array<Achievement>;
  follows: Array<Follow>;
  me?: Maybe<User>;
  platform?: Maybe<Platform>;
  platforms: Array<Platform>;
  profile?: Maybe<Profile>;
  profileFromUser?: Maybe<Profile>;
  profiles: Array<Profile>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryAchievementArgs = {
  id: Scalars['BigInt']['input'];
};


export type QueryPlatformArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProfileArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type User = {
  __typename?: 'User';
  achievements: Array<AchievementRecord>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  followers: Array<Follow>;
  following: Array<Follow>;
  id: Scalars['ID']['output'];
  password: Scalars['String']['output'];
  profile?: Maybe<Profile>;
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export type ProfileFromUserQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileFromUserQuery = { __typename?: 'Query', profileFromUser?: { __typename?: 'Profile', id: string, displayName?: string | null, avatarUrl?: string | null } | null };
