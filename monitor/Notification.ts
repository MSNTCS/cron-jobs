import { U64 } from "codechain-primitives";

export interface Notification {
  readonly title: string;
  readonly content: string;
  readonly level: "error" | "warn" | "info";
  readonly date: Date;
}

export class CodeChainDeath implements Notification {
  public readonly title: string;
  public readonly content: string;
  public readonly level = "error";
  public readonly date = new Date();

  constructor(networkId: string) {
    const prefix = `[${this.level}][${networkId}][monitor]`;
    this.title = `${prefix} CodeChain Death Confirmation`;
    this.content = "CodeChain didn't renew the best block number for 1 hour.";
  }
}

export class ViewTooHigh implements Notification {
  public readonly title: string;
  public readonly content: string;
  public readonly level = "warn";
  public readonly date = new Date();

  constructor(networkId: string, blockNumber: number, view: U64) {
    const prefix = `[${this.level}][${networkId}][monitor]`;
    this.title = `${prefix} CodeChain View Too High`;
    this.content = `View of the block(${blockNumber}) in CodeChain is ${view.toString(
      10
    )}! An inspection is needed.`;
  }
}

export class NodeIsSleeping implements Notification {
  public readonly title: string;
  public readonly content: string;
  public readonly level = "warn";
  public readonly date = new Date();

  constructor(
    networkId: string,
    blockNumber: number,
    validatorAddresses: string[],
    streak?: number
  ) {
    const prefix = `[${this.level}][${networkId}][monitor]`;
    this.title = `${prefix} CodeChain Node is Sleeping`;
    if (streak !== undefined) {
      this.content = `Consecutive ${streak} blocks from the block(${blockNumber -
        streak}), validators ${validatorAddresses} did not precommit.`;
    } else {
      this.content = `For the block(${blockNumber}), validators \n${validatorAddresses.join(
        "\n"
      )} \ndid not precommit.`;
    }
  }
}

export class NodeRecovered implements Notification {
  public readonly title: string;
  public readonly content: string;
  public readonly level = "info";
  public readonly date = new Date();

  constructor(
    networkId: string,
    blockNumber: number,
    validatorAddress: string,
    sleepStreak: number
  ) {
    const prefix = `[${this.level}][${networkId}][monitor]`;
    this.title = `${prefix} CodeChain Node has recovered from the problem`;
    this.content = `The validator ${validatorAddress} did not precommit from the block ${blockNumber -
      sleepStreak} consecutively. Now the validator ${validatorAddress} has been recovered from the problem.`;
  }
}

export class AllNodesAwake implements Notification {
  public readonly title: string;
  public readonly content: string;
  public readonly level = "info";
  public readonly date = new Date();

  constructor(networkId: string, blockNumber: number) {
    const prefix = `[${this.level}][${networkId}][monitor]`;
    this.title = `${prefix} All CodeChain nodes are awake`;
    this.content = `Before the block(${blockNumber}) some nodes did not precommit, but now all nodes are recovered.`;
  }
}

export class GetBlockFailed implements Notification {
  public readonly title: string;
  public readonly content: string;
  public readonly level = "error";
  public readonly date = new Date();

  constructor(networkId: string, blockNumber: number) {
    const prefix = `[${this.level}][${networkId}][monitor]`;
    this.title = `${prefix} CodeChain failed to get a block`;
    this.content = `RPC chain_getBlockByNumber failed with the best block number ${blockNumber}`;
  }
}

export class DailyReport implements Notification {
  public readonly title: string;
  public readonly content: string;
  public readonly level = "info";
  public readonly date = new Date();

  constructor(networkId: string) {
    const prefix = `[${this.level}][${networkId}][monitor]`;
    this.title = `${prefix} is working`;
    this.content = "The monitor is working without problem.";
  }
}

export class UnhandledRejection implements Notification {
  public readonly title: string;
  public readonly content: string;
  public readonly level = "error";
  public readonly date = new Date();

  constructor(networkId: string, error: string) {
    const prefix = `[${this.level}][${networkId}][monitor]`;
    this.title = `${prefix} has an unexpected error`;
    this.content = error;
  }
}
