// import { cookieStorage, createConfig, createStorage } from "wagmi-v2";
// import { http } from "viem";
// import { getChain } from "./chain";
// import { mainnet, sepolia } from "viem/chains";

// const chain = getChain();

// export const config = createConfig({
//   chains: [chain],
//   ssr: true,
//   storage: createStorage({
//     storage: cookieStorage,
//   }),
//   transports: {
//     [mainnet.id]: http(),
//     [sepolia.id]: http(),
//   },
// });
