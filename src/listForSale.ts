import {NATIVE_TOKEN_ADDRESS, NewDirectListing, ThirdwebSDK} from "@thirdweb-dev/sdk";

/**
 * List the NFT for sale
 * @param signer The Wallet.
 * @param price
 * @param timestamp
 * @param duration
 * @param quantity
 * @param currencyAddress
 * @param nftAddress The NFT the user wants to list.
 * @param nftMarketplaceAddress The Marketplace where we want to list the NFT.
 * @param tokenid The token to list for sale.
 */
export async function listForSale(privateKey: string, price: string, timestamp: string, duration: string, quantity: string, currencyAddress: string, nftMarketplaceAddress:string, tokenid: string, nftAddress: string) {
    const sdk = ThirdwebSDK.fromPrivateKey(privateKey, "avalanche-fuji");
    // access your deployed contracts
    const contract = await sdk.getContract(nftMarketplaceAddress, "marketplace");

    const tNow = new Date(Date.now());
    let startTimestamp = tNow;

    if (timestamp !== "") {
        startTimestamp = new Date(timestamp);
        startTimestamp.setHours(tNow.getHours())
        startTimestamp.setMinutes(tNow.getMinutes())
        startTimestamp.setSeconds(tNow.getSeconds())
    }

    let currencyContractAddress = NATIVE_TOKEN_ADDRESS;

    if (currencyAddress !== "native" && currencyAddress !== "") {
        currencyContractAddress = currencyAddress;
    }

    // Data of the listing you want to create
    const listing: NewDirectListing = {
        // address of the contract the asset you want to list is on
        assetContractAddress: nftAddress,
        // token ID of the asset you want to list
        tokenId: tokenid,
        // when should the listing open up for offers
        startTimestamp: startTimestamp,
        // how long the listing will be open for
        listingDurationInSeconds: parseInt(duration) * 60,
        // how many of the asset you want to list
        quantity: quantity,
        // address of the currency contract that will be used to pay for the listing
        currencyContractAddress: currencyContractAddress,
        // how much the asset will be sold for
        buyoutPricePerToken: price,
    };
    const result = await contract.direct.createListing(listing);

    console.log(result);

    return result;
}
