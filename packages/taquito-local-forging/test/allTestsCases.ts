import { opMapping } from '../src/constants';
import {
  rpcContractResponse,
  rpcContractResponse2,
  rpcContractResponse4,
  rpcContractResponse5,
  rpcContractResponse7,
  example9,
  example10,
} from './data/code_with_sapling';
import {
  ticketCode,
  ticketCode2,
  ticketCode3,
  ticketCode4,
  ticketStorage,
  ticketStorage2,
  ticketStorage3,
  ticketStorage4,
} from './data/code_with_ticket';
import { genericCode, genericStorage } from './data/generic_contract';
import { tokenBigmapCode, tokenBigmapStorage } from './data/token_big_map';
import { noAnnotCode, noAnnotInit } from './data/token_without_annotations';
import { voteInitSample, voteSample } from './data/vote_contract';
import { chestCode, chestStorage } from './data/contract_with_chest';
import { submutezCode, submutezStorage } from './data/contract_with_sub_mutez';
import {
  storageContractWithConstant,
  codeContractWithConstant,
} from './data/contract_with_constant';
import { codeViewsTopLevel, storageViewsTopLevel } from './data/contract_views_top_level';
import { opMappingProto13 } from './../src/proto13-jakarta/constants-proto13';
import { ForgeParams } from '../src/interface';
import { MichelsonV1Expression, OpKind } from '@taquito/rpc';

function extractOp(
  startIndex: number,
  endIndex: number,
  opMap: {
    [key: string]: string;
  }
) {
  const result: string[] = [];
  let i = startIndex;
  for (i; i <= endIndex; i++) {
    let key = i.toString(16);
    if (key.length === 1) {
      key = '0' + key;
    }
    result.push(opMap[key]);
  }
  return result;
}

interface TestCase {
  name: string;
  operation: ForgeParams;
  expected?: object;
}

