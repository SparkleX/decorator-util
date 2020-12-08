
export interface CallbackParam {
	param: string;
	_this: object;
	target: object;
	propertyKey: string;
	descriptor: PropertyDescriptor;
}


type  CallbackFunction = (x: CallbackParam, ...params: any[]) => any;

type  DecoratorStringFunction = (x: string,b: string) => any;

export class DecoratorUtil {
	public static define(callback: CallbackFunction): any {
		return function (p: string,b: string) {
			console.debug(b);
			const that = this;
			return function (target: object, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
				console.debug(b);
				const param: CallbackParam = {
					param: p,
					_this: this,
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

const callback = async function (x: CallbackParam, ...params: any[]): Promise<any> {
	console.debug(x);
	console.debug(params);
	console.debug(this);
	return 1;
}


const aaa = DecoratorUtil.define(callback);

const sqlImpl = function (sql?: string) {
	console.debug(this);
	return function (target: object, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
		descriptor.value = async function (...params: any[]): Promise<any> {
			console.debug(this);
			return null;
		};
		return descriptor;
	};
}

//const sql = sqlImpl.bind("222");


export class TestRepo {
	public aaa = 100;
	@aaa("select *","222")
	public test(a:string): void {
		console.debug("ERROR");
	}

}

const oTestRepo = new TestRepo();
oTestRepo.test("123");