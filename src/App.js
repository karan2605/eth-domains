import { useEffect, useState } from "react";
import { ethers } from "ethers";

// Components
import Navigation from "./components/Navigation";
import Search from "./components/Search";
import Domain from "./components/Domain";

// ABIs
import ETHDomains from "./abis/ETHDomains.json";

// Config
import config from "./config.json";

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);

  const [ethDomains, setethDomains] = useState(null);
  const [domains, setDomains] = useState([]);

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);

    const network = await provider.getNetwork();
    const ethDomains = new ethers.Contract(
      config[network.chainId].ETHDomains.address,
      ETHDomains,
      provider
    );
    setethDomains(ethDomains);

    const maxSupply = await ethDomains.maxSupply();
    const domains = [];

    for (var i = 1; i <= maxSupply; i++) {
      const domain = await ethDomains.getDomain(i);
      domains.push(domain);
    }

    setDomains(domains);

    window.ethereum.on("accountsChanged", async () => {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = ethers.utils.getAddress(accounts[0]);
      setAccount(account);
    });
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <div className="flex flex-col">
      <Navigation account={account} setAccount={setAccount} />

      <div className="flex flex-col justify-center items-center gap-4">
        <Search />
        <h2 className="text-5xl">Why you need a domain name.</h2>
        <p className="text-3xl">
          Own your custom username, use it across services, and be able to store
          an avatar and other profile data.
        </p>

        <hr />

        <div className="flex-col w-1/3 gap-4">
          {domains.map((domain, index) => (
            <Domain
              domain={domain}
              ethDomains={ETHDomains}
              provider={provider}
              id={index + 1}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
