export interface SuccessResponseModel<PayloadType> {
    success: true;
    message: string;
    payload: PayloadType | PayloadType[];
    links?: {
        self: string;
        first: string;
        previous: string;
        next: string;
        last: string;
    },
}