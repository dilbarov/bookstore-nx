import { ConfigService } from '@nestjs/config'
import { RabbitMQConfig, RabbitMQExchangeConfig } from '@golevelup/nestjs-rabbitmq'

export const amqpConfig = (
  configService: ConfigService,
  exchanges: RabbitMQExchangeConfig[]
): RabbitMQConfig => {
  const user = configService.get<string>('AMQP_USER')
  const password = configService.get<string>('AMQP_PASSWORD')
  const host = configService.get<string>('AMQP_HOST')
  const port = configService.get<string>('AMQP_PORT')
  if (!user || !password || !host || !port) {
    throw new Error(
      'AMQP_URI can not build without AMQP_USER, AMQP_PASSWORD, AMQP_HOST and AMQP_PORT environment variables.'
    )
  }
  const uri = `amqp://${user}:${password}@${host}:${port}`

  return {
    exchanges,
    uri,
    connectionInitOptions: { wait: false },
    connectionManagerOptions: { heartbeatIntervalInSeconds: 15, reconnectTimeInSeconds: 30 }
  }
}
