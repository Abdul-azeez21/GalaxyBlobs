import React, { Suspense } from "react";
//
import Navbar from "../components/Navbar";
import Web3 from "web3";
import Marquee from "react-fast-marquee";
import { Canvas } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, OrbitControls } from "@react-three/drei";

//
import { FaSpaceShuttle, FaEthereum, FaWallet } from "react-icons/fa";
import { GiFallingStar } from "react-icons/gi";

//images
import image1 from "../images/1.png";
import image2 from "../images/1.png";
import image3 from "../images/3.png";
import image4 from "../images/4.png";
import image5 from "../images/5.png";
import image6 from "../images/6.png";
import image7 from "../images/7.png";
import image8 from "../images/8.png";

var account = null;
var contract = null;

const ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_mintAmount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseExtension",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "cost",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxMintAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const ADDRESS = "0x79ffb3329d4e7231a6b5f20cd3fb68561dca5cc4";

async function connectwallet() {
  if (window.ethereum) {
    var web3 = new Web3(window.ethereum);
    await window.ethereum.send("eth_requestAccounts");
    var accounts = await web3.eth.getAccounts();
    account = accounts[0];
    document.getElementById("wallet-address").textContent = account;
    contract = new web3.eth.Contract(ABI, ADDRESS);
  }
}
async function mint() {
  if (window.ethereum) {
    var _mintAmount = Number(document.querySelector("[name=amount]").value);
    var mintRate = Number(await contract.methods.cost().call());
    var totalAmount = mintRate * _mintAmount;
    contract.methods
      .mint(account, _mintAmount)
      .send({ from: account, value: String(totalAmount) });
  }
}

