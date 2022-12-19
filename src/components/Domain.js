import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

import { Card } from 'flowbite-react'
import { Button } from "flowbite-react/lib/cjs/components/Button"

const Domain = ({ domain, ethDomains, provider, id }) => {
  const [owner, setOwner] = useState(null)
  const [hasSold, setHasSold] = useState(false)

  const getOwner = async () => {
    if (domain.isOwned || hasSold) {
      const owner = await ethDomains.ownerOf(id)
      setOwner(owner)
    }
  }

  const buyHandler = async () => {
    const signer = await provider.getSigner()
    const transaction = await ethDomains.connect(signer).mint(id, { value: domain.cost })
    await transaction.wait()

    setHasSold(true)
  }

  useEffect(() => {
    getOwner()
  }, [hasSold])

  return (
    <Card>
      <div>
        <h3>
          {domain.isOwned || owner ? (
            <del>{domain.name}</del>
          ) : (
            <>{domain.name}</>
          )}
        </h3>

        <p>
          {domain.isOwned || owner ? (
            <>
              <small>
                Owned by:<br />
                <span>
                  {owner && owner.slice(0, 6) + '...' + owner.slice(38, 42)}
                </span>
              </small>
            </>
          ) : (
            <>
              <strong>
                {ethers.utils.formatUnits(domain.cost.toString(), 'ether')}
              </strong>
              ETH
            </>
          )}
        </p>
      </div>

      {!domain.isOwned && !owner && (
        <Button
          onClick={() => buyHandler()}
        >
          Buy It
        </Button>
      )}
    </Card>
  );
}

export default Domain;