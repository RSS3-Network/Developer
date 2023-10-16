// @ts-ignore
import { configureClientSIWE } from "connectkit-next-siwe";

export const siweClient = configureClientSIWE({
  apiRoutePrefix: "https://gateway.dev.rss3.io/users/siwe",
  statement: "Sign In With Ethereum to prove you control this wallet.",
});
