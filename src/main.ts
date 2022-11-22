import { Web3Provider } from '@ethersproject/providers';
import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { ethers } from 'ethers';
import getTokenBalance from './getTokenBalance';
import { listForSale } from './listForSale';
import purchaseNFT from './purchaseNFT';
import './style.css'
import typescriptLogo from './typescript.svg'


const customTokenAddress = "";
const nftMarketplaceAddress = "";
const nftToSell = ""; // ERC-721
const accountToSellNFT = "";
const accountToBuyNFT = "";

let listingId = 0;

console.log("Seller Balance", await getTokenBalance(accountToSellNFT,customTokenAddress));
console.log("Buyer Balance", await getTokenBalance(accountToBuyNFT,customTokenAddress));

const contract = await ThirdwebSDK.fromPrivateKey(accountToSellNFT, "avalanche-fuji").getContract(nftMarketplaceAddress, "marketplace");
console.log(await contract.direct.getListing(listingId));

function render() {
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div>
      <a href="https://vitejs.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a>
      <a href="https://www.typescriptlang.org/" target="_blank">
        <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
      </a>
      <h1>Vite + TypeScript</h1>
      <div class="card">
        Current Listing Id: ${listingId}
        <button id="sell" type="button">Sell NFT</button>
        <button id="buy" type="button">Buy NFT</button>
      </div>
      <p class="read-the-docs">
        Check Developer Tools please 🤞
      </p>
    </div>
  `;

  
  (document.getElementById("sell") as HTMLButtonElement).onclick = () => {
    console.log("Listing NFT!");
    listForSale(accountToSellNFT, "1", "", "60", "1", customTokenAddress, nftMarketplaceAddress, "1", nftToSell).then(async (result) => {
      console.log("NFT LISTED!");
      listingId = result.id.toNumber();

      console.log("Seller Balance", await getTokenBalance(accountToSellNFT,customTokenAddress));
      console.log("Buyer Balance", await getTokenBalance(accountToBuyNFT,customTokenAddress));

      render();
    })
  }

  (document.getElementById("buy") as HTMLButtonElement).onclick = () => {
    console.log("Buying NFT!");
    purchaseNFT(accountToBuyNFT,nftMarketplaceAddress, listingId.toString(), 1).then(async () => {
        console.log("NFT PURCHASED!");

        console.log("Seller Balance", await getTokenBalance(accountToSellNFT,customTokenAddress));
        console.log("Buyer Balance", await getTokenBalance(accountToBuyNFT,customTokenAddress));
    })
  }
}

render();
