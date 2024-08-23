import { ClientsProviderAsyncOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { IDENTITY_CLIENT_NAME, QUEUE_IDENTITY_OPTIONS } from '../../contracts';

export const IDENTITY_MICROSERVICE_CONFIG: ClientsProviderAsyncOptions = {
  name: IDENTITY_CLIENT_NAME,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const amqpHost = configService.get('AMQP_HOST');
    const amqpPort = configService.get('AMQP_PORT');
    return {
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${amqpHost}:${amqpPort}`],
        ...QUEUE_IDENTITY_OPTIONS,
        noAck: true,
      },
    };
  },
};
