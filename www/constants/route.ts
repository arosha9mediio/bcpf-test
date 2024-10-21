import { UserRoles } from "./enums";

export const RoutePaths = {
  home: {
    value: "/home",
  },
  signIn: {
    value: "/sign-in",
  },
  mypage: {
    value: "/mypage",
    roles: [UserRoles.ADMIN, UserRoles.TEACHER, UserRoles.USER],
  },
  adminHome: {
    value: "/admin/home",
    roles: [UserRoles.ADMIN],
  },
  adminFeature: {
    value: "/admin/feature",
    roles: [UserRoles.ADMIN],
  },
  adminSlider: {
    value: "/admin/slider",
    roles: [UserRoles.ADMIN],
  },
  adminTicker: {
    value: "/admin/ticker",
    roles: [UserRoles.ADMIN],
  },
  adminNotice: {
    value: "/admin/notice",
    roles: [UserRoles.ADMIN],
  },
  adminPress: {
    value: "/admin/press",
    roles: [UserRoles.ADMIN],
  },
  adminPage: {
    value: "/admin/page",
    roles: [UserRoles.ADMIN],
  },
  adminUsers: {
    value: "/admin/users",
    roles: [UserRoles.ADMIN],
  },
  adminContest: {
    value: "/admin/contest",
    roles: [UserRoles.ADMIN],
  },
  addAdminSlider: {
    value: (sliderId: string | number) => `/admin/slider/${sliderId}`,
    roles: [UserRoles.ADMIN],
  },
  adminHomeMainSlider: {
    value: "/admin/home-main-slider",
    roles: [UserRoles.ADMIN],
  },
  addAdminHomeMainSlider: {
    value: (sliderId: string | number) => `/admin/home-main-slider/${sliderId}`,
    roles: [UserRoles.ADMIN],
  },
  updateAdminHomeMainSliderTitleAndDescription: {
    value: `/admin/home-main-slider/tnd`,
    roles: [UserRoles.ADMIN],
  },
  addAdminDonation: {
    value: (sliderId: string | number) => `/admin/donation/${sliderId}`,
    roles: [UserRoles.ADMIN],
  },
  addAdminUser: {
    value: (userId: string | number) => `/admin/users/${userId}`,
    roles: [UserRoles.ADMIN],
  },
  addAdminFeature: {
    value: (sliderId: string | number) => `/admin/feature/${sliderId}`,
    roles: [UserRoles.ADMIN],
  },
  addAdminNotice: {
    value: (noticeId: string | number) => `/admin/notice/${noticeId}`,
    roles: [UserRoles.ADMIN],
  },
  addAdminPress: {
    value: (pressId: string | number) => `/admin/press/${pressId}`,
    roles: [UserRoles.ADMIN],
  },
  addAdminPage: {
    value: (pageId: string | number) => `/admin/page/${pageId}`,
    roles: [UserRoles.ADMIN],
  },
  adminBlog: {
    value: "/admin/blog",
    roles: [UserRoles.ADMIN],
  },
  adminDonation: {
    value: "/admin/donation",
    roles: [UserRoles.ADMIN],
  },
  addAdminContest: {
    value: (contestId: string | number) => `/admin/contest/${contestId}`,
    roles: [UserRoles.ADMIN],
  },
  adminApplicant: {
    value: "/admin/applicant",
    roles: [UserRoles.ADMIN],
  },
  adminContestApplicant: {
    value: (contestId: string | number) => `/admin/applicant/${contestId}`,
    roles: [UserRoles.ADMIN],
  },
};

const privatePages = Object.values(RoutePaths)
  .filter((route: { value: string; roles?: string[] }) => route?.roles?.length)
  .map(route => route.value);

export { privatePages };
