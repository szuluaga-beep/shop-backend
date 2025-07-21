import { validate } from "class-validator";
import { CreateTransactionDto } from "./create-transaction.dto";
import { StatusTransaction } from "../../common/enums/status-transaction.enum";


describe('CreateTransactionDto', () => {

    it('should validate with valid data', async () => {
        const dto = new CreateTransactionDto();
        dto.amount = 1000;
        dto.currency = 'COP';
        dto.status = StatusTransaction.COMPLETED;

        const errors = await validate(dto);
        expect(errors.length).toBe(0);
    });

    it('should fail validation with missing required fields', async () => {
        const dto = new CreateTransactionDto();
        dto.amount = -5000; // Invalid amount
        dto.currency = ""; // Invalid currency
        dto.status = '' as StatusTransaction; // Invalid status

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
    });

    it('should fail validation with invalid status', async () => {
        const dto = new CreateTransactionDto();
        dto.currency = 'USD';
        dto.amount = 100;
        dto.status = 'invalid-status' as StatusTransaction; // Invalid status

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
    });
    it('should fail validation with negative amount', async () => {
        const dto = new CreateTransactionDto();
        dto.amount = -100; // Invalid amount
        dto.currency = 'COP';
        dto.status = StatusTransaction.PENDING;

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
    });
    it('should fail validation with empty currency', async () => {
        const dto = new CreateTransactionDto();
        dto.amount = 1000;
        dto.currency = ''; // Invalid currency
        dto.status = StatusTransaction.PENDING;

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
    });

});