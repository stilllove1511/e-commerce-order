// roles.guard.ts

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.get<string[]>(
            'roles',
            context.getHandler(),
        )

        if (!requiredRoles) {
            // Nếu không có trang trí @Roles được định nghĩa, cho phép truy cập
            return true
        }

        const request = context.switchToHttp().getRequest()
        const user = request.user // Được đặt trong quá trình xác thực trước đó, ví dụ: JWT xác thực

        if (!user || !user.role) {
            // Nếu không có thông tin người dùng hoặc không có vai trò được xác định, không cho phép truy cập
            return false
        }

        // Kiểm tra vai trò của người dùng có khớp với vai trò yêu cầu hay không
        for (let role of requiredRoles) {
            if (user.role.code === role) {
                return true
            }
        }
        return false
    }
}
