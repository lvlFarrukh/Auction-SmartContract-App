import Web3 from "web3";
import "bootstrap/dist/css/bootstrap.css";
import configuration from "../build/contracts/Ballot.json";
import jsonData from "./proposals.json";

const CONTRACT_ADDRESS = configuration.networks["5777"].address;
const CONTRACT_ABI = configuration.abi;

const web3 = new Web3(
  Web3.givenProvider || new Web3.providers.HttpProvider("http://127.0.0.1:7545")
);
const web3Provider = web3.currentProvider;

const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

let account;
const accountElt = document.getElementById("enter_address");
const accountRegistration = document.getElementById("enter_address1");

// const handleRegister = async (addr) => {
//   try {
//     const chairPerson = 
//   } catch (err) {
//     console.error(err);
//     alert(`${addr} account registration failed`);
//   }
// }

const getChainperson = async () => {
  contract.methods.chairperson().call((error, result) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Chairperson address:", result);
    }
  });
}

const main = async () => {
  const accounts = await web3.eth.requestAccounts();
  console.log(accounts);
  accounts.forEach((account) => {
    let option = document.createElement("option");
    option.text = `${account.slice(0, 5)}...${account.slice(
      account.length - 4
    )}`;
    option.value = account;

    // Append the option to the first element
    accountElt.appendChild(option);

    // Clone the option element and append it to the second element
    let clonedOption = option.cloneNode(true);
    accountRegistration.appendChild(clonedOption);

    // loadProposals()
  });

  getChainperson()
};

main();
// getitemsForProposal()
