import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter{
    constructor(){
        
    }

    catch(exception: HttpException, host: ArgumentsHost):void{
        const ctx = host.switchToHttp(); // 获取请求上下文
        const request = ctx.getRequest(); // 获取请求上下文中的request对象
        const response = ctx.getResponse(); // 获取请求上下文中的response对象
        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR; // 获取异常状态码
        const message = exception.message
          ? exception.message
          : `${status >= 500 ? '服务器错误（Service Error）' : '客户端错误（Client Error）'}`;
        const nowTime = new Date().getTime();
        const errorResponse = {
          data: {},
          message,
          code: 500,
          date: nowTime,
          path: request.url,
        };

        console.log(errorResponse);
     
        response.status(status);
        response.header('Content-Type', 'application/json; charset=utf-8');
        response.send(errorResponse);
    }
}