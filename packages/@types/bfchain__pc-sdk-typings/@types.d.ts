declare namespace BFMetaPcSdk {
    type AllPartial<T> = {
        [P in keyof T]?: AllPartial<T[P]>;
    };
    interface AutoVote {
        enable: boolean;
        useConfigFee: boolean;
        fee: string;
        priorRecommendedNumber: boolean;
        maxNumberOfRecommended: number;
        numberOfRounds: number;
        productivityPercent: number;
        forgedBlocksPercent: number;
        applyTxPercent: number;
        votePercent: number;
        newDelegatePercent: number;
        minBeSelectProductivity: number;
    }
    interface SchemaType {
        id?: string;
        type: string;
        properties?: {
            [k: string]: SchemaType;
        };
        required?: string[];
        minimum?: number;
        maximum?: number;
        minItems?: number;
        maxItems?: number;
        items?: SchemaType;
        format?: string;
    }
}
