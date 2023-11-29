import { GetServerSideProps,  GetServerSidePropsContext,  GetServerSidePropsResult } from "next";
import { parseCookies, destroyCookie } from "nookies";
import { AuthtokenError } from "../services/errors/authTokenError";

export function canSSRAuth<P extends { [key: string]: any }>(
  fn: GetServerSideProps<P>
) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);
    const token = cookies["@nextAuth.token"];

    if (!token) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    try {
      return await fn(ctx);
    } catch (err) {
      if (err instanceof AuthtokenError) {
        destroyCookie(ctx, token);
      }

      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  };
}
