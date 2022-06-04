import Head from "next/head";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

function Home() {
  const { register, handleSubmit } = useForm();
  const { signIn } = useContext(AuthContext);

  async function handleSignIn(data) {
    await signIn(data);
  }

  return (
    <div>
      <Head>
        <title>Dinheiro em Dia</title>
      </Head>

      <form onSubmit={handleSubmit(handleSignIn)}>
        <div>
          <label htmlFor="email-address">
            Endereço de email
          </label>
          <input
            {...register("email")}
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </div>
        <div>
          <label htmlFor="password">
            Senha
          </label>
          <input
            {...register("password")}
            id="password"
            name="password"
            type="password"
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Home;
