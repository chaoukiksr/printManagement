

export const redirectBaseOnRole = (role, router) => {
  if (role === "admin" || role === "department") {
    router.push("/admin");
  } else if (role === "teacher") {
    router.push("/teacher");
  } else if (role === "printer") {
    router.push("/printer");
  }
};
