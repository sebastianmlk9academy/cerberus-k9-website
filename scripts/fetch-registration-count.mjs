import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "public", "data");
const OUT_FILE = path.join(OUT_DIR, "registration-count.json");

const PRETIX_URL =
	"https://pretix.eu/api/v1/organizers/MLK9-LLK9/events/CERBERUS/orders/?status=p&page_size=1";

function writePayload(payload) {
	return fs.mkdir(OUT_DIR, { recursive: true }).then(() =>
		fs.writeFile(OUT_FILE, `${JSON.stringify(payload, null, 2)}\n`, "utf8"),
	);
}

async function main() {
	const updated = new Date().toISOString();
	const token = process.env.PRETIX_API_TOKEN;

	if (!token || String(token).trim() === "") {
		await writePayload({ count: 0, error: "no token", updated });
		console.warn("[fetch-registration-count] PRETIX_API_TOKEN missing — wrote placeholder.");
		return;
	}

	try {
		const res = await fetch(PRETIX_URL, {
			headers: {
				Authorization: `Token ${token.trim()}`,
				Accept: "application/json",
			},
		});
		const text = await res.text();
		let body;
		try {
			body = JSON.parse(text);
		} catch {
			await writePayload({
				count: 0,
				error: "invalid json",
				updated,
			});
			return;
		}
		if (!res.ok) {
			await writePayload({
				count: 0,
				error: body?.detail || `http ${res.status}`,
				updated,
			});
			return;
		}
		const count = typeof body.count === "number" ? body.count : 0;
		await writePayload({ count, updated });
		console.log(`[fetch-registration-count] count=${count}`);
	} catch (e) {
		const message = e instanceof Error ? e.message : String(e);
		await writePayload({ count: 0, error: message, updated });
		console.error("[fetch-registration-count]", message);
	}
}

main();
