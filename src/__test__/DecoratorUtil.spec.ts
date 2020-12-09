import { DecoratorUtil, CallbackParam } from "..";

/*async function callback(x: CallbackParam, params: any[]): Promise<any> {
	console.debug(x);
	console.debug(params);
	console.debug(this);
	return 1;
}*/

const callback = jest.fn();
const sql: (sql: string) => any = DecoratorUtil.define(callback);

class TestRepo {
	@sql("select * from table")
	query(p1: any, p2: any): any {
		throw -1;
	}

	@sql("select * from table")
	async queryAsync(p1: any, p2: any): Promise<any> {
		throw -1;
	}
}

test("sync call", () => {
	callback.mockReturnValueOnce("return");
	const oTestRepo = new TestRepo();
	const ret = oTestRepo.query("p1", "p2");
	expect(ret).toBe("return");
	expect(callback.mock.calls.length).toBe(1);
	expect(callback.mock.calls[0][0].param).toStrictEqual("select * from table");
	expect(callback.mock.calls[0][1]).toStrictEqual(["p1", "p2"]);
});


test("async call", async () => {
	callback.mockResolvedValue("return");
	const oTestRepo = new TestRepo();
	const ret = await oTestRepo.queryAsync("p1", "p2");
	expect(ret).toBe("return");
	expect(callback.mock.calls.length).toBe(1);
	expect(callback.mock.calls[0][0].param).toStrictEqual("select * from table");
	expect(callback.mock.calls[0][1]).toStrictEqual(["p1", "p2"]);
});