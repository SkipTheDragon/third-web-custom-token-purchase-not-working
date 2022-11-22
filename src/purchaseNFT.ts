import {ThirdwebSDK} from "@thirdweb-dev/sdk";

export default async function (privateKey: string, nftMarketplaceAddress: string, listingId: string, quantityDesired: number = 1) {
    const sdk = ThirdwebSDK.fromPrivateKey(privateKey, "avalanche-fuji");

    // access your deployed contracts
    const contract = await sdk.getContract(nftMarketplaceAddress, "marketplace");

    const result = await contract.direct.buyoutListing(listingId, quantityDesired);

    console.log(result);
    
    return result;
}
