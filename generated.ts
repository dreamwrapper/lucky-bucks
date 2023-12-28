import {
  useContractRead,
  UseContractReadConfig,
  useContractWrite,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
  useContractEvent,
  UseContractEventConfig,
} from 'wagmi';
import { ReadContractResult, WriteContractMode, PrepareWriteContractResult } from 'wagmi/actions';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LBCLottery
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const lbcLotteryABI = [
  { stateMutability: 'nonpayable', type: 'function', inputs: [{ name: 'stateIndex', internalType: 'uint8', type: 'uint8' }], name: 'claimTokens', outputs: [] },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_ticketPrices', internalType: 'uint24', type: 'uint24' },
      { name: '_lotteryTimestamp', internalType: 'uint40', type: 'uint40' },
    ],
    name: 'createLottery',
    outputs: [],
  },
  { stateMutability: 'nonpayable', type: 'function', inputs: [{ name: 'ticketIndex', internalType: 'uint16', type: 'uint16' }], name: 'draw', outputs: [] },
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_ticketPrices', internalType: 'uint24', type: 'uint24' },
      { name: '_lotteryTimestamp', internalType: 'uint40', type: 'uint40' },
    ],
  },
  { type: 'error', inputs: [{ name: 'message', internalType: 'string', type: 'string' }], name: 'InsufficientProjectTokens' },
  { type: 'error', inputs: [{ name: 'message', internalType: 'string', type: 'string' }], name: 'InvalidAddressZero' },
  { type: 'error', inputs: [{ name: 'message', internalType: 'string', type: 'string' }], name: 'InvalidDuplicateNumber' },
  { type: 'error', inputs: [{ name: 'message', internalType: 'string', type: 'string' }], name: 'InvalidDuplicatedTickets' },
  { type: 'error', inputs: [{ name: 'message', internalType: 'string', type: 'string' }], name: 'InvalidLotteryTimestamp' },
  { type: 'error', inputs: [{ name: 'message', internalType: 'string', type: 'string' }], name: 'InvalidStateIndex' },
  { type: 'error', inputs: [{ name: 'message', internalType: 'string', type: 'string' }], name: 'InvalidTicketIndex' },
  { type: 'error', inputs: [{ name: 'message', internalType: 'string', type: 'string' }], name: 'InvalidTicketNumber' },
  { type: 'error', inputs: [{ name: 'message', internalType: 'string', type: 'string' }], name: 'InvalidTicketPrices' },
  { type: 'error', inputs: [{ name: 'message', internalType: 'string', type: 'string' }], name: 'InvalidWinningUser' },
  { type: 'error', inputs: [{ name: 'message', internalType: 'string', type: 'string' }], name: 'LotteryIsActive' },
  { type: 'error', inputs: [{ name: 'message', internalType: 'string', type: 'string' }], name: 'LotteryIsInactive' },
  { type: 'error', inputs: [{ name: 'message', internalType: 'string', type: 'string' }], name: 'RequireLotteryDrawComplete' },
  { type: 'error', inputs: [{ name: 'message', internalType: 'string', type: 'string' }], name: 'UserAlreadyClaimTokens' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: false },
      { name: 'claimedTokens', internalType: 'uint32', type: 'uint32', indexed: false },
      { name: 'timestamp', internalType: 'uint40', type: 'uint40', indexed: false },
    ],
    name: 'ClaimTokens',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'creator', internalType: 'address', type: 'address', indexed: false },
      { name: 'timestamp', internalType: 'uint40', type: 'uint40', indexed: false },
    ],
    name: 'CreateLottery',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'winningTicket', internalType: 'uint8[6]', type: 'uint8[6]', indexed: false },
      { name: 'totalWinners', internalType: 'uint8', type: 'uint8', indexed: false },
      { name: 'timestamp', internalType: 'uint40', type: 'uint40', indexed: false },
    ],
    name: 'Draw',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'ticketNumbersInitialized', internalType: 'uint8[50]', type: 'uint8[50]', indexed: false },
      { name: 'timestamp', internalType: 'uint40', type: 'uint40', indexed: false },
    ],
    name: 'InitializeTicketNumbers',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'previousOwner', internalType: 'address', type: 'address', indexed: true },
      { name: 'newOwner', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferred',
  },
  { stateMutability: 'nonpayable', type: 'function', inputs: [], name: 'pause', outputs: [] },
  { type: 'event', anonymous: false, inputs: [{ name: 'account', internalType: 'address', type: 'address', indexed: false }], name: 'Paused' },
  { stateMutability: 'nonpayable', type: 'function', inputs: [{ name: 'selectedTickets', internalType: 'uint8[6][]', type: 'uint8[6][]' }], name: 'purchase', outputs: [] },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: false },
      { name: 'selectedTickets', internalType: 'uint8[6][]', type: 'uint8[6][]', indexed: false },
      { name: 'timestamp', internalType: 'uint40', type: 'uint40', indexed: false },
    ],
    name: 'Purchase',
  },
  { stateMutability: 'nonpayable', type: 'function', inputs: [], name: 'renounceOwnership', outputs: [] },
  { stateMutability: 'nonpayable', type: 'function', inputs: [{ name: '_token', internalType: 'address', type: 'address' }], name: 'setNewToken', outputs: [] },
  { stateMutability: 'nonpayable', type: 'function', inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }], name: 'transferOwnership', outputs: [] },
  { stateMutability: 'nonpayable', type: 'function', inputs: [], name: 'unpause', outputs: [] },
  { type: 'event', anonymous: false, inputs: [{ name: 'account', internalType: 'address', type: 'address', indexed: false }], name: 'Unpaused' },
  { stateMutability: 'nonpayable', type: 'function', inputs: [], name: 'withdrawAll', outputs: [] },
  { stateMutability: 'nonpayable', type: 'function', inputs: [], name: 'withdrawProjectTokens', outputs: [] },
  { stateMutability: 'view', type: 'function', inputs: [], name: 'drawResult', outputs: [{ name: '', internalType: 'uint8[6]', type: 'uint8[6]' }] },
  { stateMutability: 'view', type: 'function', inputs: [], name: 'isLotteryDrawComplete', outputs: [{ name: '', internalType: 'bool', type: 'bool' }] },
  { stateMutability: 'view', type: 'function', inputs: [], name: 'isLotteryOpen', outputs: [{ name: '', internalType: 'bool', type: 'bool' }] },
  { stateMutability: 'view', type: 'function', inputs: [], name: 'lotteryTimestamp', outputs: [{ name: '', internalType: 'uint40', type: 'uint40' }] },
  { stateMutability: 'view', type: 'function', inputs: [], name: 'owner', outputs: [{ name: '', internalType: 'address', type: 'address' }] },
  { stateMutability: 'view', type: 'function', inputs: [], name: 'paused', outputs: [{ name: '', internalType: 'bool', type: 'bool' }] },
  { stateMutability: 'view', type: 'function', inputs: [], name: 'pauseTimestamp', outputs: [{ name: '', internalType: 'uint40', type: 'uint40' }] },
  { stateMutability: 'view', type: 'function', inputs: [], name: 'prizePool', outputs: [{ name: '', internalType: 'uint32', type: 'uint32' }] },
  { stateMutability: 'view', type: 'function', inputs: [], name: 'projectPool', outputs: [{ name: '', internalType: 'uint32', type: 'uint32' }] },
  { stateMutability: 'view', type: 'function', inputs: [], name: 'round', outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }] },
  { stateMutability: 'view', type: 'function', inputs: [], name: 'ticketPrices', outputs: [{ name: '', internalType: 'uint24', type: 'uint24' }] },
  { stateMutability: 'view', type: 'function', inputs: [], name: 'ticketSold', outputs: [{ name: '', internalType: 'uint16', type: 'uint16' }] },
  { stateMutability: 'view', type: 'function', inputs: [], name: 'token', outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }] },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint8', type: 'uint8' },
    ],
    name: 'user',
    outputs: [
      { name: 'isWinner', internalType: 'bool', type: 'bool' },
      { name: 'isClaimed', internalType: 'bool', type: 'bool' },
      { name: 'totalSpent', internalType: 'uint32', type: 'uint32' },
      { name: 'claimableTokens', internalType: 'uint32', type: 'uint32' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_user', internalType: 'address', type: 'address' }],
    name: 'userOwnedTickets',
    outputs: [{ name: '', internalType: 'struct LBCLottery.Ticket[]', type: 'tuple[]', components: [{ name: 'ticket', internalType: 'uint8[6]', type: 'uint8[6]' }] }],
  },
] as const;

