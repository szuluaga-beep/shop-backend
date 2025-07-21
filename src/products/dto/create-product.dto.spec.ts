import { validate } from "class-validator";
import { CreateProductDto } from "./create-product.dto";


describe('CreateProductDto', () => {
    it('should validate with valid data', async () => {
        const dto = new CreateProductDto();
        dto.name = 'Test Product';
        dto.price = 100;
        dto.quantity = 10;
        dto.description = 'This is a test product';
        dto.imageUrl = 'http://example.com/image.jpg';

        const errors = await validate(dto);
        expect(errors.length).toBe(0);
    });
    it('should fail validation with missing required fields', async () => {
        const dto = new CreateProductDto();
        dto.name = '';
        dto.price = -10; // Invalid price
        dto.quantity = 0; // Invalid quantity
        dto.description = '';
        dto.imageUrl = 'not-a-url'; // Invalid URL

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
    });
     
    it('should fail validation with invalid URL', async () => {
        const dto = new CreateProductDto();
        dto.name = 'Test Product';
        dto.price = 100;
        dto.quantity = 10;
        dto.description = 'This is a test product';
        dto.imageUrl = 'invalid-url'; // Invalid URL

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
    });
});
