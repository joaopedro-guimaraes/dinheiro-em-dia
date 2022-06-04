import { useContext } from "react";
import { parseCookies } from "nookies";

import { AuthContext } from "../contexts/AuthContext";
import { getAPIClient } from "../services/axios";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <h1>Dashboard</h1>
      {user && (
        <>
          <p>{user.email}</p>
          <p>{user.name}</p>
        </>
      )}
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  // console.log(ctx.req.cookies);
  const { ["dinheiro-em-dia.token"]: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
};
