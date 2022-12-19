import { ethers } from "ethers";
import logo from "../assets/logo.svg";

import { Navbar, Button } from "flowbite-react";

const Navigation = ({ account, setAccount }) => {
  const connectHandler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = ethers.utils.getAddress(accounts[0]);
    setAccount(account);
  };

  return (
    <Navbar fluid={true} rounded={true}>
      <Navbar.Brand className="flex gap-4">
        <img src={logo} alt="Logo" />
        <h1 className="text-3xl">ETH Domains</h1>
      </Navbar.Brand>
      <Navbar.Collapse>
        <Navbar.Link href="/">Domain Names</Navbar.Link>
        <Navbar.Link href="/">Websites & Hosting</Navbar.Link>
        <Navbar.Link href="/">Commerce</Navbar.Link>
        <Navbar.Link href="/">Email & Marketing</Navbar.Link>
      </Navbar.Collapse>
      <div className="flex md:order-2">
        {account ? (
          <Button gradientDuoTone="purpleToBlue" size={"lg"}>
            {account.slice(0, 6) + "..." + account.slice(38, 42)}
          </Button>
        ) : (
          <Button
            onClick={connectHandler}
            gradientDuoTone="purpleToBlue"
            size={"lg"}
          >
            Connect
          </Button>
        )}
      </div>
    </Navbar>
  );
};

export default Navigation;
