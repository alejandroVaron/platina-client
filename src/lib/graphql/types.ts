type ProfileFromUser = {
  id: string;
  displayName: string;
  avatarUrl: string;
};

type ProfileFromUserQuery = {
  profileFromUser: ProfileFromUser;
};