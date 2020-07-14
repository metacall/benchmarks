//
// MetaCall Benchmarks by Parra Studios
// Copyright (C) 2016 - 2020 Vicente Eduardo Ferrer Garcia <vic798@gmail.com>
//

function bench_call_js_untyped(x) {
	return x;
}

function bench_call_js_typed(x :: String) :: String {
	return x;
}
