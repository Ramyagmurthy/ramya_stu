import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { LoginContext } from "./Context/LoginContext";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const logindetails = useContext(LoginContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (logindetails.roleId) {
          return <Component {...props} />;
        } else {
          return <Redirect to={{ pathname: "/" }} />;
        }
      }}
    ></Route>
  );
};