export const lbcLotteryAddress = '0x4Ad246a84EeAd5a4997a6176c1887319610cD70B' as const;

export const lbcLotteryConfig = { address: lbcLotteryAddress, abi: lbcLotteryABI } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LuckyBucks
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const luckyBucksABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: 'defaultAdmin', internalType: 'address', type: 'address' },
      { name: 'pauser', internalType: 'address', type: 'address' },
      { name: 'minter', internalType: 'address', type: 'address' },
    ],
  },
  { type: 'error', inputs: [], name: 'AccessControlBadConfirmation' },
  {
    type: 'error',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'neededRole', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'AccessControlUnauthorizedAccount',
  },
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  { type: 'error', inputs: [{ name: 'approver', internalType: 'address', type: 'address' }], name: 'ERC20InvalidApprover' },
  { type: 'error', inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }], name: 'ERC20InvalidReceiver' },
  { type: 'error', inputs: [{ name: 'sender', internalType: 'address', type: 'address' }], name: 'ERC20InvalidSender' },
  { type: 'error', inputs: [{ name: 'spender', internalType: 'address', type: 'address' }], name: 'ERC20InvalidSpender' },
  { type: 'error', inputs: [], name: 'EnforcedPause' },
  { type: 'error', inputs: [], name: 'ExpectedPause' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'spender', internalType: 'address', type: 'address', indexed: true },
      { name: 'value', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'Approval',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  { stateMutability: 'nonpayable', type: 'function', inputs: [{ name: 'value', internalType: 'uint256', type: 'uint256' }], name: 'burn', outputs: [] },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'burnFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'grantRole',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
  },
  { stateMutability: 'nonpayable', type: 'function', inputs: [], name: 'pause', outputs: [] },
  { type: 'event', anonymous: false, inputs: [{ name: 'account', internalType: 'address', type: 'address', indexed: false }], name: 'Paused' },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'callerConfirmation', internalType: 'address', type: 'address' },
    ],
    name: 'renounceRole',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'revokeRole',
    outputs: [],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'previousAdminRole', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'newAdminRole', internalType: 'bytes32', type: 'bytes32', indexed: true },
    ],
    name: 'RoleAdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'account', internalType: 'address', type: 'address', indexed: true },
      { name: 'sender', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'RoleGranted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'account', internalType: 'address', type: 'address', indexed: true },
      { name: 'sender', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'RoleRevoked',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'value', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  { stateMutability: 'nonpayable', type: 'function', inputs: [], name: 'unpause', outputs: [] },
  { type: 'event', anonymous: false, inputs: [{ name: 'account', internalType: 'address', type: 'address', indexed: false }], name: 'Unpaused' },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  { stateMutability: 'view', type: 'function', inputs: [], name: 'decimals', outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }] },
  { stateMutability: 'view', type: 'function', inputs: [], name: 'DEFAULT_ADMIN_ROLE', outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }] },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  { stateMutability: 'view', type: 'function', inputs: [], name: 'MINTER_ROLE', outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }] },
  { stateMutability: 'view', type: 'function', inputs: [], name: 'name', outputs: [{ name: '', internalType: 'string', type: 'string' }] },
  { stateMutability: 'view', type: 'function', inputs: [], name: 'paused', outputs: [{ name: '', internalType: 'bool', type: 'bool' }] },
  { stateMutability: 'view', type: 'function', inputs: [], name: 'PAUSER_ROLE', outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }] },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  { stateMutability: 'view', type: 'function', inputs: [], name: 'symbol', outputs: [{ name: '', internalType: 'string', type: 'string' }] },
  { stateMutability: 'view', type: 'function', inputs: [], name: 'totalSupply', outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }] },
] as const;

export const luckyBucksAddress = '0x8DbC9F88b1a6292BaC0E8a214AD5223703aeB506' as const;

export const luckyBucksConfig = { address: luckyBucksAddress, abi: luckyBucksABI } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lbcLotteryABI}__.
 */
export function useLbcLotteryRead<TFunctionName extends string, TSelectData = ReadContractResult<typeof lbcLotteryABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof lbcLotteryABI, TFunctionName, TSelectData>, 'abi' | 'address'> = {} as any
) {
  return useContractRead({ abi: lbcLotteryABI, address: lbcLotteryAddress, ...config } as UseContractReadConfig<typeof lbcLotteryABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lbcLotteryABI}__ and `functionName` set to `"drawResult"`.
 */
export function useLbcLotteryDrawResult<TFunctionName extends 'drawResult', TSelectData = ReadContractResult<typeof lbcLotteryABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof lbcLotteryABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: lbcLotteryABI, address: lbcLotteryAddress, functionName: 'drawResult', ...config } as UseContractReadConfig<typeof lbcLotteryABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lbcLotteryABI}__ and `functionName` set to `"isLotteryDrawComplete"`.
 */
export function useLbcLotteryIsLotteryDrawComplete<TFunctionName extends 'isLotteryDrawComplete', TSelectData = ReadContractResult<typeof lbcLotteryABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof lbcLotteryABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: lbcLotteryABI, address: lbcLotteryAddress, functionName: 'isLotteryDrawComplete', ...config } as UseContractReadConfig<
    typeof lbcLotteryABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lbcLotteryABI}__ and `functionName` set to `"isLotteryOpen"`.
 */
export function useLbcLotteryIsLotteryOpen<TFunctionName extends 'isLotteryOpen', TSelectData = ReadContractResult<typeof lbcLotteryABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof lbcLotteryABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: lbcLotteryABI, address: lbcLotteryAddress, functionName: 'isLotteryOpen', ...config } as UseContractReadConfig<typeof lbcLotteryABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lbcLotteryABI}__ and `functionName` set to `"lotteryTimestamp"`.
 */
export function useLbcLotteryLotteryTimestamp<TFunctionName extends 'lotteryTimestamp', TSelectData = ReadContractResult<typeof lbcLotteryABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof lbcLotteryABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: lbcLotteryABI, address: lbcLotteryAddress, functionName: 'lotteryTimestamp', ...config } as UseContractReadConfig<typeof lbcLotteryABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lbcLotteryABI}__ and `functionName` set to `"owner"`.
 */
export function useLbcLotteryOwner<TFunctionName extends 'owner', TSelectData = ReadContractResult<typeof lbcLotteryABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof lbcLotteryABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: lbcLotteryABI, address: lbcLotteryAddress, functionName: 'owner', ...config } as UseContractReadConfig<typeof lbcLotteryABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lbcLotteryABI}__ and `functionName` set to `"paused"`.
 */
