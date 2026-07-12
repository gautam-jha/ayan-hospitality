import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default {
	...defineCloudflareConfig({
		enableCacheInterception: true,
	}),
	buildCommand: "npx next build",
};
