import { Module } from '@nestjs/common';
import { PaymentCardController } from './payment-card.controller';
import { PaymentCardService } from './payment-card.service';

@Module({
  controllers: [PaymentCardController],
  providers: [PaymentCardService]
})
export class PaymentCardModule {}