export function useLbcLotteryPaused<TFunctionName extends 'paused', TSelectData = ReadContractResult<typeof lbcLotteryABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof lbcLotteryABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: lbcLotteryABI, address: lbcLotteryAddress, functionName: 'paused', ...config } as UseContractReadConfig<typeof lbcLotteryABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lbcLotteryABI}__ and `functionName` set to `"pauseTimestamp"`.
 */
export function useLbcLotteryPauseTimestamp<TFunctionName extends 'pauseTimestamp', TSelectData = ReadContractResult<typeof lbcLotteryABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof lbcLotteryABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: lbcLotteryABI, address: lbcLotteryAddress, functionName: 'pauseTimestamp', ...config } as UseContractReadConfig<typeof lbcLotteryABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lbcLotteryABI}__ and `functionName` set to `"prizePool"`.
 */
export function useLbcLotteryPrizePool<TFunctionName extends 'prizePool', TSelectData = ReadContractResult<typeof lbcLotteryABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof lbcLotteryABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: lbcLotteryABI, address: lbcLotteryAddress, functionName: 'prizePool', ...config } as UseContractReadConfig<typeof lbcLotteryABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lbcLotteryABI}__ and `functionName` set to `"projectPool"`.
 */
export function useLbcLotteryProjectPool<TFunctionName extends 'projectPool', TSelectData = ReadContractResult<typeof lbcLotteryABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof lbcLotteryABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: lbcLotteryABI, address: lbcLotteryAddress, functionName: 'projectPool', ...config } as UseContractReadConfig<typeof lbcLotteryABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lbcLotteryABI}__ and `functionName` set to `"round"`.
 */
export function useLbcLotteryRound<TFunctionName extends 'round', TSelectData = ReadContractResult<typeof lbcLotteryABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof lbcLotteryABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: lbcLotteryABI, address: lbcLotteryAddress, functionName: 'round', ...config } as UseContractReadConfig<typeof lbcLotteryABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lbcLotteryABI}__ and `functionName` set to `"ticketPrices"`.
 */
export function useLbcLotteryTicketPrices<TFunctionName extends 'ticketPrices', TSelectData = ReadContractResult<typeof lbcLotteryABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof lbcLotteryABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: lbcLotteryABI, address: lbcLotteryAddress, functionName: 'ticketPrices', ...config } as UseContractReadConfig<typeof lbcLotteryABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lbcLotteryABI}__ and `functionName` set to `"ticketSold"`.
 */
export function useLbcLotteryTicketSold<TFunctionName extends 'ticketSold', TSelectData = ReadContractResult<typeof lbcLotteryABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof lbcLotteryABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: lbcLotteryABI, address: lbcLotteryAddress, functionName: 'ticketSold', ...config } as UseContractReadConfig<typeof lbcLotteryABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lbcLotteryABI}__ and `functionName` set to `"token"`.
 */
export function useLbcLotteryToken<TFunctionName extends 'token', TSelectData = ReadContractResult<typeof lbcLotteryABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof lbcLotteryABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: lbcLotteryABI, address: lbcLotteryAddress, functionName: 'token', ...config } as UseContractReadConfig<typeof lbcLotteryABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lbcLotteryABI}__ and `functionName` set to `"user"`.
 */
export function useLbcLotteryUser<TFunctionName extends 'user', TSelectData = ReadContractResult<typeof lbcLotteryABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof lbcLotteryABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: lbcLotteryABI, address: lbcLotteryAddress, functionName: 'user', ...config } as UseContractReadConfig<typeof lbcLotteryABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lbcLotteryABI}__ and `functionName` set to `"userOwnedTickets"`.
 */
export function useLbcLotteryUserOwnedTickets<TFunctionName extends 'userOwnedTickets', TSelectData = ReadContractResult<typeof lbcLotteryABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof lbcLotteryABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: lbcLotteryABI, address: lbcLotteryAddress, functionName: 'userOwnedTickets', ...config } as UseContractReadConfig<typeof lbcLotteryABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lbcLotteryABI}__.
 */
