import { CONFIGS } from './config';

//TC-002/003 This test case originates a contract with a "payout" entrypoint. When calling the payout entrypoint, an agreement can transfer 
//all available tez amounts except a "minLockedValue," which can be shared by a contract to a provided destination address. 

//The test case tries to move the balance to an "attacker contract," which immediately calls the "payout" entrypoint again. 

//Not updating the balance would make the Attacker glad.   The attacker should not be successful since the credit is instantly 
//updated when executing the transfer transaction. Any reentrancy (after the transfer transaction operation) to the contract finds the updated balance.

CONFIGS().forEach(({ lib, rpc, setup }) => {
  const Tezos = lib;
  const address = 'tz1bwsEWCwSEXdRvnJxvegQZKeX5dj6oKEys';

  describe(`Test contracts using: ${rpc}`, () => {
    beforeEach(async (done) => {
      await setup(true);
      done();
    });

    it('Reentrance attack test', async (done) => {
      const vestingContractOp = await Tezos.contract.originate({
        balance: '8',
        code: `{ parameter
            (or (pair %adminPayout (mutez %amount) (address %destination))
                (pair %payout (mutez %amount) (address %destination))) ;
          storage (pair (address %admin) (mutez %minLockedValue)) ;
          code { UNPAIR ;
                 IF_LEFT
                   { SWAP ;
                     DUP ;
                     DUG 2 ;
                     CAR ;
                     SENDER ;
                     COMPARE ;
                     EQ ;
                     IF {} { PUSH string "failed assertion" ; FAILWITH } ;
                     DUP ;
                     CDR ;
                     CONTRACT unit ;
                     IF_NONE { PUSH string "none" ; FAILWITH } {} ;
                     SWAP ;
                     CAR ;
                     UNIT ;
                     TRANSFER_TOKENS ;
                     SWAP ;
                     NIL operation ;
                     DIG 2 ;
                     CONS ;
                     PAIR }
                   { DUP ;
                     CDR ;
                     CONTRACT unit ;
                     IF_NONE { PUSH string "none" ; FAILWITH } {} ;
                     SWAP ;
                     CAR ;
                     UNIT ;
                     TRANSFER_TOKENS ;
                     SWAP ;
                     NIL operation ;
                     DIG 2 ;
                     CONS ;
                     PAIR } } }`,
        init: `(Pair "tz1bwsEWCwSEXdRvnJxvegQZKeX5dj6oKEys" 4000000)`,
      });

      await vestingContractOp.confirmation();
      expect(vestingContractOp.hash).toBeDefined();
      expect(vestingContractOp.includedInBlock).toBeLessThan(Number.POSITIVE_INFINITY);
      const vestingContract = await vestingContractOp.contract();
      expect(await vestingContract.storage()).toBeTruthy();

      const publicKeyHash = await Tezos.signer.publicKeyHash();
      const opTransfer = await Tezos.contract.transfer({ to: publicKeyHash, amount: 1 });
      await opTransfer.confirmation();

      const attackContractOp = await Tezos.contract.originate({
        code: `{ parameter unit ;
               storage unit ;
               code { CDR ;
                 PUSH address "${vestingContract.address}" ;
                    CONTRACT %payout (pair (mutez %amount) (address %destination)) ;
                      IF_NONE { PUSH string "none" ; FAILWITH } {} ;
                      PUSH mutez 0 ;
                      PUSH address "${address}" ;
                      PUSH mutez 3000000 ;
                      PAIR ;
                      TRANSFER_TOKENS ;
                      SWAP ;
                      NIL operation ;
                      DIG 2 ;
                      CONS ;
                      PAIR } }
             `,
        init: `Unit`,
      });

      await attackContractOp.confirmation();
      expect(attackContractOp.hash).toBeDefined();
      expect(attackContractOp.includedInBlock).toBeLessThan(Number.POSITIVE_INFINITY);
      const attackContract = await attackContractOp.contract();
      expect(await attackContract.storage()).toBeTruthy();

      await Tezos.contract
        .at(vestingContract.address)
        .then((contract) => {
          return contract.methodsObject
            .payout({
              amount: 3000000,
              destination: attackContract.address,
            })
            .send();
        })
        .then((op) => {
          return op.confirmation().then(() => op.hash);
        })
        .catch((error) => console.log(`Error: ${JSON.stringify(error, null, 2)}`));

      Tezos.tz.getBalance(vestingContract.address).then((vbalance) => {
        let result = vbalance.toNumber();
        expect((result = 5000000));
      });
      done();
    });
  });
});

// This test was transcribed to Taquito from bash scripts at https://github.com/InferenceAG/TezosSecurityBaselineChecking
