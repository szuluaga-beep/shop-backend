import { validate } from "class-validator";
import { UpdateProductDto } from "./update-product.dto";


describe('UpdateProductDto', () => {

    it('should validate with valid data', async () => {
        const dto = new UpdateProductDto();
        dto.name = 'Updated Product';
        dto.price = 150;
        dto.quantity = 20;
        dto.description = 'This is an updated product';
        dto.imageUrl = 'http://example.com/updated-image.jpg';

        const errors = await validate(dto);
        expect(errors.length).toBe(0);
    });
    it('should fail validation with missing required fields', async () => {
        const dto = new UpdateProductDto();
        dto.name = '';
        dto.price = -20; // Invalid price
        dto.quantity = 0; // Invalid quantity
        dto.description = '';
        dto.imageUrl = 'not-a-url'; // Invalid URL

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
    });
    it('should fail validation with invalid URL', async () => {
        const dto = new UpdateProductDto();
        dto.name = 'Updated Product';
        dto.price = 150;
        dto.quantity = 20;
        dto.description = 'This is an updated product';
        dto.imageUrl = 'invalid-url'; // Invalid URL

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThanOrEqual(1);
    });
});