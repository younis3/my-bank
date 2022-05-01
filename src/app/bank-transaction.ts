export enum TransactionType { openAcount, deposit, withdraw }

export class BankTransaction {
    constructor(public amount: number, public trnDate: Date = new Date(), public asmachta: string, public trnTyp: TransactionType, public curBalance: number, public note: string) { }
    toString(): string {
        return `on ${this.trnDate.toDateString()} a ${TransactionType[this.trnTyp]} of ${this.amount} NIS`;
    }

}

