import { validate } from "class-validator";
import { StatusTransaction } from "../../common/enums/status-transaction.enum";
import { UpdateTransactionDto } from "./update-transaction.dto";


describe('UpdateTransactionDto', () => {
    it('should validate with valid data', async () => {
        const dto = new UpdateTransactionDto();
        dto.amount = 1500;
        dto.currency = 'USD';
        dto.status = StatusTransaction.PENDING;

        const errors = await validate(dto);
        expect(errors.length).toBe(0);
    });

    it('should fail validation with missing required fields', async () => {
        const dto = new UpdateTransactionDto();
        dto.amount = -100; // Invalid amount
        dto.currency = ''; // Invalid currency
        dto.status = '' as StatusTransaction; // Invalid status

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
    });

    it('should fail validation with invalid status', async () => {
        const dto = new UpdateTransactionDto();
        dto.amount = 200;
        dto.currency = 'EUR';
        dto.status = 'invalid-status' as StatusTransaction; // Invalid status

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
    });
    it('should fail validation with negative amount', async () => {
        const dto = new UpdateTransactionDto();
        dto.amount = -50; // Invalid amount
        dto.currency = 'COP';
        dto.status = StatusTransaction.COMPLETED;

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
    });
    it('should fail validation with empty currency', async () => {
        const dto = new UpdateTransactionDto();
        dto.amount = 500;
        dto.currency = ''; // Invalid currency
        dto.status = StatusTransaction.PENDING;

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
    });

})