const authPermission = (...requiredRoles) => {
  console.log("roles", requiredRoles);

  return async (req, res, next) => {
    try {
      const token = req.cookies.jwt;

      if (!token) {
        // throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized')
        console.log("Not token");
      }

      let verifiedUser = null;

      // verifiedUser = jwtHelpers.verifyToken(token, process.env.ACCESS_TOKEN_SECRET)

      const secret = process.env.ACCESS_TOKEN_SECRET;

      verifiedUser = (token, secret) => {
        return jwt.verify(token, secret);
      };

      req.user = verifiedUser;

      if (
        requiredRoles.length &&
        !requiredRoles.includes(verifiedUser?.roles)
      ) {
        // throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden')
        console.log(`${requiredRoles} not exists`);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = authPermission;