export function useLbcLotteryWrite<TFunctionName extends string, TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<PrepareWriteContractResult<typeof lbcLotteryABI, string>['request']['abi'], TFunctionName, TMode>
    : UseContractWriteConfig<typeof lbcLotteryABI, TFunctionName, TMode> & {
        abi?: never;
      } = {} as any
) {
  return useContractWrite<typeof lbcLotteryABI, TFunctionName, TMode>({ abi: lbcLotteryABI, address: lbcLotteryAddress, ...config } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lbcLotteryABI}__ and `functionName` set to `"claimTokens"`.
 */
export function useLbcLotteryClaimTokens<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<PrepareWriteContractResult<typeof lbcLotteryABI, 'claimTokens'>['request']['abi'], 'claimTokens', TMode> & { functionName?: 'claimTokens' }
    : UseContractWriteConfig<typeof lbcLotteryABI, 'claimTokens', TMode> & {
        abi?: never;
        functionName?: 'claimTokens';
      } = {} as any
) {
  return useContractWrite<typeof lbcLotteryABI, 'claimTokens', TMode>({ abi: lbcLotteryABI, address: lbcLotteryAddress, functionName: 'claimTokens', ...config } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lbcLotteryABI}__ and `functionName` set to `"createLottery"`.
 */
export function useLbcLotteryCreateLottery<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<PrepareWriteContractResult<typeof lbcLotteryABI, 'createLottery'>['request']['abi'], 'createLottery', TMode> & { functionName?: 'createLottery' }
    : UseContractWriteConfig<typeof lbcLotteryABI, 'createLottery', TMode> & {
        abi?: never;
        functionName?: 'createLottery';
      } = {} as any
) {
  return useContractWrite<typeof lbcLotteryABI, 'createLottery', TMode>({ abi: lbcLotteryABI, address: lbcLotteryAddress, functionName: 'createLottery', ...config } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lbcLotteryABI}__ and `functionName` set to `"draw"`.
 */
export function useLbcLotteryDraw<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<PrepareWriteContractResult<typeof lbcLotteryABI, 'draw'>['request']['abi'], 'draw', TMode> & { functionName?: 'draw' }
    : UseContractWriteConfig<typeof lbcLotteryABI, 'draw', TMode> & {
        abi?: never;
        functionName?: 'draw';
      } = {} as any
) {
  return useContractWrite<typeof lbcLotteryABI, 'draw', TMode>({ abi: lbcLotteryABI, address: lbcLotteryAddress, functionName: 'draw', ...config } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lbcLotteryABI}__ and `functionName` set to `"pause"`.
 */
export function useLbcLotteryPause<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<PrepareWriteContractResult<typeof lbcLotteryABI, 'pause'>['request']['abi'], 'pause', TMode> & { functionName?: 'pause' }
    : UseContractWriteConfig<typeof lbcLotteryABI, 'pause', TMode> & {
        abi?: never;
        functionName?: 'pause';
      } = {} as any
) {
  return useContractWrite<typeof lbcLotteryABI, 'pause', TMode>({ abi: lbcLotteryABI, address: lbcLotteryAddress, functionName: 'pause', ...config } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lbcLotteryABI}__ and `functionName` set to `"purchase"`.
 */
export function useLbcLotteryPurchase<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<PrepareWriteContractResult<typeof lbcLotteryABI, 'purchase'>['request']['abi'], 'purchase', TMode> & { functionName?: 'purchase' }
    : UseContractWriteConfig<typeof lbcLotteryABI, 'purchase', TMode> & {
        abi?: never;
        functionName?: 'purchase';
      } = {} as any
) {
  return useContractWrite<typeof lbcLotteryABI, 'purchase', TMode>({ abi: lbcLotteryABI, address: lbcLotteryAddress, functionName: 'purchase', ...config } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lbcLotteryABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function useLbcLotteryRenounceOwnership<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<PrepareWriteContractResult<typeof lbcLotteryABI, 'renounceOwnership'>['request']['abi'], 'renounceOwnership', TMode> & { functionName?: 'renounceOwnership' }
    : UseContractWriteConfig<typeof lbcLotteryABI, 'renounceOwnership', TMode> & {
        abi?: never;
        functionName?: 'renounceOwnership';
      } = {} as any
) {
  return useContractWrite<typeof lbcLotteryABI, 'renounceOwnership', TMode>({ abi: lbcLotteryABI, address: lbcLotteryAddress, functionName: 'renounceOwnership', ...config } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lbcLotteryABI}__ and `functionName` set to `"setNewToken"`.
 */
export function useLbcLotterySetNewToken<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<PrepareWriteContractResult<typeof lbcLotteryABI, 'setNewToken'>['request']['abi'], 'setNewToken', TMode> & { functionName?: 'setNewToken' }
    : UseContractWriteConfig<typeof lbcLotteryABI, 'setNewToken', TMode> & {
        abi?: never;
        functionName?: 'setNewToken';
      } = {} as any
) {
  return useContractWrite<typeof lbcLotteryABI, 'setNewToken', TMode>({ abi: lbcLotteryABI, address: lbcLotteryAddress, functionName: 'setNewToken', ...config } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lbcLotteryABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function useLbcLotteryTransferOwnership<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<PrepareWriteContractResult<typeof lbcLotteryABI, 'transferOwnership'>['request']['abi'], 'transferOwnership', TMode> & { functionName?: 'transferOwnership' }
    : UseContractWriteConfig<typeof lbcLotteryABI, 'transferOwnership', TMode> & {
        abi?: never;
        functionName?: 'transferOwnership';
      } = {} as any
) {
  return useContractWrite<typeof lbcLotteryABI, 'transferOwnership', TMode>({ abi: lbcLotteryABI, address: lbcLotteryAddress, functionName: 'transferOwnership', ...config } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lbcLotteryABI}__ and `functionName` set to `"unpause"`.
 */
export function useLbcLotteryUnpause<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<PrepareWriteContractResult<typeof lbcLotteryABI, 'unpause'>['request']['abi'], 'unpause', TMode> & { functionName?: 'unpause' }
    : UseContractWriteConfig<typeof lbcLotteryABI, 'unpause', TMode> & {
        abi?: never;
        functionName?: 'unpause';
      } = {} as any
) {
  return useContractWrite<typeof lbcLotteryABI, 'unpause', TMode>({ abi: lbcLotteryABI, address: lbcLotteryAddress, functionName: 'unpause', ...config } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lbcLotteryABI}__ and `functionName` set to `"withdrawAll"`.
 */
export function useLbcLotteryWithdrawAll<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<PrepareWriteContractResult<typeof lbcLotteryABI, 'withdrawAll'>['request']['abi'], 'withdrawAll', TMode> & { functionName?: 'withdrawAll' }
    : UseContractWriteConfig<typeof lbcLotteryABI, 'withdrawAll', TMode> & {
        abi?: never;
        functionName?: 'withdrawAll';
      } = {} as any
) {
  return useContractWrite<typeof lbcLotteryABI, 'withdrawAll', TMode>({ abi: lbcLotteryABI, address: lbcLotteryAddress, functionName: 'withdrawAll', ...config } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lbcLotteryABI}__ and `functionName` set to `"withdrawProjectTokens"`.
 */
export function useLbcLotteryWithdrawProjectTokens<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<PrepareWriteContractResult<typeof lbcLotteryABI, 'withdrawProjectTokens'>['request']['abi'], 'withdrawProjectTokens', TMode> & { functionName?: 'withdrawProjectTokens' }
    : UseContractWriteConfig<typeof lbcLotteryABI, 'withdrawProjectTokens', TMode> & {
        abi?: never;
        functionName?: 'withdrawProjectTokens';
      } = {} as any
) {
  return useContractWrite<typeof lbcLotteryABI, 'withdrawProjectTokens', TMode>({ abi: lbcLotteryABI, address: lbcLotteryAddress, functionName: 'withdrawProjectTokens', ...config } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lbcLotteryABI}__.
 */
export function usePrepareLbcLotteryWrite<TFunctionName extends string>(config: Omit<UsePrepareContractWriteConfig<typeof lbcLotteryABI, TFunctionName>, 'abi' | 'address'> = {} as any) {
  return usePrepareContractWrite({ abi: lbcLotteryABI, address: lbcLotteryAddress, ...config } as UsePrepareContractWriteConfig<typeof lbcLotteryABI, TFunctionName>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lbcLotteryABI}__ and `functionName` set to `"claimTokens"`.
 */
export function usePrepareLbcLotteryClaimTokens(config: Omit<UsePrepareContractWriteConfig<typeof lbcLotteryABI, 'claimTokens'>, 'abi' | 'address' | 'functionName'> = {} as any) {
  return usePrepareContractWrite({ abi: lbcLotteryABI, address: lbcLotteryAddress, functionName: 'claimTokens', ...config } as UsePrepareContractWriteConfig<typeof lbcLotteryABI, 'claimTokens'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lbcLotteryABI}__ and `functionName` set to `"createLottery"`.
 */
export function usePrepareLbcLotteryCreateLottery(config: Omit<UsePrepareContractWriteConfig<typeof lbcLotteryABI, 'createLottery'>, 'abi' | 'address' | 'functionName'> = {} as any) {
  return usePrepareContractWrite({ abi: lbcLotteryABI, address: lbcLotteryAddress, functionName: 'createLottery', ...config } as UsePrepareContractWriteConfig<typeof lbcLotteryABI, 'createLottery'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lbcLotteryABI}__ and `functionName` set to `"draw"`.
 */
export function usePrepareLbcLotteryDraw(config: Omit<UsePrepareContractWriteConfig<typeof lbcLotteryABI, 'draw'>, 'abi' | 'address' | 'functionName'> = {} as any) {
  return usePrepareContractWrite({ abi: lbcLotteryABI, address: lbcLotteryAddress, functionName: 'draw', ...config } as UsePrepareContractWriteConfig<typeof lbcLotteryABI, 'draw'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lbcLotteryABI}__ and `functionName` set to `"pause"`.
 */
export function usePrepareLbcLotteryPause(config: Omit<UsePrepareContractWriteConfig<typeof lbcLotteryABI, 'pause'>, 'abi' | 'address' | 'functionName'> = {} as any) {
  return usePrepareContractWrite({ abi: lbcLotteryABI, address: lbcLotteryAddress, functionName: 'pause', ...config } as UsePrepareContractWriteConfig<typeof lbcLotteryABI, 'pause'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lbcLotteryABI}__ and `functionName` set to `"purchase"`.
 */
export function usePrepareLbcLotteryPurchase(config: Omit<UsePrepareContractWriteConfig<typeof lbcLotteryABI, 'purchase'>, 'abi' | 'address' | 'functionName'> = {} as any) {
  return usePrepareContractWrite({ abi: lbcLotteryABI, address: lbcLotteryAddress, functionName: 'purchase', ...config } as UsePrepareContractWriteConfig<typeof lbcLotteryABI, 'purchase'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lbcLotteryABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function usePrepareLbcLotteryRenounceOwnership(config: Omit<UsePrepareContractWriteConfig<typeof lbcLotteryABI, 'renounceOwnership'>, 'abi' | 'address' | 'functionName'> = {} as any) {
  return usePrepareContractWrite({ abi: lbcLotteryABI, address: lbcLotteryAddress, functionName: 'renounceOwnership', ...config } as UsePrepareContractWriteConfig<
    typeof lbcLotteryABI,
    'renounceOwnership'
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lbcLotteryABI}__ and `functionName` set to `"setNewToken"`.
 */
export function usePrepareLbcLotterySetNewToken(config: Omit<UsePrepareContractWriteConfig<typeof lbcLotteryABI, 'setNewToken'>, 'abi' | 'address' | 'functionName'> = {} as any) {
  return usePrepareContractWrite({ abi: lbcLotteryABI, address: lbcLotteryAddress, functionName: 'setNewToken', ...config } as UsePrepareContractWriteConfig<typeof lbcLotteryABI, 'setNewToken'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lbcLotteryABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function usePrepareLbcLotteryTransferOwnership(config: Omit<UsePrepareContractWriteConfig<typeof lbcLotteryABI, 'transferOwnership'>, 'abi' | 'address' | 'functionName'> = {} as any) {
  return usePrepareContractWrite({ abi: lbcLotteryABI, address: lbcLotteryAddress, functionName: 'transferOwnership', ...config } as UsePrepareContractWriteConfig<
    typeof lbcLotteryABI,
    'transferOwnership'
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lbcLotteryABI}__ and `functionName` set to `"unpause"`.
 */
export function usePrepareLbcLotteryUnpause(config: Omit<UsePrepareContractWriteConfig<typeof lbcLotteryABI, 'unpause'>, 'abi' | 'address' | 'functionName'> = {} as any) {
  return usePrepareContractWrite({ abi: lbcLotteryABI, address: lbcLotteryAddress, functionName: 'unpause', ...config } as UsePrepareContractWriteConfig<typeof lbcLotteryABI, 'unpause'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lbcLotteryABI}__ and `functionName` set to `"withdrawAll"`.
 */
export function usePrepareLbcLotteryWithdrawAll(config: Omit<UsePrepareContractWriteConfig<typeof lbcLotteryABI, 'withdrawAll'>, 'abi' | 'address' | 'functionName'> = {} as any) {
  return usePrepareContractWrite({ abi: lbcLotteryABI, address: lbcLotteryAddress, functionName: 'withdrawAll', ...config } as UsePrepareContractWriteConfig<typeof lbcLotteryABI, 'withdrawAll'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lbcLotteryABI}__ and `functionName` set to `"withdrawProjectTokens"`.
 */
export function usePrepareLbcLotteryWithdrawProjectTokens(config: Omit<UsePrepareContractWriteConfig<typeof lbcLotteryABI, 'withdrawProjectTokens'>, 'abi' | 'address' | 'functionName'> = {} as any) {
  return usePrepareContractWrite({ abi: lbcLotteryABI, address: lbcLotteryAddress, functionName: 'withdrawProjectTokens', ...config } as UsePrepareContractWriteConfig<
    typeof lbcLotteryABI,
    'withdrawProjectTokens'
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lbcLotteryABI}__.
 */
export function useLbcLotteryEvent<TEventName extends string>(config: Omit<UseContractEventConfig<typeof lbcLotteryABI, TEventName>, 'abi' | 'address'> = {} as any) {
  return useContractEvent({ abi: lbcLotteryABI, address: lbcLotteryAddress, ...config } as UseContractEventConfig<typeof lbcLotteryABI, TEventName>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lbcLotteryABI}__ and `eventName` set to `"ClaimTokens"`.
 */
export function useLbcLotteryClaimTokensEvent(config: Omit<UseContractEventConfig<typeof lbcLotteryABI, 'ClaimTokens'>, 'abi' | 'address' | 'eventName'> = {} as any) {
  return useContractEvent({ abi: lbcLotteryABI, address: lbcLotteryAddress, eventName: 'ClaimTokens', ...config } as UseContractEventConfig<typeof lbcLotteryABI, 'ClaimTokens'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lbcLotteryABI}__ and `eventName` set to `"CreateLottery"`.
 */
export function useLbcLotteryCreateLotteryEvent(config: Omit<UseContractEventConfig<typeof lbcLotteryABI, 'CreateLottery'>, 'abi' | 'address' | 'eventName'> = {} as any) {
  return useContractEvent({ abi: lbcLotteryABI, address: lbcLotteryAddress, eventName: 'CreateLottery', ...config } as UseContractEventConfig<typeof lbcLotteryABI, 'CreateLottery'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lbcLotteryABI}__ and `eventName` set to `"Draw"`.
 */
export function useLbcLotteryDrawEvent(config: Omit<UseContractEventConfig<typeof lbcLotteryABI, 'Draw'>, 'abi' | 'address' | 'eventName'> = {} as any) {
  return useContractEvent({ abi: lbcLotteryABI, address: lbcLotteryAddress, eventName: 'Draw', ...config } as UseContractEventConfig<typeof lbcLotteryABI, 'Draw'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lbcLotteryABI}__ and `eventName` set to `"InitializeTicketNumbers"`.
 */
export function useLbcLotteryInitializeTicketNumbersEvent(config: Omit<UseContractEventConfig<typeof lbcLotteryABI, 'InitializeTicketNumbers'>, 'abi' | 'address' | 'eventName'> = {} as any) {
  return useContractEvent({ abi: lbcLotteryABI, address: lbcLotteryAddress, eventName: 'InitializeTicketNumbers', ...config } as UseContractEventConfig<
    typeof lbcLotteryABI,
    'InitializeTicketNumbers'
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lbcLotteryABI}__ and `eventName` set to `"OwnershipTransferred"`.
 */
export function useLbcLotteryOwnershipTransferredEvent(config: Omit<UseContractEventConfig<typeof lbcLotteryABI, 'OwnershipTransferred'>, 'abi' | 'address' | 'eventName'> = {} as any) {
  return useContractEvent({ abi: lbcLotteryABI, address: lbcLotteryAddress, eventName: 'OwnershipTransferred', ...config } as UseContractEventConfig<typeof lbcLotteryABI, 'OwnershipTransferred'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lbcLotteryABI}__ and `eventName` set to `"Paused"`.
 */
export function useLbcLotteryPausedEvent(config: Omit<UseContractEventConfig<typeof lbcLotteryABI, 'Paused'>, 'abi' | 'address' | 'eventName'> = {} as any) {
  return useContractEvent({ abi: lbcLotteryABI, address: lbcLotteryAddress, eventName: 'Paused', ...config } as UseContractEventConfig<typeof lbcLotteryABI, 'Paused'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lbcLotteryABI}__ and `eventName` set to `"Purchase"`.
 */
export function useLbcLotteryPurchaseEvent(config: Omit<UseContractEventConfig<typeof lbcLotteryABI, 'Purchase'>, 'abi' | 'address' | 'eventName'> = {} as any) {
  return useContractEvent({ abi: lbcLotteryABI, address: lbcLotteryAddress, eventName: 'Purchase', ...config } as UseContractEventConfig<typeof lbcLotteryABI, 'Purchase'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lbcLotteryABI}__ and `eventName` set to `"Unpaused"`.
 */
export function useLbcLotteryUnpausedEvent(config: Omit<UseContractEventConfig<typeof lbcLotteryABI, 'Unpaused'>, 'abi' | 'address' | 'eventName'> = {} as any) {
  return useContractEvent({ abi: lbcLotteryABI, address: lbcLotteryAddress, eventName: 'Unpaused', ...config } as UseContractEventConfig<typeof lbcLotteryABI, 'Unpaused'>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link luckyBucksABI}__.
 */
export function useLuckyBucksRead<TFunctionName extends string, TSelectData = ReadContractResult<typeof luckyBucksABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof luckyBucksABI, TFunctionName, TSelectData>, 'abi' | 'address'> = {} as any
) {
  return useContractRead({ abi: luckyBucksABI, address: luckyBucksAddress, ...config } as UseContractReadConfig<typeof luckyBucksABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link luckyBucksABI}__ and `functionName` set to `"allowance"`.
 */
export function useLuckyBucksAllowance<TFunctionName extends 'allowance', TSelectData = ReadContractResult<typeof luckyBucksABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof luckyBucksABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: luckyBucksABI, address: luckyBucksAddress, functionName: 'allowance', ...config } as UseContractReadConfig<typeof luckyBucksABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link luckyBucksABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useLuckyBucksBalanceOf<TFunctionName extends 'balanceOf', TSelectData = ReadContractResult<typeof luckyBucksABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof luckyBucksABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: luckyBucksABI, address: luckyBucksAddress, functionName: 'balanceOf', ...config } as UseContractReadConfig<typeof luckyBucksABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link luckyBucksABI}__ and `functionName` set to `"decimals"`.
 */
export function useLuckyBucksDecimals<TFunctionName extends 'decimals', TSelectData = ReadContractResult<typeof luckyBucksABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof luckyBucksABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: luckyBucksABI, address: luckyBucksAddress, functionName: 'decimals', ...config } as UseContractReadConfig<typeof luckyBucksABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link luckyBucksABI}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`.
 */
export function useLuckyBucksDefaultAdminRole<TFunctionName extends 'DEFAULT_ADMIN_ROLE', TSelectData = ReadContractResult<typeof luckyBucksABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof luckyBucksABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: luckyBucksABI, address: luckyBucksAddress, functionName: 'DEFAULT_ADMIN_ROLE', ...config } as UseContractReadConfig<typeof luckyBucksABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link luckyBucksABI}__ and `functionName` set to `"getRoleAdmin"`.
 */
export function useLuckyBucksGetRoleAdmin<TFunctionName extends 'getRoleAdmin', TSelectData = ReadContractResult<typeof luckyBucksABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof luckyBucksABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: luckyBucksABI, address: luckyBucksAddress, functionName: 'getRoleAdmin', ...config } as UseContractReadConfig<typeof luckyBucksABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link luckyBucksABI}__ and `functionName` set to `"hasRole"`.
 */
export function useLuckyBucksHasRole<TFunctionName extends 'hasRole', TSelectData = ReadContractResult<typeof luckyBucksABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof luckyBucksABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: luckyBucksABI, address: luckyBucksAddress, functionName: 'hasRole', ...config } as UseContractReadConfig<typeof luckyBucksABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link luckyBucksABI}__ and `functionName` set to `"MINTER_ROLE"`.
 */
export function useLuckyBucksMinterRole<TFunctionName extends 'MINTER_ROLE', TSelectData = ReadContractResult<typeof luckyBucksABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof luckyBucksABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: luckyBucksABI, address: luckyBucksAddress, functionName: 'MINTER_ROLE', ...config } as UseContractReadConfig<typeof luckyBucksABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link luckyBucksABI}__ and `functionName` set to `"name"`.
 */
export function useLuckyBucksName<TFunctionName extends 'name', TSelectData = ReadContractResult<typeof luckyBucksABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof luckyBucksABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: luckyBucksABI, address: luckyBucksAddress, functionName: 'name', ...config } as UseContractReadConfig<typeof luckyBucksABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link luckyBucksABI}__ and `functionName` set to `"paused"`.
 */
export function useLuckyBucksPaused<TFunctionName extends 'paused', TSelectData = ReadContractResult<typeof luckyBucksABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof luckyBucksABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: luckyBucksABI, address: luckyBucksAddress, functionName: 'paused', ...config } as UseContractReadConfig<typeof luckyBucksABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link luckyBucksABI}__ and `functionName` set to `"PAUSER_ROLE"`.
 */
export function useLuckyBucksPauserRole<TFunctionName extends 'PAUSER_ROLE', TSelectData = ReadContractResult<typeof luckyBucksABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof luckyBucksABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: luckyBucksABI, address: luckyBucksAddress, functionName: 'PAUSER_ROLE', ...config } as UseContractReadConfig<typeof luckyBucksABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link luckyBucksABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useLuckyBucksSupportsInterface<TFunctionName extends 'supportsInterface', TSelectData = ReadContractResult<typeof luckyBucksABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof luckyBucksABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: luckyBucksABI, address: luckyBucksAddress, functionName: 'supportsInterface', ...config } as UseContractReadConfig<typeof luckyBucksABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link luckyBucksABI}__ and `functionName` set to `"symbol"`.
 */
export function useLuckyBucksSymbol<TFunctionName extends 'symbol', TSelectData = ReadContractResult<typeof luckyBucksABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof luckyBucksABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: luckyBucksABI, address: luckyBucksAddress, functionName: 'symbol', ...config } as UseContractReadConfig<typeof luckyBucksABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link luckyBucksABI}__ and `functionName` set to `"totalSupply"`.
 */
export function useLuckyBucksTotalSupply<TFunctionName extends 'totalSupply', TSelectData = ReadContractResult<typeof luckyBucksABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof luckyBucksABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: luckyBucksABI, address: luckyBucksAddress, functionName: 'totalSupply', ...config } as UseContractReadConfig<typeof luckyBucksABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link luckyBucksABI}__.
 */
export function useLuckyBucksWrite<TFunctionName extends string, TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<PrepareWriteContractResult<typeof luckyBucksABI, string>['request']['abi'], TFunctionName, TMode>
    : UseContractWriteConfig<typeof luckyBucksABI, TFunctionName, TMode> & {
        abi?: never;
      } = {} as any
) {
  return useContractWrite<typeof luckyBucksABI, TFunctionName, TMode>({ abi: luckyBucksABI, address: luckyBucksAddress, ...config } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link luckyBucksABI}__ and `functionName` set to `"approve"`.
 */
export function useLuckyBucksApprove<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<PrepareWriteContractResult<typeof luckyBucksABI, 'approve'>['request']['abi'], 'approve', TMode> & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof luckyBucksABI, 'approve', TMode> & {
        abi?: never;
        functionName?: 'approve';
      } = {} as any
) {
  return useContractWrite<typeof luckyBucksABI, 'approve', TMode>({ abi: luckyBucksABI, address: luckyBucksAddress, functionName: 'approve', ...config } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link luckyBucksABI}__ and `functionName` set to `"burn"`.
 */
export function useLuckyBucksBurn<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<PrepareWriteContractResult<typeof luckyBucksABI, 'burn'>['request']['abi'], 'burn', TMode> & { functionName?: 'burn' }
    : UseContractWriteConfig<typeof luckyBucksABI, 'burn', TMode> & {
        abi?: never;
        functionName?: 'burn';
      } = {} as any
) {
  return useContractWrite<typeof luckyBucksABI, 'burn', TMode>({ abi: luckyBucksABI, address: luckyBucksAddress, functionName: 'burn', ...config } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link luckyBucksABI}__ and `functionName` set to `"burnFrom"`.
 */
export function useLuckyBucksBurnFrom<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<PrepareWriteContractResult<typeof luckyBucksABI, 'burnFrom'>['request']['abi'], 'burnFrom', TMode> & { functionName?: 'burnFrom' }
    : UseContractWriteConfig<typeof luckyBucksABI, 'burnFrom', TMode> & {
        abi?: never;
        functionName?: 'burnFrom';
      } = {} as any
) {
  return useContractWrite<typeof luckyBucksABI, 'burnFrom', TMode>({ abi: luckyBucksABI, address: luckyBucksAddress, functionName: 'burnFrom', ...config } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link luckyBucksABI}__ and `functionName` set to `"grantRole"`.
 */
export function useLuckyBucksGrantRole<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<PrepareWriteContractResult<typeof luckyBucksABI, 'grantRole'>['request']['abi'], 'grantRole', TMode> & { functionName?: 'grantRole' }
    : UseContractWriteConfig<typeof luckyBucksABI, 'grantRole', TMode> & {
        abi?: never;
        functionName?: 'grantRole';
      } = {} as any
) {
  return useContractWrite<typeof luckyBucksABI, 'grantRole', TMode>({ abi: luckyBucksABI, address: luckyBucksAddress, functionName: 'grantRole', ...config } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link luckyBucksABI}__ and `functionName` set to `"mint"`.
 */
export function useLuckyBucksMint<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<PrepareWriteContractResult<typeof luckyBucksABI, 'mint'>['request']['abi'], 'mint', TMode> & { functionName?: 'mint' }
    : UseContractWriteConfig<typeof luckyBucksABI, 'mint', TMode> & {
        abi?: never;
        functionName?: 'mint';
      } = {} as any
) {
  return useContractWrite<typeof luckyBucksABI, 'mint', TMode>({ abi: luckyBucksABI, address: luckyBucksAddress, functionName: 'mint', ...config } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link luckyBucksABI}__ and `functionName` set to `"pause"`.
 */
export function useLuckyBucksPause<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<PrepareWriteContractResult<typeof luckyBucksABI, 'pause'>['request']['abi'], 'pause', TMode> & { functionName?: 'pause' }
    : UseContractWriteConfig<typeof luckyBucksABI, 'pause', TMode> & {
        abi?: never;
        functionName?: 'pause';
      } = {} as any
) {
  return useContractWrite<typeof luckyBucksABI, 'pause', TMode>({ abi: luckyBucksABI, address: luckyBucksAddress, functionName: 'pause', ...config } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link luckyBucksABI}__ and `functionName` set to `"renounceRole"`.
 */
export function useLuckyBucksRenounceRole<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<PrepareWriteContractResult<typeof luckyBucksABI, 'renounceRole'>['request']['abi'], 'renounceRole', TMode> & { functionName?: 'renounceRole' }
    : UseContractWriteConfig<typeof luckyBucksABI, 'renounceRole', TMode> & {
        abi?: never;
        functionName?: 'renounceRole';
      } = {} as any
) {
  return useContractWrite<typeof luckyBucksABI, 'renounceRole', TMode>({ abi: luckyBucksABI, address: luckyBucksAddress, functionName: 'renounceRole', ...config } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link luckyBucksABI}__ and `functionName` set to `"revokeRole"`.
 */
export function useLuckyBucksRevokeRole<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<PrepareWriteContractResult<typeof luckyBucksABI, 'revokeRole'>['request']['abi'], 'revokeRole', TMode> & { functionName?: 'revokeRole' }
    : UseContractWriteConfig<typeof luckyBucksABI, 'revokeRole', TMode> & {
        abi?: never;
        functionName?: 'revokeRole';
      } = {} as any
) {
  return useContractWrite<typeof luckyBucksABI, 'revokeRole', TMode>({ abi: luckyBucksABI, address: luckyBucksAddress, functionName: 'revokeRole', ...config } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link luckyBucksABI}__ and `functionName` set to `"transfer"`.
 */
export function useLuckyBucksTransfer<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<PrepareWriteContractResult<typeof luckyBucksABI, 'transfer'>['request']['abi'], 'transfer', TMode> & { functionName?: 'transfer' }
    : UseContractWriteConfig<typeof luckyBucksABI, 'transfer', TMode> & {
        abi?: never;
        functionName?: 'transfer';
      } = {} as any
) {
  return useContractWrite<typeof luckyBucksABI, 'transfer', TMode>({ abi: luckyBucksABI, address: luckyBucksAddress, functionName: 'transfer', ...config } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link luckyBucksABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useLuckyBucksTransferFrom<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<PrepareWriteContractResult<typeof luckyBucksABI, 'transferFrom'>['request']['abi'], 'transferFrom', TMode> & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof luckyBucksABI, 'transferFrom', TMode> & {
        abi?: never;
        functionName?: 'transferFrom';
      } = {} as any
) {
  return useContractWrite<typeof luckyBucksABI, 'transferFrom', TMode>({ abi: luckyBucksABI, address: luckyBucksAddress, functionName: 'transferFrom', ...config } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link luckyBucksABI}__ and `functionName` set to `"unpause"`.
 */
export function useLuckyBucksUnpause<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<PrepareWriteContractResult<typeof luckyBucksABI, 'unpause'>['request']['abi'], 'unpause', TMode> & { functionName?: 'unpause' }
    : UseContractWriteConfig<typeof luckyBucksABI, 'unpause', TMode> & {
        abi?: never;
        functionName?: 'unpause';
      } = {} as any
) {
  return useContractWrite<typeof luckyBucksABI, 'unpause', TMode>({ abi: luckyBucksABI, address: luckyBucksAddress, functionName: 'unpause', ...config } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link luckyBucksABI}__.
 */
export function usePrepareLuckyBucksWrite<TFunctionName extends string>(config: Omit<UsePrepareContractWriteConfig<typeof luckyBucksABI, TFunctionName>, 'abi' | 'address'> = {} as any) {
  return usePrepareContractWrite({ abi: luckyBucksABI, address: luckyBucksAddress, ...config } as UsePrepareContractWriteConfig<typeof luckyBucksABI, TFunctionName>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link luckyBucksABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareLuckyBucksApprove(config: Omit<UsePrepareContractWriteConfig<typeof luckyBucksABI, 'approve'>, 'abi' | 'address' | 'functionName'> = {} as any) {
  return usePrepareContractWrite({ abi: luckyBucksABI, address: luckyBucksAddress, functionName: 'approve', ...config } as UsePrepareContractWriteConfig<typeof luckyBucksABI, 'approve'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link luckyBucksABI}__ and `functionName` set to `"burn"`.
 */
export function usePrepareLuckyBucksBurn(config: Omit<UsePrepareContractWriteConfig<typeof luckyBucksABI, 'burn'>, 'abi' | 'address' | 'functionName'> = {} as any) {
  return usePrepareContractWrite({ abi: luckyBucksABI, address: luckyBucksAddress, functionName: 'burn', ...config } as UsePrepareContractWriteConfig<typeof luckyBucksABI, 'burn'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link luckyBucksABI}__ and `functionName` set to `"burnFrom"`.
 */
export function usePrepareLuckyBucksBurnFrom(config: Omit<UsePrepareContractWriteConfig<typeof luckyBucksABI, 'burnFrom'>, 'abi' | 'address' | 'functionName'> = {} as any) {
  return usePrepareContractWrite({ abi: luckyBucksABI, address: luckyBucksAddress, functionName: 'burnFrom', ...config } as UsePrepareContractWriteConfig<typeof luckyBucksABI, 'burnFrom'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link luckyBucksABI}__ and `functionName` set to `"grantRole"`.
 */
export function usePrepareLuckyBucksGrantRole(config: Omit<UsePrepareContractWriteConfig<typeof luckyBucksABI, 'grantRole'>, 'abi' | 'address' | 'functionName'> = {} as any) {
  return usePrepareContractWrite({ abi: luckyBucksABI, address: luckyBucksAddress, functionName: 'grantRole', ...config } as UsePrepareContractWriteConfig<typeof luckyBucksABI, 'grantRole'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link luckyBucksABI}__ and `functionName` set to `"mint"`.
 */
export function usePrepareLuckyBucksMint(config: Omit<UsePrepareContractWriteConfig<typeof luckyBucksABI, 'mint'>, 'abi' | 'address' | 'functionName'> = {} as any) {
  return usePrepareContractWrite({ abi: luckyBucksABI, address: luckyBucksAddress, functionName: 'mint', ...config } as UsePrepareContractWriteConfig<typeof luckyBucksABI, 'mint'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link luckyBucksABI}__ and `functionName` set to `"pause"`.
 */
export function usePrepareLuckyBucksPause(config: Omit<UsePrepareContractWriteConfig<typeof luckyBucksABI, 'pause'>, 'abi' | 'address' | 'functionName'> = {} as any) {
  return usePrepareContractWrite({ abi: luckyBucksABI, address: luckyBucksAddress, functionName: 'pause', ...config } as UsePrepareContractWriteConfig<typeof luckyBucksABI, 'pause'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link luckyBucksABI}__ and `functionName` set to `"renounceRole"`.
 */
export function usePrepareLuckyBucksRenounceRole(config: Omit<UsePrepareContractWriteConfig<typeof luckyBucksABI, 'renounceRole'>, 'abi' | 'address' | 'functionName'> = {} as any) {
  return usePrepareContractWrite({ abi: luckyBucksABI, address: luckyBucksAddress, functionName: 'renounceRole', ...config } as UsePrepareContractWriteConfig<typeof luckyBucksABI, 'renounceRole'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link luckyBucksABI}__ and `functionName` set to `"revokeRole"`.
 */
export function usePrepareLuckyBucksRevokeRole(config: Omit<UsePrepareContractWriteConfig<typeof luckyBucksABI, 'revokeRole'>, 'abi' | 'address' | 'functionName'> = {} as any) {
  return usePrepareContractWrite({ abi: luckyBucksABI, address: luckyBucksAddress, functionName: 'revokeRole', ...config } as UsePrepareContractWriteConfig<typeof luckyBucksABI, 'revokeRole'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link luckyBucksABI}__ and `functionName` set to `"transfer"`.
 */
export function usePrepareLuckyBucksTransfer(config: Omit<UsePrepareContractWriteConfig<typeof luckyBucksABI, 'transfer'>, 'abi' | 'address' | 'functionName'> = {} as any) {
  return usePrepareContractWrite({ abi: luckyBucksABI, address: luckyBucksAddress, functionName: 'transfer', ...config } as UsePrepareContractWriteConfig<typeof luckyBucksABI, 'transfer'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link luckyBucksABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareLuckyBucksTransferFrom(config: Omit<UsePrepareContractWriteConfig<typeof luckyBucksABI, 'transferFrom'>, 'abi' | 'address' | 'functionName'> = {} as any) {
  return usePrepareContractWrite({ abi: luckyBucksABI, address: luckyBucksAddress, functionName: 'transferFrom', ...config } as UsePrepareContractWriteConfig<typeof luckyBucksABI, 'transferFrom'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link luckyBucksABI}__ and `functionName` set to `"unpause"`.
 */
export function usePrepareLuckyBucksUnpause(config: Omit<UsePrepareContractWriteConfig<typeof luckyBucksABI, 'unpause'>, 'abi' | 'address' | 'functionName'> = {} as any) {
  return usePrepareContractWrite({ abi: luckyBucksABI, address: luckyBucksAddress, functionName: 'unpause', ...config } as UsePrepareContractWriteConfig<typeof luckyBucksABI, 'unpause'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link luckyBucksABI}__.
 */
export function useLuckyBucksEvent<TEventName extends string>(config: Omit<UseContractEventConfig<typeof luckyBucksABI, TEventName>, 'abi' | 'address'> = {} as any) {
  return useContractEvent({ abi: luckyBucksABI, address: luckyBucksAddress, ...config } as UseContractEventConfig<typeof luckyBucksABI, TEventName>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link luckyBucksABI}__ and `eventName` set to `"Approval"`.
 */
export function useLuckyBucksApprovalEvent(config: Omit<UseContractEventConfig<typeof luckyBucksABI, 'Approval'>, 'abi' | 'address' | 'eventName'> = {} as any) {
  return useContractEvent({ abi: luckyBucksABI, address: luckyBucksAddress, eventName: 'Approval', ...config } as UseContractEventConfig<typeof luckyBucksABI, 'Approval'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link luckyBucksABI}__ and `eventName` set to `"Paused"`.
 */
export function useLuckyBucksPausedEvent(config: Omit<UseContractEventConfig<typeof luckyBucksABI, 'Paused'>, 'abi' | 'address' | 'eventName'> = {} as any) {
  return useContractEvent({ abi: luckyBucksABI, address: luckyBucksAddress, eventName: 'Paused', ...config } as UseContractEventConfig<typeof luckyBucksABI, 'Paused'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link luckyBucksABI}__ and `eventName` set to `"RoleAdminChanged"`.
 */
export function useLuckyBucksRoleAdminChangedEvent(config: Omit<UseContractEventConfig<typeof luckyBucksABI, 'RoleAdminChanged'>, 'abi' | 'address' | 'eventName'> = {} as any) {
  return useContractEvent({ abi: luckyBucksABI, address: luckyBucksAddress, eventName: 'RoleAdminChanged', ...config } as UseContractEventConfig<typeof luckyBucksABI, 'RoleAdminChanged'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link luckyBucksABI}__ and `eventName` set to `"RoleGranted"`.
 */
export function useLuckyBucksRoleGrantedEvent(config: Omit<UseContractEventConfig<typeof luckyBucksABI, 'RoleGranted'>, 'abi' | 'address' | 'eventName'> = {} as any) {
  return useContractEvent({ abi: luckyBucksABI, address: luckyBucksAddress, eventName: 'RoleGranted', ...config } as UseContractEventConfig<typeof luckyBucksABI, 'RoleGranted'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link luckyBucksABI}__ and `eventName` set to `"RoleRevoked"`.
 */
export function useLuckyBucksRoleRevokedEvent(config: Omit<UseContractEventConfig<typeof luckyBucksABI, 'RoleRevoked'>, 'abi' | 'address' | 'eventName'> = {} as any) {
  return useContractEvent({ abi: luckyBucksABI, address: luckyBucksAddress, eventName: 'RoleRevoked', ...config } as UseContractEventConfig<typeof luckyBucksABI, 'RoleRevoked'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link luckyBucksABI}__ and `eventName` set to `"Transfer"`.
 */
export function useLuckyBucksTransferEvent(config: Omit<UseContractEventConfig<typeof luckyBucksABI, 'Transfer'>, 'abi' | 'address' | 'eventName'> = {} as any) {
  return useContractEvent({ abi: luckyBucksABI, address: luckyBucksAddress, eventName: 'Transfer', ...config } as UseContractEventConfig<typeof luckyBucksABI, 'Transfer'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link luckyBucksABI}__ and `eventName` set to `"Unpaused"`.
 */
export function useLuckyBucksUnpausedEvent(config: Omit<UseContractEventConfig<typeof luckyBucksABI, 'Unpaused'>, 'abi' | 'address' | 'eventName'> = {} as any) {
  return useContractEvent({ abi: luckyBucksABI, address: luckyBucksAddress, eventName: 'Unpaused', ...config } as UseContractEventConfig<typeof luckyBucksABI, 'Unpaused'>);
}