const Home = () => {
  return (
    <div className="bg-black">
      <Navbar />
      <div className="bg-cover bg-hero-image bg-center bg-gray-600 h-[28rem]">
        <div className="flex items-center justify-center w-full h-full bg-gradient-to-t from-black via-transparent to-transparent">
          <div className="relative w-full h-full">
            {" "}
            <Canvas>
              <OrbitControls enablePan={true} enableZoom={false} />
              <ambientLight intensity={0.5} />
              <directionalLight position={[-2, 5, 2]} intensity={1} />
              <Suspense fallback={null}>
                <Sphere visible args={[1, 100, 200]} scale={1.7}>
                  <MeshDistortMaterial
                    color="#FFC0CB"
                    distort={0.5}
                    metalness={1.5}
                    roughness={2}
                  />
                </Sphere>
              </Suspense>
            </Canvas>
          </div>
          <div className="absolute">
            {" "}
            <h1 className="lg:text-6xl text-4xl font-bold text-white">
              Galaxy{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-500 ">
                Blobs
              </span>
            </h1>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center w-full h-full py-8">
        <div>
          <h1 className="lg:text-3xl text-lg text-white text-center font-semibold italic flex items-center justify-center mx-5">
            <FaSpaceShuttle className="h-3 w-3 text-white/50 rotate-180" />
            <span className="lg:px-2 md:px-2">
              Welcome to the galaxy of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-500 pl-1">
                blobs
              </span>
            </span>

            <FaSpaceShuttle className="h-3 w-3 text-white/50" />
          </h1>
          <p className="text-white text-center font-light lg:text-lg text-sm lg:mx-32 md:mx-32 mx-10 py-5">
            GXB is a collection of unique Galaxy Blob NFTs that lives in space
            (Ethereum blockchain). Each Galaxy Blob has characteristics that
            makes them unique. It is said that they originated from the tears of
            one of the rarest and most elite alien species in the galaxy.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center w-full h-full py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 xl:grid-cols-3 gap-8 lg:mx-16 md:mx-16 mx-5">
          {/* ... */}

          <div className="flex justify-center rounded-md bg-gray-800/25  p-5">
            <div>
              <div className="flex justify-center py-2">
                <div className="rounded-full border border-dashed border-indigo-700 h-10 w-10 flex justify-center items-center bg-indigo-700/25 text-center">
                  <GiFallingStar className="lg:h-5 lg:w-5 h-4 w-4 text-indigo-500 rotate-180" />
                </div>
              </div>
              <div className="flex justify-center lg:text-base text-sm text-white py-2">
                Each Galaxy Blob is unique and graphically generated. Their
                traits are of two catergories which are 'Gradient' and 'Plain'.
                Under these catergories, they exist in varieties of colors. Some
                blobs are rarer than others
              </div>
            </div>
          </div>

          {/* ... */}

          <div className="flex  justify-center rounded-md bg-gray-800/25  p-5">
            <div>
              <div className="flex justify-center py-2">
                <div className="rounded-full border border-dashed border-indigo-700 h-10 w-10 flex justify-center items-center bg-indigo-700/25 text-center">
                  <FaEthereum className="lg:h-5 lg:w-5 h-4 w-4 text-indigo-500" />
                </div>
              </div>
              <div className="flex justify-center lg:text-base text-sm text-white py-2">
                The blobs are stored as ERC-721 tokens on the ethereum
                blockchain and hosted on IPFS. Each blob costs 0.03 ETH.
              </div>
            </div>
          </div>

          {/* ... */}

          <div className="flex  justify-center rounded-md bg-gray-800/25  p-5">
            <div>
              <div className="flex justify-center py-2">
                <div className="rounded-full border border-dashed border-indigo-700 h-10 w-10 flex justify-center items-center bg-indigo-700/25 text-center">
                  <FaWallet className="lg:h-5 lg:w-5 h-4 w-4 text-indigo-500 " />
                </div>
              </div>
              <div className="flex justify-center lg:text-base text-sm text-white py-2">
                To Mint/access the Galaxy Blobs, you will need to connect to
                your MetaMask wallet.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center w-full h-full py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 xl:grid-cols-2 gap-8 w-full h-full lg:mx-16 md:mx-16 mx-5">
          {" "}
          <div className="flex justify-center items-center w-full h-full">
            <Canvas>
              <OrbitControls enablePan={true} enableZoom={false} />
              <ambientLight intensity={0.5} />
              <directionalLight position={[-2, 5, 2]} intensity={3} />
              <Suspense fallback={null}>
                <Sphere visible args={[1, 100, 200]} scale={2.2}>
                  <MeshDistortMaterial
                    color="#A855F7"
                    distort={0.5}
                    speed={3.5}
                    metalness={1.5}
                    roughness={2}
                  />
                </Sphere>
              </Suspense>
            </Canvas>
          </div>
          <div className="bg-cover bg-hero-image bg-center rounded-lg">
            <div className="lg:p-20 md:p-16 p-6 w-full h-full bg-gradient-to-r from-black/50 to-indigo-900/30 rounded-lg">
              <h1 className="flex items-center justify-center text-center text-white lg:text-3xl text-base font-normal py-3">
                Connect your wallet to mint Galaxy Blobs.
              </h1>
              <div className="flex justify-center items-center py-3">
                <button
                  onClick={connectwallet}
                  className="cursor-pointer bg-transparent hover:bg-indigo-700 border border-indigo-700 px-4 py-2 text-sm text-white font-normal"
                >
                  Connect Wallet
                </button>
              </div>
              <div
                className="border-b border-indigo-700 p-1 text-white text-center text-sm py-3"
                id="wallet-address"
              >
                <FaSpaceShuttle className="lg:h-4 lg:w-4 h-3 w-3 text-white/50" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center bg-gray-800/25 mx-5 rounded-md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-20 py-10">
          <div className="flex justify-center items-center p-3">
            <div>
              <h1 className="lg:text-4xl text-2xl text-center text-white font-semibold py-2">
                Mint Galaxy Blobs
              </h1>
              <h3 className="lg:text-xl text-base text-indigo-600 text-center font-semibold py-2">
                Only 1 Galaxy Blob can be minted per person
              </h3>
            </div>
          </div>
          <div className="flex justify-center items-center p-3">
            <div>
              <div>
                <button
                  onClick={mint}
                  className="cursor-pointer border border-indigo-800 hover:bg-indigo-800 py-2 px-20 text-sm text-white text-center font-medium my-2"
                >
                  Mint
                </button>
              </div>
              <p className="text-indigo-600 lg:text-lg text-sm text-center font-normal py-2">
                PRICE: <span className="text-white">0.03 ETH</span> each mint.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:text-7xl md:text-5xl text-2xl items-center justify-center flex py-3">
        <Marquee
          pauseOnHover
          speed={20}
          gradient={false}
          // gradientColor={[0, 0, 0]}
        >
          <div className="lg:w-40 md:w-32 w-16 object-contain px-1">
            <img src={image1} alt="Blob" className="rounded-md" />
          </div>
          <div className="lg:w-40 md:w-32 w-16 object-contain px-1">
            <img src={image2} alt="Blob" className="rounded-md" />
          </div>
          <div className="lg:w-40 md:w-32 w-16 object-contain px-1">
            <img src={image3} alt="Blob" className="rounded-md" />
          </div>
          <div className="lg:w-40 md:w-32 w-16 object-contain px-1">
            <img src={image4} alt="Blob" className="rounded-md" />
          </div>
          <div className="lg:w-40 md:w-32 w-16 object-contain px-1">
            <img src={image5} alt="Blob" className="rounded-md" />
          </div>
          <div className="lg:w-40 md:w-32 w-16 object-contain px-1">
            <img src={image6} alt="Blob" className="rounded-md" />
          </div>
          <div className="lg:w-40 md:w-32 w-16 object-contain px-1">
            <img src={image7} alt="Blob" className="rounded-md" />
          </div>
          <div className="lg:w-40 md:w-32 w-16 object-contain px-1">
            <img src={image8} alt="Blob" className="rounded-md" />
          </div>
          <div className="lg:w-40 md:w-32 w-16 object-contain px-1">
            <img src={image1} alt="Blob" className="rounded-md" />
          </div>
          <div className="lg:w-40 md:w-32 w-16 object-contain px-1">
            <img src={image2} alt="Blob" className="rounded-md" />
          </div>
          <div className="lg:w-40 md:w-32 w-16 object-contain px-1">
            <img src={image3} alt="Blob" className="rounded-md" />
          </div>
          <div className="lg:w-40 md:w-32 w-16 object-contain px-1">
            <img src={image4} alt="Blob" className="rounded-md" />
          </div>
          <div className="lg:w-40 md:w-32 w-16 object-contain px-1">
            <img src={image5} alt="Blob" className="rounded-md" />
          </div>
          <div className="lg:w-40 md:w-32 w-16 object-contain px-1">
            <img src={image6} alt="Blob" className="rounded-md" />
          </div>
          <div className="lg:w-40 md:w-32 w-16 object-contain px-1">
            <img src={image7} alt="Blob" className="rounded-md" />
          </div>
          <div className="lg:w-40 md:w-32 w-16 object-contain px-1">
            <img src={image8} alt="Blob" className="rounded-md" />
          </div>
          <div className="lg:w-40 md:w-32 w-16 object-contain px-1">
            <img src={image1} alt="Blob" className="rounded-md" />
          </div>
          <div className="lg:w-40 md:w-32 w-16 object-contain px-1">
            <img src={image2} alt="Blob" className="rounded-md" />
          </div>
          <div className="lg:w-40 md:w-32 w-16 object-contain px-1">
            <img src={image3} alt="Blob" className="rounded-md" />
          </div>
          <div className="lg:w-40 md:w-32 w-16 object-contain px-1">
            <img src={image4} alt="Blob" className="rounded-md" />
          </div>
        </Marquee>
      </div>

      {/* <div className="flex items-center justify-center">
        <div className="bg-gray-900 p-5 rounded-md m-5 shadow-2xl shadow-purple-900/50">
          <h3 className="lgxt-base text-white text-center font-medium">
            Please connect your wallet
          </h3>
          <div className="flex justify-center items-center py-1">
            <button
              onClick={connectwallet}
              className="rounded-md cursor-pointer bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 p-1 text-sm text-white font-medium"
            >
              Connect Wallet
            </button>
          </div>
          <div className="border border-purple-800 p-1">
            <h4 className="text-sm text-center text-white">Wallet Address</h4>
            <div
              className="border border-purple-800 p-1 text-white text-sm"
              id="wallet-address"
            ></div>
            <p className="text-white text-sm text-center py-1 px-1">
              Please select the amount of NFT to mint.
            </p>
            <div className="flex items-center justify-center">
              <div>
                <input
                  className="bg-gray-500 text-black my-1 lg:w-48 w-16"
                  type="number"
                  name="amount"
                  defaultValue="1"
                  min="1"
                  max="1"
                />
              </div>
            </div>
            <div className="flex justify-center items-center py-1">
              <button
                onClick={mint}
                className="cursor-pointer border border-purple-800 hover:bg-purple-800 py-1 px-7 text-sm text-white font-medium"
              >
                Mint
              </button>
            </div>
            <p className="t-white text-center">PRICE: 0.03 ETH each mint.</p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Home;
