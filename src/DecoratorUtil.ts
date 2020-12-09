
export interface CallbackParam {
	param: string;
	target: object;
	propertyKey: string;
	descriptor: PropertyDescriptor;
}


type  CallbackFunction = (x: CallbackParam, ...params: any[]) => any;
export class DecoratorUtil {
	public static define(callback: CallbackFunction): any {
		return function (p: string,b: string) {
			const that = this;
			return function (target: object, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
				const param: CallbackParam = {
					param: p,
					//_this: this,
					target: target,
					propertyKey: propertyKey,
					descriptor: descriptor,
				};
				descriptor.value = function (...params: any[]): any {
					const rt = callback.apply(this, [param, params]);
					return rt;
				};
				return descriptor;
			};
		};
	}
}

