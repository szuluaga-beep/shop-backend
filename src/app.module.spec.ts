import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "./app.module";

describe('AppModule', () => {
    let moduleRef: TestingModule;

    beforeEach(async () => {
        jest.setTimeout(20000); // Increase timeout to 20 seconds
        moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
    });

    it('should compile the AppModule', () => {
        expect(moduleRef).toBeDefined();
    });

});