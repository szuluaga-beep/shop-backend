import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "./app.module";

describe('AppModule', () => {
    let moduleRef: TestingModule;

    beforeEach(async () => {
        moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
    });

    it('should compile the AppModule', () => {
        expect(moduleRef).toBeDefined();
    });

});