import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { IncomingWebhook } from '@slack/webhook';

export interface Response<T> {
  success: number;
  data: T;
  msg: string;
}

@Injectable()
export class ResponseFormatInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      catchError((err) => {
        const webhook = new IncomingWebhook(process.env.SLACK_URL);
        webhook.send({
          attachments: [
            {
              color: 'danger',
              text: `🚨API 서버 에러발생🚨`,
              fields: [
                {
                  title: err.errorCode,
                  value: JSON.stringify(err),
                  short: false,
                },
              ],
              ts: Math.floor(new Date().getTime() / 1000).toString(),
            },
          ],
        });
        // return throwError(err);
        throw err;
      }),
      map((data) => {
        return {
          success: 1,
          data: data.data,
          msg: data.msg,
        };
      }),
    );
  }
}
