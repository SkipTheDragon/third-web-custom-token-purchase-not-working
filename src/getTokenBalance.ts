import {NATIVE_TOKEN_ADDRESS, NewDirectListing, ThirdwebSDK} from "@thirdweb-dev/sdk";

export default async function (accountPrivateKey: string, customTokenAddress: string) {
    const sdk = ThirdwebSDK.fromPrivateKey(accountPrivateKey, "avalanche-fuji");
    const token = await sdk.getContract(customTokenAddress, "token");

    return await token.balanceOf(await sdk.getSigner()?.getAddress() as string);
}