import requestMethods from "@/api/request-methods";

export const userProfileApi = {
  editBio: {
    method: requestMethods.put,
    path: () => `/user/profile/bio`,
    okMessage: `User bio is updated`,
  },
  uploadProfileImage: {
    method: requestMethods.post,
    path: () => `/user/profile/image`,
    okMessage: `User profile image is updated`,
    isRequestCustom: true,
  },
}
