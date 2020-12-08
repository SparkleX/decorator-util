import { DecoratorUtil, CallbackParam } from "../DecoratorUtil";

async function callback(x: CallbackParam, params: any[]): Promise<any> {
	console.debug(x);
	console.debug(params);
	console.debug(this);
	return 1;
}


const sql: (sql: string) => any = DecoratorUtil.define(callback);


class TestRepo {
	@sql("select * from table")
	async query(param: string): Promise<any> {
		throw -1;
	}
}

test("", ()=>{
	const oTestRepo = new TestRepo();
	oTestRepo.query("p1");
}) 