export const sidebarLinks = [
  {
    imgURL: "/assets/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/assets/search.svg",
    route: "/search",
    label: "Search",
  },
  {
    imgURL: "/assets/heart-stroke.svg",
    route: "/activity",
    label: "Activity",
  },
  {
    imgURL: "/assets/create.svg",
    route: "/create-chirp",
    label: "Create Chirp",
  },
  {
    imgURL: "/assets/community.svg",
    route: "/circles",
    label: "Circles",
  },
  {
    imgURL: "/assets/user.svg",
    route: "/profile",
    label: "Profile",
  },
];

export const profileTabs = [
  { value: "chirps", label: "Chirps", icon: "/assets/reply-wt.svg" },
  { value: "followers", label: "Followers", icon: "/assets/follow-wt.svg" }, /* NEW */
  { value: "following", label: "Following", icon: "/assets/following-wt.svg" }, /* NEW */
  /* { value: "replies", label: "Replies", icon: "/assets/members-wt.svg" }, */
];

export const circleTabs = [
  { value: "chirps", label: "Chirps", icon: "/assets/reply-wt.svg" },
  { value: "members", label: "Members", icon: "/assets/members-wt.svg" },
];
