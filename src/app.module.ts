import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import Stripe from 'stripe';
// import { UsersModule } from './users/users.module';
// import { User } from './users/models/user.model';
// import { MailModule } from './mail/mail.module';
// import { Admin } from './admin/models/admin.entity';
// import { BotModule } from './bot/bot.module';
// import { TelegrafModule } from 'nestjs-telegraf';
// import { BOT_NAME } from './app.constants';
import { SmallCategoryModule } from './small_category/small_category.module';
import { BigCategoryModule } from './big_category/big_category.module';
import { BusinessModule } from './business/business.module';
import { WorkTimeModule } from './work_time/work_time.module';
import { OrderModule } from './order/order.module';
import { CommentaryModule } from './commentary/commentary.module';
import { StarsModule } from './stars/stars.module';
import { AddressModule } from './address/address.module';
import { Address } from './address/model/address.model';
import { BigCategory } from './big_category/models/big_category.model';
import { Business } from './business/models/business.model';
import { Commentary } from './commentary/models/commentary.model';
import { Order } from './order/models/order.model';
import { SmallCategory } from './small_category/models/small_category.model';
import { Stars } from './stars/models/star.model';
import { WorkTime } from './work_time/models/work_time.model';
import { ProductOrServiceModule } from './product_or_service/product_or_service.module';
import { ProductOrService } from './product_or_service/models/product_or_service.model';
import { UsersModule } from './users/user.module';
import { User } from './users/models/user.model';
import { Admin } from './admin/models/admin.model';
import { AdminModule } from './admin/admin.module';
import { BusinessImagesModule } from './business_images/business_images.module';
import { BusinessImage } from './business_images/model/business_image.model';
import { OrderDriverModule } from './order_driver/order_driver.module';
import { DriverModule } from './driver/driver.module';
import { DriverCarModule } from './driver_car/driver_car.module';
import { DriverCarImageModule } from './driver_car_image/driver_car_image.module';
import { CartModule } from './cart/cart.module';
import { Cart } from './cart/model/cart.model';
import { Driver } from './driver/model/driver.model';
import { DriverCar } from './driver_car/model/driver_car.model';
import { DriverCarImage } from './driver_car_image/model/driver_car_image.model';
import { OrderDriver } from './order_driver/model/order_driver.model';
import { CartItemsModule } from './cart_items/cart_items.module';
import { OrderItemsModule } from './order_items/order_items.module';
import { CartItem } from './cart_items/model/cart_item.model';
import { OrderItem } from './order_items/model/order_item.model';
import { VisitModule } from './visit/visit.module';
import { MailModule } from './mail/mail.module';
import { LogVisitMiddleware } from './common/middlewares/log-visit.middleware';
import { Visit } from './visit/model/visit.model';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        Admin,
        Address,
        BigCategory,
        Business,
        BusinessImage,
        Cart,
        CartItem,
        Commentary,
        Driver,
        DriverCar,
        DriverCarImage,
        Order,
        OrderItem,
        OrderDriver,
        ProductOrService,
        SmallCategory,
        Stars,
        User,
        Visit,
        WorkTime,
      ],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),
    // TelegrafModule.forRootAsync({
    //   botName: BOT_NAME,
    //   useFactory: () => ({
    //     token: process.env.BOT_TOKEN,
    //     middlewares: [],
    //     include: [BotModule],
    //   }),
    // }),
    // UsersModule,
    MailModule,
    // BotModule,
    SmallCategoryModule,
    BigCategoryModule,
    BusinessModule,
    WorkTimeModule,
    OrderModule,
    CommentaryModule,
    StarsModule,
    UsersModule,
    AddressModule,
    ProductOrServiceModule,
    AdminModule,
    BusinessImagesModule,
    CartModule,
    OrderDriverModule,
    DriverModule,
    DriverCarModule,
    DriverCarImageModule,
    CartItemsModule,
    OrderItemsModule,
    VisitModule,
  ],
  controllers: [],
  providers: [
    {
      provide: 'STRIPE',
      useFactory: () => {
        return new Stripe(process.env.STRIPE_SECRET_KEY, {
          apiVersion: '2024-04-10',
        });
      },
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogVisitMiddleware).forRoutes('*'); // Apply middleware to all routes
  }
}
