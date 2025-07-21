import { NestFactory } from "@nestjs/core";
import { bootstrap } from "./main";
import { AppModule } from "./app.module";

jest.mock('@nestjs/core', () => ({
    NestFactory: {
        create: jest.fn().mockResolvedValue({
            enableCors: jest.fn(),
            useGlobalPipes: jest.fn(),
            listen: jest.fn(),
            setGlobalPrefix: jest.fn(),
        }),
    },
}));

describe('Main', () => {
    let mockApp: {
        enableCors: jest.Mock;
        useGlobalPipes: jest.Mock;
        listen: jest.Mock;
        setGlobalPrefix: jest.Mock;
    }

    beforeEach(() => {
        mockApp = {
            enableCors: jest.fn(),
            useGlobalPipes: jest.fn(),
            listen: jest.fn(),
            setGlobalPrefix: jest.fn(),
        };
        (NestFactory.create as jest.Mock).mockResolvedValue(mockApp);
    });

    it('should be create application', async () => {
        await bootstrap();
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(NestFactory.create).toHaveBeenCalledWith(AppModule);
    });

    it('should enable CORS', async () => {
        await bootstrap();
        expect(mockApp.enableCors).toHaveBeenCalled();
    });
    it('should set global prefix', async () => {
        await bootstrap();
        expect(mockApp.setGlobalPrefix).toHaveBeenCalledWith('api');
    });
    it('should use global pipes', async () => {
        await bootstrap();
        expect(mockApp.useGlobalPipes).toHaveBeenCalled();
    });
    it('should listen on the specified port', async () => {
        const port = process.env.PORT ?? 3000;
        await bootstrap();
        expect(mockApp.listen).toHaveBeenCalledWith(port);
    });
    it('should handle errors during bootstrap', async () => {
        (NestFactory.create as jest.Mock).mockRejectedValue(new Error('Bootstrap error'));
        await expect(bootstrap()).rejects.toThrow('Bootstrap error');
    });
    it('should handle undefined PORT environment variable', async () => {
        delete process.env.PORT;
        await bootstrap();
        expect(mockApp.listen).toHaveBeenCalledWith(3000);
    });
    it('should use global pipes', async () => {

        await bootstrap();
        expect(mockApp.useGlobalPipes).toHaveBeenCalledWith(
            expect.objectContaining({

                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                validatiorOptions: expect.objectContaining({
                    transform: true,
                    forbidNonWhitelisted: true,
                    whitelist: true,
                }),
            }),
        );
    })
});
