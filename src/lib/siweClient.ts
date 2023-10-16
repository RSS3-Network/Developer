// @ts-ignore
import { configureClientSIWE } from "connectkit-next-siwe";

export const siweClient = configureClientSIWE({
  apiRoutePrefix: "/api/gateway/users/siwe",
  statement: "Sign In With Ethereum to prove you control this wallet.",
});
