import classes from "./StartingPageContent.module.css";
import AuthContext from "../../store/auth-context";
import { useContext } from "react";
import { Link } from "react-router-dom";

const StartingPageContent = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <section className={classes.starting}>
      <h1>Welcome on Board!</h1>
      {isLoggedIn && <Link to="/pomo">Pomodoro</Link>}
    </section>
  );
};

export default StartingPageContent;
