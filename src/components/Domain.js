import { useEffect, useState } from "react";
import { ethers } from "ethers";

import { Card, Button, Badge } from "flowbite-react";

const Domain = ({ domain, ethDomains, provider, id }) => {
  const [owner, setOwner] = useState(null);
  const [hasSold, setHasSold] = useState(false);

  const getOwner = async () => {
    if (domain.isOwned || hasSold) {
      const owner = await ethDomains.ownerOf(id);
      setOwner(owner);
    }
  };

  const buyHandler = async () => {
    const signer = await provider.getSigner();
    const transaction = await ethDomains
      .connect(signer)
      .mint(id, { value: domain.cost });
    await transaction.wait();

    setHasSold(true);
  };

  useEffect(() => {
    getOwner();
  }, [hasSold]);

  return (
    <Card>
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl">
          {domain.isOwned || owner ? (
            <del className="text-red-600">{domain.name}</del>
          ) : (
            <p className="text-green-500">{domain.name}</p>
          )}
        </h3>

        <p className="text-xl">
          {domain.isOwned || owner ? (
            <>
              
                Owned by:
                <br />
                <Badge
                  color="dark"
                  className={
                    "text-white font-mono text-lg bg-gradient-to-r from-blue-600 to-fuchsia-600 "
                  }
                  size="lg"
                >
                  {owner}
                </Badge>
              
            </>
          ) : (
            <>
              <strong>
                {ethers.utils.formatUnits(domain.cost.toString(), "ether")}
              </strong>
              ETH
            </>
          )}
        </p>
      </div>

      {!domain.isOwned && !owner && (
        <Button size="lg" className="text-lg" onClick={() => buyHandler()}>Buy It</Button>
      )}
    </Card>
  );
};

export default Domain;
