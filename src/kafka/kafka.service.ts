import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private kafka = new Kafka({
    clientId: 'ingestion-service',
    brokers: [process.env.KAFKA_BROKER || 'kafka:9092'],
    retry: { retries: 5 },
  });

  private producer = this.kafka.producer();
  private consumer = this.kafka.consumer({ groupId: 'injestion-service' });

  async onModuleInit() {
    this.consumer.subscribe({ topics: ['start-processing'] });
    await this.producer.connect();
    await this.consumer.connect();
    this.consumer.run({
      eachMessage: async ({ message }) => {
        console.log(`Received message: ${message}`);
      },
    });
  }

  async sendMessage(input: { topic: string; message:string  }) {
    const { topic, message } = input;
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
  }
}