export const commonCases: TestCase[] = [
  {
    name: 'Delegation',
    operation: {
      branch: 'BLzyjjHKEKMULtvkpSHxuZxx6ei6fpntH2BTkYZiLgs8zLVstvX',
      contents: [
        {
          kind: OpKind.DELEGATION,
          delegate: 'tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn',
          counter: '1',
          source: 'tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn',
          fee: '10000',
          gas_limit: '10',
          storage_limit: '10',
        },
      ],
    },
  },
  {
    name: 'Reveal',
    operation: {
      branch: 'BLzyjjHKEKMULtvkpSHxuZxx6ei6fpntH2BTkYZiLgs8zLVstvX',
      contents: [
        {
          kind: OpKind.REVEAL,
          counter: '1',
          source: 'tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn',
          public_key: 'edpkvS5QFv7KRGfa3b87gg9DBpxSm3NpSwnjhUjNBQrRUUR66F7C9g',
          fee: '10000',
          gas_limit: '10',
          storage_limit: '10',
        },
      ],
    },
  },
  {
    name: 'Ballot',
    operation: {
      branch: 'BLzyjjHKEKMULtvkpSHxuZxx6ei6fpntH2BTkYZiLgs8zLVstvX',
      contents: [
        {
          kind: OpKind.BALLOT,
          source: 'tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn',
          period: -300,
          ballot: 'yay',
          proposal: 'PsCARTHAGazKbHtnKfLzQg3kms52kSRpgnDY982a9oYsSXRLQEb',
        },
      ],
    },
  },
  {
    name: 'Seed nonce revelation',
    operation: {
      branch: 'BLzyjjHKEKMULtvkpSHxuZxx6ei6fpntH2BTkYZiLgs8zLVstvX',
      contents: [
        {
          kind: OpKind.SEED_NONCE_REVELATION,
          level: 25550,
          nonce: new Array(32).fill('ff').join(''),
        },
      ],
    },
  },
  {
    name: 'Proposals',
    operation: {
      branch: 'BLzyjjHKEKMULtvkpSHxuZxx6ei6fpntH2BTkYZiLgs8zLVstvX',
      contents: [
        {
          kind: OpKind.PROPOSALS,
          source: 'tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn',
          period: 25550,
          proposals: [
            'PsCARTHAGazKbHtnKfLzQg3kms52kSRpgnDY982a9oYsSXRLQEb',
            'PsCARTHAGazKbHtnKfLzQg3kms52kSRpgnDY982a9oYsSXRLQEb',
          ],
        },
      ],
    },
  },
  {
    name: OpKind.TRANSACTION,
    operation: {
      branch: 'BLzyjjHKEKMULtvkpSHxuZxx6ei6fpntH2BTkYZiLgs8zLVstvX',
      contents: [
        {
          kind: OpKind.TRANSACTION,
          counter: '1',
          source: 'tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn',
          fee: '10000',
          gas_limit: '10',
          storage_limit: '10',
          destination: 'tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn',
          amount: '1000',
        },
      ],
    },
  },
  {
    name: 'Transaction with parameter',
    operation: {
      branch: 'BLzyjjHKEKMULtvkpSHxuZxx6ei6fpntH2BTkYZiLgs8zLVstvX',
      contents: [
        {
          kind: OpKind.TRANSACTION,
          counter: '1',
          source: 'tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn',
          fee: '10000',
          gas_limit: '10',
          storage_limit: '10',
          parameters: {
            entrypoint: 'do',
            value: { bytes: '0202' },
          },
          destination: 'tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn',
          amount: '1000',
        },
      ],
    },
  },
  {
    name: 'Transaction with default entrypoint',
    operation: {
      branch: 'BLzyjjHKEKMULtvkpSHxuZxx6ei6fpntH2BTkYZiLgs8zLVstvX',
      contents: [
        {
          kind: OpKind.TRANSACTION,
          counter: '1',
          source: 'tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn',
          fee: '10000',
          gas_limit: '10',
          storage_limit: '10',
          parameters: {
            entrypoint: 'default',
            value: { prim: 'Pair', args: [{ int: '2' }, { string: 'hello' }] },
          },
          destination: 'tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn',
          amount: '1000',
        },
      ],
    },
  },
  {
    name: 'Transaction with maximum length entrypoint',
    operation: {
      branch: 'BLzyjjHKEKMULtvkpSHxuZxx6ei6fpntH2BTkYZiLgs8zLVstvX',
      contents: [
        {
          kind: OpKind.TRANSACTION,
          counter: '1',
          source: 'tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn',
          fee: '10000',
          gas_limit: '10',
          storage_limit: '10',
          parameters: {
            entrypoint: 'Tps0RV2UISBvTV6m2z16VnfCVnN5dzX',
            value: { prim: 'Pair', args: [{ int: '2' }, { string: 'hello' }] },
          },
          destination: 'tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn',
          amount: '1000',
        },
      ],
    },
  },
  {
    name: 'Transaction with non ascii entrypoint and string',
    operation: {
      branch: 'BLzyjjHKEKMULtvkpSHxuZxx6ei6fpntH2BTkYZiLgs8zLVstvX',
      contents: [
        {
          kind: OpKind.TRANSACTION,
          counter: '1',
          source: 'tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn',
          fee: '10000',
          gas_limit: '10',
          storage_limit: '10',
          parameters: {
            entrypoint: 'entrypoint©Ͻ',
            value: { string: 'Copyright ©Ͻ' },
          },
          destination: 'tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn',
          amount: '1000',
        },
      ],
    },
  },
  {
    name: 'Transaction with default entrypoint and unit parameter',
    operation: {
      branch: 'BLzyjjHKEKMULtvkpSHxuZxx6ei6fpntH2BTkYZiLgs8zLVstvX',
      contents: [
        {
          kind: OpKind.TRANSACTION,
          counter: '1',
          source: 'tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn',
          fee: '10000',
          gas_limit: '10',
          storage_limit: '10',
          parameters: {
            entrypoint: 'default',
            value: { prim: 'Unit' },
          },
          destination: 'KT1JHqHQdHSgWBKo6H4UfG8dw3JnZSyjGkHA',
          amount: '1000',
        },
      ],
    },
    expected: {
      branch: 'BLzyjjHKEKMULtvkpSHxuZxx6ei6fpntH2BTkYZiLgs8zLVstvX',
      contents: [
        {
          kind: OpKind.TRANSACTION,
          counter: '1',
          source: 'tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn',
          fee: '10000',
          gas_limit: '10',
          storage_limit: '10',
          destination: 'KT1JHqHQdHSgWBKo6H4UfG8dw3JnZSyjGkHA',
          amount: '1000',
        },
      ],
    },
  },
  {
    name: 'Transaction with set_delegate entrypoint',
    operation: {
      branch: 'BLzyjjHKEKMULtvkpSHxuZxx6ei6fpntH2BTkYZiLgs8zLVstvX',
      contents: [
        {
          kind: OpKind.TRANSACTION,
          counter: '1',
          source: 'tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn',
          fee: '10000',
          gas_limit: '10',
          storage_limit: '10',
          parameters: {
            entrypoint: 'set_delegate',
            value: { string: 'tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn' },
          },
          destination: 'KT1JHqHQdHSgWBKo6H4UfG8dw3JnZSyjGkHA',
          amount: '1000',
        },
      ],
    },
  },
  {
    name: 'Transaction with remove_delegate entrypoint',
    operation: {
      branch: 'BLzyjjHKEKMULtvkpSHxuZxx6ei6fpntH2BTkYZiLgs8zLVstvX',
      contents: [
        {
          kind: OpKind.TRANSACTION,
          counter: '1',
          source: 'tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn',
          fee: '10000',
          gas_limit: '10',
          storage_limit: '10',
          parameters: {
            entrypoint: 'remove_delegate',
            value: { string: 'tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn' },
          },
          destination: 'KT1JHqHQdHSgWBKo6H4UfG8dw3JnZSyjGkHA',
          amount: '1000',
        },
      ],
    },
  },
  {
    name: 'Transaction with root entrypoint',
    operation: {
      branch: 'BLzyjjHKEKMULtvkpSHxuZxx6ei6fpntH2BTkYZiLgs8zLVstvX',
      contents: [
        {
          kind: OpKind.TRANSACTION,
          counter: '1',
          source: 'tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn',
          fee: '10000',
          gas_limit: '10',
          storage_limit: '10',
          parameters: {
            entrypoint: 'root',
            value: { string: 'tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn' },
          },
          destination: 'KT1JHqHQdHSgWBKo6H4UfG8dw3JnZSyjGkHA',
          amount: '1000',
        },
      ],
    },
  },
  {
    name: 'Transaction with do entrypoint',
    operation: {
      branch: 'BLzyjjHKEKMULtvkpSHxuZxx6ei6fpntH2BTkYZiLgs8zLVstvX',
      contents: [
        {
          kind: OpKind.TRANSACTION,
          counter: '1',
          source: 'tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn',
          fee: '10000',
          gas_limit: '10',
          storage_limit: '10',
          parameters: {
            entrypoint: 'do',
            value: { string: 'tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn' },
          },
          destination: 'KT1JHqHQdHSgWBKo6H4UfG8dw3JnZSyjGkHA',
          amount: '1000',
        },
      ],
    },
  },
  {
    name: 'Transaction with do entrypoint and unit',
    operation: {
      branch: 'BLzyjjHKEKMULtvkpSHxuZxx6ei6fpntH2BTkYZiLgs8zLVstvX',
      contents: [
        {
          kind: OpKind.TRANSACTION,
          counter: '1',
          source: 'tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn',
          fee: '10000',
          gas_limit: '10',
          storage_limit: '10',
          parameters: {
            entrypoint: 'do',
            value: { prim: 'Unit' },
          },
          destination: 'KT1JHqHQdHSgWBKo6H4UfG8dw3JnZSyjGkHA',
          amount: '1000',
        },
      ],
    },
  },
  {
    name: 'Transaction with custom entrypoint',
    operation: {
      branch: 'BLzyjjHKEKMULtvkpSHxuZxx6ei6fpntH2BTkYZiLgs8zLVstvX',
      contents: [
        {
          kind: OpKind.TRANSACTION,
          counter: '1',
          source: 'tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn',
          fee: '10000',
          gas_limit: '10',
          storage_limit: '10',
          parameters: {
            entrypoint: 'main',
            value: {
              prim: 'Pair',
              args: [
                { prim: 'Pair', args: [{ bytes: '0202' }, { int: '202' }] },
                { string: 'hello' },
              ],
            },
          },
          destination: 'KT1HPaJE1QNtuiYPgMAGhzTrs446K9wptmsR',
          amount: '1000',
        },
      ],
    },
  },
  {
    name: 'Transaction with default entrypoint and annotation',
    operation: {
      branch: 'BLzyjjHKEKMULtvkpSHxuZxx6ei6fpntH2BTkYZiLgs8zLVstvX',
      contents: [
        {
          kind: OpKind.TRANSACTION,
          counter: '1',
          source: 'tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn',
          fee: '10000',
          gas_limit: '10',
          storage_limit: '10',
          parameters: {
            entrypoint: 'default',
            value: {
              prim: 'Pair',
              args: [{ bytes: '0202' }, { string: 'hello' }],
              annots: ['%test'],
            },
          },
          destination: 'tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn',
          amount: '1000',
        },
      ],
    },
  },
  {
    name: 'Origination vote example',
    operation: {
      branch: 'BLzyjjHKEKMULtvkpSHxuZxx6ei6fpntH2BTkYZiLgs8zLVstvX',
      contents: [
        {
          kind: OpKind.ORIGINATION,
          counter: '1',
          source: 'tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn',
          fee: '10000',
          gas_limit: '10',
          storage_limit: '10',
          balance: '0',
          script: {
            code: voteSample,
            storage: voteInitSample,
          },
        },
      ],
    },
  },
  ...extractOp(0, 147, opMapping).map((op): TestCase => {
    return {
      name: `Origination operation (${op})`,
      operation: {
        branch: 'BLzyjjHKEKMULtvkpSHxuZxx6ei6fpntH2BTkYZiLgs8zLVstvX',
        contents: [
          {
            kind: OpKind.ORIGINATION,
            counter: '1',
            source: 'tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn',
            fee: '10000',
            gas_limit: '10',
            storage_limit: '10',
            balance: '0',
            script: {
              code: genericCode(op) as MichelsonV1Expression[],
              storage: genericStorage,
            },
          },
        ],
      },
    };
  }),
  {
    name: 'Origination with bigmap',
    operation: {
      branch: 'BLzyjjHKEKMULtvkpSHxuZxx6ei6fpntH2BTkYZiLgs8zLVstvX',
      contents: [
        {
          kind: OpKind.ORIGINATION,
          counter: '1',
          source: 'tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn',
          fee: '10000',
          gas_limit: '10',
          storage_limit: '10',
          balance: '0',
          script: {
            code: tokenBigmapCode,
            storage: tokenBigmapStorage,
          },
        },
      ],
    },
  },
  {
    name: 'Origination with no annot',
    operation: {
      branch: 'BLzyjjHKEKMULtvkpSHxuZxx6ei6fpntH2BTkYZiLgs8zLVstvX',
      contents: [
        {
          kind: OpKind.ORIGINATION,
          counter: '1',
          source: 'tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn',
          fee: '10000',
          gas_limit: '10',
          storage_limit: '10',
          balance: '0',
          script: {
            code: noAnnotCode,
            storage: noAnnotInit('tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn'),
          },
        },
      ],
    },
  },
  {
    name: 'Multiple transaction at once',
    operation: {
      branch: 'BLzyjjHKEKMULtvkpSHxuZxx6ei6fpntH2BTkYZiLgs8zLVstvX',
      contents: [
        {
          kind: OpKind.REVEAL,
          counter: '1',
          source: 'tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn',
          public_key: 'edpkvS5QFv7KRGfa3b87gg9DBpxSm3NpSwnjhUjNBQrRUUR66F7C9g',
          fee: '10000',
          gas_limit: '10',
          storage_limit: '10',
        },
        {
          kind: OpKind.ORIGINATION,
          counter: '1',
          source: 'tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn',
          fee: '10000',
          gas_limit: '10',
          storage_limit: '10',
          balance: '0',
          script: {
            code: noAnnotCode,
            storage: noAnnotInit('tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn'),
          },
        },
        {
          kind: OpKind.TRANSACTION,
          counter: '1',
          source: 'tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn',
          fee: '10000',
          gas_limit: '10',
          storage_limit: '10',
          parameters: {
            entrypoint: 'default',
            value: {
              prim: 'Pair',
              args: [{ bytes: '0202' }, { string: 'hello' }],
              annots: ['%test'],
            },
          },
          destination: 'tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn',
          amount: '1000',
        },
        {
          kind: OpKind.TRANSACTION,
          counter: '1',
          source: 'tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn',
          fee: '10000',
          gas_limit: '10',
          storage_limit: '10',
          destination: 'tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn',
          amount: '1000',
        },
      ],
    },
  },
  {
    name: 'Origination where storage is a pair of 2 optional annotated tickets',
    operation: {
      branch: 'BLzyjjHKEKMULtvkpSHxuZxx6ei6fpntH2BTkYZiLgs8zLVstvX',
      contents: [
        {
          kind: OpKind.ORIGINATION,
          counter: '1',
          source: 'tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn',
          fee: '10000',
          gas_limit: '10',
          storage_limit: '10',
          balance: '0',
          script: {
            code: ticketCode,
            storage: ticketStorage,
          },
        },
      ],
    },
  },
  {
    name: 'Origination where parameter contains a pair having 3 args',
    operation: {
      branch: 'BLzyjjHKEKMULtvkpSHxuZxx6ei6fpntH2BTkYZiLgs8zLVstvX',
      contents: [
        {
          kind: OpKind.ORIGINATION,
          counter: '1',
          source: 'tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn',
          fee: '10000',
          gas_limit: '10',
          storage_limit: '10',
          balance: '0',
          script: {
            code: ticketCode2,
            storage: ticketStorage2,
          },
        },
      ],
    },
  },
  {
    name: 'Origination where storage contains nested pairs and a ticket inside a big map',
    operation: {
      branch: 'BLzyjjHKEKMULtvkpSHxuZxx6ei6fpntH2BTkYZiLgs8zLVstvX',
      contents: [
        {
          kind: OpKind.ORIGINATION,
          counter: '1',
          source: 'tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn',
          fee: '10000',
          gas_limit: '10',
          storage_limit: '10',
          balance: '0',
          script: {
            code: ticketCode3,
            storage: ticketStorage3,
          },
        },
      ],
    },
  },
  {
    name: 'Origination with ticket',
    operation: {
      branch: 'BLzyjjHKEKMULtvkpSHxuZxx6ei6fpntH2BTkYZiLgs8zLVstvX',
      contents: [
        {
          kind: OpKind.ORIGINATION,
          counter: '1',
          source: 'tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn',
          fee: '10000',
          gas_limit: '10',
          storage_limit: '10',
          balance: '0',
          script: {
            code: ticketCode4,
            storage: ticketStorage4,
          },
        },
      ],
    },
  },
  {
    name: 'Origination with sapling_transaction in storage',
    operation: {
      branch: 'BLzyjjHKEKMULtvkpSHxuZxx6ei6fpntH2BTkYZiLgs8zLVstvX',
      contents: [
        {
          kind: OpKind.ORIGINATION,
          counter: '1',
          source: 'tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn',
          fee: '10000',
          gas_limit: '10',
          storage_limit: '10',
          balance: '0',
          script: {
            code: rpcContractResponse.script.code,
            storage: [],
          },
        },
      ],
    },
  },
  {
    name: 'Origination where storage has a pair of 3 annotated args whose 2 sapling_transaction',
    operation: {
      branch: 'BLzyjjHKEKMULtvkpSHxuZxx6ei6fpntH2BTkYZiLgs8zLVstvX',
      contents: [
        {
          kind: OpKind.ORIGINATION,
          counter: '1',
          source: 'tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn',
          fee: '10000',
          gas_limit: '10',
          storage_limit: '10',
          balance: '0',
          script: {
            code: rpcContractResponse2.script.code,
            storage: { prim: 'Pair', args: [{ int: '0' }, [], []] },
          },
        },
      ],
    },
  },
  {
    name: 'Origination where storage is a pair of 2 annotated sapling_transaction and parameter contains a pair of 3 args',
    operation: {
      branch: 'BLzyjjHKEKMULtvkpSHxuZxx6ei6fpntH2BTkYZiLgs8zLVstvX',
      contents: [
        {
          kind: OpKind.ORIGINATION,
          counter: '1',
          source: 'tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn',
          fee: '10000',
          gas_limit: '10',
          storage_limit: '10',
          balance: '0',
          script: {
            code: rpcContractResponse4.script.code,
            storage: { prim: 'Pair', args: [[], []] },
          },
        },
      ],
    },
  },
  {
    name: 'Origination with SAPLING_EMPTY_STATE instruction',
    operation: {
      branch: 'BLzyjjHKEKMULtvkpSHxuZxx6ei6fpntH2BTkYZiLgs8zLVstvX',
      contents: [
        {
          kind: OpKind.ORIGINATION,
          counter: '1',
          source: 'tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn',
          fee: '10000',
          gas_limit: '10',
          storage_limit: '10',
          balance: '0',
          script: {
            code: rpcContractResponse5.script.code,
            storage: { prim: 'Unit' },
          },
        },
      ],
    },
  },
  {
    name: 'Origination with optional sapling_transaction in storage',
    operation: {
      branch: 'BLzyjjHKEKMULtvkpSHxuZxx6ei6fpntH2BTkYZiLgs8zLVstvX',
      contents: [
        {
          kind: OpKind.ORIGINATION,
          counter: '1',
          source: 'tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn',
          fee: '10000',
          gas_limit: '10',
          storage_limit: '10',
          balance: '0',
          script: {
            code: rpcContractResponse7.script.code,
            storage: { prim: 'None' },
          },
        },
      ],
    },
  },
  {
    name: 'Origination where parameter is an annotated pairs of 18 args',
    operation: {
      branch: 'BLzyjjHKEKMULtvkpSHxuZxx6ei6fpntH2BTkYZiLgs8zLVstvX',
      contents: [
        {
          kind: OpKind.ORIGINATION,
          counter: '1',
          source: 'tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn',
          fee: '10000',
          gas_limit: '10',
          storage_limit: '10',
          balance: '0',
          script: {
            code: example9.script.code,
            storage: [],
          },
        },
      ],
    },
  },
  {
    name: 'Origination where parameter is a pairs of 18 args without annotation',
    operation: {
      branch: 'BLzyjjHKEKMULtvkpSHxuZxx6ei6fpntH2BTkYZiLgs8zLVstvX',
      contents: [
        {
          kind: OpKind.ORIGINATION,
          counter: '1',
          source: 'tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn',
          fee: '10000',
          gas_limit: '10',
          storage_limit: '10',
          balance: '0',
          script: {
            code: example10.script.code,
            storage: [],
          },
        },
      ],
    },
  },
  {
    name: 'Origination of a contract that contains the types chest, chest_key and the instruction OPEN_CHEST',
    operation: {
      branch: 'BMV9bffK5yjWCJgUJBsoTRifb4SsAYbkCVwVkKbJHffJYn7ePBL',
      contents: [
        {
          kind: OpKind.ORIGINATION,
          counter: '1',
          source: 'tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn',
          fee: '10000',
          gas_limit: '10',
          storage_limit: '10',
          balance: '0',
          script: {
            code: chestCode,
            storage: chestStorage,
          },
        },
      ],
    },
  },
  {
    name: 'Register global constant',
    operation: {
      branch: 'BMV9bffK5yjWCJgUJBsoTRifb4SsAYbkCVwVkKbJHffJYn7ePBL',
      contents: [
        {
          kind: OpKind.REGISTER_GLOBAL_CONSTANT,
          counter: '7423375',
          source: 'tz1TJGsZxvr6aBGUqfQVxufesTtA7QGi696D',
          fee: '372',
          gas_limit: '1330',
          storage_limit: '93',
          value: {
            prim: 'Pair',
            args: [
              {
                int: '999',
              },
              {
                int: '999',
              },
            ],
          },
        },
      ],
    },
  },
  {
    name: 'Origination of a contract that contains the type constant',
    operation: {
      branch: 'BMV9bffK5yjWCJgUJBsoTRifb4SsAYbkCVwVkKbJHffJYn7ePBL',
      contents: [
        {
          kind: OpKind.ORIGINATION,
          counter: '7423380',
          source: 'tz1TJGsZxvr6aBGUqfQVxufesTtA7QGi696D',
          fee: '670',
          gas_limit: '2360',
          storage_limit: '481',
          balance: '0',
          script: {
            code: codeContractWithConstant,
            storage: storageContractWithConstant,
          },
        },
      ],
    },
  },
  {
    name: 'Origination of a contract that contains top level views',
    operation: {
      branch: 'BKyBAx2JDtoFLjcv6tUZTBPDxjcA22JMxqCzFPGBWU4FmTX3uoD',
      contents: [
        {
          kind: OpKind.ORIGINATION,
          counter: '8642842',
          source: 'tz2J1jtUzAj4CdYKCh78ubARBiotbGKceXfb',
          fee: '1104',
          gas_limit: '1565',
          storage_limit: '872',
          balance: '0',
          script: {
            code: codeViewsTopLevel,
            storage: storageViewsTopLevel,
          },
        },
      ],
    },
  },
  {
    name: 'Endorsement',
    operation: {
      branch: 'BLzyjjHKEKMULtvkpSHxuZxx6ei6fpntH2BTkYZiLgs8zLVstvX',
      contents: [
        {
          kind: OpKind.ENDORSEMENT,
          slot: 0,
          level: 66299,
          round: 5,
          block_payload_hash: 'vh3FEkypvxUYLwjGYd2Sme7aWyfX8npDsqxcL6imVpBWnAZeNn2n',
        },
      ],
    },
  },
  {
    name: `Origination of a contract that contains the instructions SUB_MUTEZ`,
    operation: {
      branch: 'BMV9bffK5yjWCJgUJBsoTRifb4SsAYbkCVwVkKbJHffJYn7ePBL',
      contents: [
        {
          kind: OpKind.ORIGINATION,
          counter: '1',
          source: 'tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn',
          fee: '10000',
          gas_limit: '10',
          storage_limit: '10',
          balance: '0',
          script: {
            code: submutezCode,
            storage: submutezStorage,
          },
        },
      ],
    },
  },
];

