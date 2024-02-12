const HEADER = {
  API_KEY: "x-api-key",
  CLIENT_ID: "x-client-id",
  AUTHORIZATION: "authorization",
  REFRESHTOKEN: "x-token-id",
};

const roles = [
  {
    code: "ROL1",
    value: "Quản trị viên",
  },
  {
    code: "ROL2",
    value: "Chủ tài sản",
  },
  {
    code: "ROL3",
    value: "Người môi giới",
  },
  {
    code: "ROL4",
    value: "Khách hàng",
  },
];

module.exports = {
  HEADER,
  roles,
};
