import requestMethods from "@/api/request-methods";

export const userProfileApi = {
  editBio: {
    method: requestMethods.put,
    path: () => `/user/profile/bio`,
    okMessage: `User bio is updated`,
  },
}
