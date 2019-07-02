--
-- MetaCall Benchmarks by Parra Studios
-- Copyright (C) 2016 - 2019 Vicente Eduardo Ferrer Garcia <vic798@gmail.com>
--

-- Define request method, body and headers
wrk.method = "POST"
wrk.body = "{ \"x\": \"abc\" }"
wrk.headers["Content-Type"] = "application/json"

-- Response method
function response(status, headers, body)
	-- Strip whitespaces and newlines
	str = body:gsub("^%s*(.-)%s*$", "%1")

	-- Check if response is correct
	if str ~= "\"abc\"" then
		error("invalid body: " .. str)
	end
end
