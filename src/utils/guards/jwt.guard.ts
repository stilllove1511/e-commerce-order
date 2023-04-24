import {
    Injectable,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import * as jwt from 'jsonwebtoken'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        // Lấy request từ ExecutionContext
        const request = context.switchToHttp().getRequest()

        // Xử lý logic xác thực JWT ở đây
        const jwtToken = request.token
        if (!jwtToken) {
            // Nếu không có JWT token, ném ra lỗi UnauthorizedException
            throw new UnauthorizedException('Missing JWT token')
        }

        try {
            // Giải mã JWT token và lưu vào request.user để sử dụng trong các route handler
            const decoded = this.validateToken(jwtToken)
            request.user = decoded
            return true
        } catch (error) {
            // Nếu JWT token không hợp lệ, ném ra lỗi UnauthorizedException
            throw new UnauthorizedException('Invalid JWT token')
        }
    }

    private validateToken(token: string) {
        // Xử lý giải mã JWT token ở đây và trả về đối tượng người dùng
        // Ví dụ:
        // const decoded = jwt.verify(token, 'your-secret-key');
        // return decoded;
        try {
            // Giải mã JWT token và trả về dữ liệu giải mã
            const decoded = jwt.verify(token, process.env.JWTSECRET) // Thay 'your-secret-key' bằng khóa bí mật thực tế của bạn
            return decoded
        } catch (error) {
            // Nếu JWT token không hợp lệ, ném ra lỗi để xử lý ở lớp trên
            throw new UnauthorizedException('Invalid JWT token')
        }
    }
}
