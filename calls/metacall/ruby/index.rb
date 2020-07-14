#
# MetaCall Benchmarks by Parra Studios
# Copyright (C) 2016 - 2020 Vicente Eduardo Ferrer Garcia <vic798@gmail.com>
#

def bench_call_rb_untyped(x)
	return x
end

def bench_call_rb_typed(x: String)
	return x
end
