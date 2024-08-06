import { Button } from "antd";
import { logout } from "../../utils/auth";

export const LogoutButton = ({ setIsAuthenticated }) => {
  const handleLogout = () => {
    setIsAuthenticated(logout);
    window.location.href = "/login";
  };
  return (
    <Button
      className="button"
      style={{
        marginLeft: 10,
      }}
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};
