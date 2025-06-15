export const login = import.meta.env.VITE_API_URL + "/api/v1/auth/admin/login";
export const refreshToken = import.meta.env.VITE_API_URL + "/api/v1/auth/refresh";

export const createUser = import.meta.env.VITE_API_URL + "/api/v1/auth/register";
export const showUser = import.meta.env.VITE_API_URL + "/api/v1/auth/users/list";
export const singleUser = import.meta.env.VITE_API_URL + "/api/v1/auth/users/";
export const updateUser = import.meta.env.VITE_API_URL + "/api/v1/auth/users/update/";
export const destroyUser = import.meta.env.VITE_API_URL + "/api/v1/auth/users/delete/";
export const UserStatus = import.meta.env.VITE_API_URL + "/api/v1/auth/users/status/";
export const UserVerified = import.meta.env.VITE_API_URL + "/api/v1/auth/users/verified/";

export const PremiumToolsCreate = import.meta.env.VITE_API_URL + "/api/v1/premium/tools";
export const PremiumToolsShow = import.meta.env.VITE_API_URL + "/api/v1/premium/tools";
export const PremiumToolsSingle = import.meta.env.VITE_API_URL + "/api/v1/premium/tools/";
export const PremiumToolsUpdate = import.meta.env.VITE_API_URL + "/api/v1/premium/tools/";
export const PremiumToolsDestroy = import.meta.env.VITE_API_URL + "/api/v1/premium/tools/";

export const AppointmentCreate = import.meta.env.VITE_API_URL + "/api/v1/appointment/schedule";
export const AppointmentShow = import.meta.env.VITE_API_URL + "/api/v1/appointment/schedule";
export const AppointmentSingle = import.meta.env.VITE_API_URL + "/api/v1/appointment/schedule/";
export const AppointmentUpdate = import.meta.env.VITE_API_URL + "/api/v1/appointment/schedule/";
export const AppointmentDestroy = import.meta.env.VITE_API_URL + "/api/v1/appointment/schedule/";

export const ContactFromCreate = import.meta.env.VITE_API_URL + "/api/v1/users/contact-form";
export const ContactFromShow = import.meta.env.VITE_API_URL + "/api/v1/users/contact-form";
export const ContactFromSingle = import.meta.env.VITE_API_URL + "/api/v1/users/contact-form/";
export const ContactFromUpdate = import.meta.env.VITE_API_URL + "/api/v1/users/contact-form/";
export const ContactFromDestroy = import.meta.env.VITE_API_URL + "/api/v1/users/contact-form/";