export const jakartaCases: TestCase[] = [
  ...extractOp(132, 150, opMappingProto13).map((op): TestCase => {
    return {
      name: `Origination operation (${op})`,
      operation: {
        branch: 'BLzyjjHKEKMULtvkpSHxuZxx6ei6fpntH2BTkYZiLgs8zLVstvX',
        contents: [
          {
            kind: OpKind.ORIGINATION,
            counter: '1',
            source: 'tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn',
            fee: '10000',
            gas_limit: '10',
            storage_limit: '10',
            balance: '0',
            script: {
              code: genericCode(op) as MichelsonV1Expression[],
              storage: genericStorage,
            },
          },
        ],
      },
    };
  }),
  {
    name: `Transfer ticket`,
    operation: {
      branch: 'BMV9bffK5yjWCJgUJBsoTRifb4SsAYbkCVwVkKbJHffJYn7ePBL',
      contents: [
        {
          kind: OpKind.TRANSFER_TICKET,
          counter: '1',
          source: 'tz1QZ6KY7d3BuZDT1d19dUxoQrtFPN2QJ3hn',
          fee: '10000',
          gas_limit: '10',
          storage_limit: '10',
          ticket_contents: {
            prim: 'Pair',
            args: [{ string: 'KT1EAMUQC1yJ2sRPNPpLHVMGCzroYGe1C1ea' }, { int: '0' }, { int: '1' }],
          },
          ticket_ty: { prim: 'nat' },
          ticket_ticketer: 'KT1EAMUQC1yJ2sRPNPpLHVMGCzroYGe1C1ea',
          ticket_amount: '2',
          destination: 'KT1JHqHQdHSgWBKo6H4UfG8dw3JnZSyjGkHA',
          entrypoint: 'default',
        },
      ],
    } as any,
  },
];
