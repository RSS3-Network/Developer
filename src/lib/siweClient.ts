// @ts-ignore
import { configureClientSIWE } from "connectkit-next-siwe";

export const siweClient = configureClientSIWE({
  // apiRoutePrefix: "/api/siwe", // TODO
  statement: "Sign In With Ethereum to prove you control this wallet.",
});
