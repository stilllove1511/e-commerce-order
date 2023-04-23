import { Column, ColumnOptions } from 'typeorm';

export function NullableColumn(options?: ColumnOptions) {
    return function (target: any, propertyName: string) {
        Column({
            ...options,
            nullable: true,
        })(target, propertyName);
    };
}
