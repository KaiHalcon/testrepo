import { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Layout } from "antd";
import { Login } from "./containers/Login";
import { Home } from "./home";
import "./styles.scss";

export const App = () => {
  const { Content } = Layout;
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // create useState for authentication checking pass isLoggedIn in useState
  const something = sessionStorage.getItem("isLoggedIn");

  useEffect(() => {
    if (something === "true") {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <Layout>
      <header>
        <h1>KAIBER'S STORAGE SYSTEM</h1>
      </header>
      <Content>
        <Switch>
          <Route path="/login">
            {isAuthenticated ? (
              <Redirect to="/home" />
            ) : (
              <Login onLogin={() => setIsAuthenticated(true)} />
            )}
          </Route>
        </Switch>
        <Switch>
          <Route path="/">
            {isAuthenticated ? <Home /> : <Redirect to="/login" />}
          </Route>
        </Switch>
      </Content>
    </Layout>
  );
};
